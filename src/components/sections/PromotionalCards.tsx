"use client";
import Link from "next/link";
import { Gift, Award, Megaphone } from "lucide-react";

const cards = [
  {
    icon: Gift,
    title: "Latest Offers",
    desc: "Up to 40% off on selected routes",
    link: "/deals",
    color: "from-accent/20 to-transparent",
  },
  {
    icon: Award,
    title: "Awards",
    desc: "Best Regional Airline 2026",
    link: "/about",
    color: "from-amber-500/20 to-transparent",
  },
  {
    icon: Megaphone,
    title: "Announcement",
    desc: "New routes launching soon",
    link: "/news",
    color: "from-blue-500/20 to-transparent",
  },
];

export default function PromotionalCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Link key={card.title} href={card.link}>
            <div className={`glass rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition group relative overflow-hidden`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} pointer-events-none`} />
              <div className="relative">
                <Icon size={32} className="text-accent mb-3 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold text-white">{card.title}</h3>
                <p className="text-text-secondary text-sm mt-1">{card.desc}</p>
                <span className="inline-block mt-3 text-accent text-sm font-medium group-hover:translate-x-1 transition">
                  Learn more →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
