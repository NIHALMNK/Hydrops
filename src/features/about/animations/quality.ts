import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initQuality(section: HTMLElement) {
  const cards = section.querySelectorAll('li');
  const triggers: ScrollTrigger[] = [];

  if (cards.length > 0) {
    gsap.set(cards, { opacity: 0, y: 40 });
    
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      animation: gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'all' // Essential for hover effects
      })
    });
    triggers.push(st);
  }

  return () => {
    triggers.forEach(t => t.kill());
  };
}
