import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Destinations from "@/components/sections/Destinations";
import DealsSlider from "@/components/sections/DealsSlider";
import ProductsSlider from "@/components/sections/ProductsSlider";
import Stats from "@/components/sections/Stats";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <DealsSlider />
      <ProductsSlider />

      {/* Loyalty, Cargo, Charter Cards */}
      <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-10">Explore More <span className="text-rose-500">Services</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/loyalty" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition hover:bg-white/10">
              <div className="text-4xl mb-3">🏅</div>
              <h3 className="text-xl font-bold text-white">Loyalty Program</h3>
              <p className="text-slate-400 text-sm mt-1">Earn miles, redeem rewards, enjoy exclusive benefits.</p>
              <span className="inline-block mt-4 text-rose-400 group-hover:translate-x-1 transition">Learn More →</span>
            </Link>
            <Link href="/cargo" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition hover:bg-white/10">
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-xl font-bold text-white">Cargo Services</h3>
              <p className="text-slate-400 text-sm mt-1">Reliable freight solutions across our global network.</p>
              <span className="inline-block mt-4 text-rose-400 group-hover:translate-x-1 transition">Learn More →</span>
            </Link>
            <Link href="/charter" className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-rose-500/30 transition hover:bg-white/10">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="text-xl font-bold text-white">Charter Flights</h3>
              <p className="text-slate-400 text-sm mt-1">Customized travel for groups, businesses, and special occasions.</p>
              <span className="inline-block mt-4 text-rose-400 group-hover:translate-x-1 transition">Learn More →</span>
            </Link>
          </div>
        </div>
      </section>

      <Stats />
      <Footer />
    </main>
  );
}
