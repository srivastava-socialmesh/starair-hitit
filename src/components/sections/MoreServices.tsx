"use client";
import Link from "next/link";
import { ExternalLink, Package, Plane, Users } from "lucide-react";

const links = [
  { label: "Cargo Services", href: "/cargo", icon: Package },
  { label: "Charter Services", href: "/charter", icon: Plane },
  { label: "Group Booking", href: "/group-booking", icon: Users },
];

export default function MoreServices() {
  return (
    <div className="space-y-3">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 glass rounded-xl p-3 border border-white/10 hover:border-accent/30 transition group"
          >
            <Icon size={18} className="text-accent" />
            <span className="text-white group-hover:text-accent transition font-medium">{link.label}</span>
            <ExternalLink size={14} className="text-text-muted group-hover:text-accent transition ml-auto" />
          </Link>
        );
      })}
    </div>
  );
}
