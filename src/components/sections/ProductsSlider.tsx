"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FadeIn } from "@/components/FadeIn";
import { SkeletonCard } from "@/components/SkeletonCard";
import { createClient } from "@/lib/supabase/client";
import { Plane, Wifi, Coffee, Shield, Users } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  features: string[];
  is_active: boolean;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Economy: <Users size={18} />,
  Business: <Coffee size={18} />,
  Premium: <Shield size={18} />,
  First: <Plane size={18} />,
};

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
        .order("id", { ascending: true });

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No products available at the moment.
      </div>
    );
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      spaceBetween={24}
      className="pb-12"
    >
      {products.map((product, index) => (
        <SwiperSlide key={product.id}>
          <FadeIn delay={index * 0.1}>
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  unoptimized
                />
                {product.category && (
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    {categoryIcons[product.category] || <Wifi size={18} />}
                    {product.category}
                  </span>
                )}
                {product.price > 0 && (
                  <span className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white text-sm font-bold px-4 py-2 rounded-full">
                    ₹{product.price.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-accent transition">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>
                {product.features && product.features.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {product.features.slice(0, 3).map((feature, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="text-xs text-gray-400">+{product.features.length - 3}</span>
                    )}
                  </div>
                )}
                <Link
                  href={`/products/${product.id}`}
                  className="mt-4 inline-flex items-center text-accent font-semibold hover:text-accent-dark transition group-hover:translate-x-1 duration-200"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </FadeIn>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
