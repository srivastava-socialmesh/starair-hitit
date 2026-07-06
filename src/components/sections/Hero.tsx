"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlightSearch from "./FlightSearch";

const banners = [
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png",
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/1783333.png",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let loaded = 0;
    banners.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === banners.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === banners.length) setImagesLoaded(true);
      };
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center bg-slate-900">
      {/* Background banner images – NO OVERLAY */}
      <div className="absolute inset-0 -z-10">
        {banners.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.style.backgroundColor = "#1e293b";
                }
              }}
            />
          </div>
        ))}
        {/* Remove overlay or keep very light – we'll remove entirely */}
      </div>

      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent z-10"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Brand Message – with text shadow for readability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1] drop-shadow-lg">
              <span className="block">Discover the</span>
              <span className="block text-rose-500 mt-1">Art of Travel</span>
            </h1>
            <p className="text-lg text-white max-w-lg leading-relaxed drop-shadow-lg">
              Experience luxury at 35,000 feet. Real‑time global inventory powered by Hitit middleware.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white tracking-wider drop-shadow-md">
              <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
              <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
              <span className="flex items-center gap-2">🏆 24 Awards</span>
            </div>
          </motion.div>

          {/* Right: Flight Search – sits on top of banners */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <FlightSearch />
          </motion.div>
        </div>
      </div>

      {/* Navigation dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-rose-500 w-8" : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
