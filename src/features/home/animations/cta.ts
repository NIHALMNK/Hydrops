import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ContactCTA Animation Controller.
 * Cinematic entrance sequence for top editorial header, action buttons,
 * dark glass information cards, and embedded Google Map.
 */
export function initCTA(scope: HTMLElement) {
  const label = scope.querySelector('.cta-label');
  const title = scope.querySelector('.cta-title');
  const desc = scope.querySelector('.cta-desc');
  const buttons = scope.querySelector('.cta-buttons');
  const cards = scope.querySelectorAll('.cta-card');
  const mapColumn = scope.querySelector('.cta-map-column');
  const tagline = scope.querySelector('.cta-tagline');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    },
  });

  // 1. Editorial Header & Buttons Fade Up
  const headerElements = [label, title, desc, buttons].filter(Boolean);
  if (headerElements.length > 0) {
    tl.fromTo(
      headerElements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    );
  }

  // 2. Information Cards Staggered Slide In
  if (cards.length > 0) {
    tl.fromTo(
      cards,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out' },
      '-=0.4'
    );
  }

  // 3. Google Map Scale & Fade Entrance
  if (mapColumn) {
    tl.fromTo(
      mapColumn,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.0, ease: 'power3.out' },
      '-=0.6'
    );
  }

  // 4. Tagline Fade In
  if (tagline) {
    tl.fromTo(
      tagline,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
  }
}
