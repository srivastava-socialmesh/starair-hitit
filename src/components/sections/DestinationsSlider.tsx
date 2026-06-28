"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface Destination {
  id: number;
  city: string;
  country: string;
  code: string;
  image_url: string;
  price: number;
}

export default function DestinationsSlider({ destinations }: { destinations: Destination[] }) {
  if (!destinations || destinations.length === 0) return null;

  return (
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
      {destinations.map((dest) => (
        <SwiperSlide key={dest.id} className="!w-[300px] md:!w-[400px]">
          <div className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/95 via-black/30 to-transparent z-10"></div>
            <Image
              src={dest.image_url}
              alt={dest.city}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-300 text-xs font-bold border border-amber-500/30">
                  {dest.code}
                </span>
                <span className="text-slate-300 text-sm">{dest.country}</span>
              </div>
              <h3 className="text-3xl font-bold mt-2">{dest.city}</h3>
              <p className="text-amber-300 font-bold text-2xl mt-2">
                From ${dest.price}
              </p>
              <button className="mt-4 px-6 py-2 border border-amber-500/50 text-amber-300 rounded-full text-sm hover:bg-amber-500 hover:text-white transition group-hover:border-amber-400">
                Book Now →
              </button>
            </div>
            {/* Gold Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent z-30"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
