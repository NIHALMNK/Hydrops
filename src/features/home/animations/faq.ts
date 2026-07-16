import gsap from 'gsap';

export function initFAQ(scope: HTMLElement) {
  const title = scope.querySelector('.faq-title');
  const list = scope.querySelector('.faq-list');

  gsap.to([title, list], {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: scope,
      start: 'top 80%',
    }
  });
}
