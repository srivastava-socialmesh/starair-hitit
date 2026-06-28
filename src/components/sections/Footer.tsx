import { Plane, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black/40 border-t border-white/5 px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-2xl font-bold">
            <Plane className="text-cyan-400" /> StarAir
          </div>
          <p className="text-slate-400 text-sm">Redefining luxury air travel.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>Help</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <span className="hover:text-cyan-400 cursor-pointer">🐦</span>
            <span className="hover:text-cyan-400 cursor-pointer">📸</span>
            <span className="hover:text-cyan-400 cursor-pointer">▶️</span>
          </div>
        </div>
      </div>
      <div className="text-center text-slate-600 text-sm mt-8 border-t border-white/5 pt-8">
        © 2026 StarAir. All rights reserved.
      </div>
    </footer>
  );
}
