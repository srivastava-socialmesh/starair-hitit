"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlightSearch from "./FlightSearch";

const bannerImages = [
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/1783333.png",
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
      className="relative min-h-[100svh] overflow-hidden bg-gradient-light"
      style={{
        backgroundImage: `url(${bannerImages[currentIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-white/30 z-5"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/70 to-transparent pointer-events-none z-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent z-10"></div>

      <div className="relative z-10 w-full min-h-[100svh] grid grid-cols-1 lg:grid-cols-2 items-start gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-8 lg:px-16 xl:px-24 pt-20 sm:pt-24 lg:pt-20 pb-8 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-start items-start text-left space-y-3 sm:space-y-4 pt-8 sm:pt-12"
        >
          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-900">
            <span className="drop-shadow-sm block text-left">Discover the</span>
            <span className="text-accent drop-shadow-sm block text-right">Art of Travel</span>
          </h1>
          <p className="text-gray-800 text-sm sm:text-base max-w-xl leading-relaxed font-medium drop-shadow-lg bg-white/30 backdrop-blur-sm p-2 rounded-lg">
            Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
          </p>
          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-800 uppercase tracking-wider font-semibold drop-shadow-lg bg-white/30 backdrop-blur-sm p-2 rounded-lg">
            <span className="flex items-center gap-1.5">⭐ 4.9/5 Rating</span>
            <span className="flex items-center gap-1.5">✈️ 120+ Destinations</span>
            <span className="flex items-center gap-1.5">🏆 24 Awards</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full mt-0"
        >
          <FlightSearch />
        </motion.div>
      </div>
    </section>
  );
}
