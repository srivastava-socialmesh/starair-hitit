import AdminLayout from "@/components/admin/AdminLayout";
import ProductsManager from "@/components/admin/ProductsManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function ProductsPage() {
  return (
    <AdminLayout>
      <ProductsManager />
    </AdminLayout>
  );
}
