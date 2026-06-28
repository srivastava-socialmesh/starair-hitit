"use client";
import { useState, useEffect } from "react";
import { Menu, X, Crown } from "lucide-react";
import Image from "next/image";

// Replace this with your actual Supabase public URL
const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/StarAir_Logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-amber-500/10 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src={LOGO_URL}
              alt="StarAir Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent hidden sm:block">
            StarAir
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Destinations", "Deals", "Flight Status", "About"].map((item) => (
            <li key={item} className="text-slate-300 hover:text-amber-400 cursor-pointer transition-colors">
              {item}
            </li>
          ))}
          <li className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 rounded-full text-white font-bold shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
            Sign In
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-amber-500/10 p-6">
          <ul className="flex flex-col gap-4 text-slate-300">
            {["Destinations", "Deals", "Flight Status", "About"].map((item) => (
              <li key={item} className="hover:text-amber-400 cursor-pointer transition">
                {item}
              </li>
            ))}
            <li className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full text-center text-white font-bold">
              Sign In
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
