"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlightSearch from "./FlightSearch";

const bannerImages = [
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/IMG_20260702_183703.jpg",
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
      className="relative min-h-[100svh] overflow-hidden"
      style={{
        backgroundImage: `url(${bannerImages[currentIndex]})`,
        // Use "cover" to fill the container without stretching
        backgroundSize: "center",
        // Center the image to avoid clipping the aircraft
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        // Fallback color in case the image fails to load
        backgroundColor: "#0a0e1a",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#03142e]/80 via-[#06224a]/55 to-black/25"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent pointer-events-none z-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-10"></div>

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          w-full
          min-h-[100svh]
          grid
          grid-cols-1
          lg:grid-cols-2
          items-center
          gap-20
          px-8
          pt-28
          pb-12
        "
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full mt-12 lg:mt-20"
        >
          <FlightSearch />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center items-start text-left space-y-8 pt-16"
        >
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[0.95] tracking-tight">
            <span className="text-white drop-shadow-lg">Discover the </span>
            <span className="text-red-500 drop-shadow-lg">Art of Travel</span>
          </h1>

          <p className="text-white/95 text-xl max-w-xl leading-9 drop-shadow-lg">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>

          <div className="flex flex-wrap gap-10 text-xs sm:text-sm text-white uppercase tracking-wider drop-shadow-lg">
            <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
            <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
            <span className="flex items-center gap-2">🏆 24 Awards</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
