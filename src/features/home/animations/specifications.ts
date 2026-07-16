import gsap from 'gsap';

export function initSpecifications(scope: HTMLElement) {
  const bottle = scope.querySelector('.spec-bottle');
  const cards = gsap.utils.toArray('.spec-card');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 50%',
      end: 'bottom 80%',
      scrub: 1,
    }
  });

  tl.to(bottle, {
    opacity: 1,
    scale: 1,
    y: 0,
    rotation: -5,
  })
  .to(cards, {
    opacity: 1,
    x: 0,
    stagger: 0.2,
  }, '-=0.5');
}
