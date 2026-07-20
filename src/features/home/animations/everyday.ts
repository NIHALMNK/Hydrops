import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Everyday section animation.
 * Staggered reveal of intro then each life moment panel.
 */
export function initEveryday(section: HTMLElement): () => void {
  const label = section.querySelector('.everyday-label');
  const headline = section.querySelector('.everyday-headline');
  const moments = section.querySelectorAll('.everyday-moment');

  const introTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  if (label) {
    introTl.fromTo(label, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
  }
  if (headline) {
    introTl.fromTo(headline, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }, '-=0.3');
  }

  moments.forEach((moment) => {
    gsap.fromTo(moment,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: moment,
          start: 'top 85%',
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
