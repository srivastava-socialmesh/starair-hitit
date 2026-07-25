"use client";
import { Award, Star, Trophy } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

const awards = [
  {
    icon: Award,
    title: "Best Airline Staff Service",
    subtitle: "in Central America and the Caribbean",
    year: "2024",
  },
  {
    icon: Star,
    title: "Changing to serve you better",
    subtitle: "eCommerce leaders in the tourist industry category",
    year: "2014",
  },
  {
    icon: Trophy,
    title: "Winner in the",
    subtitle: "Best Airline Staff Service Award",
    year: "2023",
  },
];

export default function Awards() {
  return (
    <section className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-sm font-display uppercase tracking-wider text-text-muted text-center mb-8">
            Recognitions & Awards
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {awards.map((award, i) => {
            const Icon = award.icon;
            return (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-accent/30 transition">
                  <Icon size={32} className="text-accent mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white">{award.title}</h3>
                  <p className="text-sm text-text-secondary mt-1">{award.subtitle}</p>
                  <span className="inline-block mt-3 text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
                    {award.year}
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
