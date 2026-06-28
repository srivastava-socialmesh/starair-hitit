"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Users, Search, ArrowRight } from "lucide-react";

export default function Hero() {
  const [activeTab, setActiveTab] = useState("round");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Searching flights... (Connect to Hitit)");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900 via-slate-900 to-black">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-20 animate-pulse"></div>
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 -z-10 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>

      <div className="max-w-7xl w-full mx-auto px-4 z-10 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider border border-cyan-500/30 backdrop-blur-sm">
            ✈️ Premium Partner • Hitit Middleware
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-6">
            Discover the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
              Art of Travel
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mt-4">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit.
          </p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 max-w-5xl mx-auto mt-10 shadow-2xl"
        >
          {/* Tabs */}
          <div className="flex bg-black/30 rounded-xl p-1 mb-6 w-fit mx-auto">
            {["Round Trip", "One Way", "Multi-City"].map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(tab.toLowerCase().replace(" ", ""))}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab.toLowerCase().replace(" ", "")
                    ? "bg-cyan-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-cyan-300 text-xs uppercase tracking-wider font-bold">
                From
              </label>
              <div className="relative">
                <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b-2 border-white/10 pl-10 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="text-cyan-300 text-xs uppercase tracking-wider font-bold">
                To
              </label>
              <div className="relative">
                <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 rotate-90" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b-2 border-white/10 pl-10 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="text-cyan-300 text-xs uppercase tracking-wider font-bold">
                Date
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  className="w-full bg-white/5 border-b-2 border-white/10 pl-10 py-3 text-white [color-scheme:dark] focus:border-cyan-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 transition hover:scale-105"
            >
              <Search size={18} /> Explore Flights <ArrowRight size={16} />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
