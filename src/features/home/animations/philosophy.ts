import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPhilosophy(scope: HTMLElement) {
  const content = scope.querySelector('.philosophy-content');
  const eyebrow = scope.querySelector('.philosophy-eyebrow');
  const heading = scope.querySelector('.philosophy-heading');
  const paragraph = scope.querySelector('.philosophy-paragraph');

  if (!content || !eyebrow || !heading || !paragraph) return;

  // Set initial states
  gsap.set([eyebrow, paragraph], { opacity: 0 });
  gsap.set(heading, { opacity: 0, y: 40 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 60%',
      end: 'bottom bottom',
      toggleActions: 'play none none reverse',
    },
  });

  tl.to(eyebrow, {
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
  })
  .to(heading, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power3.out',
  }, '-=0.6')
  .to(paragraph, {
    opacity: 1,
    duration: 1.2,
    ease: 'power2.out',
  }, '-=0.8');

  // Parallax effect on the whole content block
  gsap.to(content, {
    y: -50,
    ease: 'none',
    scrollTrigger: {
      trigger: scope,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
