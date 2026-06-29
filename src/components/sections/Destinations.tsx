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
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-wider">Explore</span>
          <h2 className="text-3xl font-bold text-gray-800">
            Popular <span className="text-red-500">Destinations</span>
          </h2>
          <p className="text-gray-500">Curated by our team</p>
        </div>
        <DestinationsSlider destinations={destinations} />
      </div>
    </section>
  );
}
