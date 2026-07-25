import Hero from "@/components/sections/Hero";
import FlightSearch from "@/components/sections/FlightSearch";
import DealsSlider from "@/components/sections/DealsSlider";
import ProductsSlider from "@/components/sections/ProductsSlider";
import Destinations from "@/components/sections/Destinations";
import Loyalty from "@/components/sections/Loyalty";
import NewsFeed from "@/components/sections/NewsFeed";
import Stats from "@/components/sections/Stats";
import Footer from "@/components/sections/Footer";
import Navbar from "@/components/sections/Navbar";
import SectionHeader from "@/components/SectionHeader";
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark relative">
      <Navbar />
      <Hero />

      {/* Flight Search - Overlapping */}
      <section className="relative -mt-16 z-20 px-4">
        <FlightSearch />
      </section>

      {/* Deals */}
      <section className="py-20 bg-dark relative">
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Exclusive Deals"
            subtitle="Handpicked offers for our valued customers"
          />
          <div className="mt-10">
            <DealsSlider />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-dark-secondary relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Our Products"
            subtitle="Premium travel experiences tailored for you"
          />
          <div className="mt-10">
            <ProductsSlider />
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-dark relative">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Popular Destinations"
            subtitle="Explore our most loved routes"
          />
          <div className="mt-10">
            <Destinations />
          </div>
        </div>
      </section>

      {/* Loyalty Program */}
      <section className="py-20 bg-dark-secondary relative">
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4">
          <Loyalty />
        </div>
      </section>

      {/* Stats */}
      <Stats />

      {/* News */}
      <section className="py-20 bg-dark relative">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            title="Latest News"
            subtitle="Stay updated with StarAir"
          />
          <div className="mt-10">
            <NewsFeed />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
