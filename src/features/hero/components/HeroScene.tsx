import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { LoadingScreen } from './LoadingScreen';
import { FrameCanvas } from './FrameCanvas';
import { HeroLogo } from './HeroLogo';
import { createHeroScroll } from '../timeline/scroll';
import { HERO_CONSTANTS } from '../utils/constants';
import { FRAME_MANIFEST } from '../content/frameManifest';
import gsap from 'gsap';

export const HeroScene = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const totalFrames = FRAME_MANIFEST.length;
  // Fallback to 3vh per frame if undefined
  const scrollHeight = `${totalFrames * (HERO_CONSTANTS.FRAME_SCROLL_FACTOR || 3)}vh`;

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current && videoContainerRef.current && logoRef.current) {
        createHeroScroll(
          containerRef.current,
          videoContainerRef.current,
          logoRef.current,
          totalFrames
        );
      }
    });

    return () => ctx.revert();
  }, [totalFrames]);

  return (
    <>
      <section 
        ref={containerRef}
        className="relative w-full bg-black text-white"
        style={{ height: scrollHeight }}
      >
        <div 
          ref={videoContainerRef}
          className="sticky top-0 w-full h-[100vh] overflow-hidden origin-center"
        >
          <LoadingScreen />
          <FrameCanvas />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          <HeroLogo ref={logoRef} />
        </div>
      </section>
    </>
  );
};
