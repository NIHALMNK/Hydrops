'use client';

import React, { useRef, useState, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

  // Philosophy Overlay ref (Single unified DOM instance with polygon clip-path)
  const philosophyOverlayRef = useRef<HTMLDivElement>(null);

  // Philosophy content refs inside active layer
  const dropletWrapperRef = useRef<HTMLDivElement>(null);
  const persistentTextRef = useRef<HTMLHeadingElement>(null);
  const ch1Ref = useRef<HTMLDivElement>(null);
  const ch2Ref = useRef<HTMLDivElement>(null);
  const ch3Ref = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const topRightBotanicalRef = useRef<HTMLImageElement>(null);
  const bottomLeftBotanicalRef = useRef<HTMLImageElement>(null);

  // true once the splash exit animation has fully completed
  const [splashDone, setSplashDone] = useState(false);

  const totalFrames = FRAME_MANIFEST.length;

  // Responsive scroll configuration (useState + layoutEffect for 100% hydration match)
  const [scrollHeight, setScrollHeight] = useState('850vh');
  const [scrubValue, setScrubValue] = useState(1.2);

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 768) {
        setScrollHeight('1300vh');
        setScrubValue(2.5);
      } else if (w <= 1024) {
        setScrollHeight('1050vh');
        setScrubValue(2.0);
      } else {
        setScrollHeight('850vh');
        setScrubValue(1.2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  // GSAP Master ScrollTrigger — Managed by useGSAP for 100% automatic DOM & pin-spacer cleanup
  useGSAP(
    () => {
      if (!splashDone) return;
      if (
        !containerRef.current ||
        !pinnedRef.current ||
        !typographyRef.current ||
        !lightingRef.current ||
        !soulOverlayRef.current ||
        !labelRef.current ||
        !heading1Ref.current ||
        !heading2Ref.current ||
        !philosophyOverlayRef.current ||
        !dropletWrapperRef.current ||
        !persistentTextRef.current ||
        !ch1Ref.current ||
        !ch2Ref.current ||
        !ch3Ref.current ||
        !ctaRef.current
      )
        return;

      ScrollTrigger.refresh();

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      // SoulStatement clip-path updater (bottom-center 50% 100%)
      const updateSoulClipPath = (rx: number, ry: number) => {
        if (!soulOverlayRef.current) return;
        const val = `ellipse(${rx.toFixed(1)}% ${ry.toFixed(1)}% at 50% 100%)`;
        soulOverlayRef.current.style.clipPath = val;
        (soulOverlayRef.current.style as HTMLElement['style'] & { webkitClipPath?: string }).webkitClipPath = val;
      };

      // Philosophy unified 5-column polygon clip-path updater
      // b is an array of 5 band expansion values [b0, b1, b2, b3, b4] from 0.0 -> 1.0
      const updatePhilosophyClipPath = (b: number[]) => {
        if (!philosophyOverlayRef.current) return;
        const centers = [10, 30, 50, 70, 90];
        const points: string[] = [];

        for (let i = 0; i < 5; i++) {
          const c = centers[i];
          const halfW = b[i] * 10; // max 10% on each side = 20% total band width
          const left = Math.max(i * 20, c - halfW).toFixed(2);
          const right = Math.min((i + 1) * 20, c + halfW).toFixed(2);
          points.push(`${left}% 0%`, `${left}% 100%`, `${right}% 100%`, `${right}% 0%`);
        }

        const polyStr = `polygon(${points.join(', ')})`;
        philosophyOverlayRef.current.style.clipPath = polyStr;
        (philosophyOverlayRef.current.style as HTMLElement['style'] & { webkitClipPath?: string }).webkitClipPath = polyStr;
      };

      if (prefersReducedMotion) {
        updateSoulClipPath(150, 150);
        updatePhilosophyClipPath([1, 1, 1, 1, 1]);
        gsap.set([labelRef.current, heading1Ref.current, heading2Ref.current], {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
        });
        gsap.set(
          [dropletWrapperRef.current, persistentTextRef.current, ch1Ref.current],
          { opacity: 1, y: 0 }
        );
        if (topRightBotanicalRef.current) gsap.set(topRightBotanicalRef.current, { opacity: 0.9, x: 0, y: 0 });
        if (bottomLeftBotanicalRef.current) gsap.set(bottomLeftBotanicalRef.current, { opacity: 0.9, x: 0, y: 0 });
        return;
      }

      // Initial state setup (Wide & Flat: X-radius 150%, Y-radius 0%)
      updateSoulClipPath(150, 0);
      updatePhilosophyClipPath([0, 0, 0, 0, 0]);

      gsap.set([labelRef.current, heading1Ref.current, heading2Ref.current], {
        opacity: 0,
        y: 35,
        filter: 'blur(10px)',
      });

      gsap.set(
        [dropletWrapperRef.current, persistentTextRef.current, ch1Ref.current, ch2Ref.current, ch3Ref.current, ctaRef.current],
        { opacity: 0, y: 25 }
      );

      if (topRightBotanicalRef.current) {
        gsap.set(topRightBotanicalRef.current, { opacity: 0, x: 50, y: -50 });
      }
      if (bottomLeftBotanicalRef.current) {
        gsap.set(bottomLeftBotanicalRef.current, { opacity: 0, x: -50, y: 50 });
      }

      const chapters = typographyRef.current!.querySelectorAll('.hc-chapter');
      const cta = typographyRef.current!.querySelector('.hc-cta');
      const lightDivs = lightingRef.current!.querySelectorAll('.hc-light');

      // Timeline beats mapping:
      // 0.00 -> 0.35: Hero film 1 -> 400 frames (bottle centered at 0.35)
      // 0.35 -> 0.58: SoulStatement expanding arch reveal (0% -> 200% at 50% 100%)
      // 0.42 -> 0.58: SoulStatement text fade in (0 -> 1 opacity)
      // 0.58 -> 0.76: Step 1 (Philosophy 5-column Polygon Slice Reveal 0% -> 100% visible, staggered)
      // 0.78 -> 1.00: Step 2 (Philosophy Content Storyline: ONLY AFTER slice reveal is 100% complete)
      const HERO_BEAT_END = 0.35;

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: pinnedRef.current,
          scrub: scrubValue,
          anticipatePin: 1,
          onUpdate: (self) => {
            const heroProgress = Math.min(1, self.progress / HERO_BEAT_END);
            const frame = mapScrollToFrame(heroProgress, totalFrames);
            frameRenderer.renderFrame(frame);
          },
        },
      });

      // ── Phase 1: Hero Typography & Lighting (0.00 -> 0.35) ───────────────
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
          { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
          0.28
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

      // ── Phase 2: SoulStatement Bottom-Up Arch Reveal (0.35 -> 0.58) ────────
      // Sweeping arch from ellipse(150% 0% at 50% 100%) to ellipse(150% 150% at 50% 100%)
      const clipState = { rx: 150, ry: 0 };
      masterTl.to(
        clipState,
        {
          rx: 150,
          ry: 150,
          duration: 0.23,
          ease: 'power2.inOut',
          onUpdate: () => {
            updateSoulClipPath(clipState.rx, clipState.ry);
          },
        },
        0.35
      );

      if (cta) {
        masterTl.to(cta, { opacity: 0, duration: 0.05 }, 0.35);
      }

      // Soul Statement Text Entrance (0.42 -> 0.58)
      masterTl.to(
        labelRef.current,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.08, ease: 'power2.out' },
        0.42
      );

      masterTl.to(
        heading1Ref.current,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.09, ease: 'power2.out' },
        0.46
      );

      masterTl.to(
        heading2Ref.current,
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.09, ease: 'power2.out' },
        0.50
      );

      // ── Step 1: Philosophy 5-Column Polygon Slice Reveal (0.58 -> 0.76) ────
      // Single simultaneous clip-path polygon tween expanding all 5 bands together
      const sliceState = { progress: 0 };
      masterTl.to(
        sliceState,
        {
          progress: 1,
          duration: 0.18,
          ease: 'power2.inOut',
          onUpdate: () => {
            const p = sliceState.progress;
            updatePhilosophyClipPath([p, p, p, p, p]);
          },
        },
        0.58
      );

      // Corner Botanical Assets Slide-In Entrance (Immediately after 100% slice reveal at 0.76)
      if (topRightBotanicalRef.current) {
        masterTl.to(
          topRightBotanicalRef.current,
          { opacity: 0.9, x: 0, y: 0, duration: 0.04, ease: 'power2.out' },
          0.76
        );
      }
      if (bottomLeftBotanicalRef.current) {
        masterTl.to(
          bottomLeftBotanicalRef.current,
          { opacity: 0.9, x: 0, y: 0, duration: 0.04, ease: 'power2.out' },
          0.76
        );
      }

      // ── Step 2: Philosophy Content Storyline (0.78 -> 1.00) ───────────────
      // STRICTLY AFTER Step 1 reveal is 100% complete at 0.76
      masterTl.fromTo(
        [dropletWrapperRef.current, persistentTextRef.current, ch1Ref.current],
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.06, stagger: 0.02, ease: 'power2.out' },
        0.78
      );

      // Ch1 -> Ch2
      masterTl.to(
        ch1Ref.current,
        { opacity: 0, y: -25, duration: 0.04, ease: 'power2.in' },
        0.86
      );
      masterTl.fromTo(
        ch2Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
        0.89
      );

      // Ch2 -> Ch3 & CTA
      masterTl.to(
        ch2Ref.current,
        { opacity: 0, y: -25, duration: 0.04, ease: 'power2.in' },
        0.93
      );
      masterTl.fromTo(
        ch3Ref.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' },
        0.95
      );
      masterTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.04, ease: 'power2.out' },
        0.97
      );
    },
    {
      scope: containerRef,
      dependencies: [splashDone, totalFrames, scrubValue, scrollHeight],
    }
  );

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

      {/* ── Master Hero, Soul & Philosophy Pinned Section ─────────────── */}
      <section
        ref={containerRef}
        id="hero-scene-section"
        className="relative w-full bg-[#050505]"
        style={{ height: scrollHeight }}
      >
        {/* Master Pinned Wrapper (Locks entire viewport across all 3 chapters) */}
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
              clipPath: 'ellipse(150% 0% at 50% 100%)',
              WebkitClipPath: 'ellipse(150% 0% at 50% 100%)',
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

          {/* ── Layer 3: Philosophy Section (Absolute top: 0, left: 0, z-40, Single Unified Instance with Polygon Clip-Path) ── */}
          <div
            ref={philosophyOverlayRef}
            className="absolute inset-0 w-full h-full z-40 flex items-center justify-center bg-[#F5F2EC] text-[#1E1E1E] overflow-hidden will-change-[clip-path]"
            style={{
              clipPath: 'polygon(10% 0%, 10% 100%, 10% 100%, 10% 0%, 30% 0%, 30% 100%, 30% 100%, 30% 0%, 50% 0%, 50% 100%, 50% 100%, 50% 0%, 70% 0%, 70% 100%, 70% 100%, 70% 0%, 90% 0%, 90% 100%, 90% 100%, 90% 0%)',
              WebkitClipPath: 'polygon(10% 0%, 10% 100%, 10% 100%, 10% 0%, 30% 0%, 30% 100%, 30% 100%, 30% 0%, 50% 0%, 50% 100%, 50% 100%, 50% 0%, 70% 0%, 70% 100%, 70% 100%, 70% 0%, 90% 0%, 90% 100%, 90% 100%, 90% 0%)',
            }}
          >
            {/* Ambient warm radial glow */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 60%, rgba(200,169,106,0.08) 0%, transparent 70%)',
              }}
            />

            {/* ── Top-Right Palm Fronds Asset ── */}
            <img
              ref={topRightBotanicalRef}
              src="/assets/Gemini_Generated_Image_n90cohn90cohn90c.png"
              alt="Palm fronds decoration"
              className="absolute top-0 right-0 w-[400px] h-[400px] object-contain mix-blend-multiply opacity-90 z-0 pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* ── Bottom-Left Coconut Cluster Asset ── */}
            <img
              ref={bottomLeftBotanicalRef}
              src="/assets/Gemini_Generated_Image_6ra6rf6ra6rf6ra6.png"
              alt="Coconut cluster decoration"
              className="absolute bottom-0 left-0 w-[400px] h-[400px] object-contain mix-blend-multiply opacity-90 z-0 pointer-events-none"
              style={{ mixBlendMode: 'multiply' }}
            />

            {/* Background Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
              <span className="text-[25vw] font-bold text-[#1E1E1E] opacity-[0.018] blur-[6px] select-none whitespace-nowrap">
                HYDROPS
              </span>
            </div>

            {/* Single Unified Philosophy Content Engine */}
            <div className="relative z-10 flex flex-col items-center text-center w-full max-w-[800px] px-6 select-none pointer-events-auto">
              {/* Droplet SVG */}
              <div ref={dropletWrapperRef} className="philosophy-droplet mb-8 opacity-0">
                <svg
                  width="24"
                  height="32"
                  viewBox="0 0 24 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <path
                    d="M12 0C12 0 3 12.632 3 21C3 25.9706 7.02944 30 12 30C16.9706 30 21 25.9706 21 21C21 12.632 12 0 12 0Z"
                    stroke="#1E1E1E"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 21C7 18.2386 9.23858 16 12 16"
                    stroke="#C8A96A"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Typography Engine */}
              <div className="relative w-full">
                {/* Persistent Phrase */}
                <h2
                  ref={persistentTextRef}
                  className="philosophy-persistent text-[clamp(2.8rem,6vw,5rem)] font-light tracking-tight mb-4 opacity-0 text-[#1E1E1E]"
                >
                  Every Drop
                </h2>

                {/* Chapters Container */}
                <div className="relative h-[200px] md:h-[240px] w-full mt-4">
                  {/* Chapter 1 */}
                  <div
                    ref={ch1Ref}
                    className="philosophy-chapter chapter-1 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0"
                  >
                    <h3 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-light tracking-tight text-[#1E1E1E]">
                      Begins <br />
                      <span className="text-[#205C3B] italic">With Purity.</span>
                    </h3>
                  </div>

                  {/* Chapter 2 */}
                  <div
                    ref={ch2Ref}
                    className="philosophy-chapter chapter-2 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0"
                  >
                    <h3 className="text-[clamp(2rem,4.5vw,3.8rem)] font-light tracking-tight leading-tight text-[#1E1E1E]">
                      Carefully Selected.
                      <br />
                      Patiently Crafted.
                      <br />
                      <span className="text-[#C8A96A] italic">Crystal Clear.</span>
                    </h3>
                  </div>

                  {/* Chapter 3 */}
                  <div
                    ref={ch3Ref}
                    className="philosophy-chapter chapter-3 absolute inset-0 w-full flex flex-col items-center justify-start opacity-0"
                  >
                    <h3 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-light tracking-tight text-[#1E1E1E]">
                      Earns Your Trust.
                    </h3>

                    {/* Final CTA */}
                    <div
                      ref={ctaRef}
                      className="philosophy-cta mt-8 opacity-0 flex justify-center w-full"
                    >
                      <a
                        href="#coconut-journey"
                        className="text-xs font-medium tracking-[0.25em] uppercase text-[#205C3B] border-b border-[#205C3B]/50 pb-1 hover:border-[#205C3B] transition-colors duration-300"
                      >
                        Discover The Journey
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
