import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CareersPage() {
  const supabase = await createServerClient();
  const { data: jobs, error } = await supabase
    .from("careers")
    .select("*")
    .eq("is_active", true)
    .order("posted_date", { ascending: false });

  if (error) {
    console.error("Error fetching jobs:", error);
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 pt-24 sm:pt-28 lg:pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Join Our Team</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">Shape the <span className="text-accent">Future</span> of Aviation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
            We're looking for passionate individuals to join our growing family. Explore open positions and start your journey with StarAir.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-accent">{jobs?.length || 0}</div>
            <div className="text-sm text-gray-500 mt-1">Open Positions</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-accent">6</div>
            <div className="text-sm text-gray-500 mt-1">Departments</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-accent">12+</div>
            <div className="text-sm text-gray-500 mt-1">Locations</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-accent">4.8★</div>
            <div className="text-sm text-gray-500 mt-1">Employee Rating</div>
          </div>
        </div>

        {/* Job Listings */}
        {jobs && jobs.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No open positions at the moment. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs?.map((job) => (
              <div key={job.id} className="group bg-white rounded-2xl border border-gray-200 hover:border-accent shadow-sm hover:shadow-xl transition p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{job.job_id}</span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition">{job.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">🏢 {job.department}</span>
                      <span className="flex items-center gap-1">📍 {job.location}</span>
                      <span className="flex items-center gap-1">💼 {job.employment_type}</span>
                    </div>
                  </div>
                  <span className="bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full border border-accent/20">
                    {new Date(job.posted_date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-3 line-clamp-3">{job.description}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {job.requirements && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">📋 Requirements</span>
                  )}
                  {job.responsibilities && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">📌 Responsibilities</span>
                  )}
                </div>
                <div className="mt-4">
                  <Link
                    href={`/careers/${job.job_id}`}
                    className="inline-block bg-accent hover:bg-[#b00226] text-white font-semibold py-2 px-6 rounded-full text-sm transition shadow-md"
                  >
                    View Details
                  </Link>
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
