"use client";
import { useState, useEffect } from "react";
import { Plane, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold text-white">
          <Plane className="text-cyan-400" fill="cyan" />
          <span className="hidden sm:block">StarAir</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
          <li className="hover:text-cyan-400 cursor-pointer">Destinations</li>
          <li className="hover:text-cyan-400 cursor-pointer">Deals</li>
          <li className="hover:text-cyan-400 cursor-pointer">Flight Status</li>
          <li className="hover:text-cyan-400 cursor-pointer">About</li>
          <li className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-full text-white transition">
            Sign In
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10 p-6">
          <ul className="flex flex-col gap-4 text-slate-300">
            <li>Destinations</li>
            <li>Deals</li>
            <li>Flight Status</li>
            <li>About</li>
            <li className="px-4 py-2 bg-cyan-500 rounded-full text-center text-white">
              Sign In
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
