"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface GlowButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: ReactNode;
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  icon,
}: GlowButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 rounded-full overflow-hidden group";

  const variants = {
    primary: `
      bg-gradient-to-r from-accent to-accent-dark 
      text-white 
      hover:shadow-[0_0_30px_rgba(210,4,45,0.5)] 
      hover:scale-[1.02] 
      active:scale-[0.98]
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:-translate-x-full before:group-hover:translate-x-full before:transition-transform before:duration-700
    `,
    secondary: `
      bg-white/10 backdrop-blur-sm 
      text-white 
      border border-white/20
      hover:bg-white/20 
      hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] 
      hover:scale-[1.02]
    `,
    outline: `
      bg-transparent 
      text-accent 
      border-2 border-accent
      hover:bg-accent/10 
      hover:shadow-[0_0_30px_rgba(210,4,45,0.2)] 
      hover:scale-[1.02]
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const Content = () => (
    <>
      {icon && <span className="relative z-10">{icon}</span>}
      <span className="relative z-10">{children}</span>
      <span
        className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          variant === "primary"
            ? "bg-gradient-to-r from-accent to-accent-dark"
            : "bg-white/5"
        } blur-xl`}
      />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      >
        <Content />
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <Content />
    </button>
  );
}
