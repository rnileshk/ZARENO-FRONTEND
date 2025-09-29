import React from "react";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import AboutSection from "./AboutSection";
import CallToAction from "./CallToAction";
import TestimonialsSection from "./TestimonialsSection";
import CountersSection from "./CountersSection";
import FAQSection from "./FAQSection";

export default function Home() {
  return (
    <div className="font-sans bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CallToAction />
      <TestimonialsSection />
      <CountersSection />
      <FAQSection />
    </div>
  );
}
