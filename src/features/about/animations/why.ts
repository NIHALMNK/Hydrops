import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initWhy(section: HTMLElement) {
  const items = section.querySelectorAll('li');
  const triggers: ScrollTrigger[] = [];

  items.forEach((item) => {
    const number = item.querySelector('span:first-of-type');
    const title = item.querySelector('h3');
    const desc = item.querySelector('p');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
      }
    });

    if (number) gsap.set(number, { opacity: 0 });
    if (title) gsap.set(title, { opacity: 0, x: -20 });
    if (desc) gsap.set(desc, { opacity: 0, y: 20 });

    if (number) tl.to(number, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    if (title) tl.to(title, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.4');
    if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.6');

    triggers.push(tl.scrollTrigger!);
  });

  return () => {
    triggers.forEach(t => t.kill());
  };
}
