'use client';

import { useRef, useEffect } from 'react';
import { HomeHero } from '@/features/home/components/HomeHero';
import { Philosophy } from '@/features/home/components/Philosophy';
import { CoconutJourney } from '@/features/home/components/CoconutJourney';
import { ProductShowcase } from '@/features/home/components/ProductShowcase';
import { Specifications } from '@/features/home/components/Specifications';
import { WhyHydrops } from '@/features/home/components/WhyHydrops';
import { Applications } from '@/features/home/components/Applications';
import { QualityPromise } from '@/features/home/components/QualityPromise';
import { WhyCrystalClear } from '@/features/home/components/WhyCrystalClear';
import { FAQ } from '@/features/home/components/FAQ';
import { ContactCTA } from '@/features/home/components/ContactCTA';
import { HomeAnimationController } from '@/features/home/animations/master';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client after mount
    const controller = new HomeAnimationController(mainRef);
    
    // We defer initialization slightly to ensure all child components and refs are painted
    const timer = setTimeout(() => {
      controller.init();
    }, 100);

    return () => {
      clearTimeout(timer);
      controller.cleanup();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main ref={mainRef} className="w-full relative bg-background overflow-hidden">
        <HomeHero />
        <Philosophy />
        <CoconutJourney />
        <ProductShowcase />
        <Specifications />
        <WhyHydrops />
        <Applications />
        <QualityPromise />
        <WhyCrystalClear />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
