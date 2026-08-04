import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCompany(section: HTMLElement) {
  const eyebrow = section.querySelector('.company-eyebrow');
  const heading = section.querySelector('.company-heading');
  const desc = section.querySelector('.company-desc');
  const ctas = section.querySelectorAll('.company-ctas a');
  const cards = section.querySelectorAll('.company-card');
  const map = section.querySelector('.company-map');

  const triggers: ScrollTrigger[] = [];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    }
  });

  // Top Area Sequence
  if (eyebrow) gsap.set(eyebrow, { opacity: 0 });
  if (heading) gsap.set(heading, { opacity: 0, y: 30 });
  if (desc) gsap.set(desc, { opacity: 0, y: 20 });
  if (ctas.length > 0) gsap.set(ctas, { opacity: 0, scale: 0.95 });
  
  // Bottom Area Sequence
  if (cards.length > 0) gsap.set(cards, { opacity: 0, y: 40 });
  if (map) gsap.set(map, { clipPath: 'inset(100% 0% 0% 0%)' });

  // Animation timeline
  if (eyebrow) tl.to(eyebrow, { opacity: 1, duration: 0.8, ease: 'power2.out' });
  if (heading) tl.to(heading, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.4');
  if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.8');
  if (ctas.length > 0) {
    tl.to(ctas, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)' }, '-=0.6');
  }

  if (cards.length > 0) {
    tl.to(cards, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out',
      clearProps: 'all' // Allows CSS hover effects to work
    }, '-=0.4');
  }

  if (map) {
    tl.to(map, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'power3.inOut' }, '-=1');
  }

  triggers.push(tl.scrollTrigger!);

  return () => {
    triggers.forEach(t => t.kill());
  };
}
