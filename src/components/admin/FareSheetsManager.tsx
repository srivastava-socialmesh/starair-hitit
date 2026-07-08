"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X, FileText } from "lucide-react";

interface FareSheet {
  id: number;
  title: string;
  description: string;
  file_url: string;
  valid_from: string;
  valid_to: string;
  is_active: boolean;
}

export default function FareSheetsManager() {
  const [items, setItems] = useState<FareSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<FareSheet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<FareSheet>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("fare_sheets")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to load fare sheets: " + error.message);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const fileName = `fare_sheet_${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("fare_sheets")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Upload error:", error);
        throw new Error(error.message);
      }

      const { data: urlData } = supabase.storage
        .from("fare_sheets")
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (err) {
      console.error("Upload failed:", err);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title) {
      alert("Title is required");
      return;
    }

    let fileUrl = form.file_url || null;
    if (selectedFile) {
      try {
        fileUrl = await uploadFile(selectedFile);
      } catch (err: any) {
        alert("File upload failed: " + err.message);
        return;
      }
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        title: form.title,
        description: form.description || null,
        file_url: fileUrl,
        valid_from: form.valid_from || null,
        valid_to: form.valid_to || null,
        is_active: form.is_active !== undefined ? form.is_active : true,
      };

      if (editing) {
        const { error } = await supabase
          .from("fare_sheets")
          .update(payload)
          .eq("id", editing.id);
        if (error) {
          console.error("Update error:", error);
          setError("Update failed: " + error.message);
          alert("Update failed: " + error.message);
          return;
        }
        setSuccess("Fare sheet updated successfully!");
      } else {
        if (!fileUrl) {
          alert("Please upload a PDF file");
          return;
        }
        const { error } = await supabase
          .from("fare_sheets")
          .insert([payload]);
        if (error) {
          console.error("Insert error:", error);
          setError("Insert failed: " + error.message);
          alert("Insert failed: " + error.message);
          return;
        }
        setSuccess("Fare sheet added successfully!");
      }

      setShowForm(false);
      setEditing(null);
      setForm({});
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchItems();
    } catch (err) {
      console.error("Save error:", err);
      alert("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this fare sheet?")) return;
    try {
      const { error } = await supabase
        .from("fare_sheets")
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
        .from("fare_sheets")
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
        <h2 className="text-2xl font-bold text-amber-400">Fare Sheets</h2>
        <button
          onClick={() => {
            setEditing(null);
            setForm({ is_active: true });
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
            setShowForm(true);
            setError(null);
            setSuccess(null);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Fare Sheet
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {showForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{editing ? "Edit" : "New"} Fare Sheet</h3>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="text-slate-400 hover:text-white">
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
              placeholder="Valid From (YYYY-MM-DD)"
              type="date"
              value={form.valid_from || ""}
              onChange={(e) => setForm({ ...form, valid_from: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Valid To (YYYY-MM-DD)"
              type="date"
              value={form.valid_to || ""}
              onChange={(e) => setForm({ ...form, valid_to: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <textarea
              placeholder="Description (optional)"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
              rows={2}
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-slate-300 mb-1">Upload PDF</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf"
                onChange={handleFileChange}
                className="w-full bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600 transition"
              />
              {uploading && <span className="text-amber-400 text-sm">Uploading...</span>}
              {selectedFile && !uploading && (
                <span className="text-green-400 text-sm flex items-center gap-1">
                  <FileText size={16} /> {selectedFile.name}
                </span>
              )}
              {editing && form.file_url && !selectedFile && (
                <span className="text-slate-400 text-sm flex items-center gap-1">
                  <FileText size={16} /> Current file uploaded
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={handleSave} disabled={saving || uploading} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
              <Save size={18} /> {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setShowForm(false); setEditing(null); setForm({}); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No fare sheets yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#111827] border-b border-amber-500/10">
              <tr>
                <th className="p-3 text-amber-400">Title</th>
                <th className="p-3 text-amber-400">Valid From</th>
                <th className="p-3 text-amber-400">Valid To</th>
                <th className="p-3 text-amber-400">File</th>
                <th className="p-3 text-amber-400">Active</th>
                <th className="p-3 text-amber-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.valid_from ? new Date(item.valid_from).toLocaleDateString() : "-"}</td>
                  <td className="p-3">{item.valid_to ? new Date(item.valid_to).toLocaleDateString() : "-"}</td>
                  <td className="p-3">
                    {item.file_url ? (
                      <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1">
                        <FileText size={16} /> View PDF
                      </a>
                    ) : (
                      <span className="text-slate-500">No file</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button onClick={() => toggleActive(item.id, item.is_active)} className={`px-2 py-1 rounded text-xs font-bold ${item.is_active ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {item.is_active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => { setEditing(item); setForm(item); setSelectedFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; setShowForm(true); }} className="text-blue-400 hover:text-blue-300">
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
