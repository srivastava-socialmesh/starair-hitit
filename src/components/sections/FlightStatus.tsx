"use client";
import { useEffect, useState } from "react";
import { RefreshCw, Clock, PlaneTakeoff, PlaneLanding } from "lucide-react";

interface Flight {
  id: number;
  flight_no: string;
  origin: string;
  destination: string;
  departure_time: string;
  status: string;
}

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

  useEffect(() => {
    fetchFlights();
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    if (status === "On Time") return "text-green-400 bg-green-400/20 border-green-400/30";
    if (status === "Delayed") return "text-red-400 bg-red-400/20 border-red-400/30";
    if (status === "Boarding") return "text-amber-400 bg-amber-400/20 border-amber-400/30";
    return "text-slate-400 bg-slate-400/20 border-slate-400/30";
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0f172a] to-[#0a0e1a]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
              ✈️ Live
            </span>
            <h2 className="text-4xl font-bold">
              Flight <span className="text-gradient-gold">Status</span>
            </h2>
            <p className="text-slate-400 text-sm">Real-time updates via Hitit Middleware</p>
          </div>
          <button
            onClick={fetchFlights}
            className="p-3 glass-premium rounded-full hover:rotate-180 transition duration-500 border-amber-500/20"
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="glass-premium rounded-2xl overflow-hidden border-amber-500/10">
          <table className="w-full text-left">
            <thead className="bg-amber-500/5 border-b border-amber-500/10">
              <tr>
                <th className="p-5 text-amber-400 font-semibold text-sm uppercase tracking-wider">Flight</th>
                <th className="p-5 text-amber-400 font-semibold text-sm uppercase tracking-wider">Origin</th>
                <th className="p-5 text-amber-400 font-semibold text-sm uppercase tracking-wider">Destination</th>
                <th className="p-5 text-amber-400 font-semibold text-sm uppercase tracking-wider">Departure</th>
                <th className="p-5 text-amber-400 font-semibold text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-slate-400">
                    <PlaneTakeoff className="mx-auto mb-2 text-slate-500" size={32} />
                    No flights available. Connect to Hitit middleware.
                  </td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight.id} className="border-b border-white/5 hover:bg-white/5 transition">
                    <td className="p-5 font-bold text-amber-300">{flight.flight_no}</td>
                    <td className="p-5 flex items-center gap-2">
                      <PlaneTakeoff size={14} className="text-green-400" />
                      {flight.origin}
                    </td>
                    <td className="p-5 flex items-center gap-2">
                      <PlaneLanding size={14} className="text-amber-400" />
                      {flight.destination}
                    </td>
                    <td className="p-5">{new Date(flight.departure_time).toLocaleTimeString()}</td>
                    <td className="p-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${getStatusColor(flight.status)}`}>
                        {flight.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
