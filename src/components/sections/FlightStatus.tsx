"use client";
import { useEffect, useState } from "react";
import { RefreshCw, Clock } from "lucide-react";

interface Flight { id: number; flight_no: string; origin: string; destination: string; departure_time: string; status: string; }

export default function FlightStatus() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/flights/status");
      const data = await res.json();
      setFlights(Array.isArray(data) ? data : []);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { fetchFlights(); const interval = setInterval(fetchFlights, 30000); return () => clearInterval(interval); }, []);

  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div><h2 className="text-4xl font-bold flex gap-3"><Clock className="text-cyan-400" /> Live Status</h2><p className="text-slate-400">via Hitit Middleware</p></div>
          <button onClick={fetchFlights} className="p-3 glass rounded-full hover:rotate-180 transition" disabled={loading}><RefreshCw size={20} className={loading ? "animate-spin" : ""} /></button>
        </div>
        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5"><tr><th className="p-5 text-cyan-300">Flight</th><th className="p-5 text-cyan-300">Origin</th><th className="p-5 text-cyan-300">Dest</th><th className="p-5 text-cyan-300">Time</th><th className="p-5 text-cyan-300">Status</th></tr></thead>
            <tbody>
              {flights.map((f) => (
                <tr key={f.id} className="border-b border-white/5 hover:bg-white/5"><td className="p-5 font-bold">{f.flight_no}</td><td className="p-5">{f.origin}</td><td className="p-5">{f.destination}</td><td className="p-5">{new Date(f.departure_time).toLocaleTimeString()}</td><td className="p-5"><span className="px-4 py-1 rounded-full text-xs font-bold bg-green-400/20 text-green-400">{f.status}</span></td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
