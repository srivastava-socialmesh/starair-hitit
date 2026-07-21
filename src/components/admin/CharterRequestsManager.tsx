"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Eye, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface CharterRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  passengers: string;
  departure: string;
  destination: string;
  date: string;
  message: string | null;
  status: string;
  created_at: string;
}

export default function CharterRequestsManager() {
  const [requests, setRequests] = useState<CharterRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<CharterRequest | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("charter_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from("charter_requests")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      setSuccess(`Status updated to ${status}`);
      setTimeout(() => setSuccess(null), 3000);
      fetchRequests();
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest({ ...selectedRequest, status });
      }
    } catch (err: any) {
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      contacted: "bg-blue-100 text-blue-700",
      confirmed: "bg-green-100 text-green-700",
      completed: "bg-purple-100 text-purple-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amber-400">Charter Requests</h2>
          <p className="text-slate-400 text-sm">Manage charter inquiries from customers</p>
        </div>
        <button
          onClick={fetchRequests}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No charter requests yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1f2e] text-slate-300 border-b border-white/10">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Passengers</th>
                <th className="p-3 text-left">From → To</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 text-white font-medium">{req.name}</td>
                  <td className="p-3 text-slate-300">{req.email}</td>
                  <td className="p-3 text-slate-300">{req.passengers}</td>
                  <td className="p-3 text-slate-300">{req.departure} → {req.destination}</td>
                  <td className="p-3 text-slate-300">{new Date(req.date).toLocaleDateString()}</td>
                  <td className="p-3">{getStatusBadge(req.status)}</td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedRequest(req);
                        setShowDetail(true);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "contacted")}
                      className="text-blue-400 hover:text-blue-300"
                      title="Mark as Contacted"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      onClick={() => updateStatus(req.id, "cancelled")}
                      className="text-red-400 hover:text-red-300"
                      title="Mark as Cancelled"
                    >
                      <XCircle size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedRequest && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1f2e] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Charter Request Details</h3>
              <button
                onClick={() => setShowDetail(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-slate-400">Name:</div>
                <div className="text-white">{selectedRequest.name}</div>
                <div className="text-slate-400">Email:</div>
                <div className="text-white">{selectedRequest.email}</div>
                <div className="text-slate-400">Phone:</div>
                <div className="text-white">{selectedRequest.phone}</div>
                <div className="text-slate-400">Passengers:</div>
                <div className="text-white">{selectedRequest.passengers}</div>
                <div className="text-slate-400">Departure:</div>
                <div className="text-white">{selectedRequest.departure}</div>
                <div className="text-slate-400">Destination:</div>
                <div className="text-white">{selectedRequest.destination}</div>
                <div className="text-slate-400">Travel Date:</div>
                <div className="text-white">{new Date(selectedRequest.date).toLocaleDateString()}</div>
                <div className="text-slate-400">Status:</div>
                <div className="text-white">{getStatusBadge(selectedRequest.status)}</div>
                <div className="text-slate-400">Submitted:</div>
                <div className="text-white">{new Date(selectedRequest.created_at).toLocaleString()}</div>
              </div>
              {selectedRequest.message && (
                <div>
                  <div className="text-slate-400">Message:</div>
                  <div className="text-white bg-black/30 p-3 rounded-lg mt-1 whitespace-pre-wrap">
                    {selectedRequest.message}
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => updateStatus(selectedRequest.id, "contacted")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Mark Contacted
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest.id, "confirmed")}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest.id, "cancelled")}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
