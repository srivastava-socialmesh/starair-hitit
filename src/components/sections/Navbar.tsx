"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ChevronDown, X } from "lucide-react";

const LOGO_URL =
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

export const menuItems = [
  { id: "flights", label: "Flights" },
  { id: "deals", label: "Deals and offers" },
  { id: "electronic-services", label: "Electronic services" },
  { id: "travel-info", label: "Travel information" },
  { id: "our-company", label: "Our company" },
  { id: "other-websites", label: "Other websites" },
];

export default function Navbar({ activeMenu, onMenuChange }: { activeMenu: string; onMenuChange: (id: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled
          ? "glass-dark border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Logo + Nav Links + Language + Mobile Toggle */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
          <Link href="/" className="relative w-32 h-10 sm:w-40 sm:h-12 flex-shrink-0">
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
              <span className="text-2xl font-bold text-accent">✈️</span>
            )}
          </Link>

          {/* Desktop Navigation - Centered with max-width */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 border border-white/10 max-w-full overflow-x-auto">
              {menuItems.map((item) => (
                <li key={item.id} className="flex-shrink-0">
                  <button
                    onMouseEnter={() => onMenuChange(item.id)}
                    onClick={() => onMenuChange(item.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                      activeMenu === item.id
                        ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
                        : "text-text-secondary hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Language + Mobile Toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden lg:flex items-center gap-1 glass rounded-full px-3 py-1.5 border border-white/10">
              <Globe size={14} className="text-text-muted" />
              <span className="text-xs text-text-secondary font-medium">English</span>
            </div>
            <button
              className="lg:hidden text-text-primary p-1.5 glass rounded-lg"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-dark border-t border-white/10 p-4 backdrop-blur-xl">
            <ul className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onMenuChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition ${
                      activeMenu === item.id
                        ? "bg-accent text-white"
                        : "text-text-secondary hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/5 flex items-center gap-2 text-text-muted text-sm">
                <Globe size={14} /> English
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
