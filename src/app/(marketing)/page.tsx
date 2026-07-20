'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { HeroScene } from '@/features/hero-cinematic';
import { SoulStatement } from '@/features/home/components/SoulStatement';
import { Philosophy } from '@/features/home/components/Philosophy';
import { CoconutJourney } from '@/features/home/components/CoconutJourney';
import { ProductShowcase } from '@/features/home/components/ProductShowcase';
import { PurityStatement } from '@/features/home/components/PurityStatement';
import { Craftsmanship } from '@/features/home/components/Craftsmanship';
import { Everyday } from '@/features/home/components/Everyday';
import { ContactCTA } from '@/features/home/components/ContactCTA';
import { HomeAnimationController } from '@/features/home/animations/master';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const controller = new HomeAnimationController(mainRef);
    
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
      <main ref={mainRef} className="w-full relative overflow-hidden" style={{ backgroundColor: '#F5F2EC' }}>
        {/* 01 · Cinematic Hero */}
        <HeroScene />

        {/* 02 · Breathing moment — the brand soul emerges from darkness */}
        <SoulStatement />

        {/* 03 · Philosophy — Every drop begins with purity */}
        <Philosophy />

        {/* 04 · Origin — The human story behind every bottle */}
        <CoconutJourney />

        {/* 05 · Product — The bottle as hero */}
        <ProductShowcase />

        {/* 06 · Purity Statement — The dark contrast beat */}
        <PurityStatement />

        {/* 07 · Craftsmanship — Documentary process story */}
        <Craftsmanship />

        {/* 08 · Everyday — Life with Hydrops */}
        <Everyday />

        {/* 09 · Closing — The brand arrives */}
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
