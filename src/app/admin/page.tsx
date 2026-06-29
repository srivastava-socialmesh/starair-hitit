import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-amber-400 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold text-amber-400">-</p>
          </div>
          <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20">
            <h3 className="text-lg font-semibold">Total Blogs</h3>
            <p className="text-3xl font-bold text-amber-400">-</p>
          </div>
          <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20">
            <h3 className="text-lg font-semibold">Media Coverage</h3>
            <p className="text-3xl font-bold text-amber-400">-</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
