import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initCTA(scope: HTMLElement) {
  const label = scope.querySelector('.cta-label');
  const title = scope.querySelector('.cta-title');
  const desc = scope.querySelector('.cta-desc');
  const buttons = scope.querySelector('.cta-buttons');
  const tagline = scope.querySelector('.cta-tagline');
  const bottle = scope.querySelector('.cta-bg-bottle');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  if (bottle) {
    tl.fromTo(bottle,
      { opacity: 0, x: 40 },
      { opacity: 0.12, x: 0, duration: 2.0, ease: 'power2.out' }, 0
    );
  }

  const elements = [label, title, desc, buttons, tagline].filter(Boolean);
  tl.fromTo(elements,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
    '-=1.5'
  );

  // tagline stays at reduced opacity
  if (tagline) {
    tl.set(tagline, { opacity: 0.5 });
  }
}
