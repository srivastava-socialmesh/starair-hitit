import { createServerClient } from "@/lib/supabase/server";

export default async function LatestFareSheet() {
  const supabase = await createServerClient();
  const { data: sheet, error } = await supabase
    .from("fare_sheets")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !sheet) return null;

  return (
    <div className="max-w-full mx-auto px-4 sm:px-8 lg:px-16 xl:px-24">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 max-w-md mx-auto hover:shadow-xl transition">
        <h3 className="text-xl font-bold text-gray-900">{sheet.title}</h3>
        {sheet.description && <p className="text-sm text-gray-500 mt-1">{sheet.description}</p>}
        {(sheet.valid_from || sheet.valid_to) && (
          <p className="text-xs text-gray-400 mt-1">
            {sheet.valid_from && `From ${new Date(sheet.valid_from).toLocaleDateString()}`}
            {sheet.valid_to && ` – To ${new Date(sheet.valid_to).toLocaleDateString()}`}
          </p>
        )}
        <a
          href={sheet.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-accent hover:bg-[#b00226] text-white font-semibold py-2 px-6 rounded-full text-sm transition shadow-md"
        >
          Download PDF →
        </a>
      </div>
    </div>
  );
}
