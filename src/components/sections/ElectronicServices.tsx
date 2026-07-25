"use client";
import Link from "next/link";
import { Plane, Ticket, Clock, User, CheckCircle } from "lucide-react";

const services = [
  { icon: Plane, label: "Web Check-In", href: "/web-checkin", desc: "Check in online from 48 hours before departure" },
  { icon: Ticket, label: "Manage Booking", href: "/manage-booking", desc: "View, change or cancel your booking" },
  { icon: Clock, label: "Flight Status", href: "/flight-status", desc: "Real-time flight information" },
  { icon: User, label: "Frequent Flyer", href: "/loyalty", desc: "Earn and redeem miles" },
];

export default function ElectronicServices() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Electronic Services</h2>
      <p className="text-text-secondary">Manage your travel online</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Link key={service.label} href={service.href} className="glass rounded-xl p-4 border border-white/10 hover:border-accent/30 transition group">
              <div className="flex items-start gap-3">
                <Icon size={24} className="text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-medium group-hover:text-accent transition">{service.label}</h4>
                  <p className="text-text-secondary text-sm">{service.desc}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
