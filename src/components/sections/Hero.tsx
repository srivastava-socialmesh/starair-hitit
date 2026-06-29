"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

      {/* Red Accent Line (changed from amber to red) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-10"></div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center mt-20 lg:mt-0">
        {/* Left Column – Flight Search (fully transparent) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <FlightSearch />
        </motion.div>

        {/* Right Column – Brand Messaging (justified to right edge) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-start lg:items-end justify-center space-y-4 h-full"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-right">
            <span className="text-white drop-shadow-lg">Discover the</span>
            <br />
            <span className="text-gradient-red drop-shadow-lg">Art of Travel</span>
          </h1>

          <p className="text-white text-base sm:text-lg max-w-md lg:text-right leading-relaxed drop-shadow-lg">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>

          <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-white uppercase tracking-wider drop-shadow-lg justify-start lg:justify-end w-full">
            <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
            <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
            <span className="flex items-center gap-2">🏆 24 Awards</span>
          </div>
        </motion.div>
      </div>

      {/* Add custom CSS for red gradient */}
      <style jsx>{`
        .text-gradient-red {
          background: linear-gradient(to right, #dc2626, #b91c1c, #991b1b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </section>
  );
}
