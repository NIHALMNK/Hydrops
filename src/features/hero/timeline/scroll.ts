import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { mapScrollToFrame } from '../utils/frameMath';
import { frameRenderer } from '../canvas/FrameRenderer';
import { sceneManager } from './SceneManager';
import { heroStateMachine } from '../utils/stateMachine';
import { createTypographyTimeline } from './sceneTimeline';

gsap.registerPlugin(ScrollTrigger);

export const createHeroScroll = (
  container: HTMLElement, 
  videoContainer: HTMLElement, 
  typographyContainer: HTMLElement,
  totalFrames: number
) => {
  
  const typographyTl = createTypographyTimeline(typographyContainer, totalFrames);
  
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      pin: videoContainer,
      pinSpacing: false,
      scrub: 0.1,
      onUpdate: (self) => {
        const frame = mapScrollToFrame(self.progress, totalFrames);
        frameRenderer.renderFrame(frame);
        sceneManager.updateFromFrame(frame);
        
        if (typographyTl) {
          typographyTl.progress(self.progress);
        }
        
        // Final transition logic
        if (self.progress >= 0.99) {
          heroStateMachine.setState('FINAL_SCENE');
          // Scale up the canvas for the final glow effect
          gsap.to(videoContainer, { scale: 1.02, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
        } else {
          heroStateMachine.setState('PLAYING');
          gsap.to(videoContainer, { scale: 1, duration: 0.5, ease: 'power2.out', overwrite: 'auto' });
        }
      },
      onLeave: () => {
        heroStateMachine.setState('UNPINNED');
      }
    }
  });

  return scrollTl;
};
