"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Search, Plane, MapPin, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

interface Flight {
  id: number;
  flight_no: string;
  origin: string;
  origin_code: string;
  destination: string;
  dest_code: string;
  departure: string;
  arrival: string;
  status: string;
  aircraft: string;
}

// Mock flight data - replace with actual API call
const mockFlights: Flight[] = [
  {
    id: 1,
    flight_no: "S5125",
    origin: "Ahmedabad",
    origin_code: "AMD",
    destination: "Kishangarh [Ajmer]",
    dest_code: "KQH",
    departure: "11:20",
    arrival: "12:25",
    status: "Scheduled",
    aircraft: "ERJ 175",
  },
  {
    id: 2,
    flight_no: "S5391",
    origin: "Ahmedabad",
    origin_code: "AMD",
    destination: "Indore",
    dest_code: "IDR",
    departure: "16:20",
    arrival: "17:30",
    status: "On Time",
    aircraft: "ERJ 175",
  },
  {
    id: 3,
    flight_no: "S5117",
    origin: "Bengaluru",
    origin_code: "BLR",
    destination: "Kalaburagi",
    dest_code: "GBI",
    departure: "10:45",
    arrival: "11:55",
    status: "Boarding",
    aircraft: "ERJ 175",
  },
  {
    id: 4,
    flight_no: "S5151",
    origin: "Bengaluru",
    origin_code: "BLR",
    destination: "Hyderabad",
    dest_code: "HYD",
    departure: "12:30",
    arrival: "13:40",
    status: "On Time",
    aircraft: "ERJ 175",
  },
  {
    id: 5,
    flight_no: "S5159",
    origin: "Bengaluru",
    origin_code: "BLR",
    destination: "Bidar",
    dest_code: "IXX",
    departure: "06:20",
    arrival: "07:35",
    status: "Landed",
    aircraft: "ERJ 175",
  },
  {
    id: 6,
    flight_no: "S5167",
    origin: "Bengaluru",
    origin_code: "BLR",
    destination: "GOA [Mopa]",
    dest_code: "GOX",
    departure: "14:05",
    arrival: "15:15",
    status: "Scheduled",
    aircraft: "ERJ 175",
  },
  {
    id: 7,
    flight_no: "S5194",
    origin: "Bengaluru",
    origin_code: "BLR",
    destination: "Kolhapur",
    dest_code: "KLH",
    departure: "07:30",
    arrival: "08:50",
    status: "Landed",
    aircraft: "ERJ 175",
  },
  {
    id: 8,
    flight_no: "S5204",
    origin: "Bengaluru",
    origin_code: "BLR",
    destination: "Indore",
    dest_code: "IDR",
    departure: "14:30",
    arrival: "16:30",
    status: "Scheduled",
    aircraft: "ERJ 175",
  },
  {
    id: 9,
    flight_no: "S5160",
    origin: "Bidar",
    origin_code: "IXX",
    destination: "Bengaluru",
    dest_code: "BLR",
    departure: "08:05",
    arrival: "09:20",
    status: "Landed",
    aircraft: "ERJ 175",
  },
  {
    id: 10,
    flight_no: "S5168",
    origin: "GOA [Mopa]",
    origin_code: "GOX",
    destination: "Bengaluru",
    dest_code: "BLR",
    departure: "18:25",
    arrival: "19:35",
    status: "Scheduled",
    aircraft: "ERJ 175",
  },
];

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  "On Time": "bg-green-100 text-green-700",
  Boarding: "bg-yellow-100 text-yellow-700",
  Landed: "bg-purple-100 text-purple-700",
  Delayed: "bg-red-100 text-red-700",
  Cancelled: "bg-gray-100 text-gray-700",
};

