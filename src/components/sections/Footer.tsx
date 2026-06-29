import { Plane, Mail, Phone, MapPin, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Plane className="text-red-600" fill="#dc2626" />
            <span className="text-gray-800">StarAir</span>
          </div>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">
            Redefining luxury air travel with real-time inventory powered by Hitit.
          </p>
          <div className="flex gap-4 mt-4 text-gray-500">
            <Twitter className="hover:text-red-600 cursor-pointer transition" size={20} />
            <Instagram className="hover:text-red-600 cursor-pointer transition" size={20} />
            <Youtube className="hover:text-red-600 cursor-pointer transition" size={20} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-red-600 mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-red-600 cursor-pointer transition">About Us</li>
            <li className="hover:text-red-600 cursor-pointer transition">Careers</li>
            <li className="hover:text-red-600 cursor-pointer transition">Press Kit</li>
            <li className="hover:text-red-600 cursor-pointer transition">Blog</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-red-600 mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-2 text-gray-500 text-sm">
            <li className="hover:text-red-600 cursor-pointer transition">Help Center</li>
            <li className="hover:text-red-600 cursor-pointer transition">Refund Policy</li>
            <li className="hover:text-red-600 cursor-pointer transition">FAQs</li>
            <li className="hover:text-red-600 cursor-pointer transition">Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-red-600 mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul className="space-y-3 text-gray-500 text-sm">
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-red-500" />
              <span>hello@starair.com</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-red-500" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={16} className="text-red-500" />
              <span>Dubai, UAE</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center text-gray-400 text-xs mt-8 pt-8 border-t border-gray-200">
        © 2026 StarAir. All rights reserved. Powered by Hitit Middleware.
      </div>
    </footer>
  );
}
