"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const lang = getCookie("NEXT_LOCALE") as string;
    if (lang) setLocale(lang);
  }, []);

  const switchLanguage = (lang: string) => {
    setLocale(lang);
    setCookie("NEXT_LOCALE", lang, { maxAge: 60 * 60 * 24 * 365 });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-1 glass rounded-full px-3 py-1.5 border border-white/10">
      <Globe size={14} className="text-text-muted" />
      <button
        onClick={() => switchLanguage("en")}
        className={`px-2 py-0.5 text-xs rounded-full transition font-medium ${
          locale === "en"
            ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
            : "text-text-secondary hover:text-white"
        }`}
      >
        EN
      </button>
      <span className="text-text-muted text-xs">|</span>
      <button
        onClick={() => switchLanguage("hi")}
        className={`px-2 py-0.5 text-xs rounded-full transition font-medium ${
          locale === "hi"
            ? "bg-accent text-white shadow-[0_0_15px_rgba(210,4,45,0.3)]"
            : "text-text-secondary hover:text-white"
        }`}
      >
        हिं
      </button>
    </div>
  );
}
