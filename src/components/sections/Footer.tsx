import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">About Us</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-rose-500 cursor-pointer transition">Magazine</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Corporate Overview</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Fleet</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Careers</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Media Center</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Awards and Applaud</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-rose-500 cursor-pointer transition">Airports</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Corporate Head Office</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">Travel Info</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-rose-500 cursor-pointer transition">Flight Schedules</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Terms of Carriage</li>
              <li className="hover:text-rose-500 cursor-pointer transition">Fees and Charges</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-4 uppercase tracking-wider text-sm">For Reservations or Customer Support</h4>
            <p className="text-gray-700 text-sm">+91 (0)80 5079 9555</p>
            <p className="text-rose-500 text-sm mt-1">customercare@starair.in</p>
            <div className="flex gap-4 mt-3">
              <a href="#" className="text-[#1DA1F2] hover:opacity-80 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-[#E4405F] hover:opacity-80 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 7.537a4.463 4.463 0 100 8.926 4.463 4.463 0 000-8.926zm6.913-.547a1.043 1.043 0 11-2.086 0 1.043 1.043 0 012.086 0z"/></svg>
              </a>
              <a href="#" className="text-[#FF0000] hover:opacity-80 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" className="text-[#1877F2] hover:opacity-80 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500 text-xs">
          <p>© 2026 StarAir. All Rights Reserved</p>
          <p className="mt-1">Registered Office: StarAir, KIADB Aerospace Park, Bangalore - 560064</p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-rose-500 transition">Privacy Policy</Link>
            <span>·</span>
            <Link href="/disclaimer" className="hover:text-rose-500 transition">Disclaimer</Link>
            <span>·</span>
            <Link href="/" className="hover:text-rose-500 transition">GST Information</Link>
            <span>·</span>
            <Link href="/" className="hover:text-rose-500 transition">Sitemap</Link>
          </p>
          <p className="mt-2 text-gray-400 text-[10px]">We log the IP addresses of visitors for security reasons.</p>
        </div>
      </div>
    </footer>
  );
}
