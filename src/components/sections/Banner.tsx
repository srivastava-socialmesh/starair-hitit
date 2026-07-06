"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Banner {
  id: number;
  image_url: string;
  link?: string;
  title?: string;
}

// Replace with your actual Supabase public URLs
const banners: Banner[] = [
  {
    id: 1,
    image_url: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/file.png",
    link: "/deals",
    title: "Exclusive Offers",
  },
  {
    id: 2,
    image_url: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/banners/1783333.png",
    link: "/flight-status",
    title: "Track Your Flight",
  },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
          <img
            src={banners[currentIndex].image_url}
            alt={banners[currentIndex].title || "Banner"}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          {banners[currentIndex].link && (
            <Link
              href={banners[currentIndex].link || "#"}
              className="absolute bottom-6 left-6 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-full shadow-lg shadow-rose-500/30 transition"
            >
              Explore Now →
            </Link>
          )}
        </div>

        {/* Navigation Dots */}
        {banners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  index === currentIndex ? "bg-rose-500 w-6" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Navigation Arrows */}
        {banners.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition backdrop-blur-sm z-10"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition backdrop-blur-sm z-10"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  );
}
