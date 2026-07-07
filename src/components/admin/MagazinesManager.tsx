"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface Magazine {
  id: number;
  title: string;
  issue_month: string;      // required
  issue_date?: string;      // optional
  cover_image_url: string;
  pdf_url: string;
  description?: string;
  is_active: boolean;
}

export default function MagazinesManager() {
  const [items, setItems] = useState<Magazine[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Magazine | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Magazine>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("magazines")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to load magazines: " + error.message);
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
    // Required fields
    if (!form.title || !form.issue_month || !form.pdf_url) {
      alert("Title, Issue Month, and PDF URL are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: any = {
        title: form.title,
        issue_month: form.issue_month,
        pdf_url: form.pdf_url,
        cover_image_url: form.cover_image_url || null,
        description: form.description || null,
        is_active: form.is_active !== undefined ? form.is_active : true,
      };
      // If issue_date is provided and valid, include it
      if (form.issue_date) {
        payload.issue_date = form.issue_date;
      }

      if (editing) {
        const { error } = await supabase
          .from("magazines")
          .update(payload)
          .eq("id", editing.id);
        if (error) {
          console.error("Update error:", error);
          setError("Update failed: " + error.message);
          alert("Update failed: " + error.message);
          return;
        }
        setSuccess("Magazine updated successfully!");
      } else {
        const { error } = await supabase
          .from("magazines")
          .insert([payload]);
        if (error) {
          console.error("Insert error:", error);
          setError("Insert failed: " + error.message);
          alert("Insert failed: " + error.message);
          return;
        }
        setSuccess("Magazine added successfully!");
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
    if (!confirm("Delete this magazine?")) return;
    try {
      const { error } = await supabase
        .from("magazines")
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
        .from("magazines")
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Magazines</h2>
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
          <Plus size={18} /> Add Magazine
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Magazine</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Title *"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Issue Month * (e.g., January 2025)"
              value={form.issue_month || ""}
              onChange={(e) => setForm({ ...form, issue_month: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Issue Date (optional, YYYY-MM-DD)"
              type="date"
              value={form.issue_date || ""}
              onChange={(e) => setForm({ ...form, issue_date: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="PDF URL *"
              value={form.pdf_url || ""}
              onChange={(e) => setForm({ ...form, pdf_url: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Cover Image URL"
              value={form.cover_image_url || ""}
              onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              placeholder="Description (optional)"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={2}
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
        <div className="text-center text-slate-400 py-12">No magazines yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Issue Month</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.issue_month}</td>
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
