import gsap from 'gsap';

export function initQuality(scope: HTMLElement) {
  const bg = scope.querySelector('.quality-bg');
  const items = gsap.utils.toArray('.quality-item');
  const bottle = scope.querySelector('.quality-bottle');

  // Parallax Background
  gsap.to(bg, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: scope,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 50%',
      end: 'bottom 80%',
      scrub: 1, // Tie strictly to scroll
    }
  });

  tl.to(bottle, {
    opacity: 1,
    scale: 1,
    ease: 'power2.out',
  })
  .to(items, {
    opacity: 1,
    x: 0,
    stagger: 0.2,
    ease: 'power3.out',
  }, '-=0.5');
}
