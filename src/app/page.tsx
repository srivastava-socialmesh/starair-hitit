import Hero from "@/components/sections/Hero";
import Destinations from "@/components/sections/Destinations";
import FlightStatus from "@/components/sections/FlightStatus";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Destinations />
      <FlightStatus />
      <Footer />
    </main>
  );
}
// Force fresh deploy
