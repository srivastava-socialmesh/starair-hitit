"use client"; // <--- This forces client-side rendering

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="pb-12"
    >
      {destinations.map((dest) => (
        <SwiperSlide key={dest.id}>
          <div className="group relative rounded-2xl overflow-hidden h-80 cursor-pointer shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
            <Image
              src={dest.image_url}
              alt={dest.city}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold">{dest.city}</h3>
              <p className="text-slate-300 text-sm">{dest.country}</p>
              <p className="text-cyan-300 font-bold text-xl mt-2">From ${dest.price}</p>
            </div>
            <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-cyan-300 border border-cyan-500/30">
              {dest.code}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
