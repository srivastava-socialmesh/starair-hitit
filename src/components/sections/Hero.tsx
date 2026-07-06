"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FlightSearch from "./FlightSearch";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex items-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0a0e1a] via-[#1a1a2e] to-[#0a0e1a]">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_30%_20%,rgba(220,38,38,0.15),transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_70%_80%,rgba(251,191,36,0.1),transparent_60%)]"></div>
        {/* Glowing orbs following mouse */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] bg-red-500/10 transition-all duration-1000"
          style={{ left: `${mousePosition.x * 60}%`, top: `${mousePosition.y * 60}%` }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-amber-500/5 transition-all duration-1000"
          style={{ left: `${(1 - mousePosition.x) * 60}%`, top: `${(1 - mousePosition.y) * 60}%` }}
        />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 -z-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-40"></div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-10"></div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-28 sm:pt-32 lg:pt-24 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Flight Search */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <FlightSearch />
          </motion.div>

          {/* Right: Artistic Brand Messaging */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-start text-left space-y-4 pt-0 lg:pt-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.85] tracking-tight">
              <span className="text-white drop-shadow-2xl block">Discover the</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-amber-400 to-red-500 drop-shadow-2xl block -mt-2">Art of Travel</span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed drop-shadow-lg font-light">
              Experience luxury at 35,000 feet. Real-time global inventory powered by Hitit middleware.
            </p>

            <div className="flex flex-wrap gap-6 text-xs sm:text-sm text-white/90 uppercase tracking-widest drop-shadow-lg">
              <span className="flex items-center gap-2">⭐ 4.9/5 Rating</span>
              <span className="flex items-center gap-2">✈️ 120+ Destinations</span>
              <span className="flex items-center gap-2">🏆 24 Awards</span>
            </div>

            {/* Decorative element */}
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-amber-400 rounded-full mt-4"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
