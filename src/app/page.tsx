import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Destinations from "@/components/sections/Destinations";
import DealsSlider from "@/components/sections/DealsSlider";
import ProductsSlider from "@/components/sections/ProductsSlider";
import FlightStatus from "@/components/sections/FlightStatus";
import Stats from "@/components/sections/Stats";
import Footer from "@/components/sections/Footer";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <DealsSlider />
      <ProductsSlider />
      <FlightStatus />
      <Stats />
      <Footer />
    </main>
  );
}
