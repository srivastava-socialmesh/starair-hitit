"use client";
import { useState } from "react";
import {
  Calendar,
  Users,
  Plane,
  ArrowRight,
  Star,
  Hotel,
  Utensils,
  Compass,
  ChevronDown,
} from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import GlowButton from "@/components/GlowButton";

type TabType = "flight" | "hotel" | "restaurant" | "tour";

export default function FlightSearch() {
  const [activeTab, setActiveTab] = useState<TabType>("flight");
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [cabinClass, setCabinClass] = useState<"economy" | "business">("economy");
  const [passengers, setPassengers] = useState(2);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  const tabs = [
    { id: "flight", label: "Flight", icon: Plane },
    { id: "hotel", label: "Hotel", icon: Hotel },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "tour", label: "Tour & Guides", icon: Compass },
  ] as const;

  return (
    <FadeIn>
      <div className="glass rounded-2xl p-6 border border-white/10 shadow-card max-w-5xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-accent text-white shadow-[0_0_20px_rgba(210,4,45,0.3)]"
                    : "text-text-secondary hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Only show flight search for now */}
        {activeTab === "flight" && (
          <div className="space-y-4">
            {/* Route Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-display tracking-wider uppercase text-text-muted mb-1.5">
                  From
                </label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    placeholder="Zurich, Switzerland"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted"
                    defaultValue="Zurich, Switzerland"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-display tracking-wider uppercase text-text-muted mb-1.5">
                  To
                </label>
                <div className="relative">
                  <ArrowRight className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="text"
                    placeholder="Milan, Italy"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted"
                    defaultValue="Milan, Italy"
                  />
                </div>
              </div>
            </div>

            {/* Date & Passengers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-display tracking-wider uppercase text-text-muted mb-1.5">
                  Departure
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white"
                    defaultValue="2025-12-19"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-display tracking-wider uppercase text-text-muted mb-1.5">
                  Passengers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="bg-dark">
                        {num} passenger{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                </div>
              </div>
              <div className="flex items-end gap-2">
                {/* Rating Badge */}
                <div className="flex items-center gap-1.5 glass px-3 py-2 rounded-xl border border-white/10">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-white">4.9</span>
                  <span className="text-xs text-text-muted">(75.3k)</span>
                </div>
              </div>
            </div>

            {/* Trip Type & Class */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex gap-1 glass p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setTripType("oneway")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                    tripType === "oneway"
                      ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.2)]"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  One way
                </button>
                <button
                  onClick={() => setTripType("roundtrip")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                    tripType === "roundtrip"
                      ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.2)]"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  Round trip
                </button>
              </div>

              <div className="flex gap-1 glass p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setCabinClass("economy")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                    cabinClass === "economy"
                      ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.2)]"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  Economy
                </button>
                <button
                  onClick={() => setCabinClass("business")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
                    cabinClass === "business"
                      ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.2)]"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  Business
                </button>
              </div>

              {/* Search Button */}
              <div className="ml-auto w-full md:w-auto">
                <GlowButton
                  href="/flight-status"
                  icon={<Plane size={18} />}
                  className="w-full md:w-auto"
                >
                  Search
                </GlowButton>
              </div>
            </div>
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab !== "flight" && (
          <div className="text-center py-12 text-text-muted">
            <div className="text-4xl mb-2">🚀</div>
            <p className="text-sm font-display tracking-wider uppercase">Coming Soon</p>
            <p className="text-xs mt-1">This service will be available shortly.</p>
          </div>
        )}
      </div>
    </FadeIn>
  );
}
