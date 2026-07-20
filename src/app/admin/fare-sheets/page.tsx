import AdminLayout from "@/components/admin/AdminLayout";
import FareSheetManager from "@/components/admin/FareSheetManager";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FareSheetPage() {
  return (
    <AdminLayout>
      <FareSheetsManager />
    </AdminLayout>
  );
}
