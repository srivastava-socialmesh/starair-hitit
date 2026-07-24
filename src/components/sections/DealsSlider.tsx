"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FadeIn } from "@/components/FadeIn";
import { SkeletonCard } from "@/components/SkeletonCard";
import { createClient } from "@/lib/supabase/client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Deal {
  id: number;
  title: string;
  description: string;
  image_url: string;
  discount_percent: number;
  valid_until: string;
  link: string;
  is_active: boolean;
}

export default function DealsSlider() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching deals:", error);
      } else {
        setDeals(data || []);
      }
      setLoading(false);
    };
    fetchDeals();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (deals.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No deals available at the moment.
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      spaceBetween={24}
      className="pb-12"
    >
      {deals.map((deal, index) => (
        <SwiperSlide key={deal.id}>
          <FadeIn delay={index * 0.1}>
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={deal.image_url}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  unoptimized
                />
                {deal.discount_percent > 0 && (
                  <span className="absolute top-4 right-4 bg-accent text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
                    {deal.discount_percent}% OFF
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition">
                  {deal.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {deal.description}
                </p>
                {deal.valid_until && (
                  <p className="text-xs text-gray-400 mt-2">
                    Valid until {new Date(deal.valid_until).toLocaleDateString()}
                  </p>
                )}
                <Link
                  href={deal.link || "/deals"}
                  className="mt-4 inline-flex items-center text-accent font-semibold hover:text-accent-dark transition group-hover:translate-x-1 duration-200"
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </FadeIn>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
