import React from 'react';
import { useHeroLoader } from '../hooks/useHeroLoader';

export const LoadingScreen = () => {
  const { progress, isReady } = useHeroLoader();

  if (isReady) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
      <div className="text-sm uppercase tracking-[0.2em] mb-4">Loading Hydrops</div>
      <div className="w-48 h-[2px] bg-white/20 relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};
