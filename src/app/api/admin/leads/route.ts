import { parseLeadFilters } from "@/lib/crm/http";
import { crmFailure, crmJson, getCrmStore, requireAdmin } from "@/lib/crm/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try { requireAdmin(request); return crmJson(getCrmStore().listLeads(parseLeadFilters(request))); } catch (error) { return crmFailure(error); }
}
