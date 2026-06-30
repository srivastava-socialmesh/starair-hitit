
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface CMSPage {
  id: number;
  slug: string;
  title: string;
  content: string;
  category: string;
  is_active: boolean;
}

export default function CMSManager() {
  const [items, setItems] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CMSPage | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<CMSPage>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to load pages");
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
    if (!form.slug || !form.title || !form.content) {
      alert("Slug, Title, and Content are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-'),
        title: form.title,
        content: form.content,
        category: form.category || null,
        is_active: form.is_active !== undefined ? form.is_active : true,
      };

      if (editing) {
        const { error } = await supabase
          .from("cms_pages")
          .update(payload)
          .eq("id", editing.id);
        if (error) {
          console.error("Update error:", error);
          setError("Update failed: " + error.message);
          alert("Update failed: " + error.message);
          return;
        }
        setSuccess("Page updated successfully!");
      } else {
        const { error } = await supabase
          .from("cms_pages")
          .insert([payload]);
        if (error) {
          console.error("Insert error:", error);
          setError("Insert failed: " + error.message);
          alert("Insert failed: " + error.message);
          return;
        }
        setSuccess("Page added successfully!");
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
    if (!confirm("Delete this page?")) return;
    try {
      const { error } = await supabase
        .from("cms_pages")
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
        .from("cms_pages")
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
        <h2 className="text-2xl font-bold text-amber-400">CMS Pages</h2>
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
          <Plus size={18} /> Add Page
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Page</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Slug (e.g., fare-rules)"
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Title"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Category (optional)"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
            />
          </div>
          <div className="mt-4">
            <label className="text-slate-400 text-sm block mb-1">Content (HTML)</label>
            <textarea
              placeholder="Paste HTML content here..."
              value={form.content || ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
              rows={12}
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
        <div className="text-center text-slate-400 py-12">No pages yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Slug</th>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Category</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{p.slug}</td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">{p.category || "-"}</td>
                  <td className="p-3">
                    <button onClick={() => toggleActive(p.id, p.is_active)} className={`px-2 py-1 rounded text-xs font-bold ${p.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {p.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => { setEditing(p); setForm(p); setShowForm(true); }} className="text-blue-400 hover:text-blue-300">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300">
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
