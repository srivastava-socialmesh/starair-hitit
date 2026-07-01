"use client";
import { useEffect, useState } from "react";
import FlightMap from "./FlightMap";
import { Plane } from "lucide-react";

interface Flight {
  id: number;
  flight_no: string;
  origin: string;
  destination: string;
  departure_time: string;
  status: string;
}

export default function FlightStatusClient() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await fetch(`/api/flights/status?flightNumber=${filter}`);
        const data = await res.json();
        setFlights(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <Plane className="text-red-500" /> Live Flight Status
      </h1>
      <p className="text-gray-500 mb-6">Real-time flight tracking with live animations</p>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by flight number (e.g., AI-101)"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md bg-white border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:border-red-500 outline-none transition"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading flights...</div>
      ) : flights.length === 0 ? (
        <div className="text-center text-gray-400 py-12">No flights found.</div>
      ) : (
        <>
          <FlightMap flights={flights} />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-3 text-red-600 font-semibold">Flight</th>
                  <th className="p-3 text-red-600 font-semibold">Origin</th>
                  <th className="p-3 text-red-600 font-semibold">Destination</th>
                  <th className="p-3 text-red-600 font-semibold">Departure</th>
                  <th className="p-3 text-red-600 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((f) => (
                  <tr key={f.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="p-3 font-bold text-gray-800">{f.flight_no}</td>
                    <td className="p-3 text-gray-600">{f.origin}</td>
                    <td className="p-3 text-gray-600">{f.destination}</td>
                    <td className="p-3 text-gray-600">
                      {new Date(f.departure_time).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        f.status === "On Time" ? "bg-green-100 text-green-600" :
                        f.status === "Boarding" ? "bg-yellow-100 text-yellow-600" :
                        f.status === "Delayed" ? "bg-red-100 text-red-600" :
                        "bg-gray-100 text-gray-600"
                      }`}>
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
