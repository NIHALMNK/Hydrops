'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HERO_VIDEO, HERO_POSTER } from './constants/hero';
import { ScrollIndicator } from './components/ScrollIndicator';
import type { HeroDocument } from '@/types';

interface HeroProps {
  data?: HeroDocument;
}

export function Hero({ data }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const eyebrow = data?.eyebrow || 'CRYSTAL CLEAR · NATURALLY PURE';
  const headline = data?.headline || 'Colorless Crystal Clear Coconut Oil';
  const description =
    data?.description ||
    'Experience the purest form of coconut oil. Double filtered to achieve a crystal clear finish that preserves natural goodness without any residue.';
  const primaryCta = data?.primaryCta || { label: 'Explore Product', href: '#product-showcase' };
  const secondaryCta = data?.secondaryCta || { label: 'Contact Us', href: '/contact' };
  const videoUrl = data?.videoUrl || HERO_VIDEO;
  const posterUrl = data?.posterUrl || HERO_POSTER;

  // Gentle GSAP staggered entrance reveal
  useGSAP(
    () => {
      if (!contentRef.current) return;
      const elements = contentRef.current.children;
      gsap.fromTo(
        elements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="relative w-full h-[100vh] min-h-[650px] bg-[#050505] text-[#F5F2EC] overflow-hidden flex items-center justify-center"
    >
      {/* ── Background Video Layer (Video → Error → Poster → Gradient) ── */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          poster={posterUrl}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        /* Fallback Poster Image when Video fails */
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={posterUrl}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none filter brightness-75"
        />
      )}

      {/* ── Dark Ambient Radial & Linear Gradient Overlay ── */}
      <div
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 45%, rgba(200,169,106,0.12) 0%, rgba(5,5,5,0.75) 70%),
            linear-gradient(to bottom, rgba(5,5,5,0.65) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.85) 100%)
          `,
        }}
      />

      {/* Signature subtle top light accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] max-w-4xl h-[1px] z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.4), transparent)',
        }}
      />

      {/* ── Hero Foreground Content Layer ── */}
      {/* Positioned around ~55vh for luxury editorial focal balance */}
      <div className="relative z-20 container mx-auto px-6 sm:px-12 md:px-16 lg:px-20 h-full flex flex-col justify-center items-center md:items-start text-center md:text-left pt-[10vh]">
        <div ref={contentRef} className="max-w-3xl flex flex-col items-center md:items-start">
          {/* Eyebrow */}
          <p className="hero-eyebrow font-light tracking-[0.35em] text-[#C8A96A] text-xs sm:text-sm uppercase mb-4 sm:mb-6 select-none">
            {eyebrow}
          </p>

          {/* Heading */}
          <h1 className="hero-heading text-[clamp(2.5rem,5.5vw,5.5rem)] font-light text-[#F5F2EC] leading-[1.08] tracking-tight mb-6 drop-shadow-lg max-w-2xl">
            {headline}
          </h1>

          {/* Description */}
          <p className="hero-description text-white/75 font-light text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-xl">
            {description}
          </p>

          {/* Action CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href={primaryCta.href}
              className="w-full sm:w-auto text-center inline-flex items-center justify-center bg-[#C8A96A] text-[#050505] hover:bg-[#D4B87C] rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 shadow-lg hover:shadow-[#C8A96A]/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {primaryCta.label}
            </Link>

            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="w-full sm:w-auto text-center inline-flex items-center justify-center border border-white/30 text-[#F5F2EC] hover:bg-white/10 hover:border-white/60 rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <ScrollIndicator />
    </section>
  );
}
