"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

// 🔁 Replace this with your actual Supabase public URL
const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logos/starair-logo.png";

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
        {/* Logo only – no text */}
        <div className="relative w-12 h-12 md:w-14 md:h-14">
          <Image
            src={LOGO_URL}
            alt="StarAir"
            fill
            className="object-contain"
            priority
            onError={(e) => {
              // Fallback if image fails – show a simple placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Optionally show a text fallback
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('span');
                fallback.className = 'text-2xl font-bold text-amber-400';
                fallback.textContent = '✈️ StarAir';
                parent.appendChild(fallback);
              }
            }}
          />
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
