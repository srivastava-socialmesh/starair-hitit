import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CMSPage({ params }: { params: { slug: string } }) {
  // Debug: Log the slug
  console.log("Slug requested:", params.slug);

  const supabase = await createServerClient();
  const { data: page, error } = await supabase
    .from("cms_pages")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !page) {
    console.log("Page not found:", params.slug);
    notFound();
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
