import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initGlobalGSAP } from './global';
import { initPhilosophy } from './philosophy';
import { initJourney } from './journey';
import { initProduct } from './product';
import { initCTA } from './cta';
import { initCraftsmanship } from './craftsmanship';
import { initEveryday } from './everyday';

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

      const philosophy = root.querySelector('#philosophy-section') as HTMLElement;
      const journey = root.querySelector('#journey-section') as HTMLElement;
      const product = root.querySelector('#product-showcase-section') as HTMLElement;
      const craftsmanship = root.querySelector('#craftsmanship-section') as HTMLElement;
      const everyday = root.querySelector('#everyday-section') as HTMLElement;
      const cta = root.querySelector('#cta-section') as HTMLElement;

      if (philosophy) this.addCleanup(initPhilosophy(philosophy));
      if (journey) this.addCleanup(initJourney(journey));
      if (product) this.addCleanup(initProduct(product));
      if (craftsmanship) this.addCleanup(initCraftsmanship(craftsmanship));
      if (everyday) this.addCleanup(initEveryday(everyday));
      if (cta) this.addCleanup(initCTA(cta));
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
