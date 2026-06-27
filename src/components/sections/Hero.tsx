"use client";
import { useState } from "react";
import { Plane, Calendar, Users, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/flights/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, date: "2026-07-01", passengers: 1 }),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Found ${data.offers.length} flights! Check console.`);
        console.log(data.offers);
      }
    } catch (err) {
      alert("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#1e3a8a,_#0f172a)]"></div>
      <div className="max-w-7xl w-full mx-auto">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="text-center">
          <span className="inline-block px-4 py-1 rounded-full glass text-cyan-300 text-sm font-semibold mb-4">✈️ Powered by Hitit Middleware</span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Explore the World <br /><span className="text-gradient">with StarAir</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mt-6">Real-time global inventory via Hitit. Book in seconds.</p>
        </motion.div>

        <motion.form initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
          onSubmit={handleSearch} className="glass rounded-3xl p-6 md:p-8 max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-cyan-300 text-sm font-semibold flex gap-2"><Plane size={16} /> From</label>
              <input type="text" placeholder="City/Airport" value={origin} onChange={(e) => setOrigin(e.target.value)} required
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label className="text-cyan-300 text-sm font-semibold flex gap-2"><Plane size={16} className="rotate-90" /> To</label>
              <input type="text" placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} required
                className="w-full bg-transparent border-b border-white/20 py-2 text-white focus:outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label className="text-cyan-300 text-sm font-semibold flex gap-2"><Calendar size={16} /> Date</label>
              <input type="date" required className="w-full bg-transparent border-b border-white/20 py-2 text-white [color-scheme:dark] focus:outline-none focus:border-cyan-400" />
            </div>
            <button type="submit" disabled={loading}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 font-bold py-3 px-6 rounded-xl hover:scale-105 transition shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Users size={18} />}
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
