import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initApplications(scope: HTMLElement) {
  const cards = gsap.utils.toArray('.app-card');
  const title = scope.querySelector('.app-title');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 70%',
      end: 'bottom 80%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
  .to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
  }, '-=0.4');
}
