"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

// ⚠️ Replace this URL with your actual public logo URL
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
        {/* Logo – only image, no text */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
          <Image
            src={LOGO_URL}
            alt="StarAir"
            fill
            className="object-contain"
            priority
            onError={(e) => {
              // If logo fails, show a fallback text
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('span');
                fallback.className = 'text-2xl font-bold text-amber-400';
                fallback.textContent = '✈️';
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        {/* Desktop Menu – now using blood red/amber colors */}
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {["Destinations", "Deals", "Flight Status", "About"].map((item) => (
            <li key={item} className="text-amber-400 hover:text-red-600 cursor-pointer transition-colors font-semibold">
              {item}
            </li>
          ))}
          <li className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 rounded-full text-white font-bold shadow-lg shadow-red-700/30 transition-all hover:scale-105">
            Sign In
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-amber-500/10 p-6">
          <ul className="flex flex-col gap-4">
            {["Destinations", "Deals", "Flight Status", "About"].map((item) => (
              <li key={item} className="text-amber-400 hover:text-red-600 cursor-pointer transition font-semibold">
                {item}
              </li>
            ))}
            <li className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 rounded-full text-center text-white font-bold">
              Sign In
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
