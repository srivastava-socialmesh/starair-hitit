"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Plus, Pencil, Trash2, Save, X, UserPlus } from "lucide-react";

interface User {
  id: string;
  email: string;
  role: string | null;
  is_active: boolean;
  created_at: string;
}

const ROLES = [
  { value: 'admin', label: 'Admin' },
  { value: 'hr', label: 'HR' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'revenue', label: 'Revenue' },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ email: '', password: '', role: '' });
  const [saving, setSaving] = useState(false);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleToggleActive = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !current }),
      });
      if (!res.ok) throw new Error("Update failed");
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setForm({ email: user.email, password: '', role: user.role || '' });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingUser(null);
    setForm({ email: '', password: '', role: '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.email || !form.role) {
      alert("Email and Role are required");
      return;
    }
    setSaving(true);
    try {
      if (editingUser) {
        // Update user role
        const res = await fetch(`/api/admin/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: form.role }),
        });
        if (!res.ok) throw new Error("Update failed");
      } else {
        // Create new user
        if (!form.password) {
          alert("Password is required for new user");
          return;
        }
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password, role: form.role }),
        });
        if (!res.ok) throw new Error("Create failed");
      }
      setShowModal(false);
      fetchUsers();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-amber-400">User Management</h1>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
          >
            <UserPlus size={18} /> Add User
          </button>
        </div>

        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}

        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-slate-400 py-12">No users yet.</div>
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
                      <button
                        onClick={() => handleToggleActive(user.id, user.is_active)}
                        className={`px-2 py-1 rounded text-xs font-bold ${user.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {user.is_active ? "Active" : "Suspended"}
                      </button>
                    </td>
                    <td className="p-3 flex gap-2">
                      <button onClick={() => handleEdit(user)} className="text-blue-400 hover:text-blue-300">
                        <Pencil size={18} />
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

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-[#111827] rounded-2xl shadow-2xl max-w-md w-full p-6 border border-amber-500/20">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-amber-400">{editingUser ? "Edit User" : "Create User"}</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                {!editingUser && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300">Password</label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-slate-300">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select role</option>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value}>{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} /> {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={() => setShowModal(false)} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
