"use client";
import { FadeIn } from "./FadeIn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className={`${centered ? "text-center" : "text-left"} ${className} mb-8`}>
        <h2 className="text-3xl font-bold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-text-secondary text-lg mt-1">{subtitle}</p>
        )}
        <div className={`w-16 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mt-2 ${centered ? "mx-auto" : ""}`} />
      </div>
    </FadeIn>
  );
}
