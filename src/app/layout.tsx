import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import LiveChat from "@/components/sections/LiveChat";
import FuturisticBackground from "@/components/FuturisticBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StarAir – Premium Airline Experience",
  description: "Experience luxury air travel with StarAir. Real-time global inventory powered by Hitit middleware.",
  icons: {
    icon: "https://uuepctepzesuvvjmvkrz.supabase.co/storage/v1/object/public/logo/Star_Logo.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-dark text-text-primary antialiased`}>
        <FuturisticBackground />
        <NextIntlClientProvider messages={messages}>
          <div className="relative z-10">
            <div className="fixed top-4 right-4 z-50">
              <LanguageSwitcher />
            </div>
            {children}
            <LiveChat />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
