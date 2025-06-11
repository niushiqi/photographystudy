"use client";

import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { WhatIsSection } from "@/components/home/what-is-section";
import { HowToSection } from "@/components/home/how-to-section";
import { WhyComponent } from "@/components/home/why-component";
import { FaqSection } from "@/components/home/faq-section";
import { CTASection } from "@/components/home/cta-section";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <WhatIsSection />
      <HowToSection />
      <WhyComponent />
      <FaqSection />
      <CTASection />
      <Footer />
    </main>
  );
} 