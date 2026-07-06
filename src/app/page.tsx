import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Destinations from "@/components/sections/Destinations";
import DealsSlider from "@/components/sections/DealsSlider";
import ProductsSlider from "@/components/sections/ProductsSlider";
import Loyalty from "@/components/sections/Loyalty";
import NewsFeed from "@/components/sections/NewsFeed";
import Stats from "@/components/sections/Stats";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <DealsSlider />
      <ProductsSlider />
      <Loyalty />

      <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Explore More <span className="text-rose-500">Services</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/group-booking" className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-rose-300 transition hover:shadow-md">
              <div className="text-4xl mb-3">👥</div>
              <h3 className="text-xl font-bold text-gray-900">Group Booking</h3>
              <p className="text-gray-500 text-sm mt-1">Plan travel for groups, corporates, and special events.</p>
              <span className="inline-block mt-4 text-rose-500 group-hover:translate-x-1 transition">Learn More →</span>
            </Link>
            <Link href="/cargo" className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-rose-300 transition hover:shadow-md">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-xl font-bold text-gray-900">Cargo Services</h3>
              <p className="text-gray-500 text-sm mt-1">Reliable freight solutions across our global network.</p>
              <span className="inline-block mt-4 text-rose-500 group-hover:translate-x-1 transition">Learn More →</span>
            </Link>
            <Link href="/charter" className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-rose-300 transition hover:shadow-md">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="text-xl font-bold text-gray-900">Charter Flights</h3>
              <p className="text-gray-500 text-sm mt-1">Customized travel for groups, businesses, and special occasions.</p>
              <span className="inline-block mt-4 text-rose-500 group-hover:translate-x-1 transition">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      <NewsFeed />
      <Stats />
      <Footer />
    </main>
  );
}
