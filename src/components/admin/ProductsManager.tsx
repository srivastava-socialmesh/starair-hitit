"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  link: string;
  category: string;
  is_active: boolean;
}

export default function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});
  const supabase = createClient();

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async () => {
    if (!form.name || !form.image_url) return alert("Name and Image URL are required");
    if (editing) {
      await supabase
        .from("products")
        .update({ ...form, updated_at: new Date() })
        .eq("id", editing.id);
    } else {
      await supabase.from("products").insert([form]);
    }
    setShowForm(false);
    setEditing(null);
    setForm({});
    fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  const toggleActive = async (id: number, current: boolean) => {
    await supabase.from("products").update({ is_active: !current }).eq("id", id);
    fetchProducts();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-400">Products</h2>
        <button
          onClick={() => { setEditing(null); setForm({}); setShowForm(true); }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Product</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Name *"
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Image URL *"
              value={form.image_url || ""}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Price"
              type="number"
              step="0.01"
              value={form.price || ""}
              onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Category"
              value={form.category || ""}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
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
      ) : products.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No products yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Name</th>
                <th className="p-3 text-amber-400">Category</th>
                <th className="p-3 text-amber-400">Price</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">{p.category || "-"}</td>
                  <td className="p-3">${p.price?.toFixed(2) || "0.00"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleActive(p.id, p.is_active)}
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        p.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => { setEditing(p); setForm(p); setShowForm(true); }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
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
