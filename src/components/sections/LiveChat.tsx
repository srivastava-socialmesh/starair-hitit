"use client";
import { useEffect } from "react";

export default function LiveChat() {
  useEffect(() => {
    // Tawk.to embed script - replace YOUR_WIDGET_ID with actual ID
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/YOUR_WIDGET_ID/default";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
}
