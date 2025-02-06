'use client'
import { AdditionalHelp } from "@/components/AdditionalHelp";
import FAQSection from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import WorldwideSection from "@/components/WorldWide";
import HowItWorks from "@/components/Works";
import { Hero } from "@/components/Hero";
import DestinationInsights from "@/components/DestinationInsights";

export default function Home() {
  return (
    // bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]
    <div className="bg-white">
      <Navbar />
      <section className="">
        <Hero />
      </section>
      <section className="min-h-screen">
        <HowItWorks />
      </section>
      <WorldwideSection />
      <section className="min-h-screen">
        <AdditionalHelp />
      </section>
      <section className="min-h-screen">
        <DestinationInsights />
      </section>
      <section className="min-h-screen">
        <FAQSection />
      </section>
      <Footer />
    </div>
  );
}