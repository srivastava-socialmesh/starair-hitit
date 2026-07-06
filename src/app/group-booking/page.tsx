import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Link from "next/link";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function GroupBookingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-2">Group Booking</h1>
        <p className="text-center text-rose-400 text-lg font-semibold mb-8">Plan your group travel with ease.</p>

        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <p className="text-slate-300 mb-6">
            Whether you’re organising a corporate off‑site, a family reunion, or a study tour, our group booking service offers flexibility and great value. Fill in the details below and our team will get back to you shortly.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Group Name / Organisation</label>
                <input type="text" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Contact Person</label>
                <input type="text" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                <input type="email" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                <input type="tel" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Number of Passengers</label>
                <input type="number" min="10" placeholder="10+" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Travel Date</label>
                <input type="date" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-rose-500 outline-none transition" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1">Origin & Destination</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Origin" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                  <input type="text" placeholder="Destination" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-300 mb-1">Special Requests</label>
                <textarea rows={4} className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:border-rose-500 outline-none transition" placeholder="Meal preferences, wheelchair assistance, etc."></textarea>
              </div>
            </div>
            <button type="submit" className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-xl shadow-2xl shadow-rose-500/30 transition">
              Request a Quote
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </main>
  );
}
