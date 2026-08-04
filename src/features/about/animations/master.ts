import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGlobalGSAP } from '@/features/home/animations/global';
import { initHero } from './hero';
import { initIntro } from './intro';
import { initStory } from './story';
import { initMission } from './mission';
import { initValues } from './values';
import { initManufacturing } from './manufacturing';
import { initQuality } from './quality';
import { initWhy } from './why';
import { initCompany } from './company';
export class AboutAnimationController {
  private ctx: gsap.Context;
  private mm: gsap.MatchMedia;
  private cleanups: Array<() => void> = [];

  constructor(private scope: React.RefObject<HTMLElement | null>) {
    initGlobalGSAP();
    this.ctx = gsap.context(() => {}, scope);
    this.mm = gsap.matchMedia(scope);
  }

  public init() {
    this.ctx.add(() => {
      const root = this.scope.current;
      if (!root) return;

      const hero = root.querySelector('#about-hero') as HTMLElement || root.querySelector('section[aria-label="About Hydrops"]') as HTMLElement;
      const intro = root.querySelector('#about-intro') as HTMLElement || root.querySelector('section:nth-of-type(2)') as HTMLElement; // Fallback to 2nd section
      const story = root.querySelector('#about-story') as HTMLElement;
      const mission = root.querySelector('#about-mission') as HTMLElement || root.querySelector('section:nth-of-type(4)') as HTMLElement; // Fallback
      const values = root.querySelector('#about-values') as HTMLElement;
      const manufacturing = root.querySelector('#about-manufacturing') as HTMLElement;
      const quality = root.querySelector('#about-quality') as HTMLElement || root.querySelector('section:nth-of-type(7)') as HTMLElement; // Fallback
      const why = root.querySelector('#about-why') as HTMLElement || root.querySelector('section:nth-of-type(8)') as HTMLElement; // Fallback
      const company = root.querySelector('#about-company') as HTMLElement || root.querySelector('section:nth-of-type(9)') as HTMLElement; // Fallback

      // Wrap animations in a matchMedia block to respect prefers-reduced-motion
      this.mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (hero) this.addCleanup(initHero(hero));
        if (intro) this.addCleanup(initIntro(intro));
        if (story) this.addCleanup(initStory(story));
        if (mission) this.addCleanup(initMission(mission));
        if (values) this.addCleanup(initValues(values));
        if (manufacturing) this.addCleanup(initManufacturing(manufacturing));
        if (quality) this.addCleanup(initQuality(quality));
        if (why) this.addCleanup(initWhy(why));
        if (company) this.addCleanup(initCompany(company));
      });
    });

    let resizeTimer: NodeJS.Timeout;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };
    
    window.addEventListener('resize', onResize);
    this.addCleanup(() => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    });
  }
  
  private addCleanup(cleanup: unknown) {
    if (typeof cleanup === 'function') {
      this.cleanups.push(cleanup as () => void);
    }
  }

  public cleanup() {
    this.cleanups.forEach(fn => fn());
    this.ctx.revert();
    this.mm.revert();
  }
}
