'use client';

import { useEffect, useRef } from 'react';

export function ScrollIndicator() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const opacity = Math.max(0, 1 - y / 120);
      el.style.opacity = String(opacity);
      el.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <>
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
          zIndex: 30,
          pointerEvents: 'auto',
          transition: 'opacity 0.4s ease',
          borderRadius: 4,
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid rgba(200,169,106,0.8)';
          e.currentTarget.style.outlineOffset = '4px';
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none';
        }}
      >
        <span
          aria-hidden="true"
          className="text-[9px] tracking-[0.35em] uppercase text-white/45 group-hover:text-white/80 transition-colors duration-300"
        >
          Scroll
        </span>

        <span
          aria-hidden="true"
          className="hsi-chevron block"
          style={{ animation: 'hsi-bounce 1.8s ease-in-out infinite' }}
        >
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            aria-hidden="true"
          >
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
