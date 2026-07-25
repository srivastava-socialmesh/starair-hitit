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
  is_active: boolean;
}

export default function DealsGrid() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("is_active", true)
        .order("id", { ascending: true });
      if (!error) setDeals(data || []);
      setLoading(false);
    };
    fetchDeals();
  }, []);

  if (loading) {
    return <div className="text-text-muted">Loading deals...</div>;
  }

  if (deals.length === 0) {
    return <div className="text-text-muted">No deals available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {deals.map((deal) => (
        <div key={deal.id} className="glass rounded-xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
          <div className="relative h-40">
            <Image src={deal.image_url} alt={deal.title} fill className="object-cover" unoptimized />
            {deal.discount_percent > 0 && (
              <span className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full">
                {deal.discount_percent}% OFF
              </span>
            )}
          </div>
          <div className="p-4">
            <h4 className="text-white font-semibold group-hover:text-accent transition">{deal.title}</h4>
            <p className="text-text-secondary text-sm mt-1 line-clamp-2">{deal.description}</p>
            <Link href={deal.link || "#"} className="inline-block mt-2 text-accent text-sm font-medium hover:underline">
              Book now →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
