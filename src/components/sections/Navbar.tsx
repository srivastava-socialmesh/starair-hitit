"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";
const UDAN_LOGO_URL = "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/udan.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [udanError, setUdanError] = useState(false);
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="h-16 sm:h-20 lg:h-24 flex items-center">
          {/* Logo – left */}
          <Link href="/" className="relative w-32 h-12 sm:w-40 sm:h-14 lg:w-48 lg:h-16 flex-shrink-0">
            {!logoError ? (
              <Image
                src={LOGO_URL}
                alt="Star Air"
                fill
                priority
                unoptimized
                className="object-contain object-left"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500">✈️</span>
            )}
          </Link>

          {/* Desktop Menu – aligned right with ml-auto, larger font, capitalize */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm lg:text-base font-medium ml-auto capitalize">
            <li className="text-white/90 hover:text-red-500 cursor-pointer transition-colors">
              <Link href="/">Destinations</Link>
            </li>
            <li className="text-white/90 hover:text-red-500 cursor-pointer transition-colors">
              <Link href="/">Deals</Link>
            </li>
            <li className="text-white/90 hover:text-red-500 cursor-pointer transition-colors">
              <Link href="/flight-status">Flight Status</Link>
            </li>
            <li className="text-white/90 hover:text-red-500 cursor-pointer transition-colors">
              <Link href="/">About</Link>
            </li>
            <li className="text-white/90 hover:text-red-500 cursor-pointer transition-colors">
              <Link href="/news">News</Link>
            </li>
            <li className="text-white/90 hover:text-rose-500 cursor-pointer transition-colors capitalize">
              <Link href="/loyalty">Loyalty</Link>
            </li>
            <li className="text-white/90 hover:text-rose-500 cursor-pointer transition-colors capitalize">
              <Link href="/cargo">Cargo</Link>
            </li>
            <li className="text-white/90 hover:text-rose-500 cursor-pointer transition-colors capitalize">
              <Link href="/charter">Charter</Link>
            </li>

            {fareServicePages.length > 0 && (
              <li className="relative group">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-white/90 hover:text-red-500 transition-colors capitalize"
                >
                  Fares & Services <ChevronDown size={14} />
                </button>
                <div className={`absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 ${
                  dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                } group-hover:opacity-100 group-hover:visible`}>
                  {fareServicePages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/cms/${p.slug}`}
                      className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              </li>
            )}
          </ul>

          {/* Right side: Sign In + Udan */}
          <div className="flex items-center gap-3 lg:gap-4 ml-4">
            <button className="h-7 px-3 flex items-center rounded-full bg-gradient-to-r from-red-700 to-red-600 text-white text-xs lg:text-sm font-semibold shadow-md hover:scale-105 transition duration-300 cursor-pointer">
              Sign In
            </button>

            <div className="relative w-12 h-10 sm:w-16 sm:h-12 flex-shrink-0">
              {!udanError ? (
                <Image
                  src={UDAN_LOGO_URL}
                  alt="Udan"
                  fill
                  className="object-contain"
                  unoptimized
                  onError={() => setUdanError(true)}
                />
              ) : (
                <span className="text-xs text-white/50">UDAN</span>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white ml-auto" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 p-4">
          <ul className="flex flex-col gap-3 text-sm capitalize">
            <li className="text-white/90 hover:text-red-500">
              <Link href="/" onClick={() => setIsOpen(false)}>Destinations</Link>
            </li>
            <li className="text-white/90 hover:text-red-500">
              <Link href="/" onClick={() => setIsOpen(false)}>Deals</Link>
            </li>
            <li className="text-white/90 hover:text-red-500">
              <Link href="/flight-status" onClick={() => setIsOpen(false)}>Flight Status</Link>
            </li>
            <li className="text-white/90 hover:text-red-500">
              <Link href="/" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li className="text-white/90 hover:text-red-500">
              <Link href="/news" onClick={() => setIsOpen(false)}>News</Link>
            </li>
            <li className="text-white/90">Fares & Services</li>
            <li className="text-white/90 hover:text-rose-500 cursor-pointer transition-colors capitalize">
              <Link href="/loyalty">Loyalty</Link>
            </li>
            <li className="text-white/90 hover:text-rose-500 cursor-pointer transition-colors capitalize">
              <Link href="/cargo">Cargo</Link>
            </li>
            <li className="text-white/90 hover:text-rose-500 cursor-pointer transition-colors capitalize">
              <Link href="/charter">Charter</Link>
            </li>

            <ul className="pl-3 border-l border-red-300 space-y-1">
              {fareServicePages.map((p) => (
                <li key={p.slug}>
                  <Link href={`/cms/${p.slug}`} className="text-gray-300 hover:text-red-400" onClick={() => setIsOpen(false)}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            <li className="px-4 py-1.5 bg-gradient-to-r from-red-700 to-red-800 rounded-full text-center text-white font-bold">
              Sign In
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
