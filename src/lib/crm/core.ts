import { createHash, createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { DatabaseSync, type SQLInputValue } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { participationInterests, participationVillages, validateParticipation, type ParticipationFields } from "../participation";
import { leadStatuses, type CrmSession, type Lead, type LeadFilters, type LeadList, type LeadStatus, type LeadSubmission } from "./types";

export class CrmError extends Error {
  constructor(public status: number, message: string, public errors?: Record<string, string>) {
    super(message);
    this.name = "CrmError";
  }
}

export const SESSION_SECONDS = 8 * 60 * 60;
export const SESSION_COOKIE = "kiryus_admin_session";
const NAME_FIELDS = ["interest", "village", "firstName", "lastName", "email", "phone", "message", "arrival", "departure"] as const;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const HASH_PATTERN = /^scrypt\$16384\$8\$1\$[a-f0-9]{32}\$[a-f0-9]{128}$/;

export function isPasswordHash(value: string) {
  return HASH_PATTERN.test(value);
}

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  if (password.length < 14 || password.length > 256) throw new Error("La contraseña debe tener entre 14 y 256 caracteres.");
  if (!/^[a-f0-9]{32}$/.test(salt)) throw new Error("Salt inválido.");
  const key = scryptSync(password, Buffer.from(salt, "hex"), 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return `scrypt$16384$8$1$${salt}$${key.toString("hex")}`;
}

export function verifyPassword(password: string, encoded: string) {
  if (!isPasswordHash(encoded) || password.length > 256) return false;
  const parts = encoded.split("$");
  const actual = scryptSync(password, Buffer.from(parts[4], "hex"), 64, { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
  return timingSafeEqual(actual, Buffer.from(parts[5], "hex"));
}

export function fingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function parseLeadSubmission(input: unknown): LeadSubmission {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new CrmError(400, "Revisa los datos de tu consulta.");
  const data = input as Record<string, unknown>;
  if (NAME_FIELDS.some((field) => typeof data[field] !== "string" || (data[field] as string).length > 4000)) {
    throw new CrmError(400, "Revisa los campos de tu consulta.");
  }
  if (typeof data.website !== "string" || data.website.length > 200) throw new CrmError(400, "Revisa los datos de tu consulta.");
  if (typeof data.idempotencyKey !== "string" || !UUID_PATTERN.test(data.idempotencyKey)) throw new CrmError(400, "Vuelve a preparar tu consulta.");
  const result = validateParticipation(Object.fromEntries(NAME_FIELDS.map((field) => [field, data[field]])) as ParticipationFields);
  const errors: Record<string, string> = { ...result.errors };
  if (data.consent !== true) errors.consent = "Autoriza a Comunidad Kiryus a guardar tu consulta para responderte.";
  if (Object.keys(errors).length) throw new CrmError(400, "Revisa los campos indicados.", errors);
  return { ...result.values, consent: true, website: data.website, idempotencyKey: data.idempotencyKey.toLowerCase() };
}

type LeadRow = {
  id: string; created_at: string; updated_at: string; consent_at: string;
  status: LeadStatus; notes: string; fields: string;
};

function readLead(row: LeadRow): Lead {
  return { ...(JSON.parse(row.fields) as ParticipationFields), id: row.id, createdAt: row.created_at, updatedAt: row.updated_at, consentAt: row.consent_at, status: row.status, notes: row.notes };
}

function makeFilter(filters: LeadFilters) {
  const conditions: string[] = [];
  const values: SQLInputValue[] = [];
  if (filters.q?.trim()) {
    if (filters.q.length > 160) throw new CrmError(400, "La búsqueda es demasiado larga.");
    conditions.push("(lower(search_text) LIKE ? ESCAPE '\\')");
    values.push(`%${filters.q.trim().toLowerCase().replace(/[\\%_]/g, "\\$&")}%`);
  }
  if (filters.status) {
    if (!(leadStatuses as readonly string[]).includes(filters.status)) throw new CrmError(400, "Estado inválido.");
    conditions.push("status = ?"); values.push(filters.status);
  }
  if (filters.village) {
    if (!participationVillages.some((item) => item.value === filters.village)) throw new CrmError(400, "Aldea inválida.");
    conditions.push("village = ?"); values.push(filters.village);
  }
  if (filters.interest) {
    if (!participationInterests.some((item) => item.value === filters.interest)) throw new CrmError(400, "Interés inválido.");
    conditions.push("interest = ?"); values.push(filters.interest);
  }
  return { sql: conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "", values };
}

/** Server-only persistence primitive. Import types.ts, never this module, from client code. */
export class CrmStore {
  private db: DatabaseSync;
  private rateSalt: string;
  constructor(path: string) {
    if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
    this.db = new DatabaseSync(path, { timeout: 5000 });
    this.db.exec(`
      PRAGMA journal_mode=WAL;
      PRAGMA synchronous=FULL;
      PRAGMA foreign_keys=ON;
      PRAGMA secure_delete=ON;
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, consent_at TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'nuevo' CHECK(status IN ('nuevo','contactado','en_conversacion','cerrado')),
        notes TEXT NOT NULL DEFAULT '', fields TEXT NOT NULL, search_text TEXT NOT NULL,
        village TEXT NOT NULL, interest TEXT NOT NULL,
        idempotency_key TEXT UNIQUE NOT NULL, payload_hash TEXT NOT NULL
      ) STRICT;
      CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at DESC);
      CREATE INDEX IF NOT EXISTS leads_status ON leads(status);
      CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, email TEXT NOT NULL, credential_version TEXT NOT NULL, expires_at INTEGER NOT NULL) STRICT;
      CREATE TABLE IF NOT EXISTS rate_limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL) STRICT;
      CREATE TABLE IF NOT EXISTS crm_metadata (key TEXT PRIMARY KEY, value TEXT NOT NULL) STRICT;
      PRAGMA user_version=1;
    `);
    this.db.prepare("INSERT OR IGNORE INTO crm_metadata (key,value) VALUES ('rate_salt', ?)").run(randomBytes(32).toString("hex"));
    this.rateSalt = (this.db.prepare("SELECT value FROM crm_metadata WHERE key='rate_salt'").get() as { value: string }).value;
  }

  close() { this.db.close(); }

  private transaction<T>(operation: () => T): T {
    this.db.exec("BEGIN IMMEDIATE");
    try { const result = operation(); this.db.exec("COMMIT"); return result; }
    catch (error) { this.db.exec("ROLLBACK"); throw error; }
  }

  consumeLimits(limits: { key: string; maximum: number; windowSeconds: number }[], now = Date.now()) {
    this.transaction(() => {
      this.db.prepare("DELETE FROM rate_limits WHERE expires_at <= ?").run(now);
      const buckets = limits.map((limit) => ({ ...limit, bucket: createHmac("sha256", this.rateSalt).update(limit.key).digest("hex") }));
      for (const limit of buckets) {
        const row = this.db.prepare("SELECT count FROM rate_limits WHERE bucket=?").get(limit.bucket) as { count: number } | undefined;
        if (row && row.count >= limit.maximum) throw new CrmError(429, "Hay demasiados intentos. Espera y vuelve a intentarlo.");
      }
      for (const limit of buckets) {
        this.db.prepare("INSERT INTO rate_limits (bucket,count,expires_at) VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1").run(limit.bucket, now + limit.windowSeconds * 1000);
      }
    });
  }

  createLead(submission: LeadSubmission, now = new Date()) {
    const { idempotencyKey, consent, website, ...fields } = submission;
    void consent; void website;
    const payload = JSON.stringify(fields);
    const payloadHash = fingerprint(payload);
    return this.transaction(() => {
      const replay = this.getLeadReplay(submission);
      if (replay) return replay;
      const id = randomUUID(); const timestamp = now.toISOString();
      const searchText = `${fields.firstName} ${fields.lastName} ${fields.email} ${fields.phone} ${fields.message}`.toLowerCase();
      this.db.prepare("INSERT INTO leads (id,created_at,updated_at,consent_at,fields,search_text,village,interest,idempotency_key,payload_hash) VALUES (?,?,?,?,?,?,?,?,?,?)").run(id, timestamp, timestamp, timestamp, payload, searchText, fields.village, fields.interest, idempotencyKey, payloadHash);
      return { id, createdAt: timestamp, replayed: false };
    });
  }

  getLeadReplay(submission: LeadSubmission) {
    const { idempotencyKey, consent, website, ...fields } = submission;
    void consent; void website;
    const existing = this.db.prepare("SELECT id,created_at,payload_hash FROM leads WHERE idempotency_key=?").get(idempotencyKey) as { id: string; created_at: string; payload_hash: string } | undefined;
    if (!existing) return null;
    if (existing.payload_hash !== fingerprint(JSON.stringify(fields))) throw new CrmError(409, "La consulta cambió. Vuelve a prepararla para enviarla.");
    return { id: existing.id, createdAt: existing.created_at, replayed: true };
  }

  getLead(id: string): Lead | null {
    if (!UUID_PATTERN.test(id)) return null;
    const row = this.db.prepare("SELECT * FROM leads WHERE id=?").get(id) as LeadRow | undefined;
    return row ? readLead(row) : null;
  }

  listLeads(filters: LeadFilters = {}): LeadList {
    const filter = makeFilter(filters);
    const page = filters.page ?? 1;
    if (!Number.isInteger(page) || page < 1 || page > 1_000_000) throw new CrmError(400, "Página inválida.");
    const pageSize = 25;
    const rows = this.db.prepare(`SELECT * FROM leads${filter.sql} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`).all(...filter.values, pageSize, (page - 1) * pageSize) as LeadRow[];
    const total = (this.db.prepare(`SELECT count(*) AS count FROM leads${filter.sql}`).get(...filter.values) as { count: number }).count;
    const stats = { total: 0, nuevo: 0, contactado: 0, en_conversacion: 0, cerrado: 0 };
    for (const row of this.db.prepare("SELECT status,count(*) AS count FROM leads GROUP BY status").all() as { status: LeadStatus; count: number }[]) { stats[row.status] = row.count; stats.total += row.count; }
    return { leads: rows.map(readLead), total, page, pageSize, stats };
  }

  updateLead(id: string, patch: unknown, now = new Date()): Lead {
    if (!patch || typeof patch !== "object" || Array.isArray(patch)) throw new CrmError(400, "Datos inválidos.");
    const values = patch as Record<string, unknown>;
    if (Object.keys(values).some((key) => key !== "status" && key !== "notes") || !Object.keys(values).length) throw new CrmError(400, "Solo puedes actualizar el estado y las notas.");
    if (values.status !== undefined && (typeof values.status !== "string" || !(leadStatuses as readonly string[]).includes(values.status))) throw new CrmError(400, "Estado inválido.");
    if (values.notes !== undefined && (typeof values.notes !== "string" || values.notes.length > 8000)) throw new CrmError(400, "Las notas deben tener hasta 8000 caracteres.");
    return this.transaction(() => {
      const lead = this.getLead(id); if (!lead) throw new CrmError(404, "La consulta ya no existe.");
      this.db.prepare("UPDATE leads SET status=?,notes=?,updated_at=? WHERE id=?").run((values.status as string | undefined) ?? lead.status, typeof values.notes === "string" ? values.notes.replace(/\r\n?/g, "\n").trim() : lead.notes, now.toISOString(), id);
      return this.getLead(id)!;
    });
  }

  deleteLead(id: string) {
    if (!UUID_PATTERN.test(id)) throw new CrmError(404, "La consulta ya no existe.");
    const result = this.db.prepare("DELETE FROM leads WHERE id=?").run(id);
    if (Number(result.changes) === 0) throw new CrmError(404, "La consulta ya no existe.");
  }

  exportCsv(filters: LeadFilters = {}) {
    const filter = makeFilter(filters);
    const count = (this.db.prepare(`SELECT count(*) AS count FROM leads${filter.sql}`).get(...filter.values) as { count: number }).count;
    if (count > 10_000) throw new CrmError(400, "Reduce los filtros para exportar un máximo de 10000 consultas.");
    const rows = this.db.prepare(`SELECT * FROM leads${filter.sql} ORDER BY created_at DESC, id DESC`).all(...filter.values) as LeadRow[];
    const columns: (keyof Lead)[] = ["id", "createdAt", "updatedAt", "status", "firstName", "lastName", "email", "phone", "interest", "village", "arrival", "departure", "message", "notes", "consentAt"];
    return "\uFEFF" + [columns.join(","), ...rows.map((row) => { const lead = readLead(row); return columns.map((key) => escapeCsvCell(lead[key])).join(","); })].join("\r\n") + "\r\n";
  }

  createSession(email: string, credentialVersion: string, now = Date.now()) {
    this.db.prepare("DELETE FROM sessions WHERE expires_at <= ?").run(now);
    const token = randomBytes(32).toString("base64url"); const expiresAt = now + SESSION_SECONDS * 1000;
    this.db.prepare("INSERT INTO sessions (token_hash,email,credential_version,expires_at) VALUES (?,?,?,?)").run(fingerprint(token), email, credentialVersion, expiresAt);
    return { token, expiresAt: new Date(expiresAt).toISOString() };
  }

  getSession(token: string | undefined, credentialVersion: string, now = Date.now()): CrmSession | null {
    if (!token || !/^[a-zA-Z0-9_-]{43}$/.test(token)) return null;
    const row = this.db.prepare("SELECT email,expires_at,credential_version FROM sessions WHERE token_hash=?").get(fingerprint(token)) as { email: string; expires_at: number; credential_version: string } | undefined;
    if (!row || row.expires_at <= now || row.credential_version !== credentialVersion) return null;
    return { email: row.email, expiresAt: new Date(row.expires_at).toISOString() };
  }

  deleteSession(token: string | undefined) {
    if (token && /^[a-zA-Z0-9_-]{43}$/.test(token)) this.db.prepare("DELETE FROM sessions WHERE token_hash=?").run(fingerprint(token));
  }
}

export function escapeCsvCell(value: string) {
  // Quoting alone does not stop spreadsheet formula execution.
  const safe = /^[\s\uFEFF]*[=+@-]/u.test(value) || /^[\t\r\n]/.test(value) ? `'${value}` : value;
  return `"${safe.replace(/"/g, '""')}"`;
}
