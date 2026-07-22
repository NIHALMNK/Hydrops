'use client';

import React, { useRef, useState, useCallback, useMemo } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FRAME_MANIFEST } from '../hero/content/frameManifest';
import { canvasManager } from '../hero/canvas/CanvasManager';
import { frameRenderer } from '../hero/canvas/FrameRenderer';
import { mapScrollToFrame } from '../hero/utils/frameMath';
import { useHeroLoader } from '../hero/hooks/useHeroLoader';
import { SplashScreen } from './SplashScreen';
import { ScrollIndicator } from './ScrollIndicator';

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

  // Soul Statement Overlay refs
  const soulOverlayRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const heading1Ref = useRef<HTMLHeadingElement>(null);
  const heading2Ref = useRef<HTMLHeadingElement>(null);

  // true once the splash exit animation has fully completed
  const [splashDone, setSplashDone] = useState(false);

  const totalFrames = FRAME_MANIFEST.length;

  // Responsive scroll configuration
  const { scrollHeight, scrubValue } = useMemo(() => {
    if (typeof window === 'undefined') {
      return { scrollHeight: '600vh', scrubValue: 1.2 };
    }
    const w = window.innerWidth;
    if (w <= 768) {
      return { scrollHeight: '900vh', scrubValue: 2.5 };
    }
    if (w <= 1024) {
      return { scrollHeight: '750vh', scrubValue: 2.0 };
    }
    return { scrollHeight: '600vh', scrubValue: 1.2 };
  }, []);

  const { progress, isReady } = useHeroLoader();

  const handleSplashDone = useCallback(() => {
    setSplashDone(true);
    frameRenderer.renderFrame(1);
  }, []);

  // Initialise canvas
  useIsomorphicLayoutEffect(() => {
    if (!canvasRef.current) return;
    canvasManager.init(canvasRef.current);
    return () => {
      canvasManager.destroy();
    };
  }, []);

  // GSAP Master ScrollTrigger — Pin & Scrub Timeline
  useIsomorphicLayoutEffect(() => {
    if (!splashDone) return;
    if (
      !containerRef.current ||
      !pinnedRef.current ||
      !typographyRef.current ||
      !lightingRef.current ||
      !soulOverlayRef.current ||
      !labelRef.current ||
      !heading1Ref.current ||
      !heading2Ref.current
    )
      return;

    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // ClipPath updater for 100% cross-browser native CSS clip-path (bottom-center 50% 100%)
      const updateClipPath = (rx: number, ry: number) => {
        if (!soulOverlayRef.current) return;
        const val = `ellipse(${rx.toFixed(1)}% ${ry.toFixed(1)}% at 50% 100%)`;
        soulOverlayRef.current.style.clipPath = val;
        (soulOverlayRef.current.style as HTMLElement['style'] & { webkitClipPath?: string }).webkitClipPath = val;
      };

      if (prefersReducedMotion) {
        updateClipPath(200, 200);
        gsap.set([labelRef.current, heading1Ref.current, heading2Ref.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        return;
      }

      // Initial state
      updateClipPath(0, 0);
      gsap.set([labelRef.current, heading1Ref.current, heading2Ref.current], {
        opacity: 0,
        y: 35,
        filter: 'blur(10px)',
      });

      const chapters = typographyRef.current!.querySelectorAll('.hc-chapter');
      const cta = typographyRef.current!.querySelector('.hc-cta');
      const lightDivs = lightingRef.current!.querySelectorAll('.hc-light');

      // Timeline mapping across single pinned master container:
      // progress 0.00 -> 0.50: Hero film frame sequence 1 -> 400 plays (bottle centered at 0.50)
      // progress 0.50 -> 0.85: Bottom-up expanding arch clip-path (0% -> 200% at 50% 100%)
      // progress 0.60 -> 0.95: Soul Statement text fades in from 0 to 100 opacity
      const HERO_BEAT_END = 0.50;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          scrub: scrubValue,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Map scroll progress 0.0 -> 0.50 to Hero frame sequence 1 -> 400
            const heroProgress = Math.min(1, self.progress / HERO_BEAT_END);
            const frame = mapScrollToFrame(heroProgress, totalFrames);
            frameRenderer.renderFrame(frame);
          },
        },
      });

      // ── Phase 1: Hero Typography & Lighting (0.00 -> 0.50) ───────────────
      CHAPTERS.forEach((chapter, i) => {
        const el = chapters[i];
        if (!el) return;
        const dur = ((chapter.endFrame - chapter.startFrame) / totalFrames) * HERO_BEAT_END;
        const start = (chapter.startFrame / totalFrames) * HERO_BEAT_END;
        const fadeIn = dur * 0.2;
        const fadeOut = dur * 0.18;
        const inStart = start + dur * 0.08;

        masterTl.fromTo(
          el,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: fadeIn, ease: 'power2.out' },
          inStart
        );

        if (i < CHAPTERS.length - 1) {
          masterTl.to(
            el,
            { opacity: 0, y: -20, filter: 'blur(6px)', duration: fadeOut, ease: 'power2.in' },
            start + dur - fadeOut
          );
        }
      });

      if (cta) {
        masterTl.fromTo(
          cta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.10, ease: 'power2.out' },
          0.38
        );
      }

      LIGHTING_MOODS.forEach((mood, i) => {
        const el = lightDivs[i];
        if (!el) return;
        const start = ((i === 0 ? 0 : LIGHTING_MOODS[i - 1].frame) / totalFrames) * HERO_BEAT_END;
        const frameTime = (mood.frame / totalFrames) * HERO_BEAT_END;

        masterTl.fromTo(
          el,
          { opacity: 0 },
          { opacity: mood.opacity, duration: Math.max(frameTime - start, 0.02), ease: 'power1.inOut' },
          start
        );

        if (i < LIGHTING_MOODS.length - 1) {
          const nextTime = (LIGHTING_MOODS[i + 1].frame / totalFrames) * HERO_BEAT_END;
          masterTl.to(
            el,
            { opacity: 0, duration: (nextTime - frameTime) * 0.8, ease: 'power1.inOut' },
            frameTime
          );
        }
      });

      // ── Phase 2: Bottom-Up Arch Reveal (Correction 3: 0.50 -> 0.85) ────────
      // Starts strictly at 0.50 over the frozen frame 400 bottle rest layout
      const clipState = { rx: 0, ry: 0 };
      masterTl.to(
        clipState,
        {
          rx: 200,
          ry: 200,
          duration: 0.35,
          ease: 'power2.inOut',
          onUpdate: () => {
            updateClipPath(clipState.rx, clipState.ry);
          },
        },
        0.50
      );

      if (cta) {
        masterTl.to(cta, { opacity: 0, duration: 0.05 }, 0.50);
      }

      // ── Phase 3: Soul Statement Text Opacity Fade (0.60 -> 0.95) ───────────
      masterTl.to(
        labelRef.current,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' },
        0.60
      );

      masterTl.to(
        heading1Ref.current,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power2.out' },
        0.68
      );

      masterTl.to(
        heading2Ref.current,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.15, ease: 'power2.out' },
        0.76
      );
    }, containerRef);

    return () => ctx.revert();
  }, [splashDone, totalFrames, scrubValue]);

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

      {/* ── Master Hero & Soul Master Section ─────────────────────────── */}
      <section
        ref={containerRef}
        id="hero-scene-section"
        className="relative w-full bg-[#050505]"
        style={{ height: scrollHeight }}
      >
        {/* Master Pinned Wrapper (Locks entire viewport) */}
        <div
          ref={pinnedRef}
          className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center"
        >
          {/* ── Layer 1: Hero Canvas & Film Scene (z-10) ───────────────── */}
          <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
            {/* Lighting layer */}
            <div ref={lightingRef} className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay">
              {LIGHTING_MOODS.map((mood, i) => (
                <div
                  key={i}
                  className="hc-light absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 50%, ${mood.bg} 0%, transparent 70%)`,
                    opacity: 0,
                    filter: 'blur(60px)',
                  }}
                />
              ))}
            </div>

            {/* Frame canvas */}
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full z-0 block"
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
                      className={`font-light text-white tracking-tight leading-[0.95] ${
                        i === 0
                          ? 'text-[clamp(1.2rem,2.5vw,2rem)] tracking-[0.4em] uppercase'
                          : 'text-[clamp(3rem,7vw,7rem)]'
                      }`}
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

            {/* Scroll indicator */}
            {splashDone && <ScrollIndicator />}
          </div>

          {/* ── Layer 2: SoulStatement Overlay (Absolute top: 0, left: 0, z-30) ── */}
          <div
            ref={soulOverlayRef}
            className="absolute inset-0 w-full h-full z-30 flex items-center justify-center bg-[#0E1110] will-change-[clip-path]"
            style={{
              clipPath: 'ellipse(0% 0% at 50% 100%)',
              WebkitClipPath: 'ellipse(0% 0% at 50% 100%)',
            }}
          >
            {/* Background Image Layer */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/backgrounds/coconuts-and-leaves-on-blue-background-free-photo.jpeg"
              alt="Coconuts and leaves on blue background"
              className="absolute inset-0 w-full h-full object-cover object-center z-0"
            />

            {/* Dark Readability Overlay & Ambient Glow Layer */}
            <div className="absolute inset-0 w-full h-full z-10 bg-[#0E1110]/75 backdrop-blur-[1px]">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 60%, rgba(200,169,106,0.2) 0%, rgba(14,17,16,0.85) 75%)',
                }}
              />
              {/* Signature Ripple Line */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[1px] pointer-events-none"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, rgba(200,169,106,0.5), transparent)',
                }}
              />
            </div>

            {/* Foreground Text Content — Strictly Optimized for 1080x1920 Mobile Viewport & Desktop */}
            <div className="relative z-20 flex flex-col items-center text-center max-w-4xl px-6 sm:px-8 py-12 select-none">
              {/* Subhead / Label */}
              <p
                ref={labelRef}
                className="font-light tracking-[0.35em] text-[#C8A96A] text-xs sm:text-sm uppercase mb-6 sm:mb-8 opacity-0 will-change-[opacity,transform]"
              >
                HYDROPS
              </p>

              {/* Heading Line 1 */}
              <h2
                ref={heading1Ref}
                className="text-[clamp(2.2rem,6.5vw,4.5rem)] font-light text-[#F5F2EC] leading-[1.1] tracking-tight mb-2 sm:mb-4 opacity-0 will-change-[opacity,transform] drop-shadow-md"
              >
                Purity isn&apos;t a claim.
              </h2>

              {/* Heading Line 2 */}
              <h3
                ref={heading2Ref}
                className="text-[clamp(2.2rem,6.5vw,4.5rem)] font-light text-[#C8A96A] italic leading-[1.1] tracking-tight opacity-0 will-change-[opacity,transform] drop-shadow-md"
              >
                It&apos;s a commitment.
              </h3>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
