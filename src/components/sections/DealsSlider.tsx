"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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

  if (loading) return <div className="py-12 px-4 bg-gray-50 text-center text-gray-400">Loading deals...</div>;
  if (deals.length === 0) return null;

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="mb-8 text-center">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">🔥 Limited Time</span>
          <h2 className="text-4xl font-bold text-gray-900">Exclusive <span className="text-accent">Deals</span></h2>
          <p className="text-gray-500 mt-1">Grab these offers before they expire</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="pb-10"
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <div className="group relative rounded-2xl overflow-hidden h-96 shadow-lg bg-white border border-gray-200 hover:border-accent transition duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>
                <img src={deal.image_url} alt={deal.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-4 right-4 z-20">
                  <span className="bg-accent text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">{deal.discount_percent}% OFF</span>
                </div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h3 className="text-2xl font-bold text-white">{deal.title}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{deal.description}</p>
                  {deal.valid_until && <p className="text-amber-300 text-xs mt-1">Valid until {new Date(deal.valid_until).toLocaleDateString()}</p>}
                  <button className="mt-4 px-5 py-2 bg-accent hover:bg-[#b00226] rounded-full text-white text-sm font-semibold shadow-lg shadow-accent/30 transition">Learn More →</button>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
