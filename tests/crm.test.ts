import assert from "node:assert/strict";
import { after, test } from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, resolve } from "node:path";
import { randomUUID } from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { CrmError, CrmStore, SESSION_SECONDS, escapeCsvCell, fingerprint, hashPassword, isPasswordHash, parseLeadSubmission, verifyPassword } from "../src/lib/crm/core";
import { assertSameOrigin, parseLeadFilters, readCookie, readJson } from "../src/lib/crm/http";
import type { LeadSubmission } from "../src/lib/crm/types";

const directory = mkdtempSync(resolve(tmpdir(), "kiryus-crm-test-"));
after(() => {
  const target = resolve(directory);
  assert.equal(dirname(target), resolve(tmpdir()));
  assert.ok(basename(target).startsWith("kiryus-crm-test-"));
  rmSync(target, { recursive: true, force: true });
});

function submission(overrides: Record<string, unknown> = {}): LeadSubmission {
  return parseLeadSubmission({ interest: "visita", village: "colombia", firstName: "María", lastName: "O’Connor", email: "maria@example.org", phone: "+573105550001", message: "Me gustaría conocer la comunidad y sus proyectos.", arrival: "", departure: "", consent: true, website: "", idempotencyKey: randomUUID(), ...overrides });
}
function isCrmStatus(status: number) { return (error: unknown) => error instanceof CrmError && error.status === status; }

test("CRM persists complete submissions and consent across process connections", () => {
  const path = resolve(directory, "persistent.sqlite");
  const first = new CrmStore(path); const input = submission();
  const created = first.createLead(input, new Date("2026-10-01T12:00:00Z")); first.close();
  const reopened = new CrmStore(path); const lead = reopened.getLead(created.id)!;
  assert.equal(lead.firstName, "María"); assert.equal(lead.email, input.email);
  assert.equal(lead.consentAt, "2026-10-01T12:00:00.000Z"); assert.equal(lead.status, "nuevo");
  assert.equal(reopened.listLeads().total, 1); reopened.close();
});

test("replayed submission is idempotent and changed payload conflicts", () => {
  const store = new CrmStore(":memory:"); const input = submission();
  const created = store.createLead(input); const replay = store.createLead(input);
  assert.equal(replay.id, created.id); assert.equal(replay.replayed, true); assert.equal(store.listLeads().total, 1);
  for (let attempt = 0; attempt < 8; attempt++) assert.equal(store.getLeadReplay(input)?.id, created.id);
  assert.throws(() => store.createLead({ ...input, message: "Ahora quiero enviar un mensaje diferente." }), isCrmStatus(409));
  store.close();
});

test("submission requires explicit consent, valid participation and opaque UUID", () => {
  assert.throws(() => submission({ consent: false }), (error: unknown) => error instanceof CrmError && error.errors?.consent !== undefined);
  assert.throws(() => submission({ email: "bad", interest: "spam", village: "inventada" }), isCrmStatus(400));
  assert.throws(() => submission({ idempotencyKey: "sequential-1" }), isCrmStatus(400));
  assert.throws(() => submission({ firstName: {} }), isCrmStatus(400));
  assert.throws(() => submission({ message: "x".repeat(4001) }), isCrmStatus(400));
  assert.throws(() => parseLeadSubmission([]), isCrmStatus(400));
  assert.equal(submission({ email: "maria@EXAMPLE.ORG" }).email, "maria@example.org");
});

test("statuses, notes, search filters, pagination and private deletion work", () => {
  const store = new CrmStore(":memory:"); const first = store.createLead(submission());
  store.createLead(submission({ email: "juan@example.org", village: "argentina", firstName: "Juan" }));
  const patched = store.updateLead(first.id, { status: "contactado", notes: "Primer contacto realizado.\r\nEsperando respuesta." });
  assert.equal(patched.status, "contactado"); assert.match(patched.notes, /\nEsperando/);
  assert.equal(store.listLeads({ q: "O’Connor", status: "contactado", village: "colombia" }).total, 1);
  assert.equal(store.listLeads({ village: "argentina" }).leads[0].firstName, "Juan");
  assert.equal(store.listLeads({ q: "%" }).total, 0);
  assert.equal(store.listLeads().stats.contactado, 1);
  assert.throws(() => store.updateLead(first.id, { status: "admin" }), isCrmStatus(400));
  assert.throws(() => store.updateLead(first.id, { notes: "x".repeat(8001) }), isCrmStatus(400));
  assert.throws(() => store.updateLead(first.id, { email: "replace@example.org" }), isCrmStatus(400));
  assert.throws(() => store.listLeads({ status: "'; DROP TABLE leads; --" }), isCrmStatus(400));
  assert.throws(() => store.listLeads({ page: 0 }), isCrmStatus(400));
  assert.throws(() => store.listLeads({ page: NaN }), isCrmStatus(400));
  store.deleteLead(first.id); assert.equal(store.getLead(first.id), null);
  assert.equal(store.listLeads().total, 1); assert.throws(() => store.deleteLead(first.id), isCrmStatus(404)); store.close();
});

