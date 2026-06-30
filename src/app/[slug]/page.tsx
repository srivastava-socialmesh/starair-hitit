// src/app/[slug]/page.tsx
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export default async function CMSPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerClient();
  const { data: page, error } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{page.title}</h1>
        <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </main>
  );
}
