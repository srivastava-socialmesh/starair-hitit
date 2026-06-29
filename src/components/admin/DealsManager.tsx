"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface Deal {
  id: number;
  title: string;
  description: string;
  image_url: string;
  discount_percent: number;
  valid_until: string;
  link: string;
  is_active: boolean;
}

export default function DealsManager() {
  const [items, setItems] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Deal | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Deal>>({});
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("deals")
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
    if (!form.title || !form.image_url || !form.discount_percent) {
      return alert("Title, Image URL, and Discount % are required");
    }
    if (editing) {
      await supabase
        .from("deals")
        .update({ ...form, updated_at: new Date() })
        .eq("id", editing.id);
    } else {
      await supabase.from("deals").insert([form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({});
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this deal?")) return;
    await supabase.from("deals").delete().eq("id", id);
    fetchItems();
  };

  const toggleActive = async (id: number, current: boolean) => {
    await supabase.from("deals").update({ is_active: !current }).eq("id", id);
    fetchItems();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Deals</h2>
        <button
          onClick={() => { setEditing(null); setForm({}); setShowForm(true); }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Deal
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Deal</h3>
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
              placeholder="Image URL *"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Discount % *"
              type="number"
              min="0"
              max="100"
              value={form.discount_percent || ""}
              onChange={(e) => setForm({ ...form, discount_percent: parseInt(e.target.value) })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Valid Until (YYYY-MM-DD)"
              type="date"
              value={form.valid_until || ""}
              onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Link (optional)"
              value={form.link || ""}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
            />
            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white col-span-full"
              rows={3}
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
        <div className="text-center text-slate-400 py-12">No deals yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Discount</th>
                <th className="p-3 text-amber-400">Valid Until</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.discount_percent}%</td>
                  <td className="p-3">{item.valid_until ? new Date(item.valid_until).toLocaleDateString() : "-"}</td>
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
