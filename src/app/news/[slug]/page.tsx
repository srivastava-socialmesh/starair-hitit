import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerClient();
  const { data: item, error } = await supabase
    .from("news")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !item) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-6">
          <Link href="/news" className="text-red-600 hover:text-red-700 text-sm">← Back to News</Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{item.title}</h1>
        <p className="text-gray-500 mt-2">
          {new Date(item.published_date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>

        {item.image_url && (
          <div className="relative w-full h-64 md:h-96 mt-4">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover rounded-xl"
              unoptimized
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-gray-700 mt-6"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
      <Footer />
    </main>
  );
}
