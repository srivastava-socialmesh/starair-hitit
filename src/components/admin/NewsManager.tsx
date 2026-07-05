
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  published_date: string;
  is_active: boolean;
}

export default function NewsManager() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<NewsItem>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_date", { ascending: false });
      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to load news");
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
    // Require title, content, and published_date
    if (!form.title || !form.content || !form.published_date) {
      alert("Title, Content, and Published Date are required");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Auto-generate slug from title if slug is empty
      const slug = form.slug && form.slug.trim() !== ""
        ? form.slug.trim().toLowerCase().replace(/\s+/g, '-')
        : form.title.trim().toLowerCase().replace(/\s+/g, '-');

      const payload = {
        slug: slug,
        title: form.title,
        excerpt: form.excerpt || null,
        content: form.content,
        image_url: form.image_url || null,
        published_date: form.published_date,
        is_active: form.is_active !== undefined ? form.is_active : true,
      };

      if (editing) {
        const { error } = await supabase
          .from("news")
          .update(payload)
          .eq("id", editing.id);
        if (error) {
          console.error("Update error:", error);
          setError("Update failed: " + error.message);
          alert("Update failed: " + error.message);
          return;
        }
        setSuccess("News updated successfully!");
      } else {
        const { error } = await supabase
          .from("news")
          .insert([payload]);
        if (error) {
          console.error("Insert error:", error);
          setError("Insert failed: " + error.message);
          alert("Insert failed: " + error.message);
          return;
        }
        setSuccess("News added successfully!");
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
    if (!confirm("Delete this news item?")) return;
    try {
      const { error } = await supabase
        .from("news")
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
        .from("news")
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
        <h2 className="text-2xl font-bold text-amber-400">News & Updates</h2>
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
          <Plus size={18} /> Add News
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} News</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Slug (auto-generated if left empty)"
              value={form.slug || ""}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Title *"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="date"
              placeholder="Published Date *"
              value={form.published_date || ""}
              onChange={(e) => setForm({ ...form, published_date: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Image URL (optional)"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              placeholder="Excerpt (short summary)"
              value={form.excerpt || ""}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={2}
            />
            <textarea
              placeholder="Content (HTML allowed) *"
              value={form.content || ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={8}
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
        <div className="text-center text-slate-400 py-12">No news items yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Published</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{new Date(item.published_date).toLocaleDateString()}</td>
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
