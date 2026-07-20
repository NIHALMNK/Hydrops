'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { FRAME_MANIFEST } from '../hero/content/frameManifest';
import { canvasManager } from '../hero/canvas/CanvasManager';
import { frameRenderer } from '../hero/canvas/FrameRenderer';
import { mapScrollToFrame } from '../hero/utils/frameMath';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHeroLoader } from '../hero/hooks/useHeroLoader';
import { SplashScreen } from './SplashScreen';

gsap.registerPlugin(ScrollTrigger);

// Chapter definitions — synchronized to frame ranges
const CHAPTERS = [
  { id: 'scene-01', startFrame: 0, endFrame: 80, title: 'HYDROPS', subtitle: null },
  { id: 'scene-02', startFrame: 81, endFrame: 180, title: 'Crystal Clear.', subtitle: 'Naturally Pure.' },
  { id: 'scene-03', startFrame: 181, endFrame: 260, title: 'Every Drop', subtitle: 'Carefully Refined.' },
  { id: 'scene-04', startFrame: 261, endFrame: 340, title: 'Hydrops', subtitle: 'Double Filtered.' },
  { id: 'scene-05', startFrame: 341, endFrame: 400, title: null, subtitle: null },
];

// Lighting moods keyed to frame numbers
const LIGHTING_MOODS = [
  { frame: 40, bg: 'rgba(200,210,230,0.06)', opacity: 0.3 },   // Soft Dawn
  { frame: 130, bg: 'rgba(255,230,180,0.12)', opacity: 0.5 },  // Morning Sun
  { frame: 220, bg: 'rgba(255,253,240,0.18)', opacity: 0.6 },  // Crystal Light
  { frame: 300, bg: 'rgba(240,240,230,0.15)', opacity: 0.5 },  // Premium Studio
  { frame: 370, bg: 'rgba(255,255,255,0.2)', opacity: 0.6 },   // Museum White
];

