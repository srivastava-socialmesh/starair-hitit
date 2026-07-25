import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FlightSearchAvianca from "@/components/sections/FlightSearchAvianca";
import QuickLinks from "@/components/sections/QuickLinks";
import Awards from "@/components/sections/Awards";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import GlowButton from "@/components/GlowButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark relative">
      <Navbar />

      {/* Hero / Main Content */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png"
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: Search */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
                  Find your <span className="gradient-text">perfect flight</span>
                </h1>
                <p className="text-text-secondary text-lg mb-6">
                  Search, compare, and book with Star Air.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <FlightSearchAvianca />
              </FadeIn>
            </div>

            {/* Right: Quick Links + Promo */}
            <div className="space-y-6">
              <FadeIn delay={0.2}>
                <QuickLinks />
              </FadeIn>
              <FadeIn delay={0.3}>
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
                  <Link
                    href="/charter"
                    className="inline-block mt-3 text-accent hover:text-accent-light text-sm font-medium transition"
                  >
                    Learn more →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <Awards />

      {/* Footer */}
      <Footer />
    </main>
  );
}
