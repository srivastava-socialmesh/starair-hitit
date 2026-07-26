"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/175.jpg",
  },
  {
    id: 2,
    image: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/counter.jpg",
  },
  {
    id: 3,
    image: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/cabin.jpg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slides[current].image}
          alt="Star Air"
          fill
          className="object-cover transition-opacity duration-1000"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      {/* Content - Booking widget will be rendered separately in the page */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-start">
          {/* Booking widget is placed directly in the page, not here */}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass p-2 rounded-full border border-white/10 hover:border-accent/30 transition"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass p-2 rounded-full border border-white/10 hover:border-accent/30 transition"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === current ? "bg-accent w-6" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
