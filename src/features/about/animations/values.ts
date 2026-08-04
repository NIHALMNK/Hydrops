import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initValues(section: HTMLElement) {
  const cards = section.querySelectorAll('li');
  const triggers: ScrollTrigger[] = [];

  if (cards.length > 0) {
    // Subtle start state
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.98 });
    
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      animation: gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all' // Essential for CSS hover states to take over
      })
    });
    triggers.push(st);
  }

  return () => {
    triggers.forEach(t => t.kill());
  };
}
