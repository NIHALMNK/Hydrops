import React from 'react';
import Image from 'next/image';
import type { ProductDetail, ProductSummary } from '@/features/products/types';

interface Props {
  product: ProductDetail | ProductSummary;
}

export function ProductHero({ product }: Props) {
  const isDetail = 'headline' in product;
  const headline = isDetail ? (product as ProductDetail).headline : product.name;
  const eyebrow = isDetail ? (product as ProductDetail).eyebrow : 'FLAGSHIP BOTANICAL EXTRACTION';
  const subheadline = isDetail ? (product as ProductDetail).subheadline : product.tagline;

  return (
    <section id="overview" className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Warm radial ambient glow matching Hydrops Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(200,169,106,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Gold thread top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text Column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 product-hero-animate">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] animate-pulse" />
              <p className="text-[#C8A96A] font-medium uppercase text-[11px] tracking-[0.4em]">
                {eyebrow}
              </p>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.02] text-balance">
              {headline}
            </h1>

            <p className="text-base md:text-lg font-light text-white/60 leading-relaxed max-w-2xl">
              {subheadline}
            </p>

            {/* Quick Spec Highlights Pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase bg-white/5 border border-[#C8A96A]/30 text-[#C8A96A]">
                Ambient Cold Expelled
              </span>
              <span className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase bg-white/5 border border-[#C8A96A]/30 text-[#C8A96A]">
                Double Micro-Filtered
              </span>
              <span className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wider uppercase bg-white/5 border border-[#C8A96A]/30 text-[#C8A96A]">
                Kerala Copra Origin
              </span>
            </div>

            {/* Brand Action CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#highlights"
                className="px-8 py-4 rounded-full bg-[#C8A96A] hover:bg-[#b59556] text-neutral-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-lg hover:scale-105"
              >
                Explore Purity
              </a>
              <a
                href="#story"
                className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              >
                Discover the Process
              </a>
            </div>
          </div>

          {/* Product Bottle Showcase Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center items-center product-hero-animate">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-neutral-900/60">
              {product.primaryFeaturedImage?.src ? (
                <Image
                  src={product.primaryFeaturedImage.src}
                  alt={product.primaryFeaturedImage.alt || product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 450px"
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 font-serif italic">
                  Hydrops Bottle
                </div>
              )}

              {/* Floating Quality Seal Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0A0A0A]/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs text-white/80">
                <div>
                  <p className="font-semibold text-white">100% Unrefined & Natural</p>
                  <p className="text-[10px] text-white/50">Zero Chemical Solvents or Heat</p>
                </div>
                <span className="px-3 py-1 rounded bg-[#C8A96A]/20 text-[#C8A96A] text-[10px] font-bold uppercase tracking-wider">
                  Pure
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
