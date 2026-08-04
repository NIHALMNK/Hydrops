import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initManufacturing(section: HTMLElement) {
  const stages = section.querySelectorAll('.flex-col.md\\:flex-row, .flex-col.md\\:flex-row-reverse');
  const triggers: ScrollTrigger[] = [];

  stages.forEach((stage, i) => {
    const isEven = i % 2 === 0;
    const imgContainer = stage.querySelector('.overflow-hidden') as HTMLElement;
    const img = stage.querySelector('img') as HTMLElement;
    const vignette = stage.querySelector('.absolute.inset-0') as HTMLElement;
    
    const stepNumber = stage.querySelector('span.text-\\[\\#C8A96A\\]') as HTMLElement;
    const title = stage.querySelector('h3') as HTMLElement;
    const desc = stage.querySelector('p') as HTMLElement;

    if (imgContainer && img) {
      // Setup initial states
      gsap.set(imgContainer, { clipPath: 'inset(100% 0% 0% 0%)' });
      gsap.set(img, { scale: 1.08 });
      if (vignette) gsap.set(vignette, { opacity: 1 });
      
      const elementsToFade = [stepNumber, title, desc].filter(Boolean);
      gsap.set(elementsToFade, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          start: 'top 70%',
        }
      });

      // 1. Mask reveal
      tl.to(imgContainer, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power3.inOut' })
      // 2. Scale correction and vignette fade
      .to(img, { scale: 1, duration: 1.6, ease: 'power2.out' }, '-=0.8')
      .to(vignette, { opacity: 0.6, duration: 1, ease: 'power2.out' }, '-=1.2')
      // 3. Text stagger
      .to(elementsToFade, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=1.2');

      triggers.push(tl.scrollTrigger!);
    }
  });

  return () => {
    triggers.forEach(t => t.kill());
  };
}
