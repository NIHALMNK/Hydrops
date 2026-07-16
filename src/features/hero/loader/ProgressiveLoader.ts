import { FRAME_MANIFEST } from '../content/frameManifest';
import { HERO_CONSTANTS } from '../utils/constants';
import { frameCache } from './FrameCache';

type ProgressCallback = (progress: number) => void;

// Add type definitions for requestIdleCallback
declare global {
  interface Window {
    requestIdleCallback(
      callback: (deadline: { timeRemaining: () => number; didTimeout: boolean }) => void,
      options?: { timeout: number }
    ): number;
    cancelIdleCallback(handle: number): void;
  }
}

export class ProgressiveLoader {
  private isInitialLoaded = false;
  private hasHalted = false;
  
  public async loadInitialBatch(onProgress?: ProgressCallback): Promise<void> {
    if (this.isInitialLoaded || this.hasHalted) return;
    
    const initialFrames = FRAME_MANIFEST.slice(0, HERO_CONSTANTS.INITIAL_BATCH_SIZE);
    let loaded = 0;
    
    const promises = initialFrames.map(src => 
      frameCache.loadFrame(src).then(() => {
        loaded++;
        onProgress?.(loaded / initialFrames.length);
      })
    );

    const results = await Promise.allSettled(promises);
    
    // If any frame in the initial batch failed, halt all future loading to prevent 404 spam
    const hasFailures = results.some(result => result.status === 'rejected');
    if (hasFailures) {
      console.warn("Initial batch encountered missing frames. Halting progressive loader to prevent 404s.");
      this.hasHalted = true;
    }
    
    this.isInitialLoaded = true;
    this.startBackgroundLoad();
  }

  private startBackgroundLoad() {
    if (this.hasHalted) return;

    const backgroundFrames = FRAME_MANIFEST.slice(HERO_CONSTANTS.INITIAL_BATCH_SIZE, 100);
    const idleFrames = FRAME_MANIFEST.slice(100);

    const loadBackground = async () => {
      for (const src of backgroundFrames) {
        if (this.hasHalted) break;
        try {
          await frameCache.loadFrame(src);
        } catch (error) {
          console.warn(`Halting background loader: ${error instanceof Error ? error.message : 'Missing frame'}`);
          this.hasHalted = true;
          break;
        }
      }
      if (!this.hasHalted) {
        this.startIdleLoad(idleFrames);
      }
    };

    setTimeout(loadBackground, 100);
  }

  private startIdleLoad(frames: string[]) {
    if (this.hasHalted) return;
    let index = 0;

    const loadNext = async (deadline: { timeRemaining: () => number; didTimeout: boolean }) => {
      while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && index < frames.length) {
        if (this.hasHalted) return;
        
        const src = frames[index];
        try {
          await frameCache.loadFrame(src);
        } catch (error) {
          console.warn(`Halting idle loader: ${error instanceof Error ? error.message : 'Missing frame'}`);
          this.hasHalted = true;
          return; // Stop the idle loop
        }
        index++;
      }
      if (index < frames.length && !this.hasHalted) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadNext);
        } else {
          setTimeout(() => loadNext({ timeRemaining: () => 50, didTimeout: false }), 50);
        }
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNext);
    } else {
      setTimeout(() => loadNext({ timeRemaining: () => 50, didTimeout: false }), 50);
    }
  }
}

export const progressiveLoader = new ProgressiveLoader();
