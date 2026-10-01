import { readCookie } from "@/lib/crm/http";
import { SESSION_COOKIE, assertCrmOrigin, crmFailure, crmJson, getCrmStore, requireAdmin, setSessionCookie } from "@/lib/crm/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    assertCrmOrigin(request); requireAdmin(request);
    getCrmStore().deleteSession(readCookie(request, SESSION_COOKIE));
    const response = crmJson({ ok: true }); setSessionCookie(response, "", 0); return response;
  } catch (error) { return crmFailure(error); }
}
