"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FlightSearch from "./FlightSearch";

const bannerImages = [
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/1782735068025.png",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/1782735011290.png",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url(${bannerImages[currentIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Bottom gradient for readability */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>

      {/* Gold Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 z-10 mt-20">
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

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white drop-shadow-lg">Discover the</span>
            <br />
            <span className="text-gradient-gold drop-shadow-lg">Art of Travel</span>
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed drop-shadow-lg">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-white uppercase tracking-wider drop-shadow-lg">
            <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
            <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
            <span className="flex items-center gap-2">🏆 24 Awards</span>
          </div>
        </motion.div>

        {/* FlightSearch Component – fully transparent container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-5xl mx-auto mt-8 sm:mt-12"
        >
          <FlightSearch />
        </motion.div>
      </div>
    </section>
  );
}
