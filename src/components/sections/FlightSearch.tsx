"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plane,
  Calendar,
  Users,
  Search,
  ArrowRight,
  User,
  Briefcase,
  GraduationCap,
  Shield,
  UsersRound,
  Heart,
  RotateCw,
  Clock,
  Ticket,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

type PrimaryTab = 'search' | 'checkin' | 'flightstatus' | 'managebooking';
type TripType = 'oneway' | 'roundtrip';
type CabinClass = 'economy' | 'business' | 'all';

export default function FlightSearch() {
  const [primaryTab, setPrimaryTab] = useState<PrimaryTab>('search');
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [cabinClass, setCabinClass] = useState<CabinClass>('economy');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('2026-07-06');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [passengerType, setPassengerType] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [lastName, setLastName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [statusDate, setStatusDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const primaryTabs: { id: PrimaryTab; label: string; icon: any }[] = [
    { id: 'search', label: 'Search', icon: Search },
    { id: 'checkin', label: 'Check-in', icon: Ticket },
    { id: 'flightstatus', label: 'Status', icon: Clock },
    { id: 'managebooking', label: 'Manage', icon: Briefcase },
  ];

  const passengerTypes = [
    { id: 'family', label: 'Family & Friends', icon: UsersRound },
    { id: 'senior', label: 'Senior Citizen', icon: User },
    { id: 'unaccompanied', label: 'Unaccompanied Minor', icon: Heart },
  ];

  const cabinOptions: { value: CabinClass; label: string }[] = [
    { value: 'all', label: 'All Class' },
    { value: 'economy', label: 'Economy' },
    { value: 'business', label: 'Business' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/flights/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: from || 'DEL',
          destination: to,
          date: departDate,
          returnDate: tripType === 'roundtrip' ? returnDate : undefined,
          adults,
          children,
          infants,
          cabinClass,
          tripType,
          passengerType,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Search failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Other handlers (checkin, status, manage) omitted for brevity but would be similar.

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap justify-center gap-0 sm:gap-1 mb-4 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 w-fit mx-auto">
        {primaryTabs.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setPrimaryTab(tab.id); setResult(null); setError(null); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'text-gray-700 hover:text-accent hover:bg-gray-100'
              }`}
            >
              <tab.icon size={16} className="sm:w-4 sm:h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={primaryTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-xl border border-gray-200"
      >
        {primaryTab === 'search' && (
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="flex bg-white/60 rounded-xl p-1 w-fit mx-auto border border-gray-200">
              {[
                { id: 'oneway' as TripType, label: 'One Way', icon: Plane },
                { id: 'roundtrip' as TripType, label: 'Round Trip', icon: RotateCw },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTripType(type.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition ${
                    tripType === type.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'text-gray-700 hover:text-accent hover:bg-gray-100'
                  }`}
                >
                  <type.icon size={15} className="sm:w-4 sm:h-4" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start min-w-0">
              <div className="w-full min-w-0">
                <div className="relative">
                  <Plane size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full min-w-0">
                <div className="relative">
                  <Plane size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start min-w-0">
              <div className="w-full min-w-0">
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    placeholder="Departure"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm [color-scheme:light] focus:border-accent outline-none transition text-center min-w-0"
                    required
                  />
                </div>
              </div>
              {tripType === 'roundtrip' && (
                <div className="w-full min-w-0">
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      placeholder="Return"
                      className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-3 py-2.5 text-gray-800 text-sm [color-scheme:light] focus:border-accent outline-none transition text-center min-w-0"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="w-full">
                <label className="block text-gray-700 text-xs uppercase tracking-wider font-semibold mb-1">Cabin Class</label>
                <div className="relative">
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm appearance-none focus:border-accent outline-none transition"
                  >
                    {cabinOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-white">{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-gray-700 text-xs uppercase tracking-wider font-semibold mb-1">Passengers</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-gray-500 text-[10px] uppercase">Adults</label>
                    <div className="flex items-center gap-1 mt-1">
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">−</button>
                      <span className="w-6 text-center text-gray-800 text-sm font-semibold">{adults}</span>
                      <button type="button" onClick={() => setAdults(adults + 1)} className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] uppercase">Children</label>
                    <div className="flex items-center gap-1 mt-1">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">−</button>
                      <span className="w-6 text-center text-gray-800 text-sm font-semibold">{children}</span>
                      <button type="button" onClick={() => setChildren(children + 1)} className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[10px] uppercase">Infants</label>
                    <div className="flex items-center gap-1 mt-1">
                      <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">−</button>
                      <span className="w-6 text-center text-gray-800 text-sm font-semibold">{infants}</span>
                      <button type="button" onClick={() => setInfants(infants + 1)} className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <label className="text-gray-700 text-[10px] sm:text-xs uppercase tracking-widest font-semibold block mb-2">Passenger Type</label>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {passengerTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPassengerType(type.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-medium transition border ${
                      passengerType === type.id
                        ? 'bg-accent/20 border-accent text-accent'
                        : 'bg-white/60 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-accent'
                    }`}
                  >
                    <type.icon size={12} className="sm:w-3 sm:h-3" />
                    <span className="truncate max-w-[40px] sm:max-w-none">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <span className="text-gray-700 text-[10px] sm:text-xs uppercase tracking-widest font-semibold">♿ Special Assistance</span>
              <label className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-700">
                <input type="checkbox" className="accent-accent" /> Need assistance
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-3/4 sm:w-2/3 bg-accent hover:bg-[#b00226] text-white font-bold py-3 rounded-xl shadow-lg shadow-accent/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] disabled:opacity-70 text-sm tracking-wide"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                {loading ? 'Searching...' : 'Search Flight'}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition" />}
              </button>
            </div>
          </form>
        )}

        {/* Other tabs (Check-in, Flight Status, Manage Booking) – same accent styling would be applied */}
      </motion.div>
    </div>
  );
}
