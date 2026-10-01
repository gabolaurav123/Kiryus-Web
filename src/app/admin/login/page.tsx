import { AdminLogin } from "@/components/admin/AdminLogin";
import { isCrmConfigured } from "@/lib/crm/server";

export default function AdminLoginPage() {
  return <AdminLogin configured={isCrmConfigured()} />;
}
