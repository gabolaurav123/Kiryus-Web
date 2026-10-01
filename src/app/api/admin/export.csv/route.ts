import { parseLeadFilters } from "@/lib/crm/http";
import { assertCrmOrigin, crmCsv, crmFailure, getCrmStore, requireAdmin } from "@/lib/crm/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    requireAdmin(request); assertCrmOrigin(request, false);
    return crmCsv(getCrmStore().exportCsv(parseLeadFilters(request)));
  } catch (error) { return crmFailure(error); }
}
