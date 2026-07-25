"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, Plane } from "lucide-react";
import Image from "next/image";

const LOGO_URL =
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/starair_logo.png";
const UDAN_LOGO_URL =
  "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/udan.png";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [udanError, setUdanError] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cmsPages, setCmsPages] = useState<{ slug: string; title: string }[]>([]);
  const [faresDropdownOpen, setFaresDropdownOpen] = useState(false);
  const [flightsDropdownOpen, setFlightsDropdownOpen] = useState(false);
  const [signDropdownOpen, setSignDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchCMSPages = async () => {
      const res = await fetch("/api/cms/pages");
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

  const fareServicePages = cmsPages.filter((p) =>
    ["fare-rules", "fraudulent-claims", "privacy-policy", "disclaimer"].includes(p.slug)
  );

  const isActive = (path: string) => pathname === path;

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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-between">
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
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent">✈️</span>
            )}
          </Link>

          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm lg:text-base font-medium ml-auto">
            {/* Flights Dropdown */}
            <li className="relative group">
              <button
                onClick={() => setFlightsDropdownOpen(!flightsDropdownOpen)}
                className={`flex items-center gap-1 transition-colors font-display tracking-wider uppercase text-xs ${
                  isActive("/flight-status") || isActive("/flight-schedule") || isActive("/web-checkin")
                    ? "text-accent"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                Flights <ChevronDown size={14} />
              </button>
              <div
                className={`absolute left-0 mt-2 w-56 glass rounded-xl border border-white/10 overflow-hidden transition-all duration-200 ${
                  flightsDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                } group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
              >
                <Link
                  href="/flight-schedule"
                  className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                  onClick={() => setFlightsDropdownOpen(false)}
                >
                  Flight Schedules
                </Link>
                <Link
                  href="/web-checkin"
                  className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                  onClick={() => setFlightsDropdownOpen(false)}
                >
                  Web Check-in
                </Link>
                <Link
                  href="/flight-status"
                  className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                  onClick={() => setFlightsDropdownOpen(false)}
                >
                  Flight Status
                </Link>
              </div>
            </li>

            {/* Fares And Services */}
            <li className="relative group">
              <button
                onClick={() => setFaresDropdownOpen(!faresDropdownOpen)}
                className={`flex items-center gap-1 transition-colors font-display tracking-wider uppercase text-xs ${
                  fareServicePages.some((p) => isActive(`/cms/${p.slug}`))
                    ? "text-accent"
                    : "text-text-secondary hover:text-accent"
                }`}
              >
                Fares & Services <ChevronDown size={14} />
              </button>
              <div
                className={`absolute left-0 mt-2 w-56 glass rounded-xl border border-white/10 overflow-hidden transition-all duration-200 ${
                  faresDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                } group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
              >
                {fareServicePages.length > 0 ? (
                  fareServicePages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/cms/${p.slug}`}
                      className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                      onClick={() => setFaresDropdownOpen(false)}
                    >
                      {p.title}
                    </Link>
                  ))
                ) : (
                  <Link
                    href="/fare-sheet"
                    className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition"
                    onClick={() => setFaresDropdownOpen(false)}
                  >
                    Fare Sheet
                  </Link>
                )}
              </div>
            </li>

            {/* Static links */}
            <li>
              <Link
                href="/about"
                className={`font-display tracking-wider uppercase text-xs transition-colors ${
                  isActive("/about") ? "text-accent" : "text-text-secondary hover:text-accent"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/charter"
                className={`font-display tracking-wider uppercase text-xs transition-colors ${
                  isActive("/charter") ? "text-accent" : "text-text-secondary hover:text-accent"
                }`}
              >
                Charters
              </Link>
            </li>
          </ul>

          {/* Right Side: Book a Flight + Sign In + UDAN */}
          <div className="flex items-center gap-3 lg:gap-4 ml-4">
            {/* NEW: Book a Flight CTA */}
            <Link
              href="/flight-status"
              className="hidden lg:flex items-center gap-1.5 bg-accent hover:bg-accent-dark text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-[0_0_20px_rgba(210,4,45,0.3)] hover:shadow-[0_0_30px_rgba(210,4,45,0.5)]"
            >
              <Plane size={14} />
              Book a Flight
            </Link>

            <div className="relative group">
              <button
                onClick={() => setSignDropdownOpen(!signDropdownOpen)}
                className="h-8 px-4 flex items-center rounded-full bg-gradient-to-r from-accent to-accent-dark text-white text-xs lg:text-sm font-semibold shadow-[0_0_20px_rgba(210,4,45,0.3)] hover:shadow-[0_0_30px_rgba(210,4,45,0.5)] transition duration-300 cursor-pointer"
              >
                <Sparkles size={14} className="mr-1.5" />
                Sign In <ChevronDown size={14} className="ml-1" />
              </button>
              <div
                className={`absolute right-0 mt-2 w-48 glass rounded-xl border border-white/10 overflow-hidden transition-all duration-200 ${
                  signDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                } group-hover:opacity-100 group-hover:visible group-hover:translate-y-0`}
              >
                <Link href="/login" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                  Sign In
                </Link>
                <Link href="/travel-agent-login" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                  Travel Agent Login
                </Link>
                <Link href="/corporate-login" className="block px-5 py-2.5 text-sm text-text-secondary hover:text-accent hover:bg-white/5 transition">
                  Corporate Login
                </Link>
              </div>
            </div>
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
                <span className="text-xs text-text-muted">UDAN</span>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-text-primary ml-auto glass p-2 rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden glass-dark border-t border-white/10 p-4 backdrop-blur-xl">
          <ul className="flex flex-col gap-3 text-sm font-medium">
            <li className="font-display text-text-secondary text-xs tracking-wider uppercase">Flights</li>
            <ul className="pl-3 border-l border-accent/30 space-y-1">
              <li>
                <Link href="/flight-schedule" className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                  Flight Schedules
                </Link>
              </li>
              <li>
                <Link href="/web-checkin" className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                  Web Check-in
                </Link>
              </li>
              <li>
                <Link href="/flight-status" className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                  Flight Status
                </Link>
              </li>
            </ul>

            <li className="font-display text-text-secondary text-xs tracking-wider uppercase mt-2">Fares & Services</li>
            <ul className="pl-3 border-l border-accent/30 space-y-1">
              {fareServicePages.length > 0 ? (
                fareServicePages.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/cms/${p.slug}`} className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                      {p.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/fare-sheet" className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                    Fare Sheet
                  </Link>
                </li>
              )}
            </ul>

            <li>
              <Link href="/about" className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="/charter" className="text-text-secondary hover:text-accent transition" onClick={() => setIsOpen(false)}>
                Charters
              </Link>
            </li>

            <li className="mt-2">
              <Link href="/flight-status" className="block text-center glass text-text-primary hover:text-accent px-4 py-2 rounded-lg transition" onClick={() => setIsOpen(false)}>
                <Plane size={16} className="inline mr-2" /> Book a Flight
              </Link>
            </li>
            <li>
              <Link href="/login" className="block text-center glass text-text-primary hover:text-accent px-4 py-2 rounded-lg transition" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
