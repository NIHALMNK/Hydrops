'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for Hydrops Journal GSAP animations.
 * Applies slow, elegant, luxury animations matching the Hydrops brand identity.
 * Respects prefers-reduced-motion.
 */
export function useBlogLandingAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Accessibility check: Skip heavy animations if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Reveal Stagger
      gsap.from('.blog-hero-animate', {
        y: 24,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
      });

      // 2. Filter & Controls Bar Reveal
      gsap.from('.blog-controls-animate', {
        y: 16,
        opacity: 0,
        duration: 0.9,
        delay: 0.3,
        ease: 'power2.out',
      });

      // 3. Featured Card Reveal
      const featuredCard = document.querySelector('.blog-featured-animate');
      if (featuredCard) {
        gsap.from(featuredCard, {
          scrollTrigger: {
            trigger: featuredCard,
            start: 'top 85%',
          },
          y: 32,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        });
      }

      // 4. Masonry Cards Staggered Scroll Reveal
      const cards = gsap.utils.toArray<HTMLElement>('.blog-card-animate');
      if (cards.length > 0) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 88%',
          },
          y: 28,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}

/**
 * Custom hook for Individual Article Page GSAP animations.
 */
export function useBlogArticleAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Article Header Fade In
      gsap.from('.article-header-animate', {
        y: 20,
        opacity: 0,
        duration: 1.0,
        ease: 'power3.out',
        stagger: 0.1,
      });

      // Related Section Reveal
      const relatedSection = document.querySelector('.article-related-animate');
      if (relatedSection) {
        gsap.from(relatedSection, {
          scrollTrigger: {
            trigger: relatedSection,
            start: 'top 85%',
          },
          y: 30,
          opacity: 0,
          duration: 1.0,
          ease: 'power2.out',
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
