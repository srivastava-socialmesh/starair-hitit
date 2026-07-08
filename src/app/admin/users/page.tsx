"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface User {
  id: string;
  email: string;
  role: string | null;
  is_active: boolean;
  created_at: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async () => {
    if (!form.email || !form.password || !form.role) {
      alert("Email, Password, and Role are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      if (editing) {
        const res = await fetch(`/api/admin/users/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: form.role,
            isActive: true,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        setSuccess("User updated!");
      } else {
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        setSuccess("User created!");
      }
      setShowForm(false);
      setEditing(null);
      setForm({ email: "", password: "", role: "" });
      fetchUsers();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleSuspend = async (user: User) => {
    const newStatus = !user.is_active;
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isActive: newStatus,
          role: user.role,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const editUser = (user: User) => {
    setEditing(user);
    setForm({
      email: user.email,
      password: "",
      role: user.role || "",
    });
    setShowForm(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-amber-400">User Management</h1>
          <button
            onClick={() => {
              setEditing(null);
              setForm({ email: "", password: "", role: "" });
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
          >
            <Plus size={18} /> Add User
          </button>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

        {showForm && (
          <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} User</h3>
              <button onClick={() => { setShowForm(false); setEditing(null); setForm({ email: "", password: "", role: "" }); }} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                placeholder="Email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                disabled={!!editing}
              />
              <input
                placeholder="Password *"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
              />
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
              >
                <option value="">Select Role *</option>
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="marketing">Marketing</option>
                <option value="revenue">Revenue</option>
              </select>
            </div>
            <div className="mt-4 flex gap-3">
              <button onClick={handleSave} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
                <Save size={18} /> {saving ? "Saving..." : "Save"}
              </button>
              <button onClick={() => { setShowForm(false); setEditing(null); setForm({ email: "", password: "", role: "" }); }} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-slate-400 py-12">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111827] border-b border-amber-500/10">
                <tr>
                  <th className="p-3 text-amber-400">Email</th>
                  <th className="p-3 text-amber-400">Role</th>
                  <th className="p-3 text-amber-400">Status</th>
                  <th className="p-3 text-amber-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role || "No role"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${user.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {user.is_active ? "Active" : "Suspended"}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button onClick={() => editUser(user)} className="text-blue-400 hover:text-blue-300">
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => toggleSuspend(user)} className={`${user.is_active ? "text-yellow-400 hover:text-yellow-300" : "text-green-400 hover:text-green-300"}`}>
                        {user.is_active ? "Suspend" : "Activate"}
                      </button>
                      <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300">
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
    </AdminLayout>
  );
}
