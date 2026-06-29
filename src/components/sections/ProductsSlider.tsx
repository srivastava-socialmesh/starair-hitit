"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { createClient } from "@/lib/supabase/client";
import { X, Check } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  link?: string;
  category?: string;
  features: string[];
}

export default function ProductsSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePopup, setActivePopup] = useState<number | null>(null);

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
      <section className="py-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          Loading products...
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-8 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
            ✈️ Fly Smart
          </span>
          <h2 className="text-3xl font-bold text-gray-800">
            Our <span className="text-red-500">Products</span>
          </h2>
          <p className="text-gray-500">Choose the perfect fare for your journey</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          loopAdditionalSlides={2}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="!w-[280px] md:!w-[320px]">
              <div
                className="group relative rounded-2xl overflow-hidden h-[380px] cursor-pointer shadow-xl bg-white border border-gray-200 hover:border-red-300 transition-all duration-300"
                onMouseEnter={() => setActivePopup(product.id)}
                onMouseLeave={() => setActivePopup(null)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 -z-10">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700"
                      onError={(e) => {
                        console.error("Image failed to load:", product.image_url);
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Product Name */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-amber-400 text-xl font-bold mt-2">
                      ${product.price}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm mt-1">
                    {product.category || "Economy"}
                  </p>
                  <div className="mt-3 flex justify-center gap-2 text-xs text-gray-400">
                    <span>•</span>
                    <span>Fare Difference applicable</span>
                    <span>•</span>
                  </div>
                </div>

                {/* Hover Popup */}
                {activePopup === product.id && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col justify-center p-6 animate-fadeIn">
                    <button
                      onClick={() => setActivePopup(null)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
                    >
                      <X size={24} />
                    </button>
                    <h4 className="text-xl font-bold text-red-600 mb-2">
                      {product.name} Features
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {product.features && product.features.length > 0 ? (
                        product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-400">No features listed</li>
                      )}
                    </ul>
                    {product.link && (
                      <a
                        href={product.link}
                        className="mt-4 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full text-center transition"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                )}

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
