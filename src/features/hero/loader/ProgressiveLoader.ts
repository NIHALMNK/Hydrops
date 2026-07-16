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
  
  public async loadInitialBatch(onProgress?: ProgressCallback): Promise<void> {
    if (this.isInitialLoaded) return;
    
    const initialFrames = FRAME_MANIFEST.slice(0, HERO_CONSTANTS.INITIAL_BATCH_SIZE);
    
    let loaded = 0;
    const promises = initialFrames.map(async (src) => {
      try {
        await frameCache.loadFrame(src);
        loaded++;
        onProgress?.(loaded / initialFrames.length);
      } catch {
        console.error("Failed to load initial frame", src);
      }
    });

    await Promise.all(promises);
    this.isInitialLoaded = true;
    
    this.startBackgroundLoad();
  }

  private startBackgroundLoad() {
    const backgroundFrames = FRAME_MANIFEST.slice(HERO_CONSTANTS.INITIAL_BATCH_SIZE, 100);
    const idleFrames = FRAME_MANIFEST.slice(100);

    const loadBackground = async () => {
      for (const src of backgroundFrames) {
        try {
          await frameCache.loadFrame(src);
        } catch {
          // ignore
        }
      }
      this.startIdleLoad(idleFrames);
    };

    setTimeout(loadBackground, 100);
  }

  private startIdleLoad(frames: string[]) {
    let index = 0;

    const loadNext = (deadline: { timeRemaining: () => number; didTimeout: boolean }) => {
      while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && index < frames.length) {
        const src = frames[index];
        frameCache.loadFrame(src).catch(() => {});
        index++;
      }
      if (index < frames.length) {
        window.requestIdleCallback(loadNext);
      }
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadNext);
    } else {
      setTimeout(() => {
        frames.forEach(src => frameCache.loadFrame(src).catch(() => {}));
      }, 1000);
    }
  }
}

export const progressiveLoader = new ProgressiveLoader();
