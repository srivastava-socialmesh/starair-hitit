"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plane } from "lucide-react";
import BookingPanel from "@/components/BookingPanel";

const slides = [
  {
    id: 1,
    image: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png",
    headline: "Embraer 175",
    description: "This is how we connect the future",
    cta: "Live the experience",
    aircraft: true,
  },
  {
    id: 2,
    image: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/Banner_6.jpg",
    headline: "Embark on your",
    description: "Next Adventure",
    cta: "Book now",
    aircraft: false,
  },
  {
    id: 3,
    image: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/Banner_5.jpg",
    headline: "No Middle Seat",
    description: "Say Goodbye to the middle squeeze",
    cta: "Learn more",
    aircraft: false,
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goTo = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.image}
          alt={slide.headline}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Booking Panel */}
          <BookingPanel />

          {/* Right: Banner Text & Aircraft Image */}
          <div className="text-white hidden lg:block">
            {slide.aircraft && (
              <div className="relative h-48 w-full mb-4">
                <Image
                  src="https://starair.in/Content/Images/blog/E175-3%20website.jpg"
                  alt="Aircraft"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            )}
            <h2 className="text-3xl font-bold text-accent">{slide.headline}</h2>
            <p className="text-xl text-text-secondary mt-2">{slide.description}</p>
            <button className="mt-4 bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-full text-sm font-semibold transition">
              {slide.cta} →
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass p-2 rounded-full border border-white/10 hover:border-accent/30 transition"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass p-2 rounded-full border border-white/10 hover:border-accent/30 transition"
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
          />
        ))}
      </div>
    </section>
  );
}
