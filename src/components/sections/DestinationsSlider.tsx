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
      loop={true}
      speed={600}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: false,
      }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="pb-10"
    >
      {destinations.map((dest) => (
        <SwiperSlide key={dest.id} className="!w-[280px] md:!w-[320px]">
          <div className="group relative rounded-2xl overflow-hidden h-[380px] cursor-pointer shadow-xl bg-white border border-gray-200 hover:border-red-300 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <Image
              src={dest.image_url}
              alt={dest.city}
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />
            <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
              <h3 className="text-xl font-bold text-white">{dest.city}</h3>
              <p className="text-gray-300 text-sm">{dest.country}</p>
              <p className="text-amber-400 font-bold text-lg mt-1">From ${dest.price}</p>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent z-30"></div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
