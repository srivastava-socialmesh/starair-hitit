import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Awards from "@/components/sections/Awards";
import Image from "next/image";
import { Suspense } from "react";
import { createServerClient } from "@/lib/supabase/server";

// Content components
import BookingPanel from "@/components/BookingPanel";
import DealsGrid from "@/components/sections/DealsGrid";
import ElectronicServices from "@/components/sections/ElectronicServices";
import TravelInformation from "@/components/sections/TravelInformation";
import OurCompany from "@/components/sections/OurCompany";
import OtherWebsites from "@/components/sections/OtherWebsites";
import QuickLinks from "@/components/sections/QuickLinks";
import SectionHeader from "@/components/SectionHeader";

// Re-export for use in page
export const dynamic = "force-dynamic";

// Function to get tab content based on active tab
function getTabContent(tab: string) {
  switch (tab) {
    case "flights":
      return {
        left: <BookingPanel />,
        right: (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
              <h3 className="text-sm font-display uppercase tracking-wider text-accent mb-1">
                NEW BOEING 787
              </h3>
              <p className="text-white font-semibold text-lg leading-tight">
                This is how Latin America connects with the future
              </p>
              <p className="text-text-secondary text-sm mt-1">
                Live the experience
              </p>
              <button className="mt-3 bg-accent hover:bg-accent-dark text-white px-4 py-1.5 rounded-full text-sm font-medium transition">
                Learn more →
              </button>
            </div>
            <QuickLinks />
          </div>
        ),
        showSections: true,
      };
    case "deals":
      return {
        left: <DealsGrid />,
        right: <QuickLinks />,
        showSections: false,
      };
    case "electronic-services":
      return {
        left: <ElectronicServices />,
        right: <QuickLinks />,
        showSections: false,
      };
    case "travel-info":
      return {
        left: <TravelInformation />,
        right: <QuickLinks />,
        showSections: false,
      };
    case "our-company":
      return {
        left: <OurCompany />,
        right: <QuickLinks />,
        showSections: false,
      };
    case "other-websites":
      return {
        left: <OtherWebsites />,
        right: <QuickLinks />,
        showSections: false,
      };
    default:
      return {
        left: <BookingPanel />,
        right: (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
              <h3 className="text-sm font-display uppercase tracking-wider text-accent mb-1">
                NEW BOEING 787
              </h3>
              <p className="text-white font-semibold text-lg leading-tight">
                This is how Latin America connects with the future
              </p>
              <p className="text-text-secondary text-sm mt-1">
                Live the experience
              </p>
              <button className="mt-3 bg-accent hover:bg-accent-dark text-white px-4 py-1.5 rounded-full text-sm font-medium transition">
                Learn more →
              </button>
            </div>
            <QuickLinks />
          </div>
        ),
        showSections: true,
      };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab || "flights";
  const content = getTabContent(activeTab);

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
            alt="Star Air"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Find your <span className="gradient-text">perfect flight</span>
            </h1>
            <p className="text-text-secondary text-lg mt-1">
              Search, compare, and book with Star Air.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">{content.left}</div>
            <div className="space-y-4">{content.right}</div>
          </div>
        </div>
      </section>

      {/* Optional Sections (only for Flights tab) */}
      {content.showSections && (
        <Suspense fallback={null}>
          <SectionsBelow />
        </Suspense>
      )}

      <Awards />
      <Footer />
    </main>
  );
}

// Separate component for sections below hero
async function SectionsBelow() {
  const supabase = await createServerClient();

  // Fetch destinations
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .limit(6);

  // Fetch deals
  const { data: deals } = await supabase
    .from("deals")
    .select("*")
    .eq("is_active", true)
    .limit(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
      {/* Destinations */}
      <section>
        <SectionHeader title="Popular Destinations" subtitle="Most loved routes" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
          {destinations?.map((dest) => (
            <div key={dest.id} className="glass rounded-xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
              <div className="relative h-40">
                <Image
                  src={dest.image_url || "/placeholder-dest.jpg"}
                  alt={dest.city}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <h4 className="text-white font-bold">{dest.city}</h4>
                  <p className="text-text-secondary text-xs">{dest.country}</p>
                </div>
                {dest.price && (
                  <span className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs font-bold text-accent">
                    ₹{dest.price}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section>
        <SectionHeader title="Special Offers" subtitle="Exclusive deals for you" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {deals?.map((deal) => (
            <div key={deal.id} className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
              <div className="relative h-48">
                <Image
                  src={deal.image_url}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  unoptimized
                />
                {deal.discount_percent > 0 && (
                  <span className="absolute top-3 right-3 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                    {deal.discount_percent}% OFF
                  </span>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-white font-bold group-hover:text-accent transition">{deal.title}</h4>
                <p className="text-text-secondary text-sm mt-1 line-clamp-2">{deal.description}</p>
                <span className="inline-block mt-2 text-accent text-sm font-medium">Book now →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Fly Us */}
      <section>
        <SectionHeader title="Why Fly Us" subtitle="We're different" />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
          {[
            { icon: "🛡️", title: "Safety", desc: "World-class standards" },
            { icon: "⏰", title: "On Time", desc: "High on-time performance" },
            { icon: "💰", title: "Affordable", desc: "Best prices" },
            { icon: "📏", title: "Spacious", desc: "Comfortable seating" },
            { icon: "📍", title: "Regional", desc: "Connecting India" },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-4 text-center border border-white/10 hover:border-accent/30 transition group">
              <div className="text-3xl mb-2">{item.icon}</div>
              <h4 className="text-white font-bold text-sm">{item.title}</h4>
              <p className="text-text-secondary text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
