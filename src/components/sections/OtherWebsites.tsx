"use client";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const links = [
  { label: "Sanjay Ghodawat Group", href: "https://www.ghodawat.com" },
  { label: "Star Air Careers", href: "/careers" },
  { label: "Star Air Cargo", href: "/cargo" },
  { label: "Star Air Charters", href: "/charter" },
];

export default function OtherWebsites() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Other Websites</h2>
      <p className="text-text-secondary">Explore our other services</p>
      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            className="flex items-center gap-3 glass rounded-xl p-3 border border-white/10 hover:border-accent/30 transition group"
          >
            <span className="text-white group-hover:text-accent transition font-medium">{link.label}</span>
            <ExternalLink size={14} className="text-text-muted group-hover:text-accent transition ml-auto" />
          </Link>
        ))}
      </div>
    </div>
  );
}
