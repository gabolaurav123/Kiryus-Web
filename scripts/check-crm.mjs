import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomBytes, randomUUID, scryptSync } from "node:crypto";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";
import { once } from "node:events";

const storageRoot = resolve(".crm-data");
await mkdir(storageRoot, { recursive: true });
const directory = await mkdtemp(join(storageRoot, "integration-"));
const port = 3102;
const base = `http://127.0.0.1:${port}`;
const origin = "https://preview.example.com";
const password = randomBytes(32).toString("base64url");
const salt = randomBytes(16).toString("hex");
const passwordHash = `scrypt$16384$8$1$${salt}$${scryptSync(password, Buffer.from(salt, "hex"), 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }).toString("hex")}`;
let server;
let output = "";
let cookie = "";

async function start() {
  output = "";
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    env: { ...process.env, PORT: String(port), NEXT_PUBLIC_SITE_URL: origin, CRM_DATA_DIR: directory, CRM_ADMIN_EMAIL: "qa@example.com", CRM_ADMIN_PASSWORD_HASH: passwordHash, CRM_TRUST_PROXY_HEADERS: "false", NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { output += chunk; });
  server.stderr.on("data", (chunk) => { output += chunk; });
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(base + "/admin/login")).ok) return; } catch {}
    if (server.exitCode !== null) throw new Error(`El servidor CRM se detuvo: ${output}`);
    await new Promise((done) => setTimeout(done, 200));
  }
  throw new Error(`El servidor CRM no arrancó: ${output}`);
}
async function stop() {
  if (server && server.exitCode === null) {
    const exited = once(server, "exit");
    server.kill("SIGTERM");
    await exited;
  }
}
function request(path, method = "GET", data, options = {}) {
  return fetch(base + path, { method, redirect: "manual", headers: { ...(data !== undefined ? { "Content-Type": "application/json", Origin: origin } : {}), ...(cookie ? { Cookie: cookie } : {}), ...options.headers }, ...(data !== undefined ? { body: JSON.stringify(data) } : {}) });
}
const fields = { interest: "voluntariado", village: "colombia", firstName: "María", lastName: "Muñoz", email: "consulta-qa@example.com", phone: "", message: "Quiero conocer las actividades de la comunidad.", arrival: "", departure: "", consent: true, website: "", idempotencyKey: randomUUID() };

try {
  await start();
  assert.equal((await request("/api/admin/leads")).status, 401);
  assert.equal((await request("/api/admin/export.csv")).status, 401);
  assert.equal((await request("/admin")).status, 307);
  assert.equal((await request("/api/leads", "POST", fields, { headers: { Origin: "https://evil.example" } })).status, 403);
  assert.equal((await request("/api/leads", "POST", fields, { headers: { "Content-Type": "text/plain" } })).status, 415);
  assert.equal((await request("/api/leads", "POST", { ...fields, message: "x".repeat(20_000) })).status, 413);
  assert.equal((await request("/api/leads", "POST", { ...fields, consent: false })).status, 400);
  assert.equal((await request("/api/leads", "POST", { ...fields, village: "espana" })).status, 400);
  assert.equal((await request("/api/leads", "POST", { ...fields, website: "spam.example" })).status, 202);
  const create = await request("/api/leads", "POST", fields);
  assert.equal(create.status, 201);
  const lead = await create.json();
  assert.match(lead.id, /^[a-f0-9-]{36}$/);
  const replay = await request("/api/leads", "POST", fields);
  assert.equal(replay.status, 200);
  assert.equal((await replay.json()).id, lead.id);
  assert.equal((await request("/api/leads", "POST", { ...fields, message: "Cambio de la consulta anterior." })).status, 409);
  assert.equal((await request("/api/admin/login", "POST", { email: "qa@example.com", password: "invalid" })).status, 401);
  const login = await request("/api/admin/login", "POST", { email: "qa@example.com", password });
  assert.equal(login.status, 200);
  const setCookie = login.headers.get("set-cookie");
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /Secure/i);
  assert.match(setCookie, /SameSite=strict/i);
  cookie = setCookie.split(";")[0];
  assert.equal((await request("/admin")).status, 200);
  assert.match((await request("/api/admin/leads")).headers.get("cache-control"), /no-store/);
  const list = await (await request("/api/admin/leads")).json();
  assert.equal(list.total, 1);
  assert.equal(list.leads[0].firstName, "María");
  assert.equal((await request(`/api/admin/leads/${lead.id}`, "PATCH", { status: "contactado", notes: "=SUM(1,2)" }, { headers: { Origin: "https://evil.example" } })).status, 403);
  const patch = await request(`/api/admin/leads/${lead.id}`, "PATCH", { status: "contactado", notes: "=SUM(1,2)" });
  assert.equal(patch.status, 200);
  assert.equal((await patch.json()).lead.status, "contactado");
  assert.equal((await (await request("/api/admin/leads?status=contactado&village=colombia&q=Mar%C3%ADa")).json()).total, 1);
  const csv = await request("/api/admin/export.csv?status=contactado");
  assert.equal(csv.status, 200);
  assert.match(csv.headers.get("content-type"), /text\/csv/);
  assert.match(await csv.text(), /"'=SUM\(1,2\)"/);
  await stop();
  await start();
  const persisted = await request(`/api/admin/leads/${lead.id}`);
  assert.equal(persisted.status, 200, "Sesión y consulta sobreviven al reinicio");
  assert.equal((await persisted.json()).lead.notes, "=SUM(1,2)");
  assert.equal((await request(`/api/admin/leads/${lead.id}`, "DELETE", {})).status, 200);
  assert.equal((await request(`/api/admin/leads/${lead.id}`)).status, 404);
  assert.equal((await request("/api/admin/logout", "POST", {})).status, 200);
  assert.equal((await request("/api/admin/leads")).status, 401);
  console.log("CRM HTTP aprobado: acceso, origen, consentimiento, validación, límites de cuerpo, idempotencia, seguimiento, CSV seguro, persistencia tras reinicio y cierre de sesión. Datos de prueba aislados.");
} finally {
  await stop();
  const contained = relative(storageRoot, directory);
  if (!contained || contained.startsWith("..") || !basename(directory).startsWith("integration-")) throw new Error("Ruta de limpieza inesperada.");
  await rm(directory, { recursive: true, force: true });
}
