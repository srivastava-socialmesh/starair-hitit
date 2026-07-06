import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function CargoPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">StarAir Cargo</h1>
        <p className="text-center text-rose-400 text-lg font-semibold mb-8">Reliable. Fast. Global.</p>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Ship Your Goods with Confidence</h2>
          <p className="text-slate-300 mb-6">
            StarAir Cargo offers seamless freight solutions across our extensive network. Whether it’s perishables, machinery, or e‑commerce packages, we ensure timely and secure delivery.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl mb-2">✈️</div>
              <h4 className="font-bold">Express</h4>
              <p className="text-sm text-slate-400">Same‑day delivery for urgent shipments</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl mb-2">📦</div>
              <h4 className="font-bold">Freight</h4>
              <p className="text-sm text-slate-400">Cost‑effective bulk cargo solutions</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center border border-white/10">
              <div className="text-3xl mb-2">🌡️</div>
              <h4 className="font-bold">Cold Chain</h4>
              <p className="text-sm text-slate-400">Temperature‑controlled logistics</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              <input type="text" placeholder="Cargo Type (e.g., Machinery, Perishables)" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Origin & Destination</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Origin" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="text" placeholder="Destination" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Dimensions & Weight</label>
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="Length (cm)" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="text" placeholder="Width (cm)" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="text" placeholder="Weight (kg)" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Additional Remarks</label>
              <textarea rows={3} className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" placeholder="Special handling instructions..."></textarea>
            </div>
            <button type="submit" className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-xl shadow-2xl shadow-rose-500/30 transition">
              Get a Quote
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
