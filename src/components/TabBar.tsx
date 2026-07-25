"use client";
import { useRouter, useSearchParams } from "next/navigation";

const tabs = [
  { id: "flights", label: "Flights" },
  { id: "deals", label: "Deals and offers" },
  { id: "electronic-services", label: "Electronic services" },
  { id: "travel-info", label: "Travel information" },
  { id: "our-company", label: "Our company" },
  { id: "other-websites", label: "Other websites" },
];

export default function TabBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "flights";

  const handleTabClick = (tabId: string) => {
    router.push(`/?tab=${tabId}`);
  };

  return (
    <div className="flex flex-wrap gap-1 bg-white/5 rounded-xl p-1 border border-white/10 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
            activeTab === tab.id
              ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
              : "text-text-secondary hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
