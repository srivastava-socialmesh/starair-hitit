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
    <div className="w-full max-w-5xl mx-auto">
      {/* Primary Tabs - centered */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-6 p-1 bg-black/20 rounded-2xl border border-white/10 backdrop-blur-sm">
        {primaryTabs.map((tab) => {
          const isActive = primaryTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setPrimaryTab(tab.id); setResult(null); setError(null); }}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-red-600 text-white shadow-lg shadow-red-500/30'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
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
        className="w-full"
      >
        {primaryTab === 'search' && (
          <form onSubmit={handleSearch} className="space-y-5">
            <div className="flex bg-black/20 rounded-xl p-1 w-fit mx-auto backdrop-blur-sm border border-white/10">
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
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <type.icon size={16} />
                  <span>{type.label}</span>
                </button>
              ))}
            </div>

            {/* FROM, TO, DEPARTURE – Centered with better layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              <div className="w-full max-w-[200px] text-center">
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">✈️ From</label>
                <div className="relative">
                  <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full max-w-[200px] text-center">
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">🛬 To</label>
                <div className="relative">
                  <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 rotate-90" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Destination"
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  />
                </div>
              </div>
              <div className="w-full max-w-[200px] text-center">
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">📅 Departure</label>
                <div className="relative">
                  <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-2 py-2.5 text-white [color-scheme:dark] focus:border-red-500 outline-none transition text-center min-w-[140px]"
                    required
                  />
                </div>
              </div>
              {tripType === 'roundtrip' && (
                <div className="w-full max-w-[200px] text-center">
                  <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">📅 Return</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl pl-10 pr-2 py-2.5 text-white [color-scheme:dark] focus:border-red-500 outline-none transition text-center min-w-[140px]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* PASSENGERS – Centered */}
            <div className="flex justify-center">
              <div className="text-center w-full max-w-[200px]">
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">
                  <Users size={16} className="inline mr-1" /> Passengers
                </label>
                <div className="flex items-center justify-center gap-2 bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2">
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    className="text-white hover:text-red-400 text-xl font-bold px-2"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center text-white text-lg font-semibold min-w-[30px]">{passengers}</span>
                  <button
                    type="button"
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    className="text-white hover:text-red-400 text-xl font-bold px-2"
                  >
                    +
                  </button>
                  <span className="text-white/60 text-sm ml-2">Adult</span>
                </div>
              </div>
            </div>

            {/* PASSENGER TYPE – Centered */}
            <div className="text-center">
              <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-2 drop-shadow-md">👤 Passenger Type</label>
              <div className="flex flex-wrap justify-center gap-2">
                {passengerTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setPassengerType(type.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition border ${
                      passengerType === type.id
                        ? 'bg-red-500/30 border-red-500 text-white'
                        : 'bg-white/10 border-white/20 text-white/70 hover:text-white hover:bg-white/20'
                    }`}
                  >
                    <type.icon size={14} />
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Assistance */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <label className="text-white/80 text-xs uppercase tracking-widest font-bold drop-shadow-md">♿ Special Assistance</label>
              <label className="flex items-center gap-1 text-sm text-white/80">
                <input type="checkbox" className="accent-red-500" /> Need assistance
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
              {loading ? 'Searching...' : 'Search Flight'}
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition" />}
            </button>
          </form>
        )}

        {/* Other tabs (Check-in, Flight Status, Manage Booking) – unchanged, but center form fields */}
        {primaryTab === 'checkin' && (
          <form onSubmit={handleCheckin} className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">Web Check-in</h3>
              <p className="text-white/70 text-sm drop-shadow-md">Check in online and save time at the airport</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Ticket size={20} />}
              {loading ? 'Processing...' : 'Check In Now'}
            </button>
          </form>
        )}

        {primaryTab === 'flightstatus' && (
          <form onSubmit={handleFlightStatus} className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">Real-time Flight Status</h3>
              <p className="text-white/70 text-sm drop-shadow-md">Track your flight with live updates</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">Flight Number</label>
                <input
                  type="text"
                  placeholder="e.g., AI-101"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">Date</label>
                <input
                  type="date"
                  value={statusDate}
                  onChange={(e) => setStatusDate(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white [color-scheme:dark] focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Clock size={20} />}
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </form>
        )}

        {primaryTab === 'managebooking' && (
          <form onSubmit={handleManageBooking} className="space-y-5">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">Manage Your Booking</h3>
              <p className="text-white/70 text-sm drop-shadow-md">View, modify or cancel your reservation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div>
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">Booking Reference / PNR</label>
                <input
                  type="text"
                  placeholder="e.g., ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
              <div>
                <label className="text-white/80 text-xs uppercase tracking-widest font-bold block mb-1 drop-shadow-md">Last Name</label>
                <input
                  type="text"
                  placeholder="Your surname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:border-red-500 outline-none transition text-center"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full max-w-md mx-auto block bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Briefcase size={20} />}
              {loading ? 'Retrieving...' : 'Retrieve Booking'}
            </button>
          </form>
        )}

        {/* Result / Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 flex items-center gap-3 backdrop-blur-sm">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}
        {result && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/40 rounded-xl text-green-300 backdrop-blur-sm">
            <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </motion.div>
    </div>
  );
}
