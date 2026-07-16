import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGlobalGSAP } from './global';
import { initHero } from './hero';
import { initPhilosophy } from './philosophy';
import { initJourney } from './journey';
import { initProduct } from './product';
import { initSpecifications } from './specifications';
import { initWhyHydrops } from './whyHydrops';
import { initApplications } from './applications';
import { initQuality } from './quality';
import { initWhyCrystalClear } from './whyCrystalClear';
import { initFAQ } from './faq';
import { initCTA } from './cta';

export class HomeAnimationController {
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

      const hero = root.querySelector('#hero-section') as HTMLElement;
      const philosophy = root.querySelector('#philosophy-section') as HTMLElement;
      const journey = root.querySelector('#journey-section') as HTMLElement;
      const product = root.querySelector('#product-showcase-section') as HTMLElement;
      const specifications = root.querySelector('#specifications-section') as HTMLElement;
      const whyHydrops = root.querySelector('#why-hydrops-section') as HTMLElement;
      const applications = root.querySelector('#applications-section') as HTMLElement;
      const quality = root.querySelector('#quality-section') as HTMLElement;
      const whyCrystalClear = root.querySelector('#why-crystal-clear-section') as HTMLElement;
      const faq = root.querySelector('#faq-section') as HTMLElement;
      const cta = root.querySelector('#cta-section') as HTMLElement;

      if (hero) this.addCleanup(initHero(hero));
      if (philosophy) this.addCleanup(initPhilosophy(philosophy));
      if (journey) this.addCleanup(initJourney(journey));
      if (product) this.addCleanup(initProduct(product));
      if (specifications) this.addCleanup(initSpecifications(specifications));
      if (whyHydrops) this.addCleanup(initWhyHydrops(whyHydrops));
      if (applications) this.addCleanup(initApplications(applications));
      if (quality) this.addCleanup(initQuality(quality));
      if (whyCrystalClear) this.addCleanup(initWhyCrystalClear(whyCrystalClear));
      if (faq) this.addCleanup(initFAQ(faq));
      if (cta) this.addCleanup(initCTA(cta));
    });

    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
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
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}
