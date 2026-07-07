import AdminLayout from "@/components/admin/AdminLayout";
import CareersManager from "@/components/admin/CareersManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CareersPage() {
  return (
    <AdminLayout>
      <CareersManager />
    </AdminLayout>
  );
}
