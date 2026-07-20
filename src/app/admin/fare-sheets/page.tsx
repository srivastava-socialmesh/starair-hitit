import AdminLayout from "@/components/admin/AdminLayout";
import FareSheetsManager from "@/components/admin/FareSheetManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FareSheetsPage() {
  return (
    <AdminLayout>
      <FareSheetsManager />
    </AdminLayout>
  );
}
