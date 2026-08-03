'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SoulStatement – The breathing moment between the Video Hero and Philosophy.
 * Dark cinematic atmosphere with coconut background, soft radial gold glow,
 * high-contrast white serif typography and gold italic accent line.
 */
export function SoulStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // If hero-section is present on the page, the unified heroTransition controller handles the transition.
    if (typeof document !== 'undefined' && document.getElementById('hero-section')) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!sectionRef.current || !quoteRef.current) return;

      // Quote emerges smoothly with blur & upward drift
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30, filter: 'blur(12px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Signature gold line reveals beneath quote
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="soul-statement-section"
      className="relative w-full min-h-screen py-24 flex flex-col items-center justify-center bg-[#0E1110] text-[#F5F2EC] overflow-hidden select-none"
    >
      {/* ── 1. Full-width Coconut Background Image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/backgrounds/coconuts-and-leaves-on-blue-background-free-photo.jpeg"
        alt="Coconuts and palm leaves on dark background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 filter brightness-[0.45] contrast-[1.05] blur-[1px] pointer-events-none select-none"
      />

      {/* ── 2. Dark Cinematic Overlays & Ambient Glow ── */}
      {/* Low-opacity dark overlay + backdrop blur */}
      <div className="absolute inset-0 w-full h-full z-10 bg-[#0E1110]/65 pointer-events-none">
        {/* Soft radial glow directly behind content */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(200,169,106,0.24) 0%, rgba(14,17,16,0.85) 75%)',
          }}
        />

        {/* Top/bottom edge dark linear vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,17,16,0.7) 0%, transparent 25%, transparent 75%, rgba(14,17,16,0.8) 100%)',
          }}
        />

        {/* Top signature gold ripple line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
          }}
        />
      </div>

      {/* ── 3. Foreground Text Content (Centered, Immersive) ── */}
      <div ref={quoteRef} className="soul-quote-container relative z-20 text-center max-w-4xl px-6 sm:px-8 py-12">
        {/* Eyebrow */}
        <p className="soul-eyebrow font-light tracking-[0.35em] text-[#C8A96A] text-xs sm:text-sm uppercase mb-6 sm:mb-8">
          HYDROPS
        </p>

        {/* Main Heading (Line 1) */}
        <h2 className="soul-heading text-[clamp(2.5rem,6.5vw,4.8rem)] font-light text-[#F5F2EC] leading-[1.15] tracking-tight mb-2 sm:mb-3 drop-shadow-lg">
          Purity isn&apos;t a claim.
        </h2>

        {/* Highlighted Gold Accent (Line 2) */}
        <h3 className="soul-highlight text-[clamp(2.5rem,6.5vw,4.8rem)] font-light text-[#C8A96A] italic leading-[1.15] tracking-tight drop-shadow-lg">
          It&apos;s a commitment.
        </h3>
      </div>

      {/* Bottom signature gold ripple line */}
      <div
        ref={lineRef}
        className="soul-gold-line absolute bottom-0 left-1/2 -translate-x-1/2 w-[40vw] h-[1px] origin-left z-20"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />
    </section>
  );
}
