"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author: string;
  published_at: string;
  is_active: boolean;
}

export default function BlogsManager() {
  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Blog>>({});
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setItems(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async () => {
    if (!form.title || !form.content) return alert("Title and Content are required");
    if (editing) {
      await supabase
        .from("blogs")
        .update({ ...form, updated_at: new Date() })
        .eq("id", editing.id);
    } else {
      await supabase.from("blogs").insert([form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({});
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    fetchItems();
  };

  const toggleActive = async (id: number, current: boolean) => {
    await supabase.from("blogs").update({ is_active: !current }).eq("id", id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Blogs</h2>
        <button
          onClick={() => { setEditing(null); setForm({}); setShowForm(true); }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Blog
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Blog</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-slate-400 hover:text-white">
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
              placeholder="Image URL"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Author"
              value={form.author || ""}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Published At (YYYY-MM-DD)"
              type="date"
              value={form.published_at || ""}
              onChange={(e) => setForm({ ...form, published_at: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Excerpt (short summary)"
              value={form.excerpt || ""}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
            />
            <textarea
              placeholder="Content *"
              value={form.content || ""}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={5}
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
              <Save size={18} /> Save
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No blogs yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Author</th>
                <th className="p-3 text-amber-400">Published</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3 font-medium">{item.title}</td>
                  <td className="p-3">{item.author || "-"}</td>
                  <td className="p-3">{item.published_at ? new Date(item.published_at).toLocaleDateString() : "-"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(item.id, item.is_active)}
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        item.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => { setEditing(item); setForm(item); setShowForm(true); }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
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
