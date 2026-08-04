import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class BlogAnimationController {
  private cleanupFns: Array<() => void> = [];

  constructor() {
    this.init();
  }

  private init() {
    gsap.registerPlugin(ScrollTrigger);

    // Initial delay to let React hydrate and next.js routing finish
    setTimeout(() => {
      this.setupAnimations();
    }, 100);
  }

  private setupAnimations() {
    const eyebrow = document.querySelector('.blog-hero-eyebrow');
    const heading = document.querySelector('.blog-hero-heading');
    const desc = document.querySelector('.blog-hero-desc');
    const cards = document.querySelectorAll('.topic-card');
    const silhouette = document.querySelector('.blog-silhouette');
    const caption = document.querySelector('.blog-bottom-caption');

    const tl = gsap.timeline({
      delay: 0.2 // small delay after load
    });

    // Set initial states
    if (eyebrow) gsap.set(eyebrow, { opacity: 0 });
    if (heading) gsap.set(heading, { opacity: 0, y: 30 });
    if (desc) gsap.set(desc, { opacity: 0, y: 20 });
    if (cards.length) gsap.set(cards, { opacity: 0, y: 30 });
    if (silhouette) gsap.set(silhouette, { opacity: 0 });
    if (caption) gsap.set(caption, { opacity: 0, y: 20 });

    // Sequence
    if (eyebrow) tl.to(eyebrow, { opacity: 1, duration: 0.8, ease: 'power2.out' });
    if (heading) tl.to(heading, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.4');
    if (desc) tl.to(desc, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.8');
    
    if (cards.length) {
      tl.to(cards, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }, '-=0.5');
    }

    if (silhouette) tl.to(silhouette, { opacity: 0.03, duration: 3, ease: 'power2.out' }, '-=1');
    if (caption) tl.to(caption, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=2.5');

    // Make silhouette drift continuously
    if (silhouette) {
      gsap.to(silhouette, {
        y: -30,
        x: 10,
        rotation: 2,
        duration: 15,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
      this.cleanupFns.push(() => gsap.killTweensOf(silhouette));
    }

    this.cleanupFns.push(() => tl.kill());
  }

  public destroy() {
    this.cleanupFns.forEach(fn => fn());
    this.cleanupFns = [];
  }
}
