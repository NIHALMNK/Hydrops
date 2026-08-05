import React from 'react';
import Link from 'next/link';
import type { ProductSettings } from '@/features/products/types';

interface Props {
  settings: ProductSettings;
}

export function ProductTrustCta({ settings }: Props) {
  return (
    <section className="relative py-28 md:py-36 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Radial gold ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(200,169,106,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Gold thread top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.45), transparent)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 product-section-fade">
        <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em] mb-4">
          DISCOVER HYDROPS PURITY
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-6">
          {settings.ctaHeadline || 'Experience Authentic Hydrops Purity'}
        </h2>
        <p className="text-white/60 font-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          {settings.ctaSubtext || 'Connect with our team to enquire about bulk orders, institutional supply, or brand partnerships.'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-[#C8A96A] hover:bg-[#b59556] text-neutral-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105"
          >
            Enquire Now / Contact Us
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300"
          >
            Our Philosophy
          </Link>
        </div>
      </div>
    </section>
  );
}
