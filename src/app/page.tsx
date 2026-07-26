"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Awards from "@/components/sections/Awards";
import BookingPanel from "@/components/BookingPanel";
import QuickLinks from "@/components/sections/QuickLinks";
import DealsGrid from "@/components/sections/DealsGrid";
import ElectronicServices from "@/components/sections/ElectronicServices";
import TravelInformation from "@/components/sections/TravelInformation";
import OurCompany from "@/components/sections/OurCompany";
import OtherWebsites from "@/components/sections/OtherWebsites";
import SectionHeader from "@/components/SectionHeader";

const tabs = [
  { id: "flights", label: "Flights" },
  { id: "deals", label: "Deals and offers" },
  { id: "electronic-services", label: "Electronic services" },
  { id: "travel-info", label: "Travel information" },
  { id: "our-company", label: "Our company" },
  { id: "other-websites", label: "Other websites" },
];

// Tab content mapping
const tabContent = {
  flights: {
    left: <BookingPanel />,
    right: (
      <div className="space-y-4">
        <div className="glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
          <h3 className="text-sm font-display uppercase tracking-wider text-accent mb-1">
            NEW BOEING 787
          </h3>
          <p className="text-white font-semibold text-lg leading-tight">
            This is how we connect the future
          </p>
          <p className="text-text-secondary text-sm mt-1">
            Live the experience
          </p>
          <button className="mt-3 bg-accent hover:bg-accent-dark text-white px-4 py-1.5 rounded-full text-sm font-medium transition">
            Learn more →
          </button>
        </div>
        <QuickLinks />
      </div>
    ),
    showSections: true,
  },
  deals: {
    left: <DealsGrid />,
    right: <QuickLinks />,
    showSections: false,
  },
  "electronic-services": {
    left: <ElectronicServices />,
    right: <QuickLinks />,
    showSections: false,
  },
  "travel-info": {
    left: <TravelInformation />,
    right: <QuickLinks />,
    showSections: false,
  },
  "our-company": {
    left: <OurCompany />,
    right: <QuickLinks />,
    showSections: false,
  },
  "other-websites": {
    left: <OtherWebsites />,
    right: <QuickLinks />,
    showSections: false,
  },
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("flights");

  const content = tabContent[activeTab as keyof typeof tabContent] || tabContent.flights;

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
            alt="Star Air"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Find your <span className="gradient-text">perfect flight</span>
            </h1>
            <p className="text-text-secondary text-lg mt-1">
              Search, compare, and book with Star Air.
            </p>
          </div>

          {/* Tab Bar - Now with hover support */}
          <div className="flex flex-wrap gap-1 bg-white/5 rounded-xl p-1 border border-white/10 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onMouseEnter={() => setActiveTab(tab.id)}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
                    : "text-text-secondary hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">{content.left}</div>
            <div className="space-y-4">{content.right}</div>
          </div>
        </div>
      </section>

      {/* Optional Sections (only for Flights tab) */}
      {content.showSections && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
          <section>
            <SectionHeader title="Popular Destinations" subtitle="Most loved routes" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              {/* Static example destinations - replace with dynamic data */}
              {[
                { city: "Mumbai", country: "India", code: "BOM", price: 4999 },
                { city: "Delhi", country: "India", code: "DEL", price: 5499 },
                { city: "Bengaluru", country: "India", code: "BLR", price: 3999 },
                { city: "Hyderabad", country: "India", code: "HYD", price: 4299 },
                { city: "Chennai", country: "India", code: "MAA", price: 4599 },
                { city: "Kolkata", country: "India", code: "CCU", price: 4899 },
              ].map((dest) => (
                <div key={dest.code} className="glass rounded-xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
                  <div className="relative h-40 bg-dark-secondary">
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                      ✈️ {dest.city}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h4 className="text-white font-bold">{dest.city}</h4>
                      <p className="text-text-secondary text-xs">{dest.country}</p>
                    </div>
                    <span className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs font-bold text-accent">
                      ₹{dest.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Special Offers" subtitle="Exclusive deals for you" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[
                { title: "Summer Sale", desc: "Up to 40% off on select routes", discount: 40 },
                { title: "Weekend Getaway", desc: "Special fares for short trips", discount: 25 },
                { title: "Corporate Discount", desc: "Business travel savings", discount: 30 },
              ].map((offer, i) => (
                <div key={i} className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition group">
                  <div className="relative h-48 bg-dark-secondary flex items-center justify-center">
                    <span className="text-4xl">🎉</span>
                    <span className="absolute top-3 right-3 bg-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                      {offer.discount}% OFF
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-bold group-hover:text-accent transition">{offer.title}</h4>
                    <p className="text-text-secondary text-sm mt-1">{offer.desc}</p>
                    <span className="inline-block mt-2 text-accent text-sm font-medium">Book now →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Why Fly Us" subtitle="We're different" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
              {[
                { icon: "🛡️", title: "Safety", desc: "World-class standards" },
                { icon: "⏰", title: "On Time", desc: "High on-time performance" },
                { icon: "💰", title: "Affordable", desc: "Best prices" },
                { icon: "📏", title: "Spacious", desc: "Comfortable seating" },
                { icon: "📍", title: "Regional", desc: "Connecting India" },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-4 text-center border border-white/10 hover:border-accent/30 transition group">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h4 className="text-white font-bold text-sm">{item.title}</h4>
                  <p className="text-text-secondary text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <Awards />
      <Footer />
    </main>
  );
}
