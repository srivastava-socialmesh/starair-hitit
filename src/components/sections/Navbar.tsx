"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Globe, ChevronDown, X } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import DealsGrid from "@/components/sections/DealsGrid";
import ElectronicServices from "@/components/sections/ElectronicServices";
import TravelInformation from "@/components/sections/TravelInformation";
import OurCompany from "@/components/sections/OurCompany";
import OtherWebsites from "@/components/sections/OtherWebsites";

const LOGO_URL =
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

const menuItems = [
  { id: "flights", label: "Flights", component: <BookingWidget /> },
  { id: "deals", label: "Deals and offers", component: <DealsGrid /> },
  { id: "electronic-services", label: "Electronic services", component: <ElectronicServices /> },
  { id: "travel-info", label: "Travel information", component: <TravelInformation /> },
  { id: "our-company", label: "Our company", component: <OurCompany /> },
  { id: "other-websites", label: "Other websites", component: <OtherWebsites /> },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

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

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
      dropdownTimeout.current = null;
    }
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

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
        {/* Top Row: Logo + Language + Mobile Toggle */}
        <div className="flex items-center justify-between h-14 sm:h-16">
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

          {/* Desktop Language */}
          <div className="hidden lg:flex items-center gap-1 glass rounded-full px-3 py-1.5 border border-white/10 flex-shrink-0">
            <Globe size={14} className="text-text-muted" />
            <span className="text-xs text-text-secondary font-medium">English</span>
          </div>

          {/* Mobile Toggle */}
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

        {/* Bottom Row: Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-center py-2 border-t border-white/5">
          <ul className="flex items-center gap-1 bg-white/5 rounded-full px-3 py-1 border border-white/10">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`flex items-center gap-0.5 px-4 py-1.5 rounded-full text-sm font-medium transition ${
                    activeDropdown === item.id
                      ? "bg-accent/20 text-white"
                      : "text-text-secondary hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                  <ChevronDown size={14} className="ml-0.5" />
                </button>

                {/* Dropdown */}
                {activeDropdown === item.id && (
                  <div
                    className="absolute left-0 top-full mt-2 w-[90vw] max-w-4xl glass rounded-2xl border border-white/10 p-6 shadow-2xl backdrop-blur-xl z-50"
                    onMouseEnter={() => {
                      if (dropdownTimeout.current) {
                        clearTimeout(dropdownTimeout.current);
                        dropdownTimeout.current = null;
                      }
                    }}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.component}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu (Full screen overlay) */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="lg:hidden fixed inset-0 top-14 sm:top-16 glass-dark backdrop-blur-xl z-40 overflow-y-auto"
          >
            <div className="p-6 space-y-2">
              {menuItems.map((item) => (
                <div key={item.id} className="border-b border-white/5 pb-3">
                  <button
                    className="flex items-center justify-between w-full text-text-secondary hover:text-white py-2"
                    onClick={() => {
                      // For mobile, we can navigate or toggle sub-content
                      // For now, just close menu and go to the corresponding page
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="text-sm font-medium">{item.label}</span>
                    <ChevronDown size={16} />
                  </button>
                  {/* Mobile sub-content could be shown here if needed */}
                </div>
              ))}
              <div className="pt-4 flex items-center gap-2 text-text-muted text-sm">
                <Globe size={14} /> English
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
