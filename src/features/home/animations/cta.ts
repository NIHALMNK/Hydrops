import gsap from 'gsap';

export function initCTA(scope: HTMLElement) {
  const title = scope.querySelector('.cta-title');
  const desc = scope.querySelector('.cta-desc');
  const buttons = scope.querySelector('.cta-buttons');
  const bottle = scope.querySelector('.cta-bg-bottle');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.to(bottle, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'power2.out',
  })
  .to([title, desc], {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
  }, '-=1')
  .to(buttons, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: 'back.out(1.5)',
  }, '-=0.4');

  // Float animation for background bottle
  gsap.to(bottle, {
    y: 30,
    rotation: 15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}
