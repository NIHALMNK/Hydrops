'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

interface SplashScreenProps {
  progress: number;   // 0 – 1
  isReady: boolean;
  onDone: () => void; // called after exit animation completes
}

/**
 * SplashScreen — shown while the first batch of hero frames is fetched.
 *
 * Design language:
 *   • Same deep black as the hero background (#050505) — no jarring transition
 *   • Hydrops logo centred, same as the hero opener
 *   • A paper-thin gold progress bar — the brand's signature gold thread
 *   • Fades out smoothly, then calls onDone so the hero becomes interactive
 */
export function SplashScreen({ progress, isReady, onDone }: SplashScreenProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasExited = useRef(false);

  // Lock body scroll while splash is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Trigger exit animation when frames are ready
  useEffect(() => {
    if (!isReady || hasExited.current) return;
    hasExited.current = true;

    const el = overlayRef.current;
    if (!el) { onDone(); return; }

    // Brief pause so the bar visually completes before fading
    const t = setTimeout(() => {
      el.style.transition = 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.opacity = '0';
      el.addEventListener('transitionend', () => {
        document.body.style.overflow = '';
        onDone();
      }, { once: true });
    }, 280);

    return () => clearTimeout(t);
  }, [isReady, onDone]);

  const pct = Math.round(progress * 100);

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-label="Loading Hydrops"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ backgroundColor: '#050505' }}
    >
      {/* ── Logo ────────────────────────────────────────────────────── */}
      <div
        className="relative mb-16"
        style={{ width: 160, height: 52 }}
      >
        <Image
          src="/images/brand/logo.png"
          alt="Hydrops"
          fill
          sizes="160px"
          className="object-contain"
          priority
        />
      </div>

      {/* ── Progress track ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative overflow-hidden"
        style={{ width: 160, height: 1 }}
      >
        {/* Track */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        />
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, rgba(200,169,106,0.6), rgba(200,169,106,1))',
            transition: 'width 0.25s ease-out',
          }}
        />
      </div>

      {/* ── Label ───────────────────────────────────────────────────── */}
      <p
        aria-hidden="true"
        className="mt-5 tabular-nums"
        style={{
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: 'rgba(200,169,106,0.45)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {pct < 100 ? `${pct}%` : 'Ready'}
      </p>

      {/* ── Brand whisper ───────────────────────────────────────────── */}
      <p
        className="absolute bottom-10"
        style={{
          fontSize: '10px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.12)',
        }}
      >
        Pure Coconut Oil · India
      </p>
    </div>
  );
}
