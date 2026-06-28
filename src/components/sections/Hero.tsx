"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, Search, Sparkles } from "lucide-react";

const bannerImages = [
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl82LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NTMxODYsImV4cCI6MTgxNDE4OTE4Nn0.9eMaYkm8Vjdz_JrXCYcGL9GGkRQN3g1UYibxm_5US3w",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl81LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NTMyMTQsImV4cCI6MTgxNDE4OTIxNH0.bsbxU_WOXdPYe4k1SdkvZoUPYnqKJwUOEB84U4Qgrfs",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_3.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl8zLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NTMyNDMsImV4cCI6MTgxNDE4OTI0M30.ul05CrO3CYyZEqY280JTIWwM8PkT3bqjA6CddN-BULk",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/sign/banners/Banner_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84YWExMDJhMC1lOTJhLTRlOGUtOWQ0OS02MWZmMTJmYWEyMGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJiYW5uZXJzL0Jhbm5lcl8xLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODI2NTMyNjMsImV4cCI6MTgxNDE4OTI2M30.GuGORT-Pu_1Cy7nsdYQILfpavhgoU6UlhBzm2baQpCY",
];

export default function Hero() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
        setIsVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Searching flights... (Connect to Hitit)");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with fade transition – NO OVERLAY */}
      <div
        className="absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${bannerImages[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Subtle gradient at the bottom only (for text readability) */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

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

          <h1 className="text-5xl md:text-8xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white drop-shadow-lg">Discover the</span>
            <br />
            <span className="text-gradient-gold drop-shadow-lg">Art of Travel</span>
          </h1>

          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed drop-shadow-lg">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-8 text-xs text-white uppercase tracking-wider drop-shadow-lg">
            <span>⭐ 4.9/5 Rating</span>
            <span>✈️ 120+ Destinations</span>
            <span>🏆 24 Awards</span>
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
              <label className="text-amber-400/80 text-xs uppercase tracking-wider font-bold">From</label>
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
              <label className="text-amber-400/80 text-xs uppercase tracking-wider font-bold">To</label>
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
              <label className="text-amber-400/80 text-xs uppercase tracking-wider font-bold">Date</label>
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
