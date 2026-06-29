"use client";
import { useState, useEffect } from "react";

interface Deal {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  discount_percent: number;
  valid_until: string;
  is_active: boolean;
}

export default function DealsManager() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [form, setForm] = useState<Partial<Deal>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDeals = async () => {
    const res = await fetch("/api/deals");
    const data = await res.json();
    setDeals(data);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const url = editingId ? `/api/deals?id=${editingId}` : "/api/deals";
    const method = editingId ? "PUT" : "POST";
    const payload = editingId ? { ...form, id: editingId } : form;
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin123",
      },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      fetchDeals();
      setForm({});
      setEditingId(null);
    } else {
      alert("Error saving");
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this deal?")) return;
    const res = await fetch(`/api/deals?id=${id}`, {
      method: "DELETE",
      headers: {
        "x-admin-secret": process.env.NEXT_PUBLIC_ADMIN_SECRET || "admin123",
      },
    });
    if (res.ok) fetchDeals();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Deals</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 bg-white/5 p-4 rounded-xl">
        <input
          type="text"
          placeholder="Title"
          value={form.title || ""}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description || ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image_url || ""}
          onChange={(e) => setForm({ ...form, image_url: e.target.value })}
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
          required
        />
        <input
          type="text"
          placeholder="Link (optional)"
          value={form.link || ""}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={form.discount_percent || ""}
          onChange={(e) => setForm({ ...form, discount_percent: parseInt(e.target.value) })}
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="date"
          placeholder="Valid Until"
          value={form.valid_until || ""}
          onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
          className="bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white"
        />
        <div className="flex items-center gap-4">
          <label>
            <input
              type="checkbox"
              checked={form.is_active ?? true}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
            /> Active
          </label>
        </div>
        <button type="submit" disabled={loading} className="bg-amber-500 text-white font-bold py-2 rounded-lg hover:bg-amber-600 transition disabled:opacity-50">
          {editingId ? "Update" : "Create"} Deal
        </button>
        {editingId && (
          <button type="button" onClick={() => { setForm({}); setEditingId(null); }} className="bg-gray-600 text-white font-bold py-2 rounded-lg hover:bg-gray-700 transition">
            Cancel
          </button>
        )}
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center">
            <div>
              <h3 className="font-bold">{deal.title}</h3>
              <p className="text-sm text-slate-400">{deal.description}</p>
              {deal.discount_percent && <span className="text-amber-400 text-sm">{deal.discount_percent}% off</span>}
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setForm(deal); setEditingId(deal.id); }} className="text-amber-400 hover:text-amber-300 text-sm">Edit</button>
              <button onClick={() => handleDelete(deal.id)} className="text-red-400 hover:text-red-300 text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
