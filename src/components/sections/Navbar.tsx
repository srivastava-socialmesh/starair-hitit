"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logos/starair-logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cmsPages, setCmsPages] = useState<{ slug: string; title: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch CMS pages
  useEffect(() => {
    const fetchCMSPages = async () => {
      const res = await fetch('/api/cms/pages');
      if (res.ok) {
        const data = await res.json();
        setCmsPages(data);
      }
    };
    fetchCMSPages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Separate CMS pages into categories if needed, but we'll just list them under "Fares & Services"
  const farePages = cmsPages.filter(p => p.slug === 'fare-rules' || p.slug === 'fraudulent-claims' || p.slug === 'privacy-policy' || p.slug === 'disclaimer');

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${isHidden ? "-translate-y-full" : "translate-y-0"} ${isScrolled ? "bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-md" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0">
          {!logoError ? (
            <Image src={LOGO_URL} alt="StarAir" fill className="object-contain" priority onError={() => setLogoError(true)} />
          ) : (
            <span className="text-3xl font-bold text-red-500">✈️</span>
          )}
        </div>

        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors font-semibold">Destinations</li>
          <li className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors font-semibold">Deals</li>
          <li className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors font-semibold">Flight Status</li>
          <li className="text-gray-700 hover:text-red-600 cursor-pointer transition-colors font-semibold">About</li>
          
          {/* Fares & Services Dropdown */}
          <li 
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-red-600 cursor-pointer transition-colors font-semibold">
              Fares & Services <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                {farePages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                  >
                    {page.title}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 rounded-full text-white font-bold shadow-lg shadow-red-700/30 transition-all hover:scale-105">
            Sign In
          </li>
        </ul>

        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 p-6">
          <ul className="flex flex-col gap-4">
            <li className="text-gray-700 hover:text-red-600 cursor-pointer transition font-semibold">Destinations</li>
            <li className="text-gray-700 hover:text-red-600 cursor-pointer transition font-semibold">Deals</li>
            <li className="text-gray-700 hover:text-red-600 cursor-pointer transition font-semibold">Flight Status</li>
            <li className="text-gray-700 hover:text-red-600 cursor-pointer transition font-semibold">About</li>
            <li className="text-gray-700 font-semibold">Fares & Services</li>
            <ul className="pl-4 border-l-2 border-red-300 space-y-2">
              {farePages.map((page) => (
                <li key={page.slug} className="text-gray-600 hover:text-red-600 cursor-pointer transition">
                  <Link href={`/${page.slug}`}>{page.title}</Link>
                </li>
              ))}
            </ul>
            <li className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 rounded-full text-center text-white font-bold">Sign In</li>
          </ul>
        </div>
      )}
    </nav>
  );
}
