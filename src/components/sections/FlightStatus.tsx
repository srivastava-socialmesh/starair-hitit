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
    if (status === "On Time") return "text-green-700 bg-green-100 border-green-200";
    if (status === "Delayed") return "text-red-700 bg-red-100 border-red-200";
    if (status === "Boarding") return "text-yellow-700 bg-yellow-100 border-yellow-200";
    return "text-gray-600 bg-gray-100 border-gray-200";
  };

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              ✈️ Live
            </span>
            <h2 className="text-3xl font-bold text-gray-800">
              Flight <span className="text-red-500">Status</span>
            </h2>
            <p className="text-gray-500 text-sm">Real-time updates via Hitit Middleware</p>
          </div>
          <button
            onClick={fetchFlights}
            className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition border border-gray-200"
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? "animate-spin text-red-500" : "text-gray-600"} />
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-red-600 font-semibold text-sm uppercase tracking-wider">Flight</th>
                <th className="p-4 text-red-600 font-semibold text-sm uppercase tracking-wider">Origin</th>
                <th className="p-4 text-red-600 font-semibold text-sm uppercase tracking-wider">Destination</th>
                <th className="p-4 text-red-600 font-semibold text-sm uppercase tracking-wider">Departure</th>
                <th className="p-4 text-red-600 font-semibold text-sm uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {flights.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    <PlaneTakeoff className="mx-auto mb-2 text-gray-300" size={32} />
                    No flights available. Connect to Hitit middleware.
                  </td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-800">{flight.flight_no}</td>
                    <td className="p-4 flex items-center gap-2 text-gray-700">
                      <PlaneTakeoff size={14} className="text-green-600" />
                      {flight.origin}
                    </td>
                    <td className="p-4 flex items-center gap-2 text-gray-700">
                      <PlaneLanding size={14} className="text-red-600" />
                      {flight.destination}
                    </td>
                    <td className="p-4 text-gray-700">{new Date(flight.departure_time).toLocaleTimeString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(flight.status)}`}>
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
