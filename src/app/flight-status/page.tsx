import FlightStatusClient from "@/components/sections/FlightStatusClient";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Plane } from "lucide-react";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FlightStatusPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          <Plane className="text-red-500" /> Live Flight Status
        </h1>
        <p className="text-gray-500 mb-6">Real-time flight tracking with live animations</p>
        <FlightStatusClient />
      </div>
      <Footer />
    </main>
  );
}
