import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Awards from "@/components/sections/Awards";
import TabBar from "@/components/TabBar";
import TabContent from "@/components/TabContent";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
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

          {/* Tabs */}
          <Suspense fallback={<div className="text-text-muted">Loading tabs...</div>}>
            <TabBar />
          </Suspense>

          {/* Tab Content */}
          <div className="mt-6">
            <Suspense fallback={<div className="text-text-muted">Loading content...</div>}>
              <TabContent />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Awards */}
      <Awards />

      <Footer />
    </main>
  );
}
