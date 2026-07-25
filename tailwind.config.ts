import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#D2042D",
        "accent-dark": "#9C0322",
        "accent-light": "#FF6B8A",
        "accent-glow": "rgba(210, 4, 45, 0.4)",
        dark: "#0A0A0F",
        "dark-secondary": "#14141E",
        surface: "#1A1A2E",
        "surface-light": "#252540",
        "surface-glass": "rgba(255, 255, 255, 0.05)",
        "text-primary": "#FFFFFF",
        "text-secondary": "#B0B0C0",
        "text-muted": "#808090",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        display: ["Orbitron", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "futuristic":
          "linear-gradient(135deg, #0A0A0F 0%, #1A1A2E 30%, #2A1A3E 60%, #1A0A1E 100%)",
        "futuristic-glow":
          "linear-gradient(135deg, rgba(210, 4, 45, 0.15) 0%, rgba(100, 0, 200, 0.10) 50%, rgba(0, 50, 200, 0.05) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        glow: "0 0 40px rgba(210, 4, 45, 0.3)",
        "glow-lg": "0 0 60px rgba(210, 4, 45, 0.5)",
        "glow-inset": "inset 0 0 40px rgba(210, 4, 45, 0.1)",
        "neon": "0 0 20px rgba(210, 4, 45, 0.5), 0 0 60px rgba(210, 4, 45, 0.2)",
        "card": "0 20px 60px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "border-flow": "borderFlow 4s linear infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "zoom-in": "zoomIn 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "rotate-slow": "rotate 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(210, 4, 45, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(210, 4, 45, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderFlow: {
          "0%": { borderColor: "rgba(210, 4, 45, 0.3)" },
          "50%": { borderColor: "rgba(210, 4, 45, 0.8)" },
          "100%": { borderColor: "rgba(210, 4, 45, 0.3)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "0.6" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
    },
  },
  plugins: [],
};
export default config;
