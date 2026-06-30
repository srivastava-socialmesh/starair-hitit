import AdminLayout from "@/components/admin/AdminLayout";
import MediaManager from "@/components/admin/MediaManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function MediaPage() {
  return (
    <AdminLayout>
      <MediaManager />
    </AdminLayout>
  );
}
