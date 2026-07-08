import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CMSPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const supabase = await createServerClient();
  const { data: page, error } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !page) {
    console.error("CMS error:", error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{page.title}</h1>
        <div
          className="prose prose-lg max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
      <Footer />
    </main>
  );
}
