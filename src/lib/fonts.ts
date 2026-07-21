import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

// ── Display / Editorial typeface ─────────────────────────────────────────────
// Cormorant Garamond: a high-contrast serif used by premium FMCG and luxury
// brands. Its fine hairlines and elegant letterforms suit the large display
// headings across the hero, SoulStatement, PurityStatement, and Philosophy
// sections. Loaded as a variable font (weights 300–700) to minimise requests.
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
  preload: true,
});

// ── UI / Body / Navigation typeface ──────────────────────────────────────────
// DM Sans: a geometric humanist sans-serif that is exceptionally legible at
// small sizes (navigation, labels, captions) while maintaining elegance at
// body sizes. Its optical weight pairs naturally with Cormorant.
// Loaded as a variable font (wght 300–700).
export const dmSans = DM_Sans({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-dm-sans',
  preload: true,
});

// Legacy export — kept so any existing code that imports `inter` continues
// to compile without errors. The actual variable it injects is now overridden
// in globals.css to use --font-dm-sans.
export { dmSans as inter };
