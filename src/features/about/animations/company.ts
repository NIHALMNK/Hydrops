import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initCompany(section: HTMLElement) {
  const triggers: ScrollTrigger[] = [];

  // Eyebrow + heading fade up
  const eyebrow = section.querySelector('p:first-of-type');
  const heading = section.querySelector('h2');
  const description = section.querySelector('h2 + p');
  const ctaLinks = section.querySelectorAll('a');
  const grid = section.querySelector('.grid');
  const certBadges = section.querySelectorAll('ul li');

  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
    },
  });

  if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 12 });
  if (heading) gsap.set(heading, { opacity: 0, y: 24 });
  if (description) gsap.set(description, { opacity: 0, y: 16 });
  ctaLinks.forEach((el) => gsap.set(el, { opacity: 0, y: 10 }));

  if (eyebrow) headerTl.to(eyebrow, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
  if (heading) headerTl.to(heading, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.3');
  if (description) headerTl.to(description, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, '-=0.5');
  if (ctaLinks.length > 0) {
    headerTl.to(ctaLinks, { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' }, '-=0.4');
  }

  if (headerTl.scrollTrigger) triggers.push(headerTl.scrollTrigger);

  // Grid columns fade in
  if (grid) {
    const columns = grid.querySelectorAll(':scope > div');
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top 80%',
      },
    });

    columns.forEach((col) => gsap.set(col, { opacity: 0, y: 30 }));
    gridTl.to(columns, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });

    if (gridTl.scrollTrigger) triggers.push(gridTl.scrollTrigger);
  }

  // Certification badges stagger in
  if (certBadges.length > 0) {
    certBadges.forEach((badge) => gsap.set(badge, { opacity: 0, scale: 0.92 }));
    const certSt = ScrollTrigger.create({
      trigger: certBadges[0].closest('ul') ?? section,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(certBadges, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
        });
      },
    });
    triggers.push(certSt);
  }

  return () => {
    triggers.forEach((t) => t.kill());
  };
}
