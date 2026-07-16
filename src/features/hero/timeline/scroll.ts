import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { mapScrollToFrame } from '../utils/frameMath';
import { frameRenderer } from '../canvas/FrameRenderer';
import { sceneManager } from './SceneManager';
import { heroStateMachine } from '../utils/stateMachine';


gsap.registerPlugin(ScrollTrigger);

export const createHeroScroll = (
  container: HTMLElement, 
  videoContainer: HTMLElement, 
  logoContainer: HTMLElement,
  totalFrames: number
) => {
  
  let isLogoRevealed = false;
  
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
        
        // Final transition logic
        if (self.progress >= 0.99) {
          heroStateMachine.setState('FINAL_SCENE');
          
          if (!isLogoRevealed) {
            isLogoRevealed = true;
            gsap.to(logoContainer, { 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)',
              duration: 1, 
              ease: 'power2.out',
              delay: 0.3
            });
          }
        } else {
          heroStateMachine.setState('PLAYING');
          
          if (isLogoRevealed) {
            isLogoRevealed = false;
            gsap.to(logoContainer, { 
              opacity: 0, 
              scale: 0.92,
              filter: 'blur(8px)',
              duration: 0.4, 
              ease: 'power2.inOut',
              overwrite: 'auto'
            });
          }
        }
      },
      onLeave: () => {
        heroStateMachine.setState('UNPINNED');
      }
    }
  });

  return scrollTl;
};
