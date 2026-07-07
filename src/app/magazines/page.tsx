import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Magazine {
  id: number;
  title: string;
  issue_month: string;
  issue_date: string;
  cover_image_url: string;
  pdf_url: string;
  description: string;
  is_active: boolean;
}

export default async function MagazinesPage() {
  const supabase = await createServerClient();
  const { data: magazines, error } = await supabase
    .from("magazines")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching magazines:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Magazines</h1>
        <p className="text-gray-500 mb-8">Browse our latest editions</p>

        {magazines && magazines.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No magazines available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {magazines?.map((mag) => (
              <div key={mag.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition group">
                <div className="relative h-64 w-full bg-gray-100">
                  {mag.cover_image_url ? (
                    <img
                      src={mag.cover_image_url}
                      alt={mag.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No cover
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{mag.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{mag.issue_month}</p>
                  {mag.issue_date && (
                    <p className="text-xs text-gray-400">{new Date(mag.issue_date).toLocaleDateString()}</p>
                  )}
                  {mag.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{mag.description}</p>
                  )}
                  <a
                    href={mag.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-accent hover:bg-[#b00226] text-white font-semibold py-2 px-4 rounded-full text-sm transition shadow-md"
                  >
                    Read Magazine →
                  </a>
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
