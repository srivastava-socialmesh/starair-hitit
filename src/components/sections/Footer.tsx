import { Plane, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <Plane className="text-red-500" /> StarAir
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Redefining luxury air travel with real-time inventory powered by Hitit.
          </p>
          <div className="flex gap-4 mt-4 text-2xl">
            <span className="hover:text-red-500 cursor-pointer">🐦</span>
            <span className="hover:text-red-500 cursor-pointer">📸</span>
            <span className="hover:text-red-500 cursor-pointer">▶️</span>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-red-500 cursor-pointer">About Us</li>
            <li className="hover:text-red-500 cursor-pointer">Careers</li>
            <li className="hover:text-red-500 cursor-pointer">Press Kit</li>
            <li className="hover:text-red-500 cursor-pointer">Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Support</h4>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-red-500 cursor-pointer">Help Center</li>
            <li className="hover:text-red-500 cursor-pointer">Refund Policy</li>
            <li className="hover:text-red-500 cursor-pointer">FAQs</li>
            <li className="hover:text-red-500 cursor-pointer">Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Get in Touch</h4>
          <ul className="space-y-3 text-gray-600 text-sm">
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
      <div className="max-w-7xl mx-auto text-center text-gray-500 text-xs mt-12 pt-8 border-t border-gray-200">
        © 2026 StarAir. All rights reserved. Powered by Hitit Middleware.
      </div>
    </footer>
  );
}
