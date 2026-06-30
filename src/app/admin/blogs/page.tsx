import AdminLayout from "@/components/admin/AdminLayout";
import BlogsManager from "@/components/admin/BlogsManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function BlogsPage() {
  return (
    <AdminLayout>
      <BlogsManager />
    </AdminLayout>
  );
}
