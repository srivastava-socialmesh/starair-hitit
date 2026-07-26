"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Globe, ChevronDown } from "lucide-react";

const LOGO_URL =
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";

const navItems = [
  { name: "Flights", href: "/", dropdown: true },
  { name: "Deals", href: "/deals", dropdown: false },
  { name: "Services", href: "/services", dropdown: false },
  { name: "Travel", href: "/travel-info", dropdown: false },
  { name: "Company", href: "/about", dropdown: false },
  { name: "Other", href: "#", dropdown: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <div className="h-16 sm:h-20 flex items-center justify-between">
          {/* Logo + Navigation Links (now combined) */}
          <div className="flex items-center gap-6">
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

            {/* Navigation Links */}
            <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`transition-colors ${
                      pathname === item.href
                        ? "text-accent"
                        : "text-text-secondary hover:text-accent"
                    } ${item.dropdown ? "flex items-center gap-1" : ""}`}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown size={14} />}
                  </Link>
                  {item.dropdown && (
                    <div className="absolute left-0 mt-2 w-56 glass rounded-xl border border-white/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link href="/deals" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                        Deals and offers
                      </Link>
                      <Link href="/web-checkin" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                        Electronic services
                      </Link>
                      <Link href="/travel-info" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                        Travel information
                      </Link>
                      <Link href="/about" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                        Our company
                      </Link>
                      <Link href="#" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                        Other websites
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-1 glass rounded-full px-3 py-1.5 border border-white/10">
            <Globe size={14} className="text-text-muted" />
            <span className="text-xs text-text-secondary font-medium">English</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
