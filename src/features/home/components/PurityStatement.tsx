'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionRipple } from './SectionRipple';

gsap.registerPlugin(ScrollTrigger);

/**
 * PurityStatement – The dark contrast beat.
 * After three warm sections, this single dark chapter resets the visitor's visual palate.
 * "Nothing Hidden. Nothing Added. Only Purity." — animated one line at a time.
 * Background: #171717
 */
const STATEMENTS = [
  { line: 'Nothing Hidden.', delay: 0 },
  { line: 'Nothing Added.', delay: 0.15 },
  { line: 'Only Purity.', delay: 0.3, accent: true },
];

export function PurityStatement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // Stagger reveal of the three lines on scroll
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            delay: STATEMENTS[i].delay,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });

      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      if (subRef.current) {
        gsap.fromTo(subRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 0.5, y: 0, duration: 0.8, delay: 0.6, ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 55%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="purity-statement-section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ backgroundColor: '#171717' }}
    >
      {/* Very subtle radial glow from center — feels like light through oil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(200,169,106,0.04) 0%, transparent 65%)',
        }}
      />

      {/* Label */}
      <p
        ref={labelRef}
        className="text-[#C8A96A] text-[11px] font-medium tracking-[0.4em] uppercase mb-16 opacity-0"
      >
        Double Filtered · Crystal Clear · Zero Residue
      </p>

      {/* The three statements */}
      <div className="text-center">
        {STATEMENTS.map((stmt, i) => (
          <div key={i} className="overflow-hidden">
            <span
              ref={el => { linesRef.current[i] = el; }}
              className={`block font-light leading-[0.92] tracking-tight opacity-0 ${
                stmt.accent
                  ? 'text-[#C8A96A]'
                  : 'text-white'
              }`}
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}
            >
              {stmt.line}
            </span>
          </div>
        ))}
      </div>

      {/* Supporting sub-text */}
      <p
        ref={subRef}
        className="mt-16 text-white text-[clamp(0.9rem,1.5vw,1.1rem)] font-light leading-relaxed max-w-md text-center opacity-0"
      >
        Every bottle of Hydrops passes through two rigorous filtration stages — not one — leaving only what the coconut intended.
      </p>

      {/* Signature ripple (light on dark) */}
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
        }}
      />
    </section>
  );
}
