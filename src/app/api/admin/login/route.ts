import { CrmError, fingerprint, verifyPassword } from "@/lib/crm/core";
import { readCookie, readJson } from "@/lib/crm/http";
import { SESSION_COOKIE, SESSION_SECONDS, assertCrmOrigin, crmFailure, crmJson, getCrmConfiguration, getCrmStore, requestRateKey, setSessionCookie } from "@/lib/crm/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    assertCrmOrigin(request);
    const config = getCrmConfiguration(); const store = getCrmStore();
    store.consumeLimits([{ key: "login:all", maximum: 30, windowSeconds: 900 }, { key: `login:network:${requestRateKey(request)}`, maximum: 5, windowSeconds: 900 }]);
    const input = await readJson(request, 2048);
    if (!input || typeof input !== "object" || Array.isArray(input)) throw new CrmError(400, "Introduce tu correo y contraseña.");
    const data = input as Record<string, unknown>;
    if (typeof data.email !== "string" || data.email.length > 254 || typeof data.password !== "string" || data.password.length > 256) throw new CrmError(400, "Introduce tu correo y contraseña.");
    const validPassword = verifyPassword(data.password, config.passwordHash);
    if (fingerprint(data.email.trim().toLowerCase()) !== fingerprint(config.email) || !validPassword) throw new CrmError(401, "Correo o contraseña incorrectos.");
    store.deleteSession(readCookie(request, SESSION_COOKIE));
    const session = store.createSession(config.email, config.credentialVersion);
    const response = crmJson({ email: config.email, expiresAt: session.expiresAt });
    setSessionCookie(response, session.token, SESSION_SECONDS);
    return response;
  } catch (error) { return crmFailure(error); }
}
