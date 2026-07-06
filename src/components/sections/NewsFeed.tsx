import { createServerClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function NewsFeed() {
  const supabase = await createServerClient();
  const { data: news, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_active", true)
    .order("published_date", { ascending: false })
    .limit(5);

  if (error || !news || news.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-wider">📰 Latest</span>
          <h2 className="text-4xl font-bold text-gray-900">News & <span className="text-accent">Updates</span></h2>
          <p className="text-gray-500 mt-1">Stay informed with our latest announcements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-accent transition overflow-hidden group shadow-sm">
              {item.image_url && (
                <div className="relative h-48 w-full">
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs text-gray-500 mb-1">{new Date(item.published_date).toLocaleDateString()}</p>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{item.title}</h3>
                {item.excerpt && <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.excerpt}</p>}
                <Link href={`/news/${item.slug}`} className="inline-block mt-3 text-accent hover:text-[#b00226] font-medium text-sm">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/news" className="inline-block bg-accent hover:bg-[#b00226] text-white font-semibold py-2 px-6 rounded-full shadow-lg shadow-accent/30 transition">
            View All News
          </Link>
        </div>
      </div>
    </section>
  );
}
