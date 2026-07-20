import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Craftsmanship section animation.
 * Staggered reveal of the section label, headline, and each process step.
 */
export function initCraftsmanship(section: HTMLElement): () => void {
  const label = section.querySelector('.craft-label');
  const headline = section.querySelector('.craft-headline');
  const steps = section.querySelectorAll('.craft-step');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
    }
  });

  if (label) {
    tl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
  }
  if (headline) {
    tl.fromTo(headline, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.4');
  }

  steps.forEach((step) => {
    gsap.fromTo(step,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  });

  return () => {
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === section || (st.trigger && section.contains(st.trigger as Element))) {
        st.kill();
      }
    });
  };
}
