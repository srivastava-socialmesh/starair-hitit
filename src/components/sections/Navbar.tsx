"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Globe } from "lucide-react";

const LOGO_URL =
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

const tabs = [
  { id: "flights", label: "Flights" },
  { id: "deals", label: "Deals and offers" },
  { id: "electronic-services", label: "Electronic services", hasDropdown: true },
  { id: "travel-info", label: "Travel information", hasDropdown: true },
  { id: "our-company", label: "Our company", hasDropdown: true },
  { id: "other-websites", label: "Other websites", hasDropdown: true },
];

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "flights";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

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

  const handleTabClick = (tabId: string) => {
    router.push(`/?tab=${tabId}`);
    setIsMobileMenuOpen(false);
  };

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
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/?tab=flights" className="relative w-32 h-10 sm:w-40 sm:h-12 flex-shrink-0">
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

          {/* Desktop Tabs */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1 transition-colors ${
                    activeTab === tab.id
                      ? "text-accent"
                      : "text-text-secondary hover:text-accent"
                  }`}
                >
                  {tab.label}
                  {tab.hasDropdown && <ChevronDown size={14} />}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side: Language */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 glass rounded-full px-3 py-1.5 border border-white/10">
              <Globe size={14} className="text-text-muted" />
              <span className="text-xs text-text-secondary font-medium">English</span>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-text-primary ml-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-dark border-t border-white/10 p-4 backdrop-blur-xl">
          <ul className="flex flex-col gap-3 text-sm">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1 transition-colors w-full text-left ${
                    activeTab === tab.id
                      ? "text-accent"
                      : "text-text-secondary hover:text-accent"
                  }`}
                >
                  {tab.label}
                  {tab.hasDropdown && <ChevronDown size={14} />}
                </button>
              </li>
            ))}
            <li className="pt-2 border-t border-white/5 flex items-center gap-2 text-text-muted">
              <Globe size={14} /> English
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
