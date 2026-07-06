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
  X
} from "lucide-react";

type PrimaryTab = 'search' | 'checkin' | 'flightstatus' | 'managebooking';
type TripType = 'oneway' | 'roundtrip';

export default function FlightSearch() {
  const [primaryTab, setPrimaryTab] = useState<PrimaryTab>('search');
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [from, setFrom] = useState('DEL');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('2026-07-06');
  const [returnDate, setReturnDate] = useState('');
  const [passengerType, setPassengerType] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [lastName, setLastName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [statusDate, setStatusDate] = useState('');

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

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
    { id: 'student', label: 'Student' },
    { id: 'senior', label: 'Senior' },
    { id: 'military', label: 'Military' },
  ];

  const cabinClasses = ['Economy', 'Business'];

  // API handlers (unchanged)
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
          origin: from,
          destination: to,
          date: departDate,
          returnDate: tripType === 'roundtrip' ? returnDate : undefined,
          adults,
          children,
          infants,
          cabinClass,
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

  const handleCheckin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/flights/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingRef, lastName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Check-in failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFlightStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/flights/status?flightNumber=${flightNumber}&date=${statusDate}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Status fetch failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleManageBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/flights/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingRef, lastName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Manage booking failed');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPassengers = adults + children + infants;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Primary Tabs */}
      <div className="flex flex-wrap justify-center gap-0 sm:gap-1 mb-4 p-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 w-fit mx-auto">
        {primaryTabs.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setPrimaryTab(tab.id); setResult(null); setError(null); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon size={16} className="sm:w-4 sm:h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Panel */}
      <motion.div
        key={primaryTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/20"
      >
        {primaryTab === 'search' && (
          <form onSubmit={handleSearch} className="space-y-5">
            {/* Trip Type – removed Multi-City */}
            <div className="flex bg-white/5 rounded-xl p-1 w-fit mx-auto border border-white/10">
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
                      ? 'bg-rose-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <type.icon size={15} className="sm:w-4 sm:h-4" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* FROM, TO, DEPARTURE */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-start min-w-0">
              <div className="w-full min-w-0">
                <div className="relative">
                  <Plane size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:border-rose-500 outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full min-w-0">
                <div className="relative">
                  <Plane size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 rotate-90" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm placeholder:text-white/40 focus:border-rose-500 outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full min-w-0">
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    placeholder="Departure"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm [color-scheme:dark] focus:border-rose-500 outline-none transition text-center min-w-0"
                    required
                  />
                </div>
              </div>
            </div>

            {tripType === 'roundtrip' && (
              <div className="w-full max-w-xs mx-auto sm:max-w-full text-center">
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    placeholder="Return"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-3 py-2.5 text-white text-sm [color-scheme:dark] focus:border-rose-500 outline-none transition text-center min-w-0"
                  />
                </div>
              </div>
            )}

            {/* Passengers + Cabin Class */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Passenger Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                  className="w-full flex items-center justify-between bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Users size={16} className="text-white/50" />
                    {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                    {passengerType && ` · ${passengerType}`}
                  </span>
                  <ChevronDown size={16} className="text-white/50" />
                </button>

                {showPassengerDropdown && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-slate-800 border border-white/15 rounded-xl shadow-2xl z-20 p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">Adults</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="text-white/60 hover:text-white text-xl">−</button>
                        <span className="text-white text-sm w-6 text-center">{adults}</span>
                        <button type="button" onClick={() => setAdults(adults + 1)} className="text-white/60 hover:text-white text-xl">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">Children (2-11)</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="text-white/60 hover:text-white text-xl">−</button>
                        <span className="text-white text-sm w-6 text-center">{children}</span>
                        <button type="button" onClick={() => setChildren(children + 1)} className="text-white/60 hover:text-white text-xl">+</button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">Infants (0-2)</span>
                      <div className="flex items-center gap-3">
                        <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="text-white/60 hover:text-white text-xl">−</button>
                        <span className="text-white text-sm w-6 text-center">{infants}</span>
                        <button type="button" onClick={() => setInfants(infants + 1)} className="text-white/60 hover:text-white text-xl">+</button>
                      </div>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex flex-wrap gap-2">
                      {passengerTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setPassengerType(passengerType === type.id ? '' : type.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition border ${
                            passengerType === type.id
                              ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                              : 'bg-white/5 border-white/15 text-white/60 hover:bg-white/10'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPassengerDropdown(false)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-1.5 rounded-lg text-sm transition"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Cabin Class */}
              <div className="relative">
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm appearance-none focus:border-rose-500 outline-none transition"
                >
                  {cabinClasses.map((cls) => (
                    <option key={cls} value={cls} className="bg-slate-800">{cls}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
              </div>
            </div>

            {/* Promo Code (optional) – shown in screenshot */}
            <div>
              <input
                type="text"
                placeholder="Promo Code"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/40 focus:border-rose-500 outline-none transition"
              />
            </div>

            {/* Search Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-3/4 sm:w-2/3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3 rounded-xl shadow-2xl shadow-rose-500/30 flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] disabled:opacity-70 text-sm tracking-wide"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                {loading ? 'Searching...' : 'Search Flight'}
                {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition" />}
              </button>
            </div>
          </form>
        )}

        {/* Other tabs unchanged */}
        {primaryTab === 'checkin' && (
          // ... (same as before)
        )}
        {primaryTab === 'flightstatus' && (
          // ... (same as before)
        )}
        {primaryTab === 'managebooking' && (
          // ... (same as before)
        )}
        {/* Result / Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 flex items-center gap-2.5 text-sm">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 text-sm">
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </motion.div>
    </div>
  );
}
