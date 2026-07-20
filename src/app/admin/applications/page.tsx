import AdminLayout from "@/components/admin/AdminLayout";
import { createServerClient } from "@/lib/supabase/server";

interface Application {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resume_url: string;
  cover_letter?: string;
  status: string;
  applied_at: string;
  job_id?: string;
  career_id?: number;
}

export default async function ApplicationsPage() {
  const supabase = await createServerClient();

  const { data: applications, error } = await supabase
    .from("applications")
    .select("*")
    .order("applied_at", { ascending: false });

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all incoming job applications</p>
          </div>
          <div className="text-sm text-gray-500">
            Total: {applications?.length || 0}
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            Error loading applications: {error.message}
          </div>
        ) : applications?.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 p-8 rounded-lg text-center text-gray-500">
            No applications received yet.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-gray-600 font-semibold">Name</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold">Email</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold">Position</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold">Status</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold">Applied</th>
                  <th className="px-4 py-3 text-gray-600 font-semibold">Resume</th>
                </tr>
              </thead>
              <tbody>
                {applications?.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-900">{app.full_name}</td>
                    <td className="px-4 py-3 text-gray-600">{app.email}</td>
                    <td className="px-4 py-3 text-gray-600">{app.position}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status === "reviewed" ? "bg-green-100 text-green-700" :
                        app.status === "rejected" ? "bg-red-100 text-red-700" :
                        "bg-yellow-100 text-yellow-700"
                      }`}>
                        {app.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(app.applied_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {app.resume_url ? (
                        <a
                          href={app.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No file</span>
                      )}
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
