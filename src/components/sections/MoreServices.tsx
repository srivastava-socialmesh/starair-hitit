"use client";
import Link from "next/link";
import { Users, Package, Plane } from "lucide-react";

const services = [
  {
    icon: Users,
    label: "Group Bookings",
    desc: "Special rates for groups of 10+ passengers",
    href: "/group-booking",
  },
  {
    icon: Plane,
    label: "Charters",
    desc: "Fly anywhere, anytime with private charters",
    href: "/charter",
  },
  {
    icon: Package,
    label: "Cargo Services",
    desc: "Reliable and safe cargo solutions",
    href: "/cargo",
  },
];

export default function MoreServices() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service) => {
        const Icon = service.icon;
        return (
          <Link key={service.label} href={service.href}>
            <div className="glass rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition group h-full flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Icon size={28} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-accent transition">
                {service.label}
              </h3>
              <p className="text-text-secondary text-sm mt-2">{service.desc}</p>
              <span className="mt-4 text-accent text-sm font-medium">Learn more →</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
