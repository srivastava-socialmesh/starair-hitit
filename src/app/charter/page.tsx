"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Plane, Shield, Users, Clock, Send } from "lucide-react";

export default function CharterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: "",
    departure: "",
    destination: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const fleet = [
    { name: "ERJ 175", desc: "Embraer 175", image: "/images/fleet/erj175.jpg" },
    { name: "ERJ 145", desc: "Embraer 145", image: "/images/fleet/erj145.jpg" },
    { name: "EC-130 T2", desc: "Eurocopter EC-130", image: "/images/fleet/ec130.jpg" },
    { name: "EC-135 T2+", desc: "Eurocopter EC-135 T2+", image: "/images/fleet/ec135.jpg" },
    { name: "EC-135 T3H", desc: "Eurocopter EC-135 T3H", image: "/images/fleet/ec135t3h.jpg" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/images/charter-hero-bg.jpg')] bg-cover bg-center" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Charters
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Now, fly anywhere at any time with the comfort and convenience of your own.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  We are offering you Star Charter services that is specially crafted keeping your
                  travel needs in mind. Pick your preferred travel date, departure time, arrival time,
                  airport, and enjoy a mesmerizing and safe private flying experience bypassing
                  lengthy queues and layovers at the airports.
                </p>
                <p className="mt-4">
                  We use world-class aircraft and helicopters manufactured by giants like Embraer and
                  Airbus under the command of highly experienced pilots who have proven track records
                  in the field of aviation.
                </p>
                <p className="mt-4">
                  So, relax and make your next travel memorable by flying with us as our Star Charter
                  Services are based on three pillars of <strong>Safety</strong>,{" "}
                  <strong>Customer Happiness</strong>, and high <strong>On-time Performance</strong>.
                </p>
              </div>

              {/* Three Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Safety</h4>
                  <p className="text-sm text-gray-500">World-class standards</p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Customer Happiness</h4>
                  <p className="text-sm text-gray-500">Tailored experiences</p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">On-time Performance</h4>
                  <p className="text-sm text-gray-500">Reliable & punctual</p>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href="#charter-form"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-[#b00226] text-white px-8 py-3 rounded-full font-semibold transition shadow-lg"
                >
                  Get a Quote
                </a>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://starair.in/Content/Images/blog/E175-3%20website.jpg"
                alt="Star Air Charter Aircraft"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Fleet Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Our Fleet
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {fleet.map((aircraft) => (
              <div
                key={aircraft.name}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition group"
              >
                <div className="relative h-32 bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    <Plane className="w-12 h-12 text-gray-300" />
                  </div>
                </div>
                <div className="p-3 text-center">
                  <h4 className="font-semibold text-gray-900 text-sm">{aircraft.name}</h4>
                  <p className="text-xs text-gray-500">{aircraft.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/our-fleet"
              className="text-accent hover:text-[#b00226] font-semibold transition"
            >
              View Full Fleet →
            </Link>
          </div>
        </div>
      </section>

      {/* Charter Request Form */}
      <section id="charter-form" className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Let the Beginning Be Special.
              </h2>
              <p className="text-gray-600 mt-2">
                Our Charters Are at Your Service.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Be it for business or for leisure, StarAir's charter service can accommodate flights
                for as few as 5 and as many as 212 passengers. Enjoy the safety, security and
                flexibility of a chartered flight today.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center">
                <p className="font-semibold">Thank you for your request!</p>
                <p className="text-sm">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Number of Passengers *
                    </label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                    >
                      <option value="">Select passengers</option>
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="11-20">11-20</option>
                      <option value="21-50">21-50</option>
                      <option value="51-100">51-100</option>
                      <option value="101-212">101-212</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Departure City *
                    </label>
                    <input
                      type="text"
                      name="departure"
                      value={formData.departure}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="e.g., Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Destination City *
                    </label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="e.g., Delhi"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Travel Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requirements / Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                    placeholder="Any special requests, dietary needs, or additional information..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-[#b00226] text-white font-semibold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send size={18} /> Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
