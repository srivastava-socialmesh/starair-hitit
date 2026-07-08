import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface FareSheet {
  id: number;
  title: string;
  file_url: string;
  valid_until: string;
  is_active: boolean;
}

export default async function FareSheetsPage() {
  const supabase = await createServerClient();
  const { data: sheets, error } = await supabase
    .from("fare_sheets")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching fare sheets:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tariff Sheets</h1>
        <p className="text-gray-500 mb-8">Download our latest fare sheets and tariff documents.</p>

        {sheets && sheets.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No fare sheets available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sheets?.map((sheet) => (
              <div key={sheet.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition">
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{sheet.title}</h3>
                    {sheet.valid_until && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Valid until {new Date(sheet.valid_until).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-4">
                    <a
                      href={sheet.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-accent hover:bg-[#b00226] text-white font-semibold py-2 px-6 rounded-full text-sm transition shadow-md"
                    >
                      Download PDF →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
