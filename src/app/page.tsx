import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import HeroSlider from "@/components/sections/HeroSlider";
import QuickAccessCard from "@/components/sections/QuickAccessCard";
import PromotionalCards from "@/components/sections/PromotionalCards";
import DestinationsGrid from "@/components/sections/DestinationsGrid";
import SpecialOffers from "@/components/sections/SpecialOffers";
import WhyFlyUs from "@/components/sections/WhyFlyUs";
import Fleet from "@/components/sections/Fleet";
import NewsFeed from "@/components/sections/NewsFeed";
import SectionHeader from "@/components/SectionHeader";
import Awards from "@/components/sections/Awards";
import Stats from "@/components/sections/Stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <HeroSlider />
      <QuickAccessCard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-20">
        <section>
          <SectionHeader title="Promotions" subtitle="What's new" />
          <PromotionalCards />
        </section>
        <section>
          <SectionHeader title="Popular Destinations" subtitle="Most loved routes" />
          <DestinationsGrid />
        </section>
        <section>
          <SectionHeader title="Special Offers" subtitle="Exclusive deals for you" />
          <SpecialOffers />
        </section>
        <section>
          <SectionHeader title="Why Fly Us" subtitle="We're different" />
          <WhyFlyUs />
        </section>
        <section>
          <SectionHeader title="Our Fleet" subtitle="Modern aircraft" />
          <Fleet />
        </section>
        <section>
          <SectionHeader title="News & Media" subtitle="Latest updates" />
          <NewsFeed />
        </section>
      </div>
      <Stats />
      <Awards />
      <Footer />
    </main>
  );
}
