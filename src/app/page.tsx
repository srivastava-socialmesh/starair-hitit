
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Destinations from "@/components/sections/Destinations";
import DealsSlider from "@/components/sections/DealsSlider";
import ProductsSlider from "@/components/sections/ProductsSlider";
import FlightStatus from "@/components/sections/FlightStatus";
import Stats from "@/components/sections/Stats";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-[#0a0e1a] min-h-screen">
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
