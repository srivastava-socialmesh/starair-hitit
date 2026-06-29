
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { createClient } from "@/lib/supabase/client";

interface Deal {
  id: number;
  title: string;
  description: string;
  image_url: string;
  discount_percent: number;
  valid_until: string;
  link: string;
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
        .order("created_at", { ascending: false });

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
      <section className="py-12 px-4 bg-gray-50/50">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Loading deals...
        </div>
      </section>
    );
  }

  if (deals.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
            🔥 Limited Time
          </span>
          <h2 className="text-3xl font-bold text-gray-800">
            Exclusive <span className="text-red-500">Deals</span>
          </h2>
          <p className="text-gray-500">Grab these offers before they expire</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id} className="!w-[280px] md:!w-[320px]">
              <div className="group relative rounded-2xl overflow-hidden h-[380px] cursor-pointer shadow-xl bg-white border border-gray-200 hover:border-red-300 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <Image
                  src={deal.image_url}
                  alt={deal.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    {deal.discount_percent}% OFF
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                  <h3 className="text-xl font-bold text-white">{deal.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{deal.description}</p>
                  {deal.valid_until && (
                    <p className="text-amber-300 text-xs mt-1">
                      Valid until {new Date(deal.valid_until).toLocaleDateString()}
                    </p>
                  )}
                  <button className="mt-3 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white text-sm transition shadow-lg shadow-red-500/30">
                    Learn More →
                  </button>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
