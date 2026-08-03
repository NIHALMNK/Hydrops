import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Centered Stacked Cards Scrolling Engine.
 *
 * Pinning Mechanics:
 * - Pins `#craft-pinned-viewport` at `top 60px` (accounting for Navbar height).
 * - `#craft-pinned-viewport` is a 100vh flexbox container that holds every active card
 *   at the EXACT VISUAL CENTER OF THE VIEWPORT throughout the stacking animation.
 * - Card 1 starts centered.
 * - Cards 2, 3, 4 slide upward (`y: 120% → 0%`) and overlap at the exact same centered position.
 * - Pinned cards underneath softly lose emphasis (`scale: 1 → 0.985`, `opacity: 1 → 0.92`).
 */
export function initCraftsmanship(section: HTMLElement): () => void {
  const label = section.querySelector('.craft-label');
  const headline = section.querySelector('.craft-headline');
  const pinnedViewport = section.querySelector('#craft-pinned-viewport') as HTMLElement;
  const cards = section.querySelectorAll('.craft-step-card');

  if (!section || !pinnedViewport || cards.length === 0) return () => {};

  const mm = gsap.matchMedia();

  // 1. Section Header Entrance (Scrolls into view before cards pin)
  if (label) {
    gsap.fromTo(
      label,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  if (headline) {
    gsap.fromTo(
      headline,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headline,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }

  // 2. Desktop & Laptop Centered Stacked Cards Engine (min-width: 1024px)
  mm.add('(min-width: 1024px)', () => {
    // Initial positions: Card 1 centered in place, Cards 2-4 below viewport center
    cards.forEach((card, i) => {
      if (i === 0) {
        gsap.set(card, { opacity: 1, y: 0, scale: 1 });
      } else {
        gsap.set(card, { opacity: 0, y: '120%', scale: 0.985 });
      }
    });

    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: pinnedViewport,
        start: 'top 60px',
        end: '+=300%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Sequence for Cards 2, 3, 4
    for (let i = 1; i < cards.length; i++) {
      const prevCard = cards[i - 1];
      const currentCard = cards[i];
      const stepStartTime = i - 1; // 0, 1, 2

      // Previous card underneath softly loses emphasis
      masterTl.to(
        prevCard,
        {
          scale: 0.985,
          opacity: 0.92,
          ease: 'power1.inOut',
          duration: 0.8,
        },
        stepStartTime
      );

      // Incoming card slides up to exact visual center
      masterTl.to(
        currentCard,
        {
          y: '0%',
          opacity: 1,
          scale: 1,
          ease: 'power1.inOut',
          duration: 1.0,
        },
        stepStartTime
      );
    }
  });

  // 3. Mobile & Tablet Fallback (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.985 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  });

  return () => {
    mm.revert();
  };
}
