import { CrmError } from "@/lib/crm/core";
import { readJson } from "@/lib/crm/http";
import { assertCrmOrigin, crmFailure, crmJson, getCrmStore, requireAdmin } from "@/lib/crm/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try {
    requireAdmin(request); const { id } = await context.params; const lead = getCrmStore().getLead(id);
    if (!lead) throw new CrmError(404, "La consulta ya no existe.");
    return crmJson({ lead });
  } catch (error) { return crmFailure(error); }
}
export async function PATCH(request: Request, context: Context) {
  try {
    assertCrmOrigin(request); requireAdmin(request); const { id } = await context.params;
    return crmJson({ lead: getCrmStore().updateLead(id, await readJson(request, 12_288)) });
  } catch (error) { return crmFailure(error); }
}
export async function DELETE(request: Request, context: Context) {
  try {
    assertCrmOrigin(request); requireAdmin(request); const { id } = await context.params;
    getCrmStore().deleteLead(id); return crmJson({ ok: true });
  } catch (error) { return crmFailure(error); }
}
