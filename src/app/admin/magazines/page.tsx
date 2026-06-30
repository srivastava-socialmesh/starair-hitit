import AdminLayout from "@/components/admin/AdminLayout";
import MagazinesManager from "@/components/admin/MagazinesManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MagazinesPage() {
  return (
    <AdminLayout>
      <MagazinesManager />
    </AdminLayout>
  );
}
