"use client";
import Link from "next/link";
import Image from "next/image";
import { Plane, Award, MapPin } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png"
          alt="Star Air luxury travel"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <FadeIn>
          <div className="max-w-2xl">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-accent text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6 shadow-lg">
              <Award size={16} />
              Premium Airline
            </span>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Discover the <br />
              <span className="text-accent">Art</span> of Travel
            </h1>

            {/* Description */}
            <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-lg">
              Experience luxury at 35,000 feet with real-time global inventory
              powered by Hitit middleware.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-white">
                <span className="text-2xl font-bold text-accent">4.9/5</span>
                <span className="text-sm text-white/70">Rating</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MapPin size={20} className="text-accent" />
                <span className="text-sm text-white/70">120+ Destinations</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <Award size={20} className="text-accent" />
                <span className="text-sm text-white/70">24 Awards</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/flight-status"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3 rounded-full transition shadow-lg hover:shadow-xl"
              >
                <Plane size={18} /> Check Flight Status
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-3 rounded-full transition backdrop-blur-sm border border-white/30"
              >
                View Deals
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
