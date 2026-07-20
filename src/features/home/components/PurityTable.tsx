import { Scene } from './Scene';
import { BottleDisplay } from './purity-table/BottleDisplay';
import { SpecificationOrbit } from './purity-table/SpecificationOrbit';
import { BackgroundEffects } from './purity-table/BackgroundEffects';
import { specifications } from '../data/specifications';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function PurityTable() {
  return (
    <section id="purity-table-section" className="bg-[#F6F8F3] text-[#1a1a1a] relative w-full overflow-hidden">
      
      {/* DESKTOP LAYOUT (Unchanged) */}
      <div className="hidden md:flex w-full h-[100vh] relative items-center justify-center">
        <BackgroundEffects />
        <div className="container mx-auto flex-1 w-full h-full relative flex items-center justify-center">
          <BottleDisplay />
          <SpecificationOrbit />
        </div>
      </div>

      {/* MOBILE LAYOUT (New Dedicated Experience) */}
      <div className="flex md:hidden flex-col w-full px-6 py-24 gap-12 items-center relative z-20">
        
        {/* Intro */}
        <div className="text-center max-w-sm mb-4">
          <h2 className="text-4xl font-light mb-4">Why Hydrops</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            A few simple reasons why every bottle delivers uncompromising purity.
          </p>
        </div>

        {/* Hero Bottle (Floating) */}
        <div className="mobile-bottle relative w-[200px] h-[220px] mb-8 will-change-transform">
          <Image 
            src="/images/products/hydrops-coconut-oil.png"
            alt="Hydrops Coconut Oil Bottle"
            fill
            className="object-contain drop-shadow-2xl z-10"
            sizes="200px"
            priority
          />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[60%] h-[12px] bg-black/10 blur-md rounded-[100%] scale-x-[1.5]"></div>
        </div>

        {/* Premium Storytelling Cards */}
        <div className="flex flex-col w-full gap-12 mt-4">
          {specifications.map((spec) => (
            <div 
              key={spec.id}
              className="mobile-purity-card flex flex-col items-center text-center bg-white rounded-[24px] p-6 shadow-xl border border-black/5 opacity-0 will-change-transform transform-gpu"
              style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.06)' }}
            >
              <h3 className="text-[22px] font-medium tracking-[0.1em] uppercase mb-3">
                {spec.title}
              </h3>
              <p className="text-[15px] leading-relaxed opacity-75">
                {spec.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8">
          <Button size="lg" className="bg-[#0F5A32] text-white hover:bg-[#0F5A32]/90 rounded-full px-8 py-6 text-lg shadow-xl group">
            Explore Product
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

      </div>
    </section>
  );
}
