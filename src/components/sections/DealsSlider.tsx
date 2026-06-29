"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Deal {
  id: number;
  title: string;
  description: string;
  image_url: string;
  link: string;
  discount_percent: number;
  valid_until: string;
}

export default function DealsSlider() {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    fetch("/api/deals")
      .then((res) => res.json())
      .then(setDeals);
  }, []);

  if (deals.length === 0) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gradient-gold">Exclusive Deals</h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition group">
                <div className="relative h-48">
                  <Image src={deal.image_url} alt={deal.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg">{deal.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">{deal.description}</p>
                  {deal.discount_percent && (
                    <span className="inline-block mt-2 bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                      {deal.discount_percent}% OFF
                    </span>
                  )}
                  <Link href={deal.link || "#"} className="inline-block mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium">
                    Learn More →
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
