"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cmsPages, setCmsPages] = useState<{ slug: string; title: string }[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  const fareServicePages = cmsPages.filter(p =>
    ['fare-rules', 'fraudulent-claims', 'privacy-policy', 'disclaimer'].includes(p.slug)
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } bg-transparent`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo – larger size */}
        <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
          {!logoError ? (
            <Image
              src={LOGO_URL}
              alt="StarAir"
              fill
              className="object-contain"
              priority
              unoptimized
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-4xl font-bold text-red-500">✈️</span>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li className="text-white drop-shadow-lg hover:text-red-600 cursor-pointer transition-colors font-semibold">
            <Link href="/">Destinations</Link>
          </li>
          <li className="text-white drop-shadow-lg hover:text-red-600 cursor-pointer transition-colors font-semibold">
            <Link href="/">Deals</Link>
          </li>
          <li className="text-white drop-shadow-lg hover:text-red-600 cursor-pointer transition-colors font-semibold">
            <Link href="/flight-status">Flight Status</Link>
          </li>
          <li className="text-white drop-shadow-lg hover:text-red-600 cursor-pointer transition-colors font-semibold">
            <Link href="/">About</Link>
          </li>

          {fareServicePages.length > 0 && (
            <li className="relative group">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-white drop-shadow-lg hover:text-red-600 font-semibold transition-colors"
              >
                Fares & Services <ChevronDown size={16} />
              </button>
              <div className={`absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 ${
                dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              } group-hover:opacity-100 group-hover:visible`}>
                {fareServicePages.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/cms/${p.slug}`}
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </li>
          )}

          <li className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 rounded-full text-white font-bold shadow-lg shadow-red-700/30 transition-all hover:scale-105">
            Sign In
          </li>
        </ul>

        {/* Mobile toggle */}
        <button className="md:hidden text-white drop-shadow-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 p-6">
          <ul className="flex flex-col gap-4">
            <li className="text-white hover:text-red-600 font-semibold">
              <Link href="/" onClick={() => setIsOpen(false)}>Destinations</Link>
            </li>
            <li className="text-white hover:text-red-600 font-semibold">
              <Link href="/" onClick={() => setIsOpen(false)}>Deals</Link>
            </li>
            <li className="text-white hover:text-red-600 font-semibold">
              <Link href="/flight-status" onClick={() => setIsOpen(false)}>Flight Status</Link>
            </li>
            <li className="text-white hover:text-red-600 font-semibold">
              <Link href="/" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li className="text-white font-semibold">Fares & Services</li>
            <ul className="pl-4 border-l-2 border-red-300 space-y-1">
              {fareServicePages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/cms/${p.slug}`} className="text-sm text-gray-300 hover:text-red-400" onClick={() => setIsOpen(false)}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <li className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-800 rounded-full text-center text-white font-bold">
              Sign In
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
