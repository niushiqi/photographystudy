"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { WhatIsSection } from "@/components/home/what-is-section";
import { HowToSection } from "@/components/home/how-to-section";
import { WhyComponent } from "@/components/home/why-component";
import { FaqSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <WhatIsSection />
      <HowToSection />
      <WhyComponent />
      <FaqSection />
      <CTASection />
    </>
  );
} 