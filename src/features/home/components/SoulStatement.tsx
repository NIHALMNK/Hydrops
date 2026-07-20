'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * SoulStatement – The breathing moment between the cinematic Hero and Philosophy.
 * A single poetic line emerges from darkness onto the warm canvas.
 * This gives the visitor an emotional reset after the intensity of the Hero film.
 */
export function SoulStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !quoteRef.current) return;

      // Background transitions from near-black to warm canvas as user enters
      gsap.fromTo(sectionRef.current,
        { backgroundColor: '#111111' },
        {
          backgroundColor: '#F5F2EC',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          }
        }
      );

      // Quote emerges slowly
      gsap.fromTo(quoteRef.current,
        { opacity: 0, y: 30, filter: 'blur(12px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Thin line beneath the quote
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full h-[70vh] flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Signature ripple of light – the recurring visual language of Hydrops */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.4), transparent)',
        }}
      />

      <div ref={quoteRef} className="text-center max-w-2xl opacity-0">
        <p
          className="font-light tracking-[0.25em] uppercase text-sm text-[#C8A96A] mb-8"
          style={{ letterSpacing: '0.3em' }}
        >
          HYDROPS
        </p>
        <h2
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-light text-[#1E1E1E] leading-[1.1] tracking-tight"
        >
          Purity isn&apos;t a claim.
          <br />
          <em className="not-italic text-[#C8A96A]">It&apos;s a commitment.</em>
        </h2>
      </div>

      {/* Thin gold line – signature ripple */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40vw] h-[1px] origin-left opacity-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />
    </div>
  );
}
