import AdminLayout from "@/components/admin/AdminLayout";
import UsersManager from "@/components/admin/UsersManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function UsersPage() {
  return (
    <AdminLayout>
      <UsersManager />
    </AdminLayout>
  );
}
