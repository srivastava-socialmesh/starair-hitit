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
  AlertCircle
} from "lucide-react";

type PrimaryTab = 'search' | 'checkin' | 'flightstatus' | 'managebooking';
type TripType = 'oneway' | 'roundtrip' | 'multicity';

export default function FlightSearch() {
  const [primaryTab, setPrimaryTab] = useState<PrimaryTab>('search');
  const [tripType, setTripType] = useState<TripType>('oneway');
  const [from, setFrom] = useState('DEL');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('2026-07-06');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [passengerType, setPassengerType] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [lastName, setLastName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [statusDate, setStatusDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const primaryTabs: { id: PrimaryTab; label: string; icon: any }[] = [
    { id: 'search', label: 'Search Flights', icon: Search },
    { id: 'checkin', label: 'Check-in', icon: Ticket },
    { id: 'flightstatus', label: 'Flight Status', icon: Clock },
    { id: 'managebooking', label: 'Manage Booking', icon: Briefcase },
  ];

  const passengerTypes = [
    { id: 'family', label: 'Family & Friends', icon: UsersRound },
    { id: 'senior', label: 'Senior Citizen', icon: User },
    { id: 'unaccompanied', label: 'Unaccompanied Minor', icon: Heart },
    { id: 'student', label: 'Students', icon: GraduationCap },
    { id: 'armed', label: 'Armed Forces', icon: Shield },
    { id: 'govt', label: 'Govt. Employee', icon: Briefcase },
  ];

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
          passengers,
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
    <div className="w-full max-w-4xl mx-auto">
      {/* Primary Tabs – smaller */}
      <div className="flex flex-wrap justify-center gap-0 sm:gap-1 mb-6 p-1 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
        {primaryTabs.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setPrimaryTab(tab.id); setResult(null); setError(null); }}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                  : 'text-gray-700 hover:text-red-600 hover:bg-white/10'
              }`}
            >
              <tab.icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Panel – lighter, smaller */}
      <motion.div
        key={primaryTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-white/20 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-2xl border border-white/20"
      >
        {primaryTab === 'search' && (
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex bg-white/30 rounded-xl p-1 w-fit mx-auto border border-white/30">
              {[
                { id: 'oneway' as TripType, label: 'One Way', icon: Plane },
                { id: 'roundtrip' as TripType, label: 'Round Trip', icon: RotateCw },
                { id: 'multicity' as TripType, label: 'Multi-City', icon: Users },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTripType(type.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition ${
                    tripType === type.id
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-gray-700 hover:text-red-600 hover:bg-white/20'
                  }`}
                >
                  <type.icon size={14} />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* FROM, TO, DEPARTURE */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center items-start">
              <div className="w-full max-w-[170px] mx-auto text-center">
                <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold block mb-1">✈️ From</label>
                <div className="relative">
                  <Plane size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="City"
                    className="w-full bg-white/90 border border-gray-300 rounded-xl pl-7 pr-3 py-2 text-gray-800 text-xs placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full max-w-[170px] mx-auto text-center">
                <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold block mb-1">🛬 To</label>
                <div className="relative">
                  <Plane size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 rotate-90" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Dest"
                    className="w-full bg-white/90 border border-gray-300 rounded-xl pl-7 pr-3 py-2 text-gray-800 text-xs placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full max-w-[170px] mx-auto text-center">
                <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold block mb-1">📅 Departure</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-white/90 border border-gray-300 rounded-xl pl-7 pr-2 py-2 text-gray-800 text-xs [color-scheme:light] focus:border-red-500 outline-none transition text-center min-w-[140px]"
                    required
                  />
                </div>
              </div>
              {tripType === 'roundtrip' && (
                <div className="w-full max-w-[170px] mx-auto text-center">
                  <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold block mb-1">📅 Return</label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-white/90 border border-gray-300 rounded-xl pl-7 pr-2 py-2 text-gray-800 text-xs [color-scheme:light] focus:border-red-500 outline-none transition text-center min-w-[140px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* PASSENGERS */}
            <div className="flex justify-center">
              <div className="text-center w-full max-w-[170px]">
                <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold block mb-1">
                  <Users size={14} className="inline mr-1" /> Passengers
                </label>
                <div className="flex items-center justify-center gap-2 bg-white/90 border border-gray-300 rounded-xl px-3 py-1.5">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="text-gray-600 hover:text-red-600 text-lg font-bold px-1"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-gray-800 text-sm font-semibold min-w-[24px]">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    className="text-gray-600 hover:text-red-600 text-lg font-bold px-1"
                  >
                    +
                  </button>
                  <span className="text-gray-500 text-[10px] ml-1">Adult</span>
                </div>
              </div>
            </div>

            {/* PASSENGER TYPE */}
            <div className="text-center">
              <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold block mb-2">👤 Passenger Type</label>
              <div className="flex flex-wrap justify-center gap-1.5">
                {passengerTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPassengerType(type.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-medium transition border ${
                      passengerType === type.id
                        ? 'bg-red-500/20 border-red-500 text-red-700'
                        : 'bg-white/50 border-gray-300 text-gray-700 hover:bg-white/80 hover:border-red-300'
                    }`}
                  >
                    <type.icon size={12} />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Assistance */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <label className="text-gray-800 text-[10px] uppercase tracking-widest font-bold">♿ Special Assistance</label>
              <label className="flex items-center gap-1 text-xs text-gray-700">
                <input type="checkbox" className="accent-red-500" /> Need assistance
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-4 rounded-xl shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70 text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
              {loading ? 'Searching...' : 'Search Flight'}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition" />}
            </button>
          </form>
        )}

        {/* Other tabs (Check-in, Flight Status, Manage Booking) */}
        {primaryTab === 'checkin' && (
          <form onSubmit={handleCheckin} className="space-y-4">
            <div className="text-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Web Check-in</h3>
              <p className="text-gray-600 text-sm">Check in online and save time at the airport</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-gray-700 text-[10px] uppercase tracking-widest font-bold block mb-1">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-white/90 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 text-[10px] uppercase tracking-widest font-bold block mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white/90 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 transition-all text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Ticket size={18} />}
              {loading ? 'Processing...' : 'Check In Now'}
            </button>
          </form>
        )}

        {primaryTab === 'flightstatus' && (
          <form onSubmit={handleFlightStatus} className="space-y-4">
            <div className="text-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Real-time Flight Status</h3>
              <p className="text-gray-600 text-sm">Track your flight with live updates</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-gray-700 text-[10px] uppercase tracking-widest font-bold block mb-1">Flight Number</label>
                <input
                  type="text"
                  placeholder="e.g., AI-101"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-white/90 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 text-[10px] uppercase tracking-widest font-bold block mb-1">Date</label>
                <input
                  type="date"
                  value={statusDate}
                  onChange={(e) => setStatusDate(e.target.value)}
                  className="w-full bg-white/90 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm [color-scheme:light] focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 transition-all text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Clock size={18} />}
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>
        )}

        {primaryTab === 'managebooking' && (
          <form onSubmit={handleManageBooking} className="space-y-4">
            <div className="text-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Manage Your Booking</h3>
              <p className="text-gray-600 text-sm">View, modify or cancel your reservation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-gray-700 text-[10px] uppercase tracking-widest font-bold block mb-1">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-white/90 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 text-[10px] uppercase tracking-widest font-bold block mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white/90 border border-gray-300 rounded-xl px-4 py-2.5 text-gray-800 text-sm placeholder:text-gray-400 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 transition-all text-sm"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Briefcase size={18} />}
              {loading ? 'Retrieving...' : 'Retrieve Booking'}
            </button>
          </form>
        )}

        {/* Result / Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </motion.div>
    </div>
  );
}
