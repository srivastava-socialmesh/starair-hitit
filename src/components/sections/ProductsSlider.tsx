"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
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
        console.log("Fetched products:", data);
        // Log image URLs for debugging
        data?.forEach(p => console.log(`Product: ${p.name}, Image URL: ${p.image_url}`));
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

  if (!products.length) return null;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#0a0e1a] to-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">
            ✈️ Fly Smart
          </span>
          <h2 className="text-4xl font-bold">
            Our <span className="text-gradient-gold">Products</span>
          </h2>
          <p className="text-slate-400">Choose the perfect fare for your journey</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-12"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div
                className="relative group rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#0a0e1a] border border-red-500/20 hover:border-red-500/50 transition-all duration-300 h-[420px] cursor-pointer shadow-2xl shadow-red-500/5"
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
                      className="object-cover opacity-40"
                      onError={(e) => {
                        console.error("Image failed to load:", product.image_url);
                        // Instead of hiding, we'll let the gradient show
                        // but we can also set a fallback color via style
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-red-500/20"></div>
                  )}
                  {/* Gradient overlay (always visible) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-[#0a0e1a]/80"></div>
                </div>

                {/* Product Name */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                    {product.name}
                  </h3>
                  {product.price && (
                    <p className="text-amber-400 text-xl font-bold mt-2">
                      ${product.price}
                    </p>
                  )}
                  <p className="text-slate-400 text-sm mt-1">
                    {product.category || "Economy"}
                  </p>
                  <div className="mt-4 flex justify-center gap-2 text-xs text-slate-500">
                    <span>•</span>
                    <span>Fare Difference applicable</span>
                    <span>•</span>
                  </div>
                </div>

                {/* Hover Popup */}
                {activePopup === product.id && (
                  <div className="absolute inset-0 bg-[#0a0e1a]/95 backdrop-blur-sm flex flex-col justify-center p-6 animate-fadeIn">
                    <button
                      onClick={() => setActivePopup(null)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
                    >
                      <X size={24} />
                    </button>
                    <h4 className="text-xl font-bold text-amber-400 mb-2">
                      {product.name} Features
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {product.features && product.features.length > 0 ? (
                        product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-slate-400">No features listed</li>
                      )}
                    </ul>
                    {product.link && (
                      <a
                        href={product.link}
                        className="mt-4 inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full text-center transition"
                      >
                        Learn More
                      </a>
                    )}
                  </div>
                )}

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
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
