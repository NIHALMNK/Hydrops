import gsap from 'gsap';
import { HERO_SCENES } from '../content/heroScenes';

export const createTypographyTimeline = (container: HTMLElement, totalFrames: number) => {
  const tl = gsap.timeline({ paused: true });
  
  HERO_SCENES.forEach((scene) => {
    const selector = `#text-${scene.id}`;
    const element = container.querySelector(selector);
    if (!element) return;

    const startProgress = scene.startFrame / totalFrames;
    const endProgress = scene.endFrame / totalFrames;
    const duration = endProgress - startProgress;
    
    // Fade in
    tl.fromTo(element, 
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: duration * 0.2, ease: "power2.out" },
      startProgress
    );
    
    // If it's the last scene, we don't fade out until the very end, and we fade out differently.
    if (scene.id !== HERO_SCENES[HERO_SCENES.length - 1].id) {
      tl.to(element, 
        { opacity: 0, y: -30, filter: 'blur(10px)', duration: duration * 0.2, ease: "power2.in" },
        endProgress - (duration * 0.2)
      );
    } else {
      // Last scene holds until the transition
      tl.to(element, 
        { opacity: 0, y: -30, filter: 'blur(20px)', duration: 0.05, ease: "power2.inOut" },
        0.95
      );
    }
  });
  
  return tl;
};
