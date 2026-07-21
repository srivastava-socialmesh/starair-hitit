"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Package, Send, CheckCircle, Truck, Clock, Shield } from "lucide-react";

export default function CargoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cargo_type: "",
    weight: "",
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
      cargo_type: "",
      weight: "",
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
      const response = await fetch("/api/cargo", {
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">Cargo Services</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-300">
              Reliable, safe, and efficient cargo solutions across India.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Why Choose Star Air Cargo?</h2>
              <div className="mt-6 space-y-4 text-gray-700">
                <p>
                  Star Air Cargo offers fast, reliable, and cost-effective freight solutions across India.
                  With our modern fleet and dedicated cargo handling, we ensure your shipments reach
                  their destination safely and on time.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Truck className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Fast Delivery</h4>
                  <p className="text-sm text-gray-500">Timely & efficient</p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">Secure Handling</h4>
                  <p className="text-sm text-gray-500">Safe transport</p>
                </div>
                <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
                  <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                  <p className="text-sm text-gray-500">Always available</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://starair.in/Content/Images/blog/cargo.jpg"
                alt="Star Air Cargo"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cargo Request Form */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Request a Cargo Quote</h2>
              <p className="text-gray-600 mt-2">Fill in the details and we'll get back to you shortly.</p>
            </div>

            {submitted ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="font-semibold text-lg">Thank you for your request!</p>
                <p className="text-sm mt-1">Our cargo team will get back to you shortly.</p>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cargo Type *</label>
                    <select
                      name="cargo_type"
                      value={formData.cargo_type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
                    >
                      <option value="">Select cargo type</option>
                      <option value="General">General Cargo</option>
                      <option value="Perishable">Perishable</option>
                      <option value="Pharmaceutical">Pharmaceutical</option>
                      <option value="Dangerous">Dangerous Goods</option>
                      <option value="Oversized">Oversized Cargo</option>
                      <option value="Live Animals">Live Animals</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                      placeholder="e.g., 1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition text-gray-700"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-accent focus:ring-accent outline-none transition"
                    placeholder="Any special handling instructions or additional details..."
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
