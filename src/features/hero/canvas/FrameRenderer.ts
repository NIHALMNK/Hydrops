import { canvasManager } from './CanvasManager';
import { frameCache } from '../loader/FrameCache';
import { FRAME_MANIFEST } from '../content/frameManifest';

export class FrameRenderer {
  // rAF guard: only one paint per browser frame, no matter how fast GSAP scrub fires
  private rafId: number | null = null;
  private pendingFrame: number | null = null;

  public renderFrame(frameIndex: number) {
    this.pendingFrame = frameIndex;

    // If a paint is already scheduled this frame, just update the target frame
    if (this.rafId !== null) return;

    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      const target = this.pendingFrame;
      this.pendingFrame = null;
      if (target !== null) this._paint(target);
    });
  }

  private _paint(frameIndex: number) {
    const ctx = canvasManager.getContext();
    const canvas = canvasManager.getCanvas();
    if (!ctx || !canvas) return;

    const src = FRAME_MANIFEST[frameIndex - 1];
    if (!src) return;

    const image = frameCache.get(src);
    if (!image) {
      // Not cached yet — load it, then repaint
      frameCache.loadFrame(src).then(() => this.renderFrame(frameIndex));
      return;
    }

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    // Draw using object-fit: cover logic
    const imgRatio = image.width / image.height;
    const canvasRatio = rect.width / rect.height;

    let renderWidth, renderHeight, xOffset, yOffset;

    if (canvasRatio > imgRatio) {
      renderWidth = rect.width;
      renderHeight = rect.width / imgRatio;
      xOffset = 0;
      yOffset = (rect.height - renderHeight) / 2;
    } else {
      renderWidth = rect.height * imgRatio;
      renderHeight = rect.height;
      xOffset = (rect.width - renderWidth) / 2;
      yOffset = 0;
    }

    canvasManager.clear();
    ctx.drawImage(image, xOffset, yOffset, renderWidth, renderHeight);
  }
}

export const frameRenderer = new FrameRenderer();
