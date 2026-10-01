import "server-only";
import { isAbsolute, resolve } from "node:path";
import { NextResponse } from "next/server";
import { CrmError, CrmStore, SESSION_COOKIE, fingerprint, isPasswordHash } from "./core";
import { assertSameOrigin, readCookie } from "./http";

const PRIVATE_HEADERS = { "Cache-Control": "no-store, private", "X-Robots-Tag": "noindex, nofollow", "X-Content-Type-Options": "nosniff" };

function configuration() {
  const production = process.env.NODE_ENV === "production";
  const directory = process.env.CRM_DATA_DIR || (!production ? resolve(process.cwd(), ".crm-data") : "");
  const email = (process.env.CRM_ADMIN_EMAIL || "").trim().toLowerCase();
  const passwordHash = process.env.CRM_ADMIN_PASSWORD_HASH || "";
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL || (!production ? "http://localhost:3000" : "");
  if (!directory || !isAbsolute(directory) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !isPasswordHash(passwordHash)) return null;
  try {
    const url = new URL(publicUrl);
    if (production && url.protocol !== "https:") return null;
    if (!production && url.protocol !== "https:" && url.protocol !== "http:") return null;
    return { directory, email, passwordHash, origin: url.origin, credentialVersion: fingerprint(`${email}:${passwordHash}`) };
  } catch { return null; }
}

export function isCrmConfigured() { return configuration() !== null; }

export function getCrmConfiguration() {
  const config = configuration();
  if (!config) throw new CrmError(503, "El registro de consultas no está disponible. Puedes escribirnos por WhatsApp.");
  return config;
}

const globalCrm = globalThis as typeof globalThis & { __kiryusCrm?: { path: string; store: CrmStore } };
export function getCrmStore() {
  const config = getCrmConfiguration();
  const path = resolve(config.directory, "kiryus-crm.sqlite");
  if (!globalCrm.__kiryusCrm || globalCrm.__kiryusCrm.path !== path) {
    globalCrm.__kiryusCrm?.store.close();
    globalCrm.__kiryusCrm = { path, store: new CrmStore(path) };
  }
  return globalCrm.__kiryusCrm.store;
}

export function getCrmSession(token?: string) {
  const config = configuration();
  if (!config || !token) return null;
  return getCrmStore().getSession(token, config.credentialVersion);
}

export function requireAdmin(request: Request) {
  const session = getCrmSession(readCookie(request, SESSION_COOKIE));
  if (!session) throw new CrmError(401, "Inicia sesión para acceder al panel.");
  return session;
}

export function assertCrmOrigin(request: Request, required = true) {
  assertSameOrigin(request, getCrmConfiguration().origin, required);
}

export function requestRateKey(request: Request) {
  // Only opt in after confirming the host overwrites client-supplied proxy headers.
  if (process.env.CRM_TRUST_PROXY_HEADERS !== "true") return "shared";
  const value = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return value && value.length <= 64 && /^[a-fA-F0-9.:]+$/.test(value) ? value : "shared";
}

export function crmJson(data: unknown, status = 200) { return NextResponse.json(data, { status, headers: PRIVATE_HEADERS }); }
export function crmCsv(csv: string) {
  return new NextResponse(csv, { headers: { ...PRIVATE_HEADERS, "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="kiryus-consultas-${new Date().toISOString().slice(0, 10)}.csv"` } });
}
export function crmFailure(error: unknown) {
  if (error instanceof CrmError) return crmJson({ error: error.message, ...(error.errors ? { errors: error.errors } : {}) }, error.status);
  console.error("CRM request failed", error instanceof Error ? error.name : "UnknownError");
  return crmJson({ error: "No pudimos completar la operación. Vuelve a intentarlo." }, 503);
}

export function setSessionCookie(response: NextResponse, token: string, maxAge: number) {
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge });
}

export { SESSION_COOKIE, SESSION_SECONDS } from "./core";