export const HeroScene = () => {
  const containerRef = useRef<HTMLElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typographyRef = useRef<HTMLDivElement>(null);
  const lightingRef = useRef<HTMLDivElement>(null);

  // true once the splash exit animation has fully completed
  const [splashDone, setSplashDone] = useState(false);

  const totalFrames = FRAME_MANIFEST.length;
  const scrollHeight = '300vh';

  // Load initial frame batch — drives the splash progress bar
  const { progress, isReady } = useHeroLoader();

  // Called by SplashScreen after its fade-out transition ends
  const handleSplashDone = useCallback(() => {
    setSplashDone(true);
    // Render frame 1 immediately so the canvas isn't blank on reveal
    frameRenderer.renderFrame(1);
  }, []);

  // ── Initialise canvas (always, independent of splash state) ────────────────
  useIsomorphicLayoutEffect(() => {
    if (!canvasRef.current) return;
    canvasManager.init(canvasRef.current);
    return () => { canvasManager.destroy(); };
  }, []);

  // ── GSAP ScrollTrigger — only after splash exits ────────────────────────────
  useIsomorphicLayoutEffect(() => {
    if (!splashDone) return;
    if (!containerRef.current || !pinnedRef.current || !typographyRef.current || !lightingRef.current) return;

    // Refresh ScrollTrigger so it recalculates positions after the splash is gone
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const chapters = typographyRef.current!.querySelectorAll('.hc-chapter');
      const cta = typographyRef.current!.querySelector('.hc-cta');
      const lightDivs = lightingRef.current!.querySelectorAll('.hc-light');

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          scrub: 1.2,   // Higher value = fewer onUpdate calls per second; less main-thread pressure
          onUpdate: (self) => {
            const frame = mapScrollToFrame(self.progress, totalFrames);
            frameRenderer.renderFrame(frame);
          }
        }
      });

      // Scale timeline to totalFrames duration
      masterTl.to({}, { duration: totalFrames }, 0);

      // Chapter typography — fade in, pause, fade out
      CHAPTERS.forEach((chapter, i) => {
        const el = chapters[i];
        if (!el) return;
        const dur = chapter.endFrame - chapter.startFrame;
        const fadeIn = dur * 0.2;
        const fadeOut = dur * 0.18;
        const inStart = chapter.startFrame + dur * 0.08;

        masterTl.fromTo(el,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: fadeIn, ease: 'power2.out' },
          inStart
        );

        // Don't fade out scene-05 (CTA scene)
        if (i < CHAPTERS.length - 1) {
          masterTl.to(el,
            { opacity: 0, y: -20, filter: 'blur(6px)', duration: fadeOut, ease: 'power2.in' },
            chapter.endFrame - fadeOut
          );
        }
      });

      // CTA reveal in scene-05
      if (cta) {
        const s5 = CHAPTERS[4];
        masterTl.fromTo(cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: (s5.endFrame - s5.startFrame) * 0.3, ease: 'power2.out' },
          s5.startFrame + (s5.endFrame - s5.startFrame) * 0.4
        );
      }

      // Lighting evolution
      LIGHTING_MOODS.forEach((mood, i) => {
        const el = lightDivs[i];
        if (!el) return;
        const start = i === 0 ? 0 : LIGHTING_MOODS[i - 1].frame;
        masterTl.fromTo(el,
          { opacity: 0 },
          { opacity: mood.opacity, duration: Math.max(mood.frame - start, 10), ease: 'power1.inOut' },
          start
        );
        if (i < LIGHTING_MOODS.length - 1) {
          const next = LIGHTING_MOODS[i + 1];
          masterTl.to(el,
            { opacity: 0, duration: (next.frame - mood.frame) * 0.8, ease: 'power1.inOut' },
            mood.frame
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [splashDone, totalFrames]);

  return (
    <>
      {/* ── Splash — shown until initial frame batch is cached ────────── */}
      {!splashDone && (
        <SplashScreen
          progress={progress}
          isReady={isReady}
          onDone={handleSplashDone}
        />
      )}

      {/* ── Hero section ─────────────────────────────────────────────── */}
      <section
        ref={containerRef}
        className="relative w-full bg-[#050505]"
        style={{ height: scrollHeight }}
      >
        <div
          ref={pinnedRef}
          className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        >
          {/* Lighting layer */}
          <div ref={lightingRef} className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay">
            {LIGHTING_MOODS.map((mood, i) => (
              <div
                key={i}
                className="hc-light absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 50% 50%, ${mood.bg} 0%, transparent 70%)`, opacity: 0, filter: 'blur(60px)' }}
              />
            ))}
          </div>

          {/* Frame canvas */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-0"
            aria-hidden="true"
          />

          {/* Bottom overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none z-10" />

          {/* Typography layer */}
          <div ref={typographyRef} className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            {CHAPTERS.map((chapter, i) => (
              <div
                key={chapter.id}
                className="hc-chapter absolute inset-0 flex flex-col items-center justify-center text-center px-6"
                style={{ opacity: 0 }}
              >
                {chapter.title && (
                  <h2
                    className={`font-light text-white tracking-tight leading-[0.95] ${i === 0 ? 'text-[clamp(1.2rem,2.5vw,2rem)] tracking-[0.4em] uppercase' : 'text-[clamp(3rem,7vw,7rem)]'}`}
                  >
                    {chapter.title}
                  </h2>
                )}
                {chapter.subtitle && (
                  <p className="mt-4 text-[clamp(1.2rem,3vw,2.5rem)] font-light text-white/60">
                    {chapter.subtitle}
                  </p>
                )}
              </div>
            ))}

            {/* Scene 5 CTA */}
            <div className="hc-cta absolute bottom-[15%] left-1/2 -translate-x-1/2 pointer-events-auto" style={{ opacity: 0 }}>
              <a
                href="#product-showcase"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium tracking-[0.15em] uppercase hover:bg-white/20 transition-colors"
              >
                Explore Product
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
