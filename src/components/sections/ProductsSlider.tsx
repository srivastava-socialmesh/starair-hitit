"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

// Supabase client (browser)
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  link?: string;
  category?: string;
}

export default function ProductsSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto text-center text-slate-400">
          Loading products...
        </div>
      </section>
    );
  }

  if (!products.length) {
    return null; // or a fallback message
  }

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">
            Featured
          </span>
          <h2 className="text-4xl font-bold">
            Our <span className="text-gradient-gold">Products</span>
          </h2>
          <p className="text-slate-400">Handpicked for your luxury experience</p>
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
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!w-[300px] md:!w-[400px]">
              <div className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer shadow-2xl bg-[#0a0e1a]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a]/95 via-black/30 to-transparent z-10"></div>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <div className="flex items-center gap-2">
                    {product.category && (
                      <span className="px-3 py-1 bg-amber-500/20 backdrop-blur-sm rounded-full text-amber-300 text-xs font-bold border border-amber-500/30">
                        {product.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mt-2">{product.name}</h3>
                  <p className="text-slate-300 text-sm line-clamp-2">{product.description}</p>
                  {product.price && (
                    <p className="text-amber-300 font-bold text-xl mt-2">
                      ${product.price}
                    </p>
                  )}
                  <button className="mt-4 px-6 py-2 border border-amber-500/50 text-amber-300 rounded-full text-sm hover:bg-amber-500 hover:text-white transition group-hover:border-amber-400">
                    Learn More →
                  </button>
                </div>
                {/* Gold Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent z-30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
