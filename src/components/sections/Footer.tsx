import { Plane, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-white">
            <Plane className="text-rose-500" /> StarAir
          </div>
          <p className="text-slate-400 text-sm mt-2">Redefining luxury air travel with real‑time inventory powered by Hitit.</p>
          <div className="flex gap-4 mt-4 text-xl">
            <span className="text-slate-400 hover:text-rose-400 cursor-pointer transition">🐦</span>
            <span className="text-slate-400 hover:text-rose-400 cursor-pointer transition">📸</span>
            <span className="text-slate-400 hover:text-rose-400 cursor-pointer transition">▶️</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="hover:text-rose-400 cursor-pointer transition">About Us</li>
            <li className="hover:text-rose-400 cursor-pointer transition">Careers</li>
            <li className="hover:text-rose-400 cursor-pointer transition">Press Kit</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="hover:text-rose-400 cursor-pointer transition">Help Center</li>
            <li className="hover:text-rose-400 cursor-pointer transition">Refund Policy</li>
            <li className="hover:text-rose-400 cursor-pointer transition">FAQs</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-center gap-3"><Mail size={16} className="text-rose-400" /> hello@starair.com</li>
            <li className="flex items-center gap-3"><Phone size={16} className="text-rose-400" /> +1 (800) 123-4567</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-rose-400" /> Dubai, UAE</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-slate-600 text-xs mt-12 pt-8 border-t border-white/5">
        © 2026 StarAir. All rights reserved. Powered by Hitit Middleware.
      </div>
    </footer>
  );
}
