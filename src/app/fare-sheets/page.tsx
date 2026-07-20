import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface FareLevel {
  id: number;
  level_number: number;
  fare_type: string;
  fare_amount: number;
  cabin_class: string;
}

interface Route {
  id: number;
  origin: string;
  destination: string;
  stops: number;
  levels: FareLevel[];
}

export default async function FareSheetPage() {
  const supabase = await createServerClient();

  // Fetch all routes with their fare levels
  const { data: routes, error } = await supabase
    .from("fare_sheet_routes")
    .select(`
      id,
      origin,
      destination,
      stops,
      fare_sheet_levels (
        id,
        level_number,
        fare_type,
        fare_amount,
        cabin_class
      )
    `)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching fare sheet:", error);
  }

  // Group levels by cabin class
  const processedRoutes = routes?.map((route: any) => {
    const economyLevels = route.fare_sheet_levels
      ?.filter((l: any) => l.cabin_class === "Economy")
      .sort((a: any, b: any) => a.level_number - b.level_number) || [];

    const businessLevels = route.fare_sheet_levels
      ?.filter((l: any) => l.cabin_class === "Business")
      .sort((a: any, b: any) => a.level_number - b.level_number) || [];

    return {
      ...route,
      economyLevels,
      businessLevels,
    };
  });

  // Get unique level numbers for table headers
  const allLevelNumbers = new Set<number>();
  processedRoutes?.forEach((route: any) => {
    route.economyLevels.forEach((l: any) => allLevelNumbers.add(l.level_number));
    route.businessLevels.forEach((l: any) => allLevelNumbers.add(l.level_number));
  });
  const levelNumbers = Array.from(allLevelNumbers).sort((a, b) => a - b);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Fare Sheet</h1>
          <p className="text-gray-500 mt-1">Economy Class | Business Class</p>
        </div>

        {!routes || routes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No fare data available at the moment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                {/* Header: Origin | Destination | Stops | Cabin Class | Level Headers */}
                <tr className="bg-gray-50">
                  <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Origin</th>
                  <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Destination</th>
                  <th rowSpan={2} className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700">Stops</th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700 bg-blue-50" colSpan={levelNumbers.length}>
                    Economy
                  </th>
                  <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700 bg-purple-50" colSpan={levelNumbers.length}>
                    Business
                  </th>
                </tr>
                <tr className="bg-gray-50">
                  {levelNumbers.map((num) => (
                    <th key={`eco-${num}`} className="border border-gray-300 px-2 py-1 text-xs text-center font-medium text-gray-600 bg-blue-50/50">L{num}</th>
                  ))}
                  {levelNumbers.map((num) => (
                    <th key={`biz-${num}`} className="border border-gray-300 px-2 py-1 text-xs text-center font-medium text-gray-600 bg-purple-50/50">L{num}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processedRoutes?.map((route: any) => {
                  // Build a map of level_number -> fare amount for each cabin
                  const ecoMap: Record<number, { fare_type: string; fare_amount: number }> = {};
                  route.economyLevels.forEach((l: any) => {
                    ecoMap[l.level_number] = { fare_type: l.fare_type, fare_amount: l.fare_amount };
                  });
                  const bizMap: Record<number, { fare_type: string; fare_amount: number }> = {};
                  route.businessLevels.forEach((l: any) => {
                    bizMap[l.level_number] = { fare_type: l.fare_type, fare_amount: l.fare_amount };
                  });

                  return (
                    <tr key={route.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800">{route.origin}</td>
                      <td className="border border-gray-300 px-3 py-2 font-medium text-gray-800">{route.destination}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center text-gray-600">{route.stops}</td>
                      {levelNumbers.map((num) => {
                        const level = ecoMap[num];
                        return (
                          <td key={`eco-${route.id}-${num}`} className="border border-gray-300 px-2 py-1 text-center text-xs">
                            {level ? (
                              <span className={`font-mono ${level.fare_type === 'MIN' ? 'text-green-600' : level.fare_type === 'MAX' ? 'text-red-600' : 'text-gray-700'}`}>
                                {level.fare_amount}
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                        );
                      })}
                      {levelNumbers.map((num) => {
                        const level = bizMap[num];
                        return (
                          <td key={`biz-${route.id}-${num}`} className="border border-gray-300 px-2 py-1 text-center text-xs">
                            {level ? (
                              <span className={`font-mono ${level.fare_type === 'MIN' ? 'text-green-600' : level.fare_type === 'MAX' ? 'text-red-600' : 'text-gray-700'}`}>
                                {level.fare_amount}
                              </span>
                            ) : (
                              <span className="text-gray-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-xs text-gray-400 border-t border-gray-200 pt-4">
          <p>* MIN = Minimum Fare | MAX = Maximum Fare | All fares are indicative and subject to change.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
