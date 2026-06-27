import { createServerClient } from "@/lib/supabase/server";
import Image from "next/image";

// Define the type
interface Destination {
  id: number;
  city: string;
  country: string;
  code: string;
  image_url: string;
  price: number;
}

export default async function Destinations() {
  const supabase = createServerClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .limit(4);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold">
            Popular <span className="text-gradient">Routes</span>
          </h2>
          <p className="text-slate-400">Curated by our team</p>
        </div>
        <button className="text-cyan-400 border border-cyan-400 px-6 py-2 rounded-full hover:bg-cyan-400 hover:text-black transition">
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations?.map((dest: Destination) => (
          <div
            key={dest.id}
            className="group relative rounded-2xl overflow-hidden h-72 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <Image
              src={dest.image_url}
              alt={dest.city}
              fill
              className="object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <h3 className="text-2xl font-bold">{dest.city}</h3>
              <p className="text-slate-300 text-sm">
                {dest.country} ({dest.code})
              </p>
              <p className="text-cyan-300 font-bold text-lg mt-2">
                From ${dest.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
