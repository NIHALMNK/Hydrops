import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProduct(scope: HTMLElement) {
  const bottle = scope.querySelector('.product-bottle');
  const labels = gsap.utils.toArray('.feature-label');
  const orbit = scope.querySelector('.product-orbit');
  const glow = scope.querySelector('.product-glow');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 60%',
      end: 'bottom 80%',
      scrub: 1, // Tie strictly to scroll
    }
  });

  tl.to(bottle, {
    opacity: 1,
    scale: 1,
    rotation: 5,
    ease: 'power2.out',
  })
  .to(glow, {
    opacity: 1,
    scale: 1.2,
  }, '<')
  .to(orbit, {
    opacity: 1,
    rotation: 180,
  }, '<')
  .to(labels, {
    opacity: 1,
    y: 0,
    stagger: 0.2,
  }, '-=0.5');

  // Interactive mouse parallax on bottle using standard event listener 
  // since scrolltrigger handles scroll.
  const handleMouseMove = (e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to(bottle, {
      x,
      y,
      rotationY: x,
      rotationX: -y,
      duration: 1,
      ease: 'power3.out',
    });
  };

  scope.addEventListener('mousemove', handleMouseMove);

  // Return cleanup specifically for the event listener, timeline is cleaned up by context
  return () => {
    scope.removeEventListener('mousemove', handleMouseMove);
  };
}
