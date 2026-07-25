"use client";
import Link from "next/link";
import { Shield, Luggage, Users, AlertCircle } from "lucide-react";

const infoItems = [
  { icon: Shield, label: "Fare Rules", href: "/cms/fare-rules" },
  { icon: Luggage, label: "Luggage Info", href: "/cms/luggage-info" },
  { icon: Users, label: "Passenger Info", href: "/cms/passenger-info" },
  { icon: AlertCircle, label: "More Services", href: "/cms/more-services" },
];

export default function TravelInformation() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Travel Information</h2>
      <p className="text-text-secondary">Everything you need to know</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {infoItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.label} href={item.href} className="glass rounded-xl p-4 border border-white/10 hover:border-accent/30 transition flex items-center gap-3 group">
              <Icon size={20} className="text-accent" />
              <span className="text-white group-hover:text-accent transition font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
