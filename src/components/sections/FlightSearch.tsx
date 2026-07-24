"use client";
import { useState } from "react";
import { Calendar, Users, Plane, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";

export default function FlightSearch() {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [passengers, setPassengers] = useState(1);

  return (
    <FadeIn>
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-gray-100">
        {/* Trip Type Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTripType("oneway")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              tripType === "oneway" ? "bg-accent text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setTripType("roundtrip")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              tripType === "roundtrip" ? "bg-accent text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Round Trip
          </button>
        </div>

        {/* Search Fields */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              From
            </label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="City or Airport"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              To
            </label>
            <div className="relative">
              <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" size={18} />
              <input
                type="text"
                placeholder="City or Airport"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Departure
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Passengers
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                min="1"
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition"
              />
            </div>
          </div>
        </div>

        <button className="w-full mt-4 bg-accent hover:bg-accent-dark text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
          <Plane size={20} /> Search Flights
        </button>
      </div>
    </FadeIn>
  );
}
