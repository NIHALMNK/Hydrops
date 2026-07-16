import { canvasManager } from './CanvasManager';
import { frameCache } from '../loader/FrameCache';
import { FRAME_MANIFEST } from '../content/frameManifest';

export class FrameRenderer {
  public async renderFrame(frameIndex: number) {
    const ctx = canvasManager.getContext();
    const canvas = canvasManager.getCanvas();
    if (!ctx || !canvas) return;

    const src = FRAME_MANIFEST[frameIndex - 1];
    if (!src) return;

    const image = frameCache.get(src);
    if (!image) {
      // If not cached, trigger a load but don't block
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
