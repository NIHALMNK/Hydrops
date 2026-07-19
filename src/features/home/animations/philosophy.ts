import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPhilosophy(scope: HTMLElement) {
  const watermark = scope.querySelector('.philosophy-watermark');
  const dropletWrapper = scope.querySelector('.philosophy-droplet');
  const dropletSvg = dropletWrapper?.querySelector('svg');
  const persistentText = scope.querySelector('.philosophy-persistent');
  
  const ch1 = scope.querySelector('.chapter-1');
  const ch2 = scope.querySelector('.chapter-2');
  const ch3 = scope.querySelector('.chapter-3');
  const cta = scope.querySelector('.philosophy-cta');

  if (!watermark || !dropletWrapper || !dropletSvg || !persistentText || !ch1 || !ch2 || !ch3 || !cta) return;

  const mm = gsap.matchMedia();

  // 1. Continuous Ambient Motion (Independent of Scroll)
  // The droplet floats continuously, regardless of scrub position.
  gsap.to(dropletSvg, {
    y: "-=12",
    duration: 2.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1
  });

  // 2. Scroll Scrubbed Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#philosophy-section',
      pin: true, // Natively pin the section using GSAP
      start: 'top top',
      end: () => `+=${window.innerHeight * 3}`, // 3 chapters = 3 viewports of scroll
      scrub: 1, // Smooth interpolation
      anticipatePin: 1,
    },
  });

  // Ensure watermark drifts across the entire timeline duration (0 to 10)
  tl.to(watermark, { yPercent: -40, ease: 'none', duration: 10 }, 0);

  // Time 0 - 1: Global Entrance
  tl.to([dropletWrapper, persistentText, ch1], {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power2.out"
  }, 0);

  // Time 1 - 4: Chapter 1 Dominant + Breathing
  tl.to(ch1, { scale: 1.02, duration: 3, ease: "none" }, 1);

  // Time 3 - 4: Overlapped Transition 1 -> 2
  // ch1 completely disappears to avoid ghosting
  tl.to(ch1, { 
    autoAlpha: 0, 
    y: -40, 
    scale: 0.96,
    duration: 1, 
    ease: "power2.inOut" 
  }, 3);
  
  tl.fromTo(ch2, 
    { autoAlpha: 0, y: 40, scale: 0.96 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.inOut" }, 
    3
  );

  // Time 4 - 7: Chapter 2 Dominant + Breathing
  tl.to(ch2, { scale: 1.02, duration: 3, ease: "none" }, 4);

  // Time 6 - 7: Overlapped Transition 2 -> 3
  // ch2 completely disappears to avoid ghosting
  tl.to(ch2, { 
    autoAlpha: 0, 
    y: -40, 
    scale: 0.96, 
    duration: 1, 
    ease: "power2.inOut" 
  }, 6);
  
  tl.fromTo(ch3,
    { autoAlpha: 0, y: 40, scale: 0.96 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: "power2.inOut" },
    6
  );

  // Time 7 - 10: Chapter 3 Dominant + Breathing
  tl.to(ch3, { scale: 1.02, duration: 3, ease: "none" }, 7);

  // Time 7.5 - 8.5: Reveal CTA seamlessly during Ch3
  tl.to(cta, { autoAlpha: 1, y: -10, duration: 1, ease: "power2.out" }, 7.5);

  // Time 8.5 - 10: Exit Transition
  const liquidWrapper = scope.querySelector('.philosophy-liquid-wrapper');
  
  tl.to(dropletWrapper, {
    y: -150,
    opacity: 0, // Soft fade out of droplet as it flies high up
    duration: 1.5,
    ease: "power2.inOut",
  }, 8.5);

  // The liquid surface slowly rises as the user approaches the end
  if (liquidWrapper) {
    tl.to(liquidWrapper, {
      y: 0,
      duration: 1.5,
      ease: "power2.inOut"
    }, 8.5);
  }

  // 3. Infinite Liquid Animation
  const liquidSvg = scope.querySelector('.philosophy-liquid-svg');
  if (liquidSvg) {
    gsap.to(liquidSvg, {
      x: "-12px",
      duration: 14,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  }

  return () => {
    mm.revert();
  };
}
