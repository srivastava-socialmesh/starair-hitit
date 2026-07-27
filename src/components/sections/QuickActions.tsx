"use client";
import Link from "next/link";
import { Plane, Clock, Ticket, Phone, Award } from "lucide-react";

const actions = [
  { icon: Plane, label: "Web Check-In", href: "/web-checkin" },
  { icon: Clock, label: "Flight Status", href: "/flight-status" },
  { icon: Ticket, label: "Manage Booking", href: "/manage-booking" },
  { icon: Award, label: "StarMiles", href: "/loyalty" },
  { icon: Phone, label: "Contact Us", href: "/contact" },
];

export default function QuickActions() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-4 relative z-20">
      <div className="glass rounded-2xl border border-white/10 p-3 shadow-lg">
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-text-secondary hover:text-accent hover:bg-white/5 transition group"
              >
                <Icon size={18} className="group-hover:scale-110 transition" />
                <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
