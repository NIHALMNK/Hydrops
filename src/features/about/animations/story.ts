import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initStory(section: HTMLElement) {
  const imageCol = section.querySelector('.lg\\:w-5\\/12');
  const chapters = section.querySelectorAll('li');
  const image = section.querySelector('img');

  const triggers: ScrollTrigger[] = [];

  if (imageCol && image) {
    gsap.set(imageCol, { y: 60, opacity: 0 });
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      animation: gsap.to(imageCol, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out'
      })
    });
    triggers.push(st);

    const parallaxSt = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      animation: gsap.fromTo(image, 
        { y: '-8%', scale: 1.05 },
        { y: '8%', scale: 1, ease: 'none' }
      ),
      scrub: true
    });
    triggers.push(parallaxSt);
  }

  if (chapters.length > 0) {
    gsap.set(chapters, { opacity: 0, x: 40 });
    const st = ScrollTrigger.create({
      trigger: chapters[0],
      start: 'top 80%',
      animation: gsap.to(chapters, {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: 'power2.out'
      })
    });
    triggers.push(st);
  }

  return () => {
    triggers.forEach(t => t.kill());
  };
}
