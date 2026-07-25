"use client";
import Link from "next/link";
import { Building2, Users, Award, Target } from "lucide-react";

export default function OurCompany() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Our Company</h2>
      <div className="glass rounded-xl p-5 border border-white/10 space-y-4">
        <p className="text-text-secondary">
          Star Air is the aviation arm of Sanjay Ghodawat Group (SGG), committed to connecting Real India with safe, swift, and spacious air travel.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-text-secondary">
            <Building2 size={16} className="text-accent" />
            <span className="text-sm">Founded 2019</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Users size={16} className="text-accent" />
            <span className="text-sm">3M+ flyers</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Award size={16} className="text-accent" />
            <span className="text-sm">12 aircraft</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Target size={16} className="text-accent" />
            <span className="text-sm">31 destinations</span>
          </div>
        </div>
        <Link href="/about" className="inline-block text-accent hover:text-accent-light text-sm font-medium transition">
          Learn more about us →
        </Link>
      </div>
    </div>
  );
}
