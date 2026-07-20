import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/ApplicationForm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CareerDetailPage({ params }: { params: { slug: string } }) {
  const supabase = await createServerClient();

  // Get job by job_id (slug)
  const { data: job, error } = await supabase
    .from("careers")
    .select("*")
    .eq("job_id", params.slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        <Link href="/careers" className="text-accent hover:text-[#b00226] text-sm font-medium inline-flex items-center gap-1">
          ← Back to Careers
        </Link>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{job.job_id}</span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{job.title}</h1>
          </div>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <span>🏢 {job.department}</span>
            <span>📍 {job.location}</span>
            <span>💼 {job.employment_type}</span>
            <span>📅 Posted: {new Date(job.posted_date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Job Description</h2>
              <p className="text-gray-700 mt-2 whitespace-pre-wrap">{job.description}</p>
            </div>

            {job.responsibilities && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Key Responsibilities</h2>
                <div className="text-gray-700 mt-2 whitespace-pre-wrap">{job.responsibilities}</div>
              </div>
            )}

            {job.requirements && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Requirements</h2>
                <div className="text-gray-700 mt-2 whitespace-pre-wrap">{job.requirements}</div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900">Quick Apply</h3>
              <p className="text-sm text-gray-600 mt-1">Fill in your details and attach your resume.</p>
              <ApplicationForm jobId={job.job_id} careerId={job.id} jobTitle={job.title} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
