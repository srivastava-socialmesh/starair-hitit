"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Search, Sparkles } from "lucide-react";

const bannerImages = [
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl82LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NDY3ODUsImV4cCI6MTgxNDE4Mjc4NX0.qPXOyO2Rf_hdSjf_da8Br9EDbd5T4fP61YW6jwVlfug",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl81LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NDY4MjgsImV4cCI6MTgxNDE4MjgyOH0.xXQJ3yAxemlUnE4emyAShMYjcMPmizWwOK1vO-qceOw",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl8zLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NDY4NjcsImV4cCI6MTgxNDE4Mjg2N30._azE-M3d7yL7OnTerZ4A2lHq_fu4szi2vZtAaiVmPUQ",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl8xLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NDY4OTgsImV4cCI6MTgxNDE4Mjg5OH0.rmg69OWx5gOnCsJXb3FCUmqIHCLyhYu1vQn-LxjVqds",
];

export default function Hero() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Searching flights... (Connect to Hitit)");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Pure CSS Scrolling Banner Background – NO OVERLAY */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="flex h-full w-[200%] animate-marquee">
          {bannerImages.map((img, index) => (
            <div
              key={index}
              className="h-screen w-screen flex-shrink-0"
              style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ))}
          {bannerImages.map((img, index) => (
            <div
              key={index + bannerImages.length}
              className="h-screen w-screen flex-shrink-0"
              style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          ))}
        </div>
        {/* Fallback background if images fail to load */}
        <div className="absolute inset-0 bg-[#0a0e1a] -z-20"></div>
      </div>

      {/* Gold Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-6 z-10 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm mb-6">
            <Sparkles className="text-amber-400" size={16} />
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest">
              Premium Partner • Hitit Middleware
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] tracking-tight text-shadow-lg">
            <span className="text-white">Discover the</span>
            <br />
            <span className="text-gradient-gold">Art of Travel</span>
          </h1>

          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed text-shadow-md">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-xs text-white uppercase tracking-wider text-shadow-sm">
            <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
            <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
            <span className="flex items-center gap-2">🏆 24 Awards</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-gold rounded-3xl p-8 max-w-5xl mx-auto mt-12"
        >
          <div className="flex bg-black/30 rounded-xl p-1 mb-6 w-fit mx-auto">
            {["Round Trip", "One Way", "Multi-City"].map((tab) => (
              <button
                key={tab}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:text-white data-[active=true]:bg-amber-500 data-[active=true]:text-white data-[active=true]:shadow-lg"
                data-active={tab === "Round Trip"}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-amber-400/80 text-xs uppercase tracking-wider font-bold">
                From
              </label>
              <div className="relative">
                <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
                <input
                  type="text"
                  placeholder="City or Airport"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b-2 border-amber-500/20 pl-10 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="text-amber-400/80 text-xs uppercase tracking-wider font-bold">
                To
              </label>
              <div className="relative">
                <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60 rotate-90" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full bg-white/5 border-b-2 border-amber-500/20 pl-10 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                />
              </div>
            </div>
            <div>
              <label className="text-amber-400/80 text-xs uppercase tracking-wider font-bold">
                Date
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
                <input
                  type="date"
                  className="w-full bg-white/5 border-b-2 border-amber-500/20 pl-10 py-3 text-white [color-scheme:dark] focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 group"
            >
              <Search size={18} />
              Explore Flights
              <span className="group-hover:translate-x-1 transition">→</span>
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
