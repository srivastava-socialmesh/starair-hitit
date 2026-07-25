"use client";
import { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  glow = false,
  delay = 0,
  onClick,
}: GlassCardProps) {
  return (
    <FadeIn delay={delay}>
      <div
        className={`
          glass rounded-2xl p-6 
          ${hover ? "hover:scale-[1.02] hover:border-accent/30 transition-all duration-300" : ""}
          ${glow ? "glow" : ""}
          ${onClick ? "cursor-pointer" : ""}
          ${className}
        `}
        onClick={onClick}
      >
        {children}
      </div>
    </FadeIn>
  );
}
