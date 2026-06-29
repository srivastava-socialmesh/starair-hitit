import { createServerClient } from "@/lib/supabase/server";
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

export default async function Destinations() {
  const supabase = await createServerClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .limit(6);

  if (!destinations || destinations.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
              Explore
            </span>
            <h2 className="text-3xl font-bold text-gray-800">
              Popular <span className="text-red-500">Destinations</span>
            </h2>
            <p className="text-gray-500">Curated by our team</p>
          </div>
          <button className="hidden md:block border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-500 hover:text-white transition">
            View All
          </button>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest.id}>
              <div className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer shadow-lg bg-white border border-gray-200 hover:border-red-300 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
                <Image
                  src={dest.image_url}
                  alt={dest.city}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute bottom-0 left-0 p-5 z-20">
                  <h3 className="text-2xl font-bold text-white">{dest.city}</h3>
                  <p className="text-gray-300 text-sm">{dest.country}</p>
                  <p className="text-amber-300 font-bold text-xl mt-1">
                    From ${dest.price}
                  </p>
                </div>
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 border border-gray-200">
                  {dest.code}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
