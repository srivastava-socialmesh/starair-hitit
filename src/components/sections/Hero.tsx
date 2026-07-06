"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlightSearch from "./FlightSearch";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')]"></div>

      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Brand Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.1]">
              <span className="block">Discover the</span>
              <span className="block text-rose-500 mt-1">Art of Travel</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-lg leading-relaxed">
              Experience luxury at 35,000 feet. Real‑time global inventory powered by Hitit middleware.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/80 tracking-wider">
              <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
              <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
              <span className="flex items-center gap-2">🏆 24 Awards</span>
            </div>
          </motion.div>

          {/* Right: Flight Search (will be placed inside a card) */}
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
    </section>
  );
}
