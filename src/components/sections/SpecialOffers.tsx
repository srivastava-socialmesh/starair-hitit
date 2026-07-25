"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Deal {
  id: number;
  title: string;
  description: string;
  image_url: string;
  discount_percent: number;
  link: string;
}

export default function SpecialOffers() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("is_active", true)
        .limit(3);
      if (!error) setDeals(data || []);
      setLoading(false);
    };
    fetchDeals();
  }, []);

  if (loading) {
    return <div className="text-text-muted">Loading offers...</div>;
  }

  if (deals.length === 0) {
    return <div className="text-text-muted">No offers available.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {deals.map((deal) => (
        <Link key={deal.id} href={deal.link || "/deals"}>
          <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
            <div className="relative h-48">
              <Image
                src={deal.image_url}
                alt={deal.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
                unoptimized
              />
              {deal.discount_percent > 0 && (
                <span className="absolute top-3 right-3 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                  {deal.discount_percent}% OFF
                </span>
              )}
            </div>
            <div className="p-4">
              <h4 className="text-white font-bold group-hover:text-accent transition">{deal.title}</h4>
              <p className="text-text-secondary text-sm mt-1 line-clamp-2">{deal.description}</p>
              <span className="inline-block mt-2 text-accent text-sm font-medium">Book now →</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
