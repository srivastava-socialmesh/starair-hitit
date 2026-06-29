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
  const [currency, setCurrency] = useState('INR');
  const [passengerType, setPassengerType] = useState('');
  const [bookingRef, setBookingRef] = useState('');
  const [lastName, setLastName] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [statusDate, setStatusDate] = useState('');

  // Loading & result states
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Primary tabs with explicit type
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

  // --- API calls ---

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
          currency,
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

  // --- Render ---

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Primary Tabs */}
      <div className="flex flex-wrap gap-1 sm:gap-2 mb-6 p-1 bg-black/30 rounded-2xl border border-white/5">
        {primaryTabs.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setPrimaryTab(tab.id); setResult(null); setError(null); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
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
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
      >
        {/* --- SEARCH FLIGHTS --- */}
        {primaryTab === 'search' && (
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="flex bg-black/30 rounded-xl p-1 w-fit mx-auto">
              {[
                { id: 'oneway' as TripType, label: 'One Way', icon: Plane },
                { id: 'roundtrip' as TripType, label: 'Round Trip', icon: RotateCw },
                { id: 'multicity' as TripType, label: 'Multi-City', icon: Users },
              ].map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setTripType(type.id)}
                  className={`flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition ${
                    tripType === type.id
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <type.icon size={16} />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">✈️ From</label>
                <div className="relative">
                  <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">🛬 To</label>
                <div className="relative">
                  <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60 rotate-90" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination"
                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">📅 Departure</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white [color-scheme:dark] focus:border-amber-400 outline-none transition"
                    required
                  />
                </div>
              </div>
              {tripType === 'roundtrip' && (
                <div>
                  <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">📅 Return</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/60" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white [color-scheme:dark] focus:border-amber-400 outline-none transition"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">
                  <Users size={16} className="inline mr-1" /> Passengers
                </label>
                <div className="flex items-center bg-black/30 border border-white/10 rounded-xl px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="text-amber-400 hover:text-amber-300 text-xl font-bold px-2"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-white text-lg font-semibold">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    className="text-amber-400 hover:text-amber-300 text-xl font-bold px-2"
                  >
                    +
                  </button>
                  <span className="text-slate-400 text-sm ml-2">Adult</span>
                </div>
              </div>
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">💱 Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-amber-400 outline-none transition appearance-none"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AED">AED (د.إ)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-2">👤 Passenger Type</label>
              <div className="flex flex-wrap gap-2">
                {passengerTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPassengerType(type.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition border ${
                      passengerType === type.id
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <type.icon size={14} />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="text-amber-300 text-xs uppercase tracking-widest font-bold">♿ Special Assistance</label>
              <label className="flex items-center gap-1 text-sm text-slate-400">
                <input type="checkbox" className="accent-amber-500" /> Need assistance
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
              {loading ? 'Searching...' : 'Search Flight'}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition" />}
            </button>
          </form>
        )}

        {/* --- CHECK-IN --- */}
        {primaryTab === 'checkin' && (
          <form onSubmit={handleCheckin} className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-amber-400">Web Check-in</h3>
              <p className="text-slate-400 text-sm">Check in online and save time at the airport</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Ticket size={20} />}
              {loading ? 'Processing...' : 'Check In Now'}
            </button>
          </form>
        )}

        {/* --- FLIGHT STATUS --- */}
        {primaryTab === 'flightstatus' && (
          <form onSubmit={handleFlightStatus} className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-amber-400">Real-time Flight Status</h3>
              <p className="text-slate-400 text-sm">Track your flight with live updates</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">Flight Number</label>
                <input
                  type="text"
                  placeholder="e.g., AI-101"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">Date</label>
                <input
                  type="date"
                  value={statusDate}
                  onChange={(e) => setStatusDate(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Clock size={20} />}
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>
        )}

        {/* --- MANAGE BOOKING --- */}
        {primaryTab === 'managebooking' && (
          <form onSubmit={handleManageBooking} className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-amber-400">Manage Your Booking</h3>
              <p className="text-slate-400 text-sm">View, modify or cancel your reservation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="text-amber-300 text-xs uppercase tracking-widest font-bold block mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-amber-400 outline-none transition"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Briefcase size={20} />}
              {loading ? 'Retrieving...' : 'Retrieve Booking'}
            </button>
          </form>
        )}

        {/* --- Result / Error Display --- */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400">
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </motion.div>
    </div>
  );
}
