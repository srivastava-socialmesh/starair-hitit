"use client";
import Link from "next/link";
import { Plane, Ticket, Clock, User, Phone, Award } from "lucide-react";

const items = [
  { icon: Plane, label: "Web Check-in", href: "/web-checkin" },
  { icon: Clock, label: "Flight Status", href: "/flight-status" },
  { icon: Ticket, label: "Manage Booking", href: "/manage-booking" },
  { icon: User, label: "My Trips", href: "/itinerary" },
  { icon: Phone, label: "Contact", href: "/contact" },
  { icon: Award, label: "Loyalty Program", href: "/loyalty" },
];

export default function QuickAccessCard() {
  return (
    <div className="glass rounded-2xl border border-white/10 p-4 max-w-4xl mx-auto -mt-8 relative z-20 shadow-card">
      <div className="flex flex-wrap justify-around gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-text-secondary hover:text-accent transition group px-3 py-2 rounded-xl hover:bg-white/5"
            >
              <Icon size={18} className="group-hover:scale-110 transition" />
              <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
