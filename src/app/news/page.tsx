import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewsPage() {
  const supabase = await createServerClient();
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_active", true)
    .order("published_date", { ascending: false });

  if (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Our News Feeds</h1>
        <p className="text-gray-500 mb-8">Latest news and updates from Star Air</p>

        {news && news.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No news available.</p>
        ) : (
          <div className="space-y-8">
            {news?.map((item) => (
              <div key={item.id} className="border-b border-gray-200 pb-6 last:border-0">
                <div className="flex flex-col md:flex-row gap-4">
                  {item.image_url && (
                    <div className="md:w-48 h-32 relative flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">
                      {new Date(item.published_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <Link href={`/news/${item.slug}`} className="block">
                      <h2 className="text-xl font-semibold text-gray-800 hover:text-red-600 transition">
                        {item.title}
                      </h2>
                    </Link>
                    {item.excerpt && (
                      <p className="text-gray-600 mt-1">{item.excerpt}</p>
                    )}
                    <Link
                      href={`/news/${item.slug}`}
                      className="inline-block mt-2 text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Read More →
                    </Link>
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
