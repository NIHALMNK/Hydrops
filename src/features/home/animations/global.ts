import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initGlobalGSAP() {
  if (typeof window === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.defaults({
    ease: 'power2.out',
    duration: 1.2,
  });

  gsap.config({
    autoSleep: 60,
    force3D: true,
  });

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    gsap.globalTimeline.timeScale(0); // Instantly finish or disable
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
  } else {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }
}
