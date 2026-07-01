import FlightStatusClient from "@/components/sections/FlightStatusClient";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function FlightStatusPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <FlightStatusClient />
      <Footer />
    </main>
  );
}
