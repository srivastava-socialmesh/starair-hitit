"use client";
import Link from "next/link";
import { Plane, Ticket, Clock, Phone, User, Award } from "lucide-react";

const links = [
  { icon: Plane, label: "LifeMiles", href: "/loyalty" },
  { icon: Plane, label: "Web Check-In", href: "/web-checkin" },
  { icon: Plane, label: "Flight status", href: "/flight-status" },
  { icon: Ticket, label: "Ticket status", href: "/manage-booking" },
  { icon: Clock, label: "Check itineraries", href: "/itinerary" },
  { icon: Phone, label: "Contact us", href: "/contact" },
  { icon: User, label: "Frequent flyer", href: "/loyalty" },
];

export default function QuickLinks() {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10 space-y-4 w-full max-w-xs">
      <h3 className="text-sm font-display uppercase tracking-wider text-text-muted">
        Quick Access
      </h3>
      <ul className="space-y-2">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <li key={i}>
              <Link
                href={link.href}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition group"
              >
                <Icon size={16} className="text-accent group-hover:scale-110 transition" />
                <span className="text-sm text-text-secondary group-hover:text-white transition">
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
