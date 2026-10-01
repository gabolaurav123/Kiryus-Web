import { crmFailure, crmJson, requireAdmin } from "@/lib/crm/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try { return crmJson(requireAdmin(request)); } catch (error) { return crmFailure(error); }
}
