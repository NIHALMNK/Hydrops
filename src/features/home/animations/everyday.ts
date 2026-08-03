import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/**
 * Everyday Section Animation Architecture:
 * - Section Intro: Staggered reveal of label and headline.
 * - Desktop (min-width: 1024px):
 *   - Scrubbed SVG path draw via strokeDashoffset (100% → 0%).
 *   - MotionPath droplet indicator follows the organic snake path.
 *   - Waypoints activate progressively (glow, scale ring, fill gold).
 *   - Sequential card reveals (Image scale 1.08→1, y 50px→0; Headline blur 8px→0; Description fade).
 * - Mobile / Tablet (< 1024px): Clean staggered reveal per moment card.
 */
export function initEveryday(section: HTMLElement): () => void {
  const label = section.querySelector('.everyday-label');
  const headline = section.querySelector('.everyday-headline');
  const momentsContainer = section.querySelector('#everyday-moments-container');
  const drawnPath = section.querySelector('#everyday-snake-drawn-path') as SVGPathElement;
  const droplet = section.querySelector('#everyday-droplet') as HTMLElement;
  const waypoints = section.querySelectorAll('.everyday-waypoint');
  const cardItems = section.querySelectorAll('.everyday-card-item');

  if (!section || cardItems.length === 0) return () => {};

  const mm = gsap.matchMedia();

  // 1. Section Intro Reveal
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

  // 2. Desktop Journey Engine: Snake Path Draw, Droplet MotionPath & Sequential Card Reveals
  mm.add('(min-width: 1024px)', () => {
    if (drawnPath && momentsContainer) {
      const pathLength = drawnPath.getTotalLength();
      gsap.set(drawnPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: momentsContainer,
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // A. Path Draw (100% -> 0%)
      masterTl.to(
        drawnPath,
        {
          strokeDashoffset: 0,
          ease: 'none',
          duration: 1,
        },
        0
      );

      // B. MotionPath Droplet Traversal
      if (droplet) {
        masterTl.to(
          droplet,
          {
            motionPath: {
              path: drawnPath,
              align: drawnPath,
              alignOrigin: [0.5, 0.5],
            },
            opacity: 1,
            ease: 'none',
            duration: 1,
          },
          0
        );
      }

      // C. Sequential Card Reveals & Waypoint Activation
      cardItems.forEach((card, i) => {
        const imageBox = card.querySelector('.everyday-card-image');
        const cardHeadline = card.querySelector('.everyday-card-headline');
        const cardDesc = card.querySelector('.everyday-card-desc');
        const waypoint = waypoints[i];

        const cardStartTime = (i / (cardItems.length - 1)) * 0.75; // 0, 0.25, 0.5, 0.75

        // Card Container Entrance
        masterTl.to(
          card,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          cardStartTime
        );

        // Image Box
        if (imageBox) {
          masterTl.fromTo(
            imageBox,
            { opacity: 0, scale: 1.08, y: 50 },
            { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power2.out' },
            cardStartTime
          );
        }

        // Headline (Blur -> Clear)
        if (cardHeadline) {
          masterTl.to(
            cardHeadline,
            {
              opacity: 1,
              filter: 'blur(0px)',
              duration: 0.2,
              ease: 'power2.out',
            },
            cardStartTime + 0.05
          );
        }

        // Description
        if (cardDesc) {
          masterTl.to(
            cardDesc,
            {
              opacity: 1,
              duration: 0.2,
              ease: 'power2.out',
            },
            cardStartTime + 0.1
          );
        }

        // Waypoint Activation
        if (waypoint) {
          const ring = waypoint.querySelector('.waypoint-ring');
          const dot = waypoint.querySelector('.waypoint-dot');

          if (ring) {
            masterTl.to(
              ring,
              {
                strokeOpacity: 1,
                scale: 1.3,
                transformOrigin: 'center center',
                duration: 0.15,
              },
              cardStartTime
            );
          }
          if (dot) {
            masterTl.to(
              dot,
              {
                fill: '#C8A96A',
                duration: 0.15,
              },
              cardStartTime
            );
          }
        }
      });
    }
  });

  // 3. Mobile & Tablet Fallback (< 1024px)
  mm.add('(max-width: 1023px)', () => {
    cardItems.forEach((card) => {
      const imageBox = card.querySelector('.everyday-card-image');
      const cardHeadline = card.querySelector('.everyday-card-headline');
      const cardDesc = card.querySelector('.everyday-card-desc');

      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      cardTl.to(card, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' });

      if (imageBox) {
        cardTl.fromTo(
          imageBox,
          { opacity: 0, scale: 1.08, y: 40 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9, ease: 'power2.out' },
          0
        );
      }

      if (cardHeadline) {
        cardTl.to(
          cardHeadline,
          { opacity: 1, filter: 'blur(0px)', duration: 0.7, ease: 'power2.out' },
          0.2
        );
      }

      if (cardDesc) {
        cardTl.to(cardDesc, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0.35);
      }
    });
  });

  return () => {
    mm.revert();
  };
}
