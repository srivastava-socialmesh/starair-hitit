"use client";
import { useEffect, useState } from "react";
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

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/600x400/cccccc/666666?text=Product";

export default function ProductsSlider() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDrawer, setActiveDrawer] = useState<number | null>(null);

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
      <section className="py-16 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto text-center text-slate-400">Loading products...</div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-rose-400 text-sm font-semibold uppercase tracking-widest">✈️ Fly Smart</span>
          <h2 className="text-4xl font-bold text-white">Our <span className="text-rose-500">Products</span></h2>
          <p className="text-slate-400 mt-1">Choose the perfect fare for your journey</p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={600}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {products.map((product) => {
            const imgSrc = product.image_url?.trim() || PLACEHOLDER_IMAGE;
            const isOpen = activeDrawer === product.id;

            return (
              <SwiperSlide key={product.id}>
                <div
                  className="group relative rounded-2xl overflow-hidden h-[420px] cursor-pointer shadow-2xl bg-slate-800 border border-white/5 hover:border-rose-500/30 transition duration-300"
                  onMouseEnter={() => setActiveDrawer(product.id)}
                  onMouseLeave={() => setActiveDrawer(null)}
                  onClick={() => setActiveDrawer(isOpen ? null : product.id)}
                >
                  <div className="absolute inset-0 z-0">
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== PLACEHOLDER_IMAGE) target.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"></div>
                  </div>

                  <div className="absolute bottom-24 left-0 w-full px-6 z-10 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white tracking-wide">{product.name}</h3>
                    {product.price && <p className="text-rose-400 text-xl font-bold mt-1">${product.price}</p>}
                    <p className="text-slate-300 text-sm mt-1">{product.category || "Economy"}</p>
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 w-full bg-slate-900/90 backdrop-blur-md rounded-t-2xl shadow-2xl z-20 transition-all duration-400 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-[75%] opacity-100 translate-y-0' : 'max-h-0 opacity-0 translate-y-full'
                    }`}
                  >
                    <div className="p-5 pt-8">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveDrawer(null); }}
                        className="absolute top-2 right-3 text-slate-400 hover:text-white transition lg:hidden"
                      >
                        <X size={20} />
                      </button>
                      <h4 className="text-lg font-bold text-rose-400 mb-2">{product.name} Features</h4>
                      <ul className="space-y-2 text-sm text-slate-300">
                        {product.features?.length > 0 ? (
                          product.features.map((f, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check size={16} className="text-rose-400 flex-shrink-0 mt-0.5" />
                              <span>{f}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-slate-400">No features listed</li>
                        )}
                      </ul>
                      <div className="mt-3 text-xs text-slate-500 italic">*Fare Difference applicable</div>
                      {product.link && (
                        <a href={product.link} className="mt-4 inline-block bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-6 rounded-full text-sm transition">
                          Learn More
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent z-10"></div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
