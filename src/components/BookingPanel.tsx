"use client";
import { useState } from "react";
import { Plane, Calendar, Users, ArrowRight, Search } from "lucide-react";

type TripType = "roundtrip" | "oneway";

export default function BookingPanel() {
  const [tripType, setTripType] = useState<TripType>("roundtrip");

  return (
    <div className="glass rounded-2xl p-6 border border-white/10 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-4 text-center">Book a Flight</h2>

      {/* Trip type tabs - Center aligned, no Multi City */}
      <div className="flex gap-1 bg-white/5 rounded-xl p-1 border border-white/10 w-fit mx-auto mb-4">
        {[
          { id: "roundtrip", label: "Round Trip" },
          { id: "oneway", label: "One Way" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTripType(tab.id as TripType)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition ${
              tripType === tab.id
                ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
                : "text-text-secondary hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* From / To */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs text-text-muted mb-1">From</label>
          <div className="relative">
            <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="City or Airport"
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted text-sm"
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
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white placeholder-text-muted text-sm"
            />
          </div>
        </div>
      </div>

      {/* Departure / Return */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <label className="block text-xs text-text-muted mb-1">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="date"
              className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white text-sm"
              defaultValue="2026-01-15"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs text-text-muted mb-1">Return</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="date"
              className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white text-sm"
              defaultValue="2026-01-20"
            />
          </div>
        </div>
      </div>

      {/* Passengers */}
      <div className="mt-3">
        <label className="block text-xs text-text-muted mb-1">Passengers</label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
          <select
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition text-white text-sm appearance-none cursor-pointer"
          >
            <option value="1">1 Adult</option>
            <option value="2" selected>2 Adults</option>
            <option value="3">3 Adults</option>
            <option value="4">4 Adults</option>
            <option value="2+1">2 Adults, 1 Child</option>
            <option value="2+2">2 Adults, 2 Children</option>
          </select>
        </div>
      </div>

      {/* Search Button */}
      <button className="w-full mt-4 bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(210,4,45,0.3)] hover:shadow-[0_0_30px_rgba(210,4,45,0.5)]">
        <Search size={18} /> Search
      </button>
    </div>
  );
}
