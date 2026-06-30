import AdminLayout from "@/components/admin/AdminLayout";
import CMSManager from "@/components/admin/CMSManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CMSPage() {
  return (
    <AdminLayout>
      <CMSManager />
    </AdminLayout>
  );
}
