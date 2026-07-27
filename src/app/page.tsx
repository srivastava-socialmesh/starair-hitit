"use client";

import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Awards from "@/components/sections/Awards";
import HeroSlider from "@/components/sections/HeroSlider";
import QuickActions from "@/components/sections/QuickActions";
import BookingWidget from "@/components/BookingWidget";
import DealsGrid from "@/components/sections/DealsGrid";
import TravelInformation from "@/components/sections/TravelInformation";
import OurCompany from "@/components/sections/OurCompany";
import MoreServices from "@/components/sections/MoreServices";
import SectionHeader from "@/components/SectionHeader";

export const dynamic = "force-dynamic";

const contentMap = {
  flights: <BookingWidget />,
  deals: <DealsGrid />,
  "travel-info": <TravelInformation />,
  "our-company": <OurCompany />,
  "more-services": <MoreServices />,
};

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("flights");
  const ActiveContent = contentMap[activeMenu as keyof typeof contentMap] || contentMap.flights;

  return (
    <main className="min-h-screen bg-dark">
      <Navbar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <HeroSlider quickActions={<QuickActions />}>
        {ActiveContent}
      </HeroSlider>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
        <section>
          <SectionHeader title="Popular Destinations" subtitle="Most loved routes" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
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

      <Awards />
      <Footer />
    </main>
  );
}
