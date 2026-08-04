import gsap from 'gsap';

export function initHero(section: HTMLElement) {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  const bg = section.querySelector('.absolute.inset-0') as HTMLElement;
  const headline = section.querySelector('h1') as HTMLElement;
  const eyebrow = section.querySelector('p:first-of-type') as HTMLElement;
  const subheadline = headline?.nextElementSibling?.nextElementSibling as HTMLElement;
  const divider = headline?.nextElementSibling as HTMLElement;
  const tagline = section.querySelector('p:last-of-type') as HTMLElement;

  if (bg) {
    gsap.set(bg, { scale: 1.1, opacity: 0 });
    tl.to(bg, { scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, 0);
  }

  const textElements = [eyebrow, headline, divider, subheadline, tagline].filter(Boolean);
  
  if (textElements.length > 0) {
    gsap.set(textElements, { opacity: 0, y: 30 });
    tl.to(textElements, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power3.out'
    }, 0.5);
  }

  return () => {
    tl.kill();
  };
}
