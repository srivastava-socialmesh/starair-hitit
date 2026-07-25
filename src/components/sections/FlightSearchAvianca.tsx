"use client";
import { useState } from "react";
import { Plane, Calendar, Users, ArrowRight, Search } from "lucide-react";

type TripType = "roundtrip" | "oneway" | "multicity";

export default function FlightSearchAvianca() {
  const [tripType, setTripType] = useState<TripType>("roundtrip");

  return (
    <div className="w-full">
      {/* Trip type tabs */}
      <div className="flex gap-0 mb-4 bg-white/5 rounded-xl p-1 border border-white/10 w-fit">
        {[
          { id: "roundtrip", label: "Round-trip" },
          { id: "oneway", label: "One-Way" },
          { id: "multicity", label: "Multi-city" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTripType(tab.id as TripType)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              tripType === tab.id
                ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
                : "text-text-secondary hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search inputs */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-text-muted mb-1 font-medium">From (City, Airport)</label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="City or airport"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-text-muted mb-1 font-medium">To (City, Airport)</label>
            <div className="relative">
              <ArrowRight className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="City or airport"
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted text-sm"
              />
            </div>
          </div>
        </div>

        {tripType === "multicity" && (
          <div className="text-xs text-accent font-medium cursor-pointer">
            + Add another flight
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar size={16} />
            <span>Departure</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Users size={16} />
            <span>Passengers</span>
          </div>
          <button className="ml-auto bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 shadow-[0_0_20px_rgba(210,4,45,0.3)] hover:shadow-[0_0_30px_rgba(210,4,45,0.5)]">
            <Search size={16} /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
