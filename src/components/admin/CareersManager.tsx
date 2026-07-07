"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface Career {
  id: number;
  job_id: string;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string;
  responsibilities: string;
  posted_date: string;
  application_link: string;
  is_active: boolean;
}

export default function CareersManager() {
  const [items, setItems] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Career | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Career>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("posted_date", { ascending: false });
      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to load jobs: " + error.message);
      } else {
        setItems(data || []);
        setError(null);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.department || !form.location || !form.employment_type || !form.description) {
      alert("Title, Department, Location, Employment Type, and Description are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // If job_id not provided, generate one based on title (slug) or use existing
      let jobId = form.job_id?.trim();
      if (!jobId) {
        // Generate from title: e.g., "Software Engineer" -> "SE-001"
        const prefix = form.title.split(' ').map(w => w[0]).join('').toUpperCase().substring(0, 4);
        // We'll let the database handle uniqueness, but we'll append a timestamp or random
        jobId = prefix + '-' + Date.now().toString().slice(-4);
      }

      const payload = {
        job_id: jobId,
        title: form.title,
        department: form.department,
        location: form.location,
        employment_type: form.employment_type,
        description: form.description,
        requirements: form.requirements || null,
        responsibilities: form.responsibilities || null,
        posted_date: form.posted_date || new Date().toISOString().split('T')[0],
        application_link: form.application_link || null,
        is_active: form.is_active !== undefined ? form.is_active : true,
      };

      if (editing) {
        const { error } = await supabase
          .from("careers")
          .update(payload)
          .eq("id", editing.id);
        if (error) {
          console.error("Update error:", error);
          setError("Update failed: " + error.message);
          alert("Update failed: " + error.message);
          return;
        }
        setSuccess("Job updated successfully!");
      } else {
        const { error } = await supabase
          .from("careers")
          .insert([payload]);
        if (error) {
          console.error("Insert error:", error);
          setError("Insert failed: " + error.message);
          alert("Insert failed: " + error.message);
          return;
        }
        setSuccess("Job added successfully!");
      }

      setShowForm(false);
      setEditing(null);
      setForm({});
      fetchItems();
    } catch (err) {
      console.error("Save error:", err);
      alert("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this job?")) return;
    try {
      const { error } = await supabase
        .from("careers")
        .delete()
        .eq("id", id);
      if (error) {
        console.error("Delete error:", error);
        alert("Delete failed: " + error.message);
        return;
      }
      fetchItems();
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    }
  };

  const toggleActive = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase
        .from("careers")
        .update({ is_active: !current })
        .eq("id", id);
      if (error) {
        console.error("Toggle error:", error);
        alert("Toggle failed: " + error.message);
        return;
      }
      fetchItems();
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const employmentTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Careers / Jobs</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ is_active: true });
            setShowForm(true);
            setError(null);
            setSuccess(null);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Job
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Job</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Job ID (e.g., SA-001, leave blank to auto-generate)"
              value={form.job_id || ""}
              onChange={(e) => setForm({ ...form, job_id: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Job Title *"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Department *"
              value={form.department || ""}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Location *"
              value={form.location || ""}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <select
              value={form.employment_type || ""}
              onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Employment Type *</option>
              {employmentTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              placeholder="Posted Date (YYYY-MM-DD)"
              type="date"
              value={form.posted_date || ""}
              onChange={(e) => setForm({ ...form, posted_date: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Application Link (optional)"
              value={form.application_link || ""}
              onChange={(e) => setForm({ ...form, application_link: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              placeholder="Description *"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={4}
            />
            <textarea
              placeholder="Requirements"
              value={form.requirements || ""}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={3}
            />
            <textarea
              placeholder="Responsibilities"
              value={form.responsibilities || ""}
              onChange={(e) => setForm({ ...form, responsibilities: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={3}
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

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No jobs yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Job ID</th>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Department</th>
                <th className="p-3 text-amber-400">Location</th>
                <th className="p-3 text-amber-400">Type</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 font-mono text-xs">{item.job_id}</td>
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3">{item.department}</td>
                  <td className="p-3">{item.location}</td>
                  <td className="p-3">{item.employment_type}</td>
                  <td className="p-3">
                    <button onClick={() => toggleActive(item.id, item.is_active)} className={`px-2 py-1 rounded text-xs font-bold ${item.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {item.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => { setEditing(item); setForm(item); setShowForm(true); }} className="text-blue-400 hover:text-blue-300">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
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
