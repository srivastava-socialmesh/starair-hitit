import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Destinations from "@/components/sections/Destinations";
import Stats from "@/components/sections/Stats";
import FlightStatus from "@/components/sections/FlightStatus";
import Footer from "@/components/sections/Footer";
import DealsSlider from "@/components/sections/DealsSlider";
import ProductsSlider from "@/components/sections/ProductsSlider";

export default function Home() {
  return (
    <main className="bg-[#0a0e1a] min-h-screen">
      <Navbar />
      <Hero />
      <DealsSlider />
      <ProductsSlider />
      <Destinations />
      <Stats />
      <FlightStatus />
      <Footer />
    </main>
  );
}
