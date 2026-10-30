import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JourneyIntro from "@/components/JourneyIntro";
import QuickBiteScroll from "@/components/QuickBiteScroll";
import HowItWorks from "@/components/HowItWorks";
import Capabilities from "@/components/Capabilities";
import Architecture from "@/components/Architecture";
import DesignThinking from "@/components/DesignThinking";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Fixed, full-page background: the delivery journey scrubs with the
          page's own scroll position and sits behind every section. */}
      <QuickBiteScroll />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <JourneyIntro />
        <HowItWorks />
        <Capabilities />
        <Architecture />
        <DesignThinking />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
