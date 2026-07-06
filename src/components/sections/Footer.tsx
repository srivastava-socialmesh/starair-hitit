import Link from "next/link";
import { Twitter, Instagram, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">About Us</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-rose-400 cursor-pointer transition">Star Air Magazine</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Corporate Overview</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Fleet</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Careers</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Media Center</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Awards and Applaud</li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-rose-400 cursor-pointer transition">Airports</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Corporate Head Office</li>
            </ul>
          </div>

          {/* Travel Info */}
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Travel Info</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="hover:text-rose-400 cursor-pointer transition">Citizen's Charter</li>
              <li className="hover:text-rose-400 cursor-pointer transition">FAQ</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Fly Guidelines</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Flight Schedules</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Terms of Carriage</li>
              <li className="hover:text-rose-400 cursor-pointer transition">Fees and Charges</li>
            </ul>
          </div>
        </div>

        {/* Contact Details & Payment Logos */}
        <div className="border-t border-white/5 mt-8 pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">For Reservations or Customer Support</h4>
            <p className="text-slate-300 text-sm">+91 (0)80 5079 9555</p>
            <p className="text-rose-400 text-sm mt-1">customercare@starair.in</p>
            <div className="flex gap-4 mt-3">
              <Twitter size={20} className="text-slate-400 hover:text-rose-400 cursor-pointer transition" />
              <Instagram size={20} className="text-slate-400 hover:text-rose-400 cursor-pointer transition" />
              <Youtube size={20} className="text-slate-400 hover:text-rose-400 cursor-pointer transition" />
              <Facebook size={20} className="text-slate-400 hover:text-rose-400 cursor-pointer transition" />
            </div>
            <p className="text-slate-500 text-xs mt-3">Download our mobile app</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-sm">We Accept</h4>
            <div className="flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="bg-white/10 px-3 py-1 rounded-full">VISA</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">MasterCard</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">American Express</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">DISCOVER</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">E-HM</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">RuPay</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">NET BANKING</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 mt-8 pt-6 text-center text-slate-600 text-xs">
          <p>© 2026 StarAir. All Rights Reserved</p>
          <p className="mt-1">Registered Office: StarAir, KIADB Aerospace Park, Bangalore - 560064</p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-rose-400 transition">Privacy Policy</Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-rose-400 transition">Disclaimer</Link>
            <span>·</span>
            <Link href="/" className="hover:text-rose-400 transition">GST Information</Link>
            <span>·</span>
            <Link href="/" className="hover:text-rose-400 transition">Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
