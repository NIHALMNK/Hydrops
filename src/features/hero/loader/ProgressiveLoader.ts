import { FRAME_MANIFEST } from '../content/frameManifest';
import { HERO_CONSTANTS } from '../utils/constants';
import { frameCache } from './FrameCache';

type ProgressCallback = (progress: number) => void;

/**
 * ProgressiveLoader
 *
 * Loads ALL hero frames during the splash screen using controlled concurrency.
 * Concurrency limit prevents overwhelming slow connections while still
 * downloading frames much faster than sequential loading.
 *
 * After loadInitialBatch resolves, every frame is guaranteed to be in cache.
 * The background/idle loaders are no longer needed.
 */

// Maximum simultaneous in-flight requests.
// HTTP/2 (Vercel CDN) handles many streams efficiently, but capping at 12
// gives good throughput on 4G/cable while keeping CPU decode pressure low.
const CONCURRENCY = 12;

export class ProgressiveLoader {
  private isInitialLoaded = false;
  private hasHalted = false;

  public async loadInitialBatch(onProgress?: ProgressCallback): Promise<void> {
    if (this.isInitialLoaded || this.hasHalted) return;

    const frames = FRAME_MANIFEST.slice(0, HERO_CONSTANTS.INITIAL_BATCH_SIZE);
    const total = frames.length;
    let loaded = 0;
    let halted = false;

    // Process frames in concurrent batches
    for (let i = 0; i < total; i += CONCURRENCY) {
      if (halted || this.hasHalted) break;

      const batch = frames.slice(i, i + CONCURRENCY);

      const results = await Promise.allSettled(
        batch.map(src =>
          frameCache.loadFrame(src).then(() => {
            loaded++;
            onProgress?.(loaded / total);
          })
        )
      );

      // Halt on any failure to prevent 404 spam
      const hasFailed = results.some(r => r.status === 'rejected');
      if (hasFailed) {
        console.warn('[ProgressiveLoader] A frame failed to load. Halting to prevent 404 spam.');
        this.hasHalted = true;
        halted = true;
      }
    }

    // Ensure progress bar reaches 100% visually even if some frames failed
    onProgress?.(1);
    this.isInitialLoaded = true;
  }
}

export const progressiveLoader = new ProgressiveLoader();
