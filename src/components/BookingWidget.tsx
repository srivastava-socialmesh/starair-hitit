"use client";
import { useState } from "react";
import { Plane, Calendar, Users, ArrowRight, Search } from "lucide-react";

type TripType = "roundtrip" | "oneway";

export default function BookingWidget() {
  const [tripType, setTripType] = useState<TripType>("roundtrip");
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 w-full max-w-2xl mx-auto">
      {/* Top Row: Trip Type + Departure + Cabin + Passengers */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
        {/* Trip type buttons */}
        <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
          {[
            { id: "roundtrip", label: "Round Trip" },
            { id: "oneway", label: "One Way" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTripType(tab.id as TripType)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                tripType === tab.id
                  ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
                  : "text-text-secondary hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Departure */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
          <Calendar size={14} className="text-text-muted" />
          <input
            type="date"
            className="bg-transparent text-white text-sm w-28 sm:w-32 focus:outline-none"
            defaultValue="2026-01-15"
          />
        </div>

        {/* Cabin */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
          <Users size={14} className="text-text-muted" />
          <select
            className="bg-transparent text-white text-sm w-20 sm:w-24 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="economy" className="bg-dark">Economy</option>
            <option value="business" className="bg-dark">Business</option>
          </select>
        </div>

        {/* Passengers (Number Input) */}
        <div className="flex items-center gap-1 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
          <Users size={14} className="text-text-muted" />
          <input
            type="number"
            min="1"
            max="10"
            value={passengers}
            onChange={(e) => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
            className="bg-transparent text-white text-sm w-12 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

      {/* From / To Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-text-muted mb-1">From</label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">To</label>
          <div className="relative">
            <ArrowRight className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted text-sm"
            />
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full mt-2 bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(210,4,45,0.3)] hover:shadow-[0_0_30px_rgba(210,4,45,0.5)]">
        <Search size={18} /> Search Flights
      </button>
    </div>
  );
}
