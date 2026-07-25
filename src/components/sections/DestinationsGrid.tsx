"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Destination {
  id: number;
  city: string;
  country: string;
  code: string;
  image_url: string;
  price: number;
}

export default function DestinationsGrid() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .limit(6);
      if (!error) setDestinations(data || []);
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  if (loading) {
    return <div className="text-text-muted">Loading destinations...</div>;
  }

  if (destinations.length === 0) {
    return <div className="text-text-muted">No destinations available.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {destinations.map((dest) => (
        <Link key={dest.id} href={`/destinations/${dest.code}`}>
          <div className="glass rounded-xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
            <div className="relative h-40">
              <Image
                src={dest.image_url || "/placeholder-dest.jpg"}
                alt={dest.city}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h4 className="text-white font-bold">{dest.city}</h4>
                <p className="text-text-secondary text-xs">{dest.country} ({dest.code})</p>
              </div>
              {dest.price && (
                <span className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs font-bold text-accent">
                  ₹{dest.price}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
