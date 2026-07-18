import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initProduct(scope: HTMLElement) {
  const bottle = scope.querySelector('.product-bottle');
  const content = scope.querySelector('.product-content');
  const ctaButtons = scope.querySelector('.cta-buttons');

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set([content, bottle, ctaButtons], { 
      opacity: 1, 
      y: 0, 
      scale: 1 
    });
    return () => {}; // empty cleanup
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope,
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    }
  });

  // Section Entrance
  tl.to(content, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
  })
  // Bottle scale and fade
  .to(bottle, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: 'power2.out',
  }, '-=0.5')
  // CTA buttons fade in
  .to(ctaButtons, {
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=1');

  // Continuous floating animation for the bottle
  const floatAnim = gsap.to(bottle, {
    y: -15,
    rotation: 1,
    duration: 3.5,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });

  // Mouse Interaction Parallax
  const handleMouseMove = (e: MouseEvent) => {
    const parallaxTarget = scope.querySelector('.product-parallax');
    if (!parallaxTarget) return;
    
    // Calculate mouse position relative to center of screen
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    
    // Very subtle translation (max 10px) and rotation (max 3deg)
    gsap.to(parallaxTarget, {
      x: x * 10,
      y: y * 10,
      rotationY: x * 3,
      rotationX: -y * 3,
      duration: 1.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    const parallaxTarget = scope.querySelector('.product-parallax');
    if (!parallaxTarget) return;
    gsap.to(parallaxTarget, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 1.5,
      ease: 'power3.out',
    });
  };

  scope.addEventListener('mousemove', handleMouseMove);
  scope.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    scope.removeEventListener('mousemove', handleMouseMove);
    scope.removeEventListener('mouseleave', handleMouseLeave);
    floatAnim.kill();
  };
}
