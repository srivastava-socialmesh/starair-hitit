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
  const parts = title.split(" ");

  return (
    <FadeIn>
      <div className={`${centered ? "text-center" : "text-left"} ${className}`}>
        <h2 className="section-title text-3xl md:text-4xl font-bold text-white inline-block">
          {parts.map((word, i) => {
            const isHighlight = i === parts.length - 1;
            return isHighlight ? (
              <span key={i} className="gradient-text">
                {word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            );
          })}
        </h2>
        <div
          className={`w-16 h-1 bg-gradient-to-r from-accent to-accent-light rounded-full mt-3 ${
            centered ? "mx-auto" : ""
          }`}
        />
        {subtitle && (
          <p className="text-text-secondary text-lg mt-4 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </FadeIn>
  );
}
