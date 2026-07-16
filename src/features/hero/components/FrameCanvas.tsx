import React from 'react';
import { useHeroCanvas } from '../hooks/useHeroCanvas';

export const FrameCanvas = () => {
  const { canvasRef } = useHeroCanvas();

  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover"
      aria-hidden="true"
    />
  );
};
