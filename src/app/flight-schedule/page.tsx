import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Flight Schedule – Star Air",
  description: "View Star Air's complete flight schedule including aircraft type, flight numbers, origins, destinations, timings, and days of operation.",
};

interface FlightSchedule {
  id: number;
  aircraft: string;
  flight_no: string;
  origin: string;
  origin_code: string;
  dep_time: string;
  destination: string;
  dest_code: string;
  arr_time: string;
  sch_days: string;
  flight_type: string;
  transit_loc: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  display_order: number;
}

export default async function FlightSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ origin?: string }>;
}) {
  const { origin } = await searchParams;
  const supabase = await createServerClient();

  // Fetch all active schedules
  let query = supabase
    .from("flight_schedules")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  // Apply origin filter if provided
  if (origin) {
    query = query.eq("origin_code", origin);
  }

  const { data: schedules, error } = await query;

  // Fetch unique origins for the filter sidebar
  const { data: origins } = await supabase
    .from("flight_schedules")
    .select("origin, origin_code")
    .eq("is_active", true)
    .order("origin", { ascending: true });

  const uniqueOrigins = origins?.reduce((acc, curr) => {
    if (!acc.find((o) => o.origin_code === curr.origin_code)) {
      acc.push(curr);
    }
    return acc;
  }, [] as { origin: string; origin_code: string }[]) || [];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Page Header */}
      <section className="pt-28 pb-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Flight Schedule</h1>
          <p className="text-gray-600 mt-2">Complete schedule of Star Air flights</p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-3">Filter by Origin</h3>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/flight-schedule"
                    className={`block px-3 py-2 rounded-lg text-sm transition ${
                      !origin ? "bg-accent text-white" : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All Flights
                  </a>
                </li>
                {uniqueOrigins.map((o) => (
                  <li key={o.origin_code}>
                    <a
                      href={`/flight-schedule?origin=${o.origin_code}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition ${
                        origin === o.origin_code ? "bg-accent text-white" : "text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {o.origin} ({o.origin_code})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Table */}
          <div className="flex-1 overflow-x-auto">
            {schedules && schedules.length > 0 ? (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-accent text-white">
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Aircraft</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Flight No</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Origin</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Dep Time</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Destination</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Arr Time</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Sch Days</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Flight Type</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Transit Loc</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">Start Date</th>
                    <th className="px-3 py-3 text-left font-semibold whitespace-nowrap">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((flight, index) => (
                    <tr
                      key={flight.id}
                      className={`border-b border-gray-200 hover:bg-gray-50 transition ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{flight.aircraft}</td>
                      <td className="px-3 py-2.5 font-medium text-accent whitespace-nowrap">{flight.flight_no}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{flight.origin}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{flight.dep_time}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{flight.destination}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{flight.arr_time}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">{flight.sch_days}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                          {flight.flight_type}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 text-gray-400 whitespace-nowrap">{flight.transit_loc || "—"}</td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                        {new Date(flight.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-3 py-2.5 text-gray-700 whitespace-nowrap">
                        {new Date(flight.end_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12 text-gray-500">No flights available for the selected origin.</div>
            )}

            <div className="mt-6 text-xs text-gray-400 border-t border-gray-200 pt-4">
              <p>* Schedule subject to change without prior notice. Please verify before travel.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
