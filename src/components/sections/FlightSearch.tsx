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

  return (
    <div className="w-full max-w-full mx-auto overflow-hidden">
      {/* Tabs - compact */}
      <div className="flex flex-wrap justify-center gap-0 sm:gap-1 mb-3 p-1 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 w-fit mx-auto">
        {primaryTabs.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setPrimaryTab(tab.id); setResult(null); setError(null); }}
              className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 rounded-xl text-[10px] sm:text-xs font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-accent text-white shadow-lg shadow-accent/30'
                  : 'text-gray-700 hover:text-accent hover:bg-gray-100'
              }`}
            >
              <tab.icon size={14} className="sm:w-4 sm:h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Panel - reduced padding */}
      <motion.div
        key={primaryTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white/70 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-xl border border-gray-200"
      >
        {primaryTab === 'search' && (
          <form onSubmit={handleSearch} className="space-y-3">
            {/* Trip type */}
            <div className="flex bg-white/60 rounded-xl p-1 w-fit mx-auto border border-gray-200">
              {[
                { id: 'oneway' as TripType, label: 'One Way', icon: Plane },
                { id: 'roundtrip' as TripType, label: 'Round Trip', icon: RotateCw },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTripType(type.id)}
                  className={`flex items-center gap-1 px-2.5 sm:px-4 py-1 rounded-lg text-[10px] sm:text-xs font-medium transition ${
                    tripType === type.id
                      ? 'bg-accent text-white shadow-lg'
                      : 'text-gray-700 hover:text-accent hover:bg-gray-100'
                  }`}
                >
                  <type.icon size={14} className="sm:w-4 sm:h-4" />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* From / To */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 items-start min-w-0">
              <div className="w-full min-w-0">
                <div className="relative">
                  <Plane size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-2 py-1.5 text-gray-800 text-xs placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full min-w-0">
                <div className="relative">
                  <Plane size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 rotate-90" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-2 py-1.5 text-gray-800 text-xs placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  />
                </div>
              </div>
            </div>

            {/* Departure / Return */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 items-start min-w-0">
              <div className="w-full min-w-0">
                <div className="relative">
                  <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    placeholder="Departure"
                    className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-2 py-1.5 text-gray-800 text-xs [color-scheme:light] focus:border-accent outline-none transition text-center min-w-0"
                    required
                  />
                </div>
              </div>
              {tripType === 'roundtrip' && (
                <div className="w-full min-w-0">
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      placeholder="Return"
                      className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-2 py-1.5 text-gray-800 text-xs [color-scheme:light] focus:border-accent outline-none transition text-center min-w-0"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Cabin & Passengers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="w-full">
                <label className="block text-gray-600 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Cabin Class</label>
                <div className="relative">
                  <select
                    value={cabinClass}
                    onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-xs appearance-none focus:border-accent outline-none transition"
                  >
                    {cabinOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-white">{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div className="w-full">
                <label className="block text-gray-600 text-[10px] uppercase tracking-wider font-semibold mb-0.5">Passengers</label>
                <div className="grid grid-cols-3 gap-1">
                  <div>
                    <label className="block text-gray-500 text-[8px] uppercase">Adults</label>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-xs">−</button>
                      <span className="w-5 text-center text-gray-800 text-xs font-semibold">{adults}</span>
                      <button type="button" onClick={() => setAdults(adults + 1)} className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-xs">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[8px] uppercase">Children</label>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-xs">−</button>
                      <span className="w-5 text-center text-gray-800 text-xs font-semibold">{children}</span>
                      <button type="button" onClick={() => setChildren(children + 1)} className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-xs">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-500 text-[8px] uppercase">Infants</label>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-xs">−</button>
                      <span className="w-5 text-center text-gray-800 text-xs font-semibold">{infants}</span>
                      <button type="button" onClick={() => setInfants(infants + 1)} className="w-5 h-5 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition text-xs">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Type - all in one row, with truncation */}
            <div className="text-center">
              <label className="text-gray-600 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold block mb-1">Passenger Type</label>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5">
                {passengerTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPassengerType(type.id)}
                    className={`flex items-center gap-0.5 px-2.5 py-1 rounded-full text-[8px] sm:text-[10px] font-medium transition border ${
                      passengerType === type.id
                        ? 'bg-accent/20 border-accent text-accent'
                        : 'bg-white/60 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-accent'
                    }`}
                  >
                    <type.icon size={10} className="sm:w-3 sm:h-3" />
                    <span className="truncate max-w-[60px] sm:max-w-none">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Assistance */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-0.5">
              <span className="text-gray-600 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold">♿ Special Assistance</span>
              <label className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-700">
                <input type="checkbox" className="accent-accent" /> Need assistance
              </label>
            </div>

            {/* Search button - reduced height */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-3/4 sm:w-2/3 bg-accent hover:bg-[#b00226] text-white font-bold py-2 rounded-xl shadow-lg shadow-accent/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70 text-xs sm:text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                {loading ? 'Searching...' : 'Search Flight'}
                {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition" />}
              </button>
            </div>
          </form>
        )}

        {/* Check-in, Flight Status, Manage Booking tabs – same as before */}
        {primaryTab === 'checkin' && (
          <form onSubmit={handleCheckin} className="space-y-3">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Web Check-in</h3>
              <p className="text-gray-500 text-sm">Check in online and save time at the airport</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <div>
                <label className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold block mb-0.5">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold block mb-0.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-3/4 sm:w-2/3 bg-accent hover:bg-[#b00226] text-white font-bold py-2 rounded-xl shadow-lg shadow-accent/30 flex items-center justify-center gap-2 transition-all text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Ticket size={16} />}
                {loading ? 'Processing...' : 'Check In Now'}
              </button>
            </div>
          </form>
        )}

        {primaryTab === 'flightstatus' && (
          <form onSubmit={handleFlightStatus} className="space-y-3">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Real-time Flight Status</h3>
              <p className="text-gray-500 text-sm">Track your flight with live updates</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <div>
                <label className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold block mb-0.5">Flight Number</label>
                <input
                  type="text"
                  placeholder="e.g., AI-101"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold block mb-0.5">Date</label>
                <input
                  type="date"
                  value={statusDate}
                  onChange={(e) => setStatusDate(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-sm [color-scheme:light] focus:border-accent outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-3/4 sm:w-2/3 bg-accent hover:bg-[#b00226] text-white font-bold py-2 rounded-xl shadow-lg shadow-accent/30 flex items-center justify-center gap-2 transition-all text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Clock size={16} />}
                {loading ? 'Checking...' : 'Check Status'}
              </button>
            </div>
          </form>
        )}

        {primaryTab === 'managebooking' && (
          <form onSubmit={handleManageBooking} className="space-y-3">
            <div className="text-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800">Manage Your Booking</h3>
              <p className="text-gray-500 text-sm">View, modify or cancel your reservation</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
              <div>
                <label className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold block mb-0.5">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-gray-600 text-[10px] uppercase tracking-widest font-semibold block mb-0.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-1.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-accent outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-3/4 sm:w-2/3 bg-accent hover:bg-[#b00226] text-white font-bold py-2 rounded-xl shadow-lg shadow-accent/30 flex items-center justify-center gap-2 transition-all text-sm"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Briefcase size={16} />}
                {loading ? 'Retrieving...' : 'Retrieve Booking'}
              </button>
            </div>
          </form>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </motion.div>
    </div>
  );
}
