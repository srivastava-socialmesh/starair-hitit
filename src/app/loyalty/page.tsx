import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function LoyaltyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">StarAir Privilege Club</h1>
        <p className="text-center text-rose-400 text-lg font-semibold mb-8">Earn. Redeem. Enjoy.</p>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6 text-center border border-white/10">
              <div className="text-4xl mb-3">✈️</div>
              <h3 className="text-xl font-bold">Earn Miles</h3>
              <p className="text-slate-400 text-sm mt-1">Get miles on every flight, hotel stay, and car rental.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center border border-white/10">
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="text-xl font-bold">Redeem Rewards</h3>
              <p className="text-slate-400 text-sm mt-1">Use your miles for upgrades, free flights, and exclusive experiences.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-6 text-center border border-white/10">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-xl font-bold">Exclusive Benefits</h3>
              <p className="text-slate-400 text-sm mt-1">Priority check‑in, extra baggage, lounge access, and more.</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <h2 className="text-2xl font-bold mb-4">Join the Club</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                <input type="text" placeholder="Date of Birth" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Preferred Communication</label>
                <div className="flex flex-wrap gap-6">
                  <label className="flex items-center gap-2"><input type="checkbox" /> Email</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> SMS</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> WhatsApp</label>
                </div>
              </div>
              <button type="submit" className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-xl shadow-2xl shadow-rose-500/30 transition">
                Join Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
