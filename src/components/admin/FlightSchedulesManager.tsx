"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface FlightSchedule {
  id: number;
  aircraft: string;
  flight_no: string;
  origin: string;
  origin_code: string;
  dep_time: string;
  destination: string;
  dest_code: string;
  arr_time: string;
  sch_days: string;
  flight_type: string;
  transit_loc: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  display_order: number;
}

export default function FlightSchedulesManager() {
  const [schedules, setSchedules] = useState<FlightSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FlightSchedule | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<FlightSchedule>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("flight_schedules")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setSchedules(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSave = async () => {
    if (!form.flight_no || !form.origin || !form.destination || !form.dep_time || !form.arr_time) {
      alert("Flight No, Origin, Destination, Dep Time, and Arr Time are required.");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        aircraft: form.aircraft || "",
        flight_no: form.flight_no,
        origin: form.origin,
        origin_code: form.origin_code || "",
        dep_time: form.dep_time,
        destination: form.destination,
        dest_code: form.dest_code || "",
        arr_time: form.arr_time,
        sch_days: form.sch_days || "",
        flight_type: form.flight_type || "Direct",
        transit_loc: form.transit_loc || "",
        start_date: form.start_date || new Date().toISOString().split("T")[0],
        end_date: form.end_date || new Date().toISOString().split("T")[0],
        is_active: form.is_active !== undefined ? form.is_active : true,
        display_order: form.display_order || 0,
      };

      if (editing) {
        const { error } = await supabase
          .from("flight_schedules")
          .update(payload)
          .eq("id", editing.id);
        if (error) throw error;
        setSuccess("Schedule updated successfully!");
      } else {
        const { error } = await supabase
          .from("flight_schedules")
          .insert([payload]);
        if (error) throw error;
        setSuccess("Schedule added successfully!");
      }

      setShowForm(false);
      setEditing(null);
      setForm({});
      fetchSchedules();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this schedule?")) return;
    try {
      const { error } = await supabase
        .from("flight_schedules")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchSchedules();
      setSuccess("Schedule deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleActive = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase
        .from("flight_schedules")
        .update({ is_active: !current })
        .eq("id", id);
      if (error) throw error;
      fetchSchedules();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Flight Schedules</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ is_active: true, display_order: 0 });
            setShowForm(true);
            setError(null);
            setSuccess(null);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Schedule
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {/* Form */}
      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{editing ? "Edit" : "New"} Schedule</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              placeholder="Aircraft (e.g., ERJ 175)"
              value={form.aircraft || ""}
              onChange={(e) => setForm({ ...form, aircraft: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Flight No (e.g., S5125)"
              value={form.flight_no || ""}
              onChange={(e) => setForm({ ...form, flight_no: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Origin (e.g., Ahmedabad)"
              value={form.origin || ""}
              onChange={(e) => setForm({ ...form, origin: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Origin Code (e.g., AMD)"
              value={form.origin_code || ""}
              onChange={(e) => setForm({ ...form, origin_code: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Dep Time (e.g., 11:20)"
              value={form.dep_time || ""}
              onChange={(e) => setForm({ ...form, dep_time: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Destination (e.g., Kishangarh [Ajmer])"
              value={form.destination || ""}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Dest Code (e.g., KQH)"
              value={form.dest_code || ""}
              onChange={(e) => setForm({ ...form, dest_code: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Arr Time (e.g., 12:25)"
              value={form.arr_time || ""}
              onChange={(e) => setForm({ ...form, arr_time: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Sch Days (e.g., Fr,Su)"
              value={form.sch_days || ""}
              onChange={(e) => setForm({ ...form, sch_days: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Flight Type (e.g., Direct)"
              value={form.flight_type || "Direct"}
              onChange={(e) => setForm({ ...form, flight_type: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Transit Loc (optional)"
              value={form.transit_loc || ""}
              onChange={(e) => setForm({ ...form, transit_loc: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={form.start_date || ""}
              onChange={(e) => setForm({ ...form, start_date: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="date"
              placeholder="End Date"
              value={form.end_date || ""}
              onChange={(e) => setForm({ ...form, end_date: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="number"
              placeholder="Display Order"
              value={form.display_order ?? 0}
              onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
              <Save size={18} /> {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); }} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading...</div>
      ) : schedules.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No schedules added yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1a1f2e] text-slate-300 border-b border-white/10">
              <tr>
                <th className="p-3 text-left">Flight</th>
                <th className="p-3 text-left">Origin</th>
                <th className="p-3 text-left">Destination</th>
                <th className="p-3 text-left">Dep</th>
                <th className="p-3 text-left">Arr</th>
                <th className="p-3 text-left">Days</th>
                <th className="p-3 text-left">Active</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((s) => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 text-white font-medium">{s.flight_no}</td>
                  <td className="p-3 text-slate-300">{s.origin}</td>
                  <td className="p-3 text-slate-300">{s.destination}</td>
                  <td className="p-3 text-slate-300">{s.dep_time}</td>
                  <td className="p-3 text-slate-300">{s.arr_time}</td>
                  <td className="p-3 text-slate-300">{s.sch_days}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(s.id, s.is_active)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {s.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => { setEditing(s); setForm(s); setShowForm(true); }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
