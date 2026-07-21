"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Users, Send, CheckCircle, UserPlus, Calendar, MapPin } from "lucide-react";

export default function GroupBookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    passengers: "",
    origin: "",
    destination: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      passengers: "",
      origin: "",
      destination: "",
      date: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/group-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setSubmitted(true);
      resetForm();

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-gray-900 to-gray-700 text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Group Booking
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Travel together, save together. Group discounts for 10+ passengers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Group Booking?</h2>
              <div className="mt-6 space-y-4 text-gray-700">
                <p>
                  Planning a group trip? Star Air offers special rates and customized services for
                  groups of 10 or more passengers. Whether it's a corporate retreat, family reunion,
                  or educational tour, we make group travel hassle-free and affordable.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <UserPlus className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Group Discounts</h4>
                  <p className="text-sm text-gray-500">Special rates</p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Flexible Scheduling</h4>
                  <p className="text-sm text-gray-500">Customized timings</p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <MapPin className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Any Destination</h4>
                  <p className="text-sm text-gray-500">All across India</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://starair.in/Content/Images/blog/group-booking.jpg"
                alt="Star Air Group Booking"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Group Booking Form */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Request a Group Booking</h2>
              <p className="text-gray-600 mt-2">Fill in the details and we'll get back to you shortly.</p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-lg">Thank you for your request!</p>
                <p className="text-sm mt-1">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Number of Passengers *</label>
                    <input
                      type="number"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleChange}
                      required
                      min="10"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="Min 10 passengers"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Origin *</label>
                    <input
                      type="text"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="e.g., Mumbai"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Travel Date *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                    placeholder="Any special requests or additional information..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-[#b00226] text-white font-semibold py-3 px-6 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Submitting...
                    </>
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
