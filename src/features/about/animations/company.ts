import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCompany(section: HTMLElement) {
  const rows = section.querySelectorAll('.grid > div');
  const triggers: ScrollTrigger[] = [];

  if (rows.length > 0) {
    gsap.set(rows, { opacity: 0, y: 20 });
    
    // Very subtle, calm fade and stagger to slow down the pace before the CTA
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      animation: gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power1.out',
      })
    });
    triggers.push(st);
  }

  return () => {
    triggers.forEach(t => t.kill());
  };
}
