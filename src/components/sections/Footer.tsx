import { Plane, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0e1a] border-t border-amber-500/10 px-6 py-16 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Plane className="text-amber-400" fill="#fcd34d" />
            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
              StarAir
            </span>
          </div>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Redefining luxury air travel with real-time inventory powered by Hitit.
          </p>
          <div className="flex gap-4 mt-4 text-slate-400">
            <span className="hover:text-amber-400 cursor-pointer transition text-xl">🐦</span>
            <span className="hover:text-amber-400 cursor-pointer transition text-xl">📸</span>
            <span className="hover:text-amber-400 cursor-pointer transition text-xl">▶️</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-amber-400 mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="hover:text-amber-300 cursor-pointer transition">About Us</li>
            <li className="hover:text-amber-300 cursor-pointer transition">Careers</li>
            <li className="hover:text-amber-300 cursor-pointer transition">Press Kit</li>
            <li className="hover:text-amber-300 cursor-pointer transition">Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-amber-400 mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li className="hover:text-amber-300 cursor-pointer transition">Help Center</li>
            <li className="hover:text-amber-300 cursor-pointer transition">Refund Policy</li>
            <li className="hover:text-amber-300 cursor-pointer transition">FAQs</li>
            <li className="hover:text-amber-300 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-amber-400 mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-amber-400" />
              <span>hello@starair.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-amber-400" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-amber-400" />
              <span>Dubai, UAE</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-slate-600 text-xs mt-12 pt-8 border-t border-white/5">
        © 2026 StarAir. All rights reserved. Powered by Hitit Middleware.
      </div>
    </footer>
  );
}
