import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Awards from "@/components/sections/Awards";
import TabBar from "@/components/TabBar";
import TabContent from "@/components/TabContent";
import ProductsSlider from "@/components/sections/ProductsSlider";
import DealsSlider from "@/components/sections/DealsSlider";
import MoreServices from "@/components/sections/MoreServices";
import NewsFeed from "@/components/sections/NewsFeed";
import Stats from "@/components/sections/Stats";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero / Top Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
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
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Find your <span className="gradient-text">perfect flight</span>
            </h1>
            <p className="text-text-secondary text-lg mt-1">
              Search, compare, and book with Star Air.
            </p>
          </div>
          <Suspense fallback={<div className="text-text-muted">Loading tabs...</div>}>
            <TabBar />
          </Suspense>
          <div className="mt-6">
            <Suspense fallback={<div className="text-text-muted">Loading content...</div>}>
              <TabContent />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Our Products" subtitle="Premium travel experiences" />
          <div className="mt-10">
            <ProductsSlider />
          </div>
        </div>
      </section>

      {/* Deals */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Exclusive Deals" subtitle="Handpicked offers" />
          <div className="mt-10">
            <DealsSlider />
          </div>
        </div>
      </section>

      {/* More Services */}
      <section className="py-20 bg-dark-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="More Services" subtitle="Group bookings, charter, cargo" />
          <div className="mt-10">
            <MoreServices />
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="Latest News" subtitle="Stay updated" />
          <div className="mt-10">
            <NewsFeed />
          </div>
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* Awards */}
      <Awards />

      <Footer />
    </main>
  );
}
