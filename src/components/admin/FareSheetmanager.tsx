"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Pencil, Trash2, Plus, Save, X, ChevronDown, ChevronUp } from "lucide-react";

interface FareLevel {
  id?: number;
  level_number: number;
  fare_type: string;
  fare_amount: number;
  cabin_class: string;
  display_order?: number;   // <-- ADD THIS
}

interface Route {
  id: number;
  origin: string;
  destination: string;
  stops: number;
  is_active: boolean;
  display_order: number;
  fare_sheet_levels: FareLevel[];
}

export default function FareSheetManager() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRoute, setExpandedRoute] = useState<number | null>(null);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const [showRouteForm, setShowRouteForm] = useState(false);
  const [routeForm, setRouteForm] = useState<Partial<Route>>({});
  const [editingLevel, setEditingLevel] = useState<FareLevel | null>(null);
  const [showLevelForm, setShowLevelForm] = useState(false);
  const [levelForm, setLevelForm] = useState<Partial<FareLevel>>({});
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const supabase = createClient();

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("fare_sheet_routes")
        .select(`
          *,
          fare_sheet_levels (*)
        `)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to load fare sheet");
      } else {
        setRoutes(data || []);
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
    fetchRoutes();
  }, []);

  const handleRouteSave = async () => {
    if (!routeForm.origin || !routeForm.destination) {
      alert("Origin and Destination are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        origin: routeForm.origin,
        destination: routeForm.destination,
        stops: routeForm.stops || 0,
        display_order: routeForm.display_order || 0,
        is_active: routeForm.is_active !== undefined ? routeForm.is_active : true,
      };

      if (editingRoute) {
        const { error } = await supabase
          .from("fare_sheet_routes")
          .update(payload)
          .eq("id", editingRoute.id);
        if (error) throw error;
        setSuccess("Route updated successfully!");
      } else {
        const { error } = await supabase
          .from("fare_sheet_routes")
          .insert([payload]);
        if (error) throw error;
        setSuccess("Route added successfully!");
      }

      setShowRouteForm(false);
      setEditingRoute(null);
      setRouteForm({});
      fetchRoutes();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRouteDelete = async (id: number) => {
    if (!confirm("Delete this route and all its fare levels?")) return;
    try {
      const { error } = await supabase
        .from("fare_sheet_routes")
        .delete()
        .eq("id", id);
      if (error) throw error;
      fetchRoutes();
      setSuccess("Route deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLevelSave = async () => {
    if (!levelForm.level_number || !levelForm.fare_amount || !levelForm.cabin_class || !levelForm.fare_type) {
      alert("Level Number, Fare Amount, Cabin Class, and Fare Type are required");
      return;
    }
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        route_id: selectedRouteId!,
        level_number: levelForm.level_number,
        fare_type: levelForm.fare_type,
        fare_amount: levelForm.fare_amount,
        cabin_class: levelForm.cabin_class,
        display_order: levelForm.display_order || 0,
      };

      if (editingLevel?.id) {
        const { error } = await supabase
          .from("fare_sheet_levels")
          .update(payload)
          .eq("id", editingLevel.id);
        if (error) throw error;
        setSuccess("Fare level updated successfully!");
      } else {
        const { error } = await supabase
          .from("fare_sheet_levels")
          .insert([payload]);
        if (error) throw error;
        setSuccess("Fare level added successfully!");
      }

      setShowLevelForm(false);
      setEditingLevel(null);
      setLevelForm({});
      fetchRoutes();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLevelDelete = async (levelId: number) => {
    if (!confirm("Delete this fare level?")) return;
    try {
      const { error } = await supabase
        .from("fare_sheet_levels")
        .delete()
        .eq("id", levelId);
      if (error) throw error;
      fetchRoutes();
      setSuccess("Fare level deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const toggleRouteExpand = (routeId: number) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  const openLevelForm = (routeId: number, level?: FareLevel) => {
    setSelectedRouteId(routeId);
    if (level) {
      setEditingLevel(level);
      setLevelForm(level);
    } else {
      setEditingLevel(null);
      setLevelForm({
        cabin_class: "Economy",
        fare_type: "STANDARD",
        level_number: 1,
        fare_amount: 0,
        display_order: 0,   // <-- ADD THIS
      });
    }
    setShowLevelForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-amber-400">Fare Sheet Manager</h2>
          <p className="text-slate-400 text-sm">Manage routes and fare levels</p>
        </div>
        <button
          onClick={() => {
            setEditingRoute(null);
            setRouteForm({ is_active: true, stops: 0, display_order: 0 });
            setShowRouteForm(true);
            setError(null);
            setSuccess(null);
          }}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} /> Add Route
        </button>
      </div>

      {error && <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-4 rounded-lg mb-4">{error}</div>}
      {success && <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-lg mb-4">{success}</div>}

      {/* Route Form */}
      {showRouteForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{editingRoute ? "Edit" : "New"} Route</h3>
            <button onClick={() => { setShowRouteForm(false); setEditingRoute(null); setRouteForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              placeholder="Origin (e.g., Bengaluru)"
              value={routeForm.origin || ""}
              onChange={(e) => setRouteForm({ ...routeForm, origin: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              placeholder="Destination (e.g., Nanded)"
              value={routeForm.destination || ""}
              onChange={(e) => setRouteForm({ ...routeForm, destination: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="number"
              placeholder="Stops"
              value={routeForm.stops ?? 0}
              onChange={(e) => setRouteForm({ ...routeForm, stops: parseInt(e.target.value) || 0 })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="number"
              placeholder="Display Order"
              value={routeForm.display_order ?? 0}
              onChange={(e) => setRouteForm({ ...routeForm, display_order: parseInt(e.target.value) || 0 })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleRouteSave} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
              <Save size={18} /> {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setShowRouteForm(false); setEditingRoute(null); setRouteForm({}); }} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Level Form */}
      {showLevelForm && (
        <div className="bg-[#111827] p-6 rounded-xl border border-amber-500/20 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{editingLevel ? "Edit" : "New"} Fare Level</h3>
            <button onClick={() => { setShowLevelForm(false); setEditingLevel(null); setLevelForm({}); }} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="number"
              placeholder="Level Number (e.g., 1)"
              value={levelForm.level_number || ""}
              onChange={(e) => setLevelForm({ ...levelForm, level_number: parseInt(e.target.value) || 0 })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <input
              type="number"
              placeholder="Fare Amount"
              value={levelForm.fare_amount || ""}
              onChange={(e) => setLevelForm({ ...levelForm, fare_amount: parseInt(e.target.value) || 0 })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
            <select
              value={levelForm.cabin_class || "Economy"}
              onChange={(e) => setLevelForm({ ...levelForm, cabin_class: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
            </select>
            <select
              value={levelForm.fare_type || "STANDARD"}
              onChange={(e) => setLevelForm({ ...levelForm, fare_type: e.target.value })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            >
              <option value="MIN">MIN (Minimum)</option>
              <option value="STANDARD">STANDARD</option>
              <option value="MAX">MAX (Maximum)</option>
            </select>
            <input
              type="number"
              placeholder="Display Order"
              value={levelForm.display_order ?? 0}
              onChange={(e) => setLevelForm({ ...levelForm, display_order: parseInt(e.target.value) || 0 })}
              className="bg-[#0a0e1a] border border-white/10 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="mt-4 flex gap-3">
            <button onClick={handleLevelSave} disabled={saving} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50">
              <Save size={18} /> {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setShowLevelForm(false); setEditingLevel(null); setLevelForm({}); }} className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Routes List */}
      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading...</div>
      ) : routes.length === 0 ? (
        <div className="text-center text-slate-400 py-12">No routes added yet.</div>
      ) : (
        <div className="space-y-3">
          {routes.map((route) => (
            <div key={route.id} className="bg-[#111827] rounded-xl border border-white/10 overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition"
                onClick={() => toggleRouteExpand(route.id)}
              >
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">{route.origin}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-white font-medium">{route.destination}</span>
                  <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {route.stops} stop{route.stops !== 1 ? 's' : ''}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${route.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {route.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{route.fare_sheet_levels?.length || 0} levels</span>
                  {expandedRoute === route.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                </div>
              </div>

              {expandedRoute === route.id && (
                <div className="p-4 border-t border-white/5">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-medium text-amber-400">Fare Levels</h4>
                    <button
                      onClick={() => openLevelForm(route.id)}
                      className="text-xs bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-3 py-1 rounded-lg transition"
                    >
                      + Add Level
                    </button>
                  </div>

                  {route.fare_sheet_levels?.length === 0 ? (
                    <p className="text-slate-400 text-sm">No fare levels for this route.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-slate-400 border-b border-white/5">
                            <th className="pb-2 pr-4">Cabin</th>
                            <th className="pb-2 pr-4">Level</th>
                            <th className="pb-2 pr-4">Type</th>
                            <th className="pb-2 pr-4">Fare</th>
                            <th className="pb-2 pr-4">Order</th>
                            <th className="pb-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {route.fare_sheet_levels?.map((level) => (
                            <tr key={level.id} className="border-b border-white/5 last:border-0">
                              <td className="py-2 pr-4 text-white">{level.cabin_class}</td>
                              <td className="py-2 pr-4 text-white">L{level.level_number}</td>
                              <td className="py-2 pr-4">
                                <span className={`text-xs px-2 py-0.5 rounded ${level.fare_type === 'MIN' ? 'bg-green-500/20 text-green-400' : level.fare_type === 'MAX' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                  {level.fare_type}
                                </span>
                              </td>
                              <td className="py-2 pr-4 text-white font-mono">{level.fare_amount}</td>
                              <td className="py-2 pr-4 text-slate-400">{level.display_order ?? 0}</td>
                              <td className="py-2">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openLevelForm(route.id, level)}
                                    className="text-blue-400 hover:text-blue-300 text-xs"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleLevelDelete(level.id!)}
                                    className="text-red-400 hover:text-red-300 text-xs"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingRoute(route);
                        setRouteForm(route);
                        setShowRouteForm(true);
                      }}
                      className="text-xs bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded-lg transition"
                    >
                      Edit Route
                    </button>
                    <button
                      onClick={() => handleRouteDelete(route.id)}
                      className="text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-1 rounded-lg transition"
                    >
                      Delete Route
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
