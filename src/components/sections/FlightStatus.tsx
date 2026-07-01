"use client";
import { useEffect, useState } from "react";
import { RefreshCw, Clock, PlaneTakeoff, PlaneLanding, Eye } from "lucide-react";

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
  const [modalOpen, setModalOpen] = useState(false);

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
    if (status === "On Time") return "text-green-600 bg-green-100 border-green-300";
    if (status === "Delayed") return "text-red-600 bg-red-100 border-red-300";
    if (status === "Boarding") return "text-amber-600 bg-amber-100 border-amber-300";
    if (status === "Landed") return "text-purple-600 bg-purple-100 border-purple-300";
    return "text-gray-600 bg-gray-100 border-gray-300";
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">✈️ Live</span>
            <h2 className="text-3xl font-bold text-gray-800">Flight <span className="text-red-500">Status</span></h2>
            <p className="text-gray-500 text-sm">Real-time updates via Hitit Middleware</p>
          </div>
          <button
            onClick={fetchFlights}
            className="p-3 bg-white border border-gray-200 rounded-full hover:rotate-180 transition duration-500 hover:border-red-300"
            disabled={loading}
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Show Status Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02]"
        >
          <Eye size={20} />
          Show Flight Status
        </button>

        {/* Modal Overlay */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Clock className="text-red-500" size={20} />
                  Live Flight Status
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4">
                {loading ? (
                  <div className="text-center text-gray-400 py-12">Loading flights...</div>
                ) : flights.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <PlaneTakeoff className="mx-auto mb-2 text-gray-300" size={32} />
                    No flights available. Connect to Hitit middleware.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="p-3 text-red-600 font-semibold">Flight</th>
                          <th className="p-3 text-red-600 font-semibold">Origin</th>
                          <th className="p-3 text-red-600 font-semibold">Destination</th>
                          <th className="p-3 text-red-600 font-semibold">Departure</th>
                          <th className="p-3 text-red-600 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {flights.map((flight) => (
                          <tr key={flight.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="p-3 font-bold text-gray-800">{flight.flight_no}</td>
                            <td className="p-3 flex items-center gap-2 text-gray-600">
                              <PlaneTakeoff size={14} className="text-green-500" />
                              {flight.origin}
                            </td>
                            <td className="p-3 flex items-center gap-2 text-gray-600">
                              <PlaneLanding size={14} className="text-red-500" />
                              {flight.destination}
                            </td>
                            <td className="p-3 text-gray-600">{new Date(flight.departure_time).toLocaleTimeString()}</td>
                            <td className="p-3">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(flight.status)}`}>
                                {flight.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
