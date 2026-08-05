'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for Hydrops Product Showcase & Detail GSAP animations.
 * Provides luxury Apple-like scroll triggers, bottle reveals, timeline steps, and section fades.
 * Production-grade: uses explicit fromTo, clearProps, once:true, and ScrollTrigger.refresh().
 * Respects prefers-reduced-motion.
 */
export function useProductAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Reveal Stagger
      const heroElements = gsap.utils.toArray<HTMLElement>('.product-hero-animate');
      if (heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.15,
            clearProps: 'all',
          }
        );
      }

      // 2. Highlights Cards Stagger (Each card triggered individually with fromTo & clearProps)
      const highlights = gsap.utils.toArray<HTMLElement>('.product-highlight-card');
      if (highlights.length > 0) {
        highlights.forEach((card, index) => {
          gsap.fromTo(
            card,
            { y: 20, opacity: 0 },
            {
              scrollTrigger: {
                trigger: card,
                start: 'top 92%',
                once: true,
              },
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.08,
              ease: 'power2.out',
              clearProps: 'all',
            }
          );
        });
      }

      // 3. Craftsmanship Story Chapters Stagger Reveal
      const storyChapters = gsap.utils.toArray<HTMLElement>('.product-story-chapter');
      storyChapters.forEach((chapter) => {
        gsap.fromTo(
          chapter,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: {
              trigger: chapter,
              start: 'top 85%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            clearProps: 'all',
          }
        );
      });

      // 4. Manufacturing Timeline Step Reveals
      const timelineSteps = gsap.utils.toArray<HTMLElement>('.timeline-step-animate');
      timelineSteps.forEach((step) => {
        gsap.fromTo(
          step,
          { y: 35, opacity: 0 },
          {
            scrollTrigger: {
              trigger: step,
              start: 'top 88%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'all',
          }
        );
      });

      // 5. Section Block Fade Ups
      const sectionFades = gsap.utils.toArray<HTMLElement>('.product-section-fade');
      sectionFades.forEach((sec) => {
        gsap.fromTo(
          sec,
          { y: 28, opacity: 0 },
          {
            scrollTrigger: {
              trigger: sec,
              start: 'top 88%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            clearProps: 'all',
          }
        );
      });

      // Recalculate ScrollTrigger positions after all triggers are created
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
