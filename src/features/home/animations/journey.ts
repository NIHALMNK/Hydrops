import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initJourney(scope: HTMLElement) {
  const track = scope.querySelector('.journey-track') as HTMLElement;
  const cards = gsap.utils.toArray('.journey-card') as HTMLElement[];
  const progress = scope.querySelector('.journey-progress');

  if (!track || cards.length === 0) return;

  // Horizontal scroll
  const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

  const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: 'none',
  });

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
  });

  // Progress line
  gsap.to(progress, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: scope,
      start: 'top top',
      end: () => `+=${getScrollAmount() * -1}`,
      scrub: 1,
    }
  });

  // Individual cards reveal
  cards.forEach((card) => {
    // We create a ScrollTrigger that fires based on the container's scroll position
    // using containerAnimation
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: card,
        containerAnimation: tween,
        start: 'left 80%',
        end: 'left 40%',
        scrub: 1,
      }
    });
  });
}
