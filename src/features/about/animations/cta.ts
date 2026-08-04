import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCTA(section: HTMLElement) {
  const bg = section.querySelector('.absolute.inset-0') as HTMLElement;
  const bottle = section.querySelector('img') as HTMLElement;
  const content = section.querySelector('.relative.z-10') as HTMLElement;
  
  const triggers: ScrollTrigger[] = [];

  // Background slow scale
  if (bg) {
    gsap.set(bg, { scale: 1.05 });
    const bgSt = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      animation: gsap.to(bg, { scale: 1, ease: 'none' }),
      scrub: true
    });
    triggers.push(bgSt);
  }

  // Bottle softly floats up
  if (bottle) {
    const container = bottle.parentElement;
    if (container) gsap.set(container, { y: 120, opacity: 0 });
    
    const bottleSt = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      animation: gsap.to(container, {
        y: 0,
        opacity: 0.15, // Keep it subtle as a ghost image
        duration: 2.5,
        ease: 'power2.out'
      })
    });
    triggers.push(bottleSt);
  }

  // Content cinematic stagger reveal
  if (content) {
    const eyebrow = content.querySelector('p.text-\\[\\#C8A96A\\]');
    const headline = content.querySelector('h2');
    const subheadline = content.querySelector('p.text-2xl');
    const body = content.querySelector('p.max-w-2xl');
    const buttons = content.querySelectorAll('a');
    const tagline = content.querySelector('p.text-sm');

    const elementsToFade = [eyebrow, headline, subheadline, body, buttons[0], buttons[1], tagline].filter(Boolean);
    gsap.set(elementsToFade, { opacity: 0, y: 30 });

    const contentSt = ScrollTrigger.create({
      trigger: section,
      start: 'top 65%',
      animation: gsap.to(elementsToFade, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      })
    });
    triggers.push(contentSt);
  }

  return () => {
    triggers.forEach(t => t.kill());
  };
}
