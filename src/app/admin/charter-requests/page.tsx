import AdminLayout from "@/components/admin/AdminLayout";
import { createServerClient } from "@/lib/supabase/server";

interface CharterRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  passengers: string;
  departure: string;
  destination: string;
  date: string;
  message: string;
  status: string;
  created_at: string;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CharterRequestsPage() {
  const supabase = await createServerClient();

  const { data: requests, error } = await supabase
    .from("charter_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-amber-400">Charter Requests</h1>
            <p className="text-slate-400 text-sm">Manage all charter booking requests</p>
          </div>
          <div className="text-sm text-slate-400">
            Total: {requests?.length || 0}
          </div>
        </div>

        {error ? (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg">
            Error loading requests: {error.message}
          </div>
        ) : requests?.length === 0 ? (
          <div className="bg-[#111827] border border-white/10 p-8 rounded-xl text-center text-slate-400">
            No charter requests received yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-[#111827] rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-[#0a0e1a] border-b border-white/10">
                <tr className="text-left text-slate-300">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Passengers</th>
                  <th className="p-3">Route</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {requests?.map((req) => (
                  <tr key={req.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3 text-white font-medium">{req.name}</td>
                    <td className="p-3 text-slate-300">{req.email}</td>
                    <td className="p-3 text-slate-300">{req.phone}</td>
                    <td className="p-3 text-slate-300">{req.passengers}</td>
                    <td className="p-3 text-slate-300">
                      {req.departure} → {req.destination}
                    </td>
                    <td className="p-3 text-slate-300">
                      {new Date(req.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          req.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : req.status === "contacted"
                            ? "bg-blue-500/20 text-blue-400"
                            : req.status === "booked"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {req.status || "pending"}
                      </span>
                    </td>
                    <td className="p-3 text-slate-400 text-xs">
                      {new Date(req.created_at).toLocaleString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
