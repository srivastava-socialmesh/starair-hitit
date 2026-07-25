"use client";
import Link from "next/link";
import Image from "next/image";
import { Plane, Award, MapPin, Sparkles, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import GlowButton from "@/components/GlowButton";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png"
          alt="Star Air luxury travel"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-radial from-accent/10 to-transparent opacity-50" />
      </div>

      {/* Animated glow orb */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
        <div className="max-w-2xl">
          <FadeIn>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 border border-white/10">
              <Sparkles size={14} className="text-accent" />
              <span className="text-xs font-display tracking-wider text-text-secondary uppercase">
                Premium Airline
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Discover the <br />
              <span className="gradient-text">Art of Travel</span>
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg sm:text-xl text-text-secondary max-w-lg">
              Experience luxury at 35,000 feet with real-time global inventory
              powered by Hitit middleware.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: "4.9/5", label: "Rating", icon: Award },
                { value: "120+", label: "Destinations", icon: MapPin },
                { value: "24", label: "Awards", icon: Sparkles },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/5">
                  <stat.icon size={16} className="text-accent" />
                  <span className="text-sm font-bold text-white">{stat.value}</span>
                  <span className="text-xs text-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <GlowButton href="/flight-status" icon={<Plane size={18} />}>
                Check Flight Status
              </GlowButton>
              <GlowButton href="/deals" variant="secondary">
                View Deals <ChevronRight size={16} />
              </GlowButton>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="flex flex-col items-center gap-2 text-text-muted text-xs font-display tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
