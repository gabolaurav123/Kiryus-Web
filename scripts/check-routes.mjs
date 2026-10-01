import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const port = 3101;
const base = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  {
    env: { ...process.env, PORT: String(port), NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  },
);
let output = "";
server.stdout.on("data", (chunk) => {
  output += chunk;
});
server.stderr.on("data", (chunk) => {
  output += chunk;
});

try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      ready = (await fetch(base)).ok;
    } catch {}
    if (ready) break;
    if (server.exitCode !== null)
      throw new Error(`Servidor detenido: ${output}`);
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  assert.ok(ready, `El servidor no arrancó: ${output}`);
  const routes = [
    "/",
    "/nosotros",
    "/aldeas",
    "/aldeas/argentina",
    "/aldeas/colombia",
    "/legado/espana",
    "/involucrate",
    "/contacto",
    "/blog",
    "/privacidad",
  ];
  const titles = new Set();
  for (const route of routes) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal(
      (html.match(/<h1[\s>]/g) || []).length,
      1,
      `${route}: un H1 en el HTML inicial`,
    );
    assert.match(html, /<html lang="es"/, `${route}: idioma`);
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${route}: título`);
    assert.ok(!titles.has(title), `${route}: título específico`);
    titles.add(title);
    assert.match(
      html,
      /name="robots" content="noindex, nofollow"/,
      `${route}: preview no indexable`,
    );
    assert.match(html, /rel="canonical"/, `${route}: canonical`);
  }
  for (const [from, to] of [
    ["/kiryus-argentina", "/aldeas/argentina"],
    ["/kiryus-colombia", "/aldeas/colombia"],
    ["/aldeas/espana", "/legado/espana"],
    ["/kiryus-espana", "/legado/espana"],
    ["/kiryus-espa%C3%B1a", "/legado/espana"],
  ]) {
    const response = await fetch(base + from, { redirect: "manual" });
    assert.equal(response.status, 308, from);
    assert.equal(response.headers.get("location"), to, from);
    assert.equal((await fetch(base + to)).status, 200, to);
  }
  const adminResponse = await fetch(base + "/admin", { redirect: "manual" });
  assert.equal(adminResponse.status, 307, "/admin: requiere sesión");
  assert.equal(
    new URL(adminResponse.headers.get("location"), base).pathname,
    "/admin/login",
    "/admin: redirección al acceso privado",
  );
  const loginResponse = await fetch(base + "/admin/login");
  assert.equal(loginResponse.status, 200, "/admin/login");
  const loginHtml = await loginResponse.text();
  assert.match(
    loginHtml,
    /name="robots" content="noindex, nofollow(?:,[^"]*)?"/,
    "/admin/login: acceso no indexable",
  );
  for (const route of [
    "/aldeas/inexistente",
    "/blog/inexistente",
    "/blog/borrador-editorial",
    "/ruta-inexistente",
  ]) {
    assert.equal((await fetch(base + route)).status, 404, route);
  }
  assert.match(
    await (await fetch(base + "/robots.txt")).text(),
    /Disallow: \//,
  );
  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  assert.ok(!sitemap.includes("<loc>"), "sitemap de preview vacío");
  for (const asset of [
    "/favicon.png",
    "/images/kiryus-logo.webp",
    "/images/social-cover.jpg",
  ]) {
    assert.equal((await fetch(base + asset)).status, 200, asset);
  }
  console.log(
    "Rutas: 10 páginas con HTML, títulos, H1 y SEO; 5 redirecciones; acceso administrativo protegido; 4 respuestas 404; robots, sitemap y recursos aprobados.",
  );
} finally {
  server.kill("SIGTERM");
}
