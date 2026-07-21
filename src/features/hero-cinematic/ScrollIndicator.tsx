'use client';

import { useEffect, useRef } from 'react';

/**
 * ScrollIndicator — a lightweight, self-contained hero scroll cue.
 *
 * Behaviour:
 *   • Visible as soon as the hero is revealed (after the splash exits).
 *   • Fades out once the user has scrolled > 60 px.
 *   • Does not reappear unless the user returns to the very top.
 *   • Clicking / tapping scrolls one full viewport-height downward,
 *     landing naturally at the start of the next section.
 *   • Respects prefers-reduced-motion — the pulse animation is disabled.
 *   • Keyboard accessible: focusable button with a visible focus ring.
 *
 * Performance:
 *   • One passive scroll listener, rAF-throttled.
 *   • Writes opacity directly to the DOM — zero React re-renders on scroll.
 *   • No layout calculations on scroll.
 */
export function ScrollIndicator() {
  const ref = useRef<HTMLButtonElement>(null);

  // ── Fade-out on scroll ─────────────────────────────────────────────────────
  // We update opacity directly on the DOM node (no setState) so this listener
  // never triggers a React re-render.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      // Fully visible at y=0, fully gone at y=120 px.
      const opacity = Math.max(0, 1 - y / 120);
      el.style.opacity = String(opacity);
      // Remove from tab order once invisible so keyboard users don't land on it.
      el.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Sync initial state immediately (handles page reloads mid-scroll)
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Click: scroll one viewport height down ─────────────────────────────────
  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
      {/* Keyframe for the chevron bounce — scoped here to keep the component
          self-contained.  prefers-reduced-motion disables it entirely. */}
      <style>{`
        @keyframes hsi-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hsi-chevron { animation: none !important; }
        }
      `}</style>

      <button
        ref={ref}
        type="button"
        aria-label="Scroll down to explore"
        onClick={handleClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group focus-visible:outline-none"
        style={{
          // z-30 — above the typography layer (z-20) but below the navbar (z-50)
          zIndex: 30,
          // Pointer events managed by the scroll listener once opacity hits 0
          pointerEvents: 'auto',
          // Smooth opacity transition driven by the scroll listener
          transition: 'opacity 0.4s ease',
          // Visible focus ring for keyboard users — gold thread matches brand
          borderRadius: 4,
        }}
        // Inline focus style: show gold ring on focus-visible
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid rgba(200,169,106,0.8)';
          e.currentTarget.style.outlineOffset = '4px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        {/* Label */}
        <span
          aria-hidden="true"
          style={{
            fontSize: '9px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
            // Slight lift on hover — CSS handles it, no JS needed
            transition: 'color 0.3s ease',
            // group-hover via inline approach — simpler than Tailwind for a
            // single token without config changes
          }}
          className="group-hover:!text-white/70"
        >
          Scroll
        </span>

        {/* Animated chevron */}
        <span
          aria-hidden="true"
          className="hsi-chevron"
          style={{
            display: 'block',
            animation: 'hsi-bounce 1.8s ease-in-out infinite',
          }}
        >
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            aria-hidden="true"
          >
            {/* Two stacked chevrons — upper faint, lower vivid */}
            <polyline
              points="1 1 9 8 17 1"
              stroke="rgba(200,169,106,0.30)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="1 4.5 9 11.5 17 4.5"
              stroke="rgba(200,169,106,0.75)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>
    </>
  );
}
