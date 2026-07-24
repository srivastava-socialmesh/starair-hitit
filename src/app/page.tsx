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
import { FadeIn } from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section className="relative -mt-8 z-20">
        <FlightSearch />
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Exclusive <span className="text-accent">Deals</span>
            </h2>
          </FadeIn>
          <DealsSlider />
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our <span className="text-accent">Products</span>
            </h2>
          </FadeIn>
          <ProductsSlider />
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Popular <span className="text-accent">Destinations</span>
            </h2>
          </FadeIn>
          <Destinations />
        </div>
      </section>
      <section className="py-16 bg-accent/5">
        <div className="max-w-7xl mx-auto px-4">
          <Loyalty />
        </div>
      </section>
      <Stats />
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Latest <span className="text-accent">News</span>
            </h2>
          </FadeIn>
          <NewsFeed />
        </div>
      </section>
      <Footer />
    </main>
  );
}
