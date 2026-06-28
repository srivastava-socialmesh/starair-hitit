import { createServerClient } from "@/lib/supabase/server";
import DestinationsSlider from "./DestinationsSlider";

export default async function Destinations() {
  const supabase = await createServerClient();
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .limit(6);

  if (!destinations || destinations.length === 0) return null;

  return (
    <section className="py-20 px-4 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
              Explore
            </span>
            <h2 className="text-4xl font-bold">Popular <span className="text-gradient">Destinations</span></h2>
          </div>
          <button className="hidden md:block border border-cyan-400 text-cyan-400 px-6 py-2 rounded-full hover:bg-cyan-400 hover:text-black transition">
            View All
          </button>
        </div>
        <DestinationsSlider destinations={destinations} />
      </div>
    </section>
  );
}