export default function FlightStatusPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState<"route" | "flight" | "origin">("route");
  const [searchValue, setSearchValue] = useState("");
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Get unique origins for dropdown
  const uniqueOrigins = Array.from(new Set(mockFlights.map((f) => f.origin_code))).map((code) => {
    const flight = mockFlights.find((f) => f.origin_code === code);
    return { code, name: flight?.origin || code };
  });

  // Get unique destinations for route search
  const uniqueDestinations = Array.from(new Set(mockFlights.map((f) => f.dest_code))).map((code) => {
    const flight = mockFlights.find((f) => f.dest_code === code);
    return { code, name: flight?.destination || code };
  });

  useEffect(() => {
    // Check URL params for initial search
    const type = searchParams.get("type") as "route" | "flight" | "origin" | null;
    const value = searchParams.get("value");
    if (type && value) {
      setSearchType(type);
      setSearchValue(value);
      performSearch(type, value);
    }
  }, [searchParams]);

  const performSearch = (type: "route" | "flight" | "origin", value: string) => {
    if (!value.trim()) {
      setFilteredFlights([]);
      setHasSearched(false);
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Simulate API delay
    setTimeout(() => {
      let results: Flight[] = [];

      switch (type) {
        case "route": {
          const [origin, destination] = value.split(",").map((s) => s.trim());
          results = mockFlights.filter((f) => {
            const originMatch =
              !origin ||
              f.origin.toLowerCase().includes(origin.toLowerCase()) ||
              f.origin_code.toLowerCase().includes(origin.toLowerCase());
            const destMatch =
              !destination ||
              f.destination.toLowerCase().includes(destination.toLowerCase()) ||
              f.dest_code.toLowerCase().includes(destination.toLowerCase());
            return originMatch && destMatch;
          });
          break;
        }
        case "flight": {
          results = mockFlights.filter((f) =>
            f.flight_no.toLowerCase().includes(value.toLowerCase())
          );
          break;
        }
        case "origin": {
          results = mockFlights.filter(
            (f) =>
              f.origin.toLowerCase().includes(value.toLowerCase()) ||
              f.origin_code.toLowerCase().includes(value.toLowerCase())
          );
          break;
        }
        default:
          results = [];
      }

      setFilteredFlights(results);
      setLoading(false);
    }, 500);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    performSearch(searchType, searchValue);
    // Update URL params
    router.push(`/flight-status?type=${searchType}&value=${encodeURIComponent(searchValue)}`);
  };

  const getStatusBadge = (status: string) => {
    const colorClass = statusColors[status] || "bg-gray-100 text-gray-700";
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {status}
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 pb-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Flight Status</h1>
          <p className="text-gray-600 mt-1">Search and track your flight in real-time</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Type Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
                <button
                  type="button"
                  onClick={() => setSearchType("route")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    searchType === "route"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MapPin size={16} className="inline mr-1" /> By Route
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("flight")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    searchType === "flight"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Plane size={16} className="inline mr-1" /> By Flight Number
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType("origin")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    searchType === "origin"
                      ? "bg-accent text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <MapPin size={16} className="inline mr-1" /> By Origin
                </button>
              </div>

              {/* Search Input */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  {searchType === "route" ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={searchValue.split(",")[0] || ""}
                        onChange={(e) => {
                          const dest = searchValue.split(",")[1] || "";
                          setSearchValue(`${e.target.value},${dest}`.trim());
                        }}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                      >
                        <option value="">Select Origin</option>
                        {uniqueOrigins.map((o) => (
                          <option key={o.code} value={o.code}>
                            {o.name} ({o.code})
                          </option>
                        ))}
                      </select>
                      <span className="text-gray-400 self-center hidden sm:block">→</span>
                      <select
                        value={searchValue.split(",")[1] || ""}
                        onChange={(e) => {
                          const origin = searchValue.split(",")[0] || "";
                          setSearchValue(`${origin},${e.target.value}`.trim());
                        }}
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                      >
                        <option value="">Select Destination</option>
                        {uniqueDestinations.map((d) => (
                          <option key={d.code} value={d.code}>
                            {d.name} ({d.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : searchType === "flight" ? (
                    <input
                      type="text"
                      placeholder="Enter Flight Number (e.g., S5125)"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                    />
                  ) : (
                    <select
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                    >
                      <option value="">Select Origin</option>
                      {uniqueOrigins.map((o) => (
                        <option key={o.code} value={o.code}>
                          {o.name} ({o.code})
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-accent hover:bg-[#b00226] text-white rounded-xl font-semibold transition flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <Search size={18} /> Search Flights
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent"></div>
              <p className="text-gray-500 mt-4">Searching flights...</p>
            </div>
          ) : hasSearched ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {filteredFlights.length} flight{filteredFlights.length !== 1 ? "s" : ""} found
                </h2>
                {filteredFlights.length === 0 && (
                  <p className="text-gray-500 text-sm">No flights match your search criteria.</p>
                )}
              </div>

              {filteredFlights.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-accent text-white">
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Flight</th>
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Origin</th>
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Destination</th>
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Departure</th>
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Arrival</th>
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Aircraft</th>
                        <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFlights.map((flight, index) => (
                        <tr
                          key={flight.id}
                          className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                          }`}
                        >
                          <td className="px-4 py-3 font-medium text-accent whitespace-nowrap">
                            {flight.flight_no}
                          </td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                            {flight.origin} ({flight.origin_code})
                          </td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                            {flight.destination} ({flight.dest_code})
                          </td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                            <Clock size={14} className="inline mr-1 text-gray-400" />
                            {flight.departure}
                          </td>
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                            <Clock size={14} className="inline mr-1 text-gray-400" />
                            {flight.arrival}
                          </td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap text-xs">
                            {flight.aircraft}
                          </td>
                          <td className="px-4 py-3">{getStatusBadge(flight.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Plane size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">Search for a Flight</h3>
              <p className="text-gray-500 mt-2">
                Use the search above to check the status of any flight by route, flight number, or origin.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
