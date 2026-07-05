import AdminLayout from "@/components/admin/AdminLayout";
import NewsManager from "@/components/admin/NewsManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function NewsPage() {
  return (
    <AdminLayout>
      <NewsManager />
    </AdminLayout>
  );
}
