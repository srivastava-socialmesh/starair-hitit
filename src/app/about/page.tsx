import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Users, MapPin, Plane, Award } from "lucide-react";

export const metadata = {
  title: "About Star Air – Corporate Overview",
  description:
    "Star Air, the aviation arm of Sanjay Ghodawat Group, connecting Real India since 2019. Learn about our mission, fleet, and group legacy.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/Aircraft_Tail.jpg"
            alt="Star Air Aircraft"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-accent text-sm font-semibold uppercase tracking-widest bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4 border border-white/20">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Who We <span className="text-accent">Are</span>
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Connecting Real India with Secure, Swift, Spacious, Sincere, and Sustainable air service.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">Star Air</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Company Overview
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full mt-4 mb-6" />
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  Star Air, the aviation arm of <strong>Sanjay Ghodawat Group (SGG)</strong>,
                  commenced its commercial operations in <strong>2019</strong> with a mission to
                  <strong> “Connect Real India” </strong> by making air travel affordable and
                  convenient for the Indian populace.
                </p>
                <p>
                  Since its inception, Star Air has won the trust and hearts of close to
                  <strong> 3.0 million flyers </strong> across <strong>31 destinations</strong> in India
                  with its promise of Secure, Swift, Spacious, Sincere, and Sustainable air service.
                </p>
                <p>
                  Currently, Star Air operates a fleet of <strong>12 aircraft</strong>, including
                  8 Embraer E175s and 4 Embraer E145s, and is looking to expand the fleet to
                  <strong> 25 aircraft </strong> over the next 36 months.
                </p>
                <p>
                  It was awarded <strong>‘Best Airline – Regional/UDAN Connectivity’</strong> at
                  Wings India in 2026.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-accent">3M+</div>
                <div className="text-sm text-gray-600 mt-1">Flyers</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-accent">31</div>
                <div className="text-sm text-gray-600 mt-1">Destinations</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-accent">12</div>
                <div className="text-sm text-gray-600 mt-1">Aircraft</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl font-bold text-accent">2026</div>
                <div className="text-sm text-gray-600 mt-1">Wings India Award</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Group Overview */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">Sanjay Ghodawat Group</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                Group Overview
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full mt-4 mb-6" />
              <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                <p>
                  <strong>Sanjay Ghodawat Group (SGG)</strong> is a diversified conglomerate with
                  operations spanning various high-value business verticals such as
                  <strong> Aviation, Consumer Products, Education, Energy, Realty, and Retail</strong>.
                </p>
                <p>
                  Since its founding in <strong>1993</strong>, SGG has witnessed impressive growth
                  under the splendid stewardship of its Founder and Chairman,
                  <strong> Mr. Sanjay Ghodawat</strong>.
                </p>
                <p>
                  It has a strong base of millions of customers globally, with an employee strength of
                  over <strong>11,000</strong> and a student base of over <strong>21,000</strong>.
                </p>
                <p>
                  SGG is moving ahead with great vigor and bringing significant changes in people's
                  lives with its wide range of high-quality products and services.
                </p>
                <a
                  href="https://www.ghodawat.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-[#b00226] font-semibold transition"
                >
                  Visit Group Website →
                </a>
              </div>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
                <div className="text-4xl font-bold text-accent">11K+</div>
                <div className="text-sm text-gray-600 mt-1">Employees</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm">
                <div className="text-4xl font-bold text-accent">21K+</div>
                <div className="text-sm text-gray-600 mt-1">Students</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center shadow-sm col-span-2">
                <div className="text-4xl font-bold text-accent">1993</div>
                <div className="text-sm text-gray-600 mt-1">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Join the Star Air Family</h2>
          <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
            Experience the difference of flying with India's most trusted regional airline.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/flight-status"
              className="bg-white text-accent hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition shadow-lg"
            >
              Check Flight Status
            </a>
            <a
              href="/careers"
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-semibold transition border border-white/30"
            >
              Explore Careers
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
