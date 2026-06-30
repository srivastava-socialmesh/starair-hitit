import AdminLayout from "@/components/admin/AdminLayout";
import DealsManager from "@/components/admin/DealsManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function DealsPage() {
  return (
    <AdminLayout>
      <DealsManager />
    </AdminLayout>
  );
}
