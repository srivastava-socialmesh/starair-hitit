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
      className="relative min-h-screen flex items-center overflow-hidden transition-all duration-1000 ease-in-out"
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

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mt-20 lg:mt-0">
        {/* Left Column – Flight Search */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <FlightSearch />
        </motion.div>

        {/* Right Column – Brand Messaging */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left lg:text-right space-y-4"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 backdrop-blur-sm">
            <Sparkles className="text-amber-400" size={16} />
            <span className="text-amber-300 text-xs font-semibold uppercase tracking-widest">
              Premium Partner • Hitit Middleware
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
            <span className="text-white drop-shadow-lg">Discover the</span>
            <br />
            <span className="text-gradient-gold drop-shadow-lg">Art of Travel</span>
          </h1>

          <p className="text-white text-base sm:text-lg max-w-lg lg:ml-auto leading-relaxed drop-shadow-lg">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>

          <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-white uppercase tracking-wider drop-shadow-lg lg:justify-end">
            <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
            <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
            <span className="flex items-center gap-2">🏆 24 Awards</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