test("CSV protects spreadsheet formulas, quotes, newlines and preserves accents", () => {
  for (const value of ["=SUM(1,1)", "+123", "-1+1", "@SUM(A1)", "   =1", "\tformula", "\rformula", "\nformula"]) assert.ok(escapeCsvCell(value).startsWith('"\''));
  assert.equal(escapeCsvCell('María, "Kiryus"'), '"María, ""Kiryus"""');
  const store = new CrmStore(":memory:");
  store.createLead(submission({ message: '=HYPERLINK("https://example.org","sorpresa")' }));
  const csv = store.exportCsv(); assert.ok(csv.startsWith("\uFEFFid,")); assert.ok(csv.includes('"\'=HYPERLINK')); assert.ok(csv.includes("María"));
  assert.equal(store.exportCsv({ village: "argentina" }).split("\r\n").length, 2); store.close();
});

test("persistent rate limits combine buckets and expire without storing raw keys", () => {
  const path = resolve(directory, "rate.sqlite"); const store = new CrmStore(path);
  const limits = [{ key: "network:192.0.2.10", maximum: 2, windowSeconds: 60 }, { key: "email:maria@example.org", maximum: 1, windowSeconds: 60 }];
  store.consumeLimits(limits, 1000); store.close();
  const reopened = new CrmStore(path); assert.throws(() => reopened.consumeLimits(limits, 2000), isCrmStatus(429));
  reopened.consumeLimits(limits, 61_001);
  const db = new DatabaseSync(path); const rows = db.prepare("SELECT bucket FROM rate_limits").all() as { bucket: string }[];
  assert.equal(rows.length, 2); assert.ok(rows.every((row) => /^[a-f0-9]{64}$/.test(row.bucket))); db.close(); reopened.close();
});

test("passwords use salted scrypt, reject invalid formats and verify safely", () => {
  const password = "Una-clave-larga-y-unica-2026"; const first = hashPassword(password); const second = hashPassword(password);
  assert.ok(isPasswordHash(first)); assert.notEqual(first, second); assert.ok(verifyPassword(password, first));
  assert.equal(verifyPassword("incorrecta", first), false); assert.equal(verifyPassword(password, "plaintext"), false);
  assert.equal(verifyPassword("x".repeat(257), first), false); assert.throws(() => hashPassword("corta"));
});

test("sessions store token hashes, expire, revoke on credential rotation and logout", () => {
  const path = resolve(directory, "session.sqlite"); const store = new CrmStore(path); const version = fingerprint("credential-one");
  const session = store.createSession("admin@example.org", version, 1000);
  assert.equal(store.getSession(session.token, version, 2000)?.email, "admin@example.org");
  assert.equal(store.getSession(session.token, "changed", 2000), null);
  assert.equal(store.getSession(session.token, version, 1000 + SESSION_SECONDS * 1000), null);
  assert.equal(store.getSession("invalid", version, 2000), null);
  const db = new DatabaseSync(path); const row = db.prepare("SELECT token_hash FROM sessions").get() as { token_hash: string };
  assert.notEqual(row.token_hash, session.token); assert.equal(row.token_hash, fingerprint(session.token)); db.close();
  store.deleteSession(session.token); assert.equal(store.getSession(session.token, version, 2000), null); store.close();
});

test("CSRF rejects absent and foreign origins and cross-site fetches", () => {
  const request = (headers: Record<string, string>) => new Request("https://kiryus-web.seenode.app/api/leads", { method: "POST", headers });
  assert.doesNotThrow(() => assertSameOrigin(request({ origin: "https://kiryus-web.seenode.app" }), "https://kiryus-web.seenode.app"));
  assert.throws(() => assertSameOrigin(request({}), "https://kiryus-web.seenode.app"), isCrmStatus(403));
  assert.throws(() => assertSameOrigin(request({ origin: "https://evil.example" }), "https://kiryus-web.seenode.app"), isCrmStatus(403));
  assert.throws(() => assertSameOrigin(request({ origin: "https://kiryus-web.seenode.app", "sec-fetch-site": "cross-site" }), "https://kiryus-web.seenode.app"), isCrmStatus(403));
  assert.doesNotThrow(() => assertSameOrigin(request({}), "https://kiryus-web.seenode.app", false));
});

test("JSON body enforces content type and declared or streamed size bounds", async () => {
  const request = (body: string, headers: Record<string, string> = { "content-type": "application/json" }) => new Request("https://example.org", { method: "POST", headers, body });
  assert.deepEqual(await readJson(request('{"test":true}')), { test: true });
  await assert.rejects(readJson(request("{}", { "content-type": "text/plain" })), isCrmStatus(415));
  await assert.rejects(readJson(request("{")), isCrmStatus(400));
  await assert.rejects(readJson(request("{}", { "content-type": "application/json", "content-length": "999999" })), isCrmStatus(413));
  await assert.rejects(readJson(request('"' + "x".repeat(100) + '"'), 20), isCrmStatus(413));
});

test("cookie reader and filter parser accept only exact cookie and explicit filters", () => {
  const request = new Request("https://example.org/api/admin/leads?q=Maria&status=nuevo&page=2", { headers: { cookie: "other_session=wrong; kiryus_admin_session=right" } });
  assert.equal(readCookie(request, "kiryus_admin_session"), "right"); assert.equal(readCookie(request, "session"), undefined);
  assert.deepEqual(parseLeadFilters(request), { q: "Maria", status: "nuevo", page: 2, village: undefined, interest: undefined });
});
