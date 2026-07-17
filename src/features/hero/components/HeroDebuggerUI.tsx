'use client';
import React, { useEffect, useState } from 'react';
import { HeroDebugger } from '../debug/HeroDebugger';

export const HeroDebuggerUI = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    if (process.env.NODE_ENV !== 'development') return;

    // Initialize metrics only on the client
    setMetrics(HeroDebugger.getMetrics());

    const interval = setInterval(() => {
      setMetrics(HeroDebugger.getMetrics());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted || process.env.NODE_ENV !== 'development' || !metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 text-green-400 font-mono text-xs p-4 rounded-lg shadow-2xl backdrop-blur-sm border border-green-500/30">
      <div className="mb-2 pb-2 border-b border-green-500/30 font-bold tracking-wider text-green-300">
        HERO OBSERVABILITY
      </div>
      <div className="space-y-1">
        <div className="flex justify-between gap-4">
          <span>State:</span> <span>{metrics.state}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Active Scene:</span> <span>{metrics.activeScene}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>FPS:</span> 
          <span className={metrics.fps < 50 ? 'text-red-400' : ''}>{metrics.fps}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Dropped Frames:</span> <span>{metrics.droppedFrames}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Loaded Frames:</span> <span>{metrics.loadedFrames}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Cache Size:</span> <span>{metrics.cacheSize} (Peak: {metrics.peakCache})</span>
        </div>
      </div>
    </div>
  );
};
