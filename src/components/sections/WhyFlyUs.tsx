"use client";
import { Shield, Clock, DollarSign, Maximize, MapPin } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "Safety",
    desc: "World-class safety standards",
  },
  {
    icon: Clock,
    title: "On Time",
    desc: "High on-time performance",
  },
  {
    icon: DollarSign,
    title: "Affordable",
    desc: "Best prices for everyone",
  },
  {
    icon: Maximize,
    title: "Spacious",
    desc: "Comfortable seating",
  },
  {
    icon: MapPin,
    title: "Regional Connectivity",
    desc: "Connecting Real India",
  },
];

export default function WhyFlyUs() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {reasons.map((reason) => {
        const Icon = reason.icon;
        return (
          <div key={reason.title} className="glass rounded-2xl p-4 text-center border border-white/10 hover:border-accent/30 transition group">
            <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 transition">
              <Icon size={24} className="text-accent" />
            </div>
            <h4 className="text-white font-bold text-sm mt-3">{reason.title}</h4>
            <p className="text-text-secondary text-xs mt-1">{reason.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
