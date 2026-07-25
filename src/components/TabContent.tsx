"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import FlightSearchAvianca from "./sections/FlightSearchAvianca";
import QuickLinks from "./sections/QuickLinks";
import DealsGrid from "./sections/DealsGrid";
import ElectronicServices from "./sections/ElectronicServices";
import TravelInformation from "./sections/TravelInformation";
import OurCompany from "./sections/OurCompany";
import OtherWebsites from "./sections/OtherWebsites";

export default function TabContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "flights";

  const renderContent = () => {
    switch (activeTab) {
      case "flights":
        return {
          left: <FlightSearchAvianca />,
          right: (
            <>
              <QuickLinks />
              <div className="mt-4 glass rounded-2xl p-5 border border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent pointer-events-none" />
                <h3 className="text-sm font-display uppercase tracking-wider text-accent mb-1">
                  NEW BOEING 787
                </h3>
                <p className="text-white font-semibold text-lg leading-tight">
                  This is how Latin America connects with the future
                </p>
                <p className="text-text-secondary text-sm mt-1">
                  Live the experience
                </p>
                <Link
                  href="/charter"
                  className="inline-block mt-3 text-accent hover:text-accent-light text-sm font-medium transition"
                >
                  Learn more →
                </Link>
              </div>
            </>
          ),
        };
      case "deals":
        return {
          left: <DealsGrid />,
          right: <QuickLinks />,
        };
      case "electronic-services":
        return {
          left: <ElectronicServices />,
          right: <QuickLinks />,
        };
      case "travel-info":
        return {
          left: <TravelInformation />,
          right: <QuickLinks />,
        };
      case "our-company":
        return {
          left: <OurCompany />,
          right: <QuickLinks />,
        };
      case "other-websites":
        return {
          left: <OtherWebsites />,
          right: <QuickLinks />,
        };
      default:
        return {
          left: <FlightSearchAvianca />,
          right: <QuickLinks />,
        };
    }
  };

  const { left, right } = renderContent();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2">{left}</div>
      <div className="space-y-4">{right}</div>
    </div>
  );
}
