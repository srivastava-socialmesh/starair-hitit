import { createServerClient } from "@/lib/supabase/server";
import Image from "next/image";

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

  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-rose-400 text-sm font-semibold uppercase tracking-widest">Explore</span>
          <h2 className="text-4xl font-bold text-white">Popular <span className="text-rose-500">Destinations</span></h2>
          <p className="text-slate-400 mt-1">Curated by our team</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative rounded-2xl overflow-hidden h-80 shadow-xl bg-slate-800 border border-white/5 hover:border-rose-500/30 transition duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent z-10"></div>
              <img
                src={dest.image_url}
                alt={dest.city}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-semibold bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/30">
                    {dest.code}
                  </span>
                  <span className="text-sm text-slate-300">{dest.country}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">{dest.city}</h3>
                <p className="text-rose-400 font-bold text-xl mt-1">From ${dest.price}</p>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
