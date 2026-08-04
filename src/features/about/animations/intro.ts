import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initIntro(section: HTMLElement) {
  const headline = section.querySelector('h2') as HTMLElement;
  const paragraphs = section.querySelectorAll('p:not(:first-of-type):not(:last-of-type)');
  const statBox = section.querySelector('.border-\\[\\#C8A96A\\]') as HTMLElement;
  
  const triggers: ScrollTrigger[] = [];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    }
  });
  
  triggers.push(tl.scrollTrigger!);

  // Very basic split text fallback (assuming text isn't actually split in HTML)
  // We'll just fade it up gently to be safe and cinematic
  if (headline) {
    gsap.set(headline, { opacity: 0, y: 40 });
    tl.to(headline, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' });
  }

  if (paragraphs.length > 0) {
    gsap.set(paragraphs, { opacity: 0, y: 20 });
    tl.to(paragraphs, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    }, '-=0.8');
  }

  if (statBox) {
    const statValue = statBox.querySelector('span:first-child');
    gsap.set(statBox, { opacity: 0, scale: 0.95 });
    
    tl.to(statBox, { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.6');
    
    if (statValue) {
      // Counter animation effect
      const val = { v: 0 };
      tl.to(val, {
        v: 2,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          statValue.innerHTML = `${Math.floor(val.v)}&times;`;
        }
      }, '-=1');
    }
  }

  return () => {
    triggers.forEach(t => t.kill());
  };
}
