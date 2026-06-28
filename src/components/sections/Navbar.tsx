"use client";
import { useState, useEffect } from "react";
import { Plane, Menu, X, Crown } from "lucide-react";

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
        <div className="flex items-center gap-3">
          <div className="relative">
            <Plane className="text-amber-400" size={32} fill="#fcd34d" />
            <Crown className="absolute -top-2 -right-2 text-amber-400" size={14} />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent hidden sm:block">
            StarAir
          </span>
        </div>

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
