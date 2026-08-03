import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Multi-Phase Organic Curved Reveal Transition: Hero → Soul Statement
 *
 * Architecture:
 * - Soul Statement sits stationary in the background layer (z-10).
 * - Hero sits in the foreground layer (z-20) with an SVG clipPath & depth drop-shadow applied.
 * - Scroll Trigger Timeline Breakdown:
 *   - Phase 1 (0% → 35%): Hero remains fully visible while organic curve begins opening at bottom-center.
 *     Soul Statement background becomes visible. Text content remains hidden (opacity: 0).
 *   - Phase 2 (35% → 65%): Opening expands wider and higher. Soul Statement background is fully exposed.
 *     Text content remains hidden / faint.
 *   - Phase 3 (65% → 100%): Curve reaches full height and unpins. Text elements animate in progressively:
 *     1. Eyebrow (opacity: 0→1, y: 20px→0px)
 *     2. Heading (opacity: 0→1, y: 40px→0px, blur: 12px→0px)
 *     3. Highlighted text (opacity: 0→1, scale: 0.98→1, blur: 10px→0px)
 *     4. Signature Gold Line (opacity: 0→1, scaleX: 0→1)
 */
export function initHeroTransition(root: HTMLElement) {
  const wrapper = root.querySelector('#hero-soul-wrapper') as HTMLElement;
  const pinnedContainer = root.querySelector('#hero-soul-pinned-container') as HTMLElement;
  const clipPathShape = root.querySelector('#hero-clip-path-shape') as SVGPathElement;

  if (!wrapper || !pinnedContainer || !clipPathShape) return () => {};

  const eyebrow = root.querySelector('.soul-eyebrow') as HTMLElement;
  const heading = root.querySelector('.soul-heading') as HTMLElement;
  const highlight = root.querySelector('.soul-highlight') as HTMLElement;
  const goldLine = root.querySelector('.soul-gold-line') as HTMLElement;

  // Initial SVG path (Full screen rectangle)
  const initialPath = 'M 0,0 L 1,0 L 1,1 C 0.88,1 0.72,1 0.5,1 C 0.28,1 0.12,1 0,1 Z';
  clipPathShape.setAttribute('d', initialPath);

  // Phase Keyframe SVG Paths (Organic Fabric-like Bezier Curves)
  const phase1Path = 'M 0,0 L 1,0 L 1,1 C 0.88,0.98 0.72,0.78 0.5,0.78 C 0.28,0.78 0.12,0.98 0,1 Z';
  const phase2Path = 'M 0,0 L 1,0 L 1,0.85 C 0.88,0.62 0.72,0.38 0.5,0.38 C 0.28,0.38 0.12,0.62 0,0.85 Z';
  const phase3Path = 'M 0,0 L 1,0 L 1,0.5 C 0.88,0.25 0.72,0.05 0.5,0.05 C 0.28,0.05 0.12,0.25 0,0.5 Z';
  const finalPath = 'M 0,0 L 1,0 L 1,-0.1 C 0.88,-0.22 0.72,-0.3 0.5,-0.3 C 0.28,-0.3 0.12,-0.22 0,-0.1 Z';

  // Set initial hidden states for Soul Statement text elements (Phases 1 & 2)
  if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: 20 });
  if (heading) gsap.set(heading, { opacity: 0, y: 40, filter: 'blur(12px)' });
  if (highlight) gsap.set(highlight, { opacity: 0, scale: 0.98, filter: 'blur(10px)' });
  if (goldLine) gsap.set(goldLine, { opacity: 0, scaleX: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: '+=150%',
      pin: pinnedContainer,
      scrub: 0.7,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  // ── SVG Curve Morphing Across Scroll Timeline (0% → 100%) ──
  tl.to(clipPathShape, {
    attr: { d: phase1Path },
    duration: 0.35,
    ease: 'power1.in',
  }, 0)
  .to(clipPathShape, {
    attr: { d: phase2Path },
    duration: 0.3,
    ease: 'power1.inOut',
  }, 0.35)
  .to(clipPathShape, {
    attr: { d: phase3Path },
    duration: 0.2,
    ease: 'power1.inOut',
  }, 0.65)
  .to(clipPathShape, {
    attr: { d: finalPath },
    duration: 0.15,
    ease: 'power2.out',
  }, 0.85);

  // ── Phase 3 (65% → 100%): Staggered Storytelling Text Reveal ──
  
  // 1. Eyebrow (65% → 76%)
  if (eyebrow) {
    tl.to(
      eyebrow,
      {
        opacity: 1,
        y: 0,
        duration: 0.11,
        ease: 'power2.out',
      },
      0.65
    );
  }

  // 2. Heading (70% → 85%)
  if (heading) {
    tl.to(
      heading,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.15,
        ease: 'power2.out',
      },
      0.70
    );
  }

  // 3. Highlighted Accent Text (78% → 94%)
  if (highlight) {
    tl.to(
      highlight,
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.16,
        ease: 'power2.out',
      },
      0.78
    );
  }

  // 4. Signature Gold Line (85% → 100%)
  if (goldLine) {
    tl.to(
      goldLine,
      {
        opacity: 1,
        scaleX: 1,
        duration: 0.15,
        ease: 'power3.out',
      },
      0.85
    );
  }

  return () => {
    tl.kill();
  };
}
