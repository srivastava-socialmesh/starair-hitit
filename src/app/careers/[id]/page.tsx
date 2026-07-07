import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CareerDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient();
  const { data: job, error } = await supabase
    .from("careers")
    .select("*")
    .eq("id", parseInt(params.id))
    .eq("is_active", true)
    .maybeSingle();

  if (error || !job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        <Link href="/careers" className="text-accent hover:text-[#b00226] text-sm font-medium mb-4 inline-block">← Back to Careers</Link>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span>🏢 {job.department}</span>
                <span>📍 {job.location}</span>
                <span>💼 {job.employment_type}</span>
                <span>📅 Posted {new Date(job.posted_date).toLocaleDateString()}</span>
              </div>
            </div>
            {job.application_link && (
              <a
                href={job.application_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent hover:bg-[#b00226] text-white font-semibold py-2 px-6 rounded-full text-sm transition shadow-md whitespace-nowrap"
              >
                Apply Now →
              </a>
            )}
          </div>

          <div className="mt-6 prose prose-lg max-w-none text-gray-700">
            <h3>About the Role</h3>
            <p>{job.description}</p>

            {job.requirements && (
              <>
                <h3>Requirements</h3>
                <div dangerouslySetInnerHTML={{ __html: job.requirements.replace(/\n/g, '<br/>') }} />
              </>
            )}

            {job.responsibilities && (
              <>
                <h3>Responsibilities</h3>
                <div dangerouslySetInnerHTML={{ __html: job.responsibilities.replace(/\n/g, '<br/>') }} />
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
