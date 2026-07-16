import { useEffect, useRef } from 'react';
import { canvasManager } from '../canvas/CanvasManager';
import { frameRenderer } from '../canvas/FrameRenderer';

export const useHeroCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    canvasManager.init(canvasRef.current);
    
    // Attempt to render the first frame quickly
    const tryRender = () => {
      frameRenderer.renderFrame(1);
    };
    
    const interval = setInterval(() => {
      if (canvasManager.getContext()) {
        tryRender();
      }
    }, 50);

    // Stop trying after 2s (fallback)
    setTimeout(() => clearInterval(interval), 2000);

    return () => {
      clearInterval(interval);
      canvasManager.destroy();
    };
  }, []);

  return { canvasRef };
};
