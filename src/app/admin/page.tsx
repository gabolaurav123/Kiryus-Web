import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCrmSession } from "@/lib/crm/server";
import { CrmDashboard } from "@/components/admin/CrmDashboard";

export default async function AdminPage() {
  const session = getCrmSession((await cookies()).get("kiryus_admin_session")?.value);
  if (!session) redirect("/admin/login");
  return <CrmDashboard email={session.email} />;
}
