import gsap from 'gsap';

export function initWhyCrystalClear(scope: HTMLElement) {
  const title = scope.querySelector('.crystal-title');
  const cols = gsap.utils.toArray('.crystal-col');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.to(title, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
  })
  .to(cols, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
  }, '-=0.4');
}
