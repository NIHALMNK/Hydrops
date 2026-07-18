import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPurityTable(scope: HTMLElement) {
  const cards = gsap.utils.toArray('.purity-card') as HTMLElement[];
  const bottleContainer = scope.querySelector('.purity-bottle-container');
  const halo = scope.querySelector('.bottle-halo');
  const parallaxWrapper = scope.querySelector('.purity-parallax-wrapper');
  const reflection = scope.querySelector('.bottle-reflection');

  const mm = gsap.matchMedia();

  // Background slow rotation (Premium atmosphere)
  const bg1 = scope.querySelector('.purity-bg-gradient');
  const bg2 = scope.querySelector('.purity-bg-gradient-alt');
  const bgAnim1 = gsap.to(bg1, { rotation: 360, duration: 40, repeat: -1, ease: "none" });
  const bgAnim2 = gsap.to(bg2, { rotation: -360, duration: 50, repeat: -1, ease: "none" });

  let masterTl: gsap.core.Timeline | null = null;

  mm.add('(min-width: 768px)', () => {
    const bottleAngles = [
      { rotateX: 4, rotateY: 0 },    // Top
      { rotateX: 2, rotateY: 4 },    // Top Right
      { rotateX: -2, rotateY: 4 },   // Bottom Right
      { rotateX: -4, rotateY: 0 },   // Bottom
      { rotateX: -2, rotateY: -4 },  // Bottom Left
      { rotateX: 2, rotateY: -4 },   // Top Left
    ];

    // Reset initial states so they don't fight the timeline
    gsap.set(cards, { opacity: 0.4, scale: 0.95 });
    cards.forEach(card => {
       gsap.set(card.querySelector('.purity-card-title'), { fontWeight: 400, color: '#888' });
       gsap.set(card.querySelector('.purity-card-label'), { opacity: 0.6, color: '#888' });
    });

    masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1.5,
      }
    });

    const transitionDuration = 0.8;
    const pauseDuration = 3;
    const stepDuration = transitionDuration + pauseDuration;

    cards.forEach((card, i) => {
       const startTime = i * stepDuration;
       const title = card.querySelector('.purity-card-title');
       const label = card.querySelector('.purity-card-label');
       
       // Activate this card
       masterTl!.to(card, { opacity: 1, scale: 1.15, duration: transitionDuration, ease: 'power2.inOut' }, startTime);
       masterTl!.to(title, { fontWeight: 600, color: '#0B0B0B', duration: transitionDuration, ease: 'power2.inOut' }, startTime);
       masterTl!.to(label, { opacity: 1, color: '#388e4a', duration: transitionDuration, ease: 'power2.inOut' }, startTime);

       // Bottle rotation
       masterTl!.to(bottleContainer, {
          rotateX: bottleAngles[i].rotateX,
          rotateY: bottleAngles[i].rotateY,
          duration: transitionDuration,
          ease: 'power2.inOut'
       }, startTime);

       // Halo pulse
       masterTl!.to(halo, {
          scale: 1.1, backgroundColor: 'rgba(56, 142, 74, 0.15)', duration: transitionDuration, ease: 'power2.inOut'
       }, startTime);
       
       // Deactivate this card at the NEXT step's start time
       let nextStartTime = (i + 1) * stepDuration;
       if (i === cards.length - 1) {
          nextStartTime = 0; // Wrap around for the last card
       }
       
       masterTl!.to(card, { opacity: 0.4, scale: 0.95, duration: transitionDuration, ease: 'power2.inOut' }, nextStartTime);
       masterTl!.to(title, { fontWeight: 400, color: '#888', duration: transitionDuration, ease: 'power2.inOut' }, nextStartTime);
       masterTl!.to(label, { opacity: 0.6, color: '#888', duration: transitionDuration, ease: 'power2.inOut' }, nextStartTime);
       
       // Halo fades out slightly before pulsing again
       masterTl!.to(halo, {
          scale: 1, backgroundColor: 'rgba(56, 142, 74, 0)', duration: transitionDuration, ease: 'power2.inOut'
       }, nextStartTime);
    });

    // Ensure the timeline duration is exactly 6 * stepDuration
    masterTl.to({}, { duration: stepDuration }, (cards.length - 1) * stepDuration);

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      gsap.to(parallaxWrapper, {
        x: x * 10,
        y: y * 10,
        rotateX: -y * 4,
        rotateY: x * 4,
        duration: 1,
        ease: 'power2.out',
        overwrite: "auto" // Only overwrite parallax wrapper tweens
      });
      
      gsap.to(reflection, {
        x: -x * 20,
        y: -y * 20,
        duration: 1,
        ease: 'power2.out',
        overwrite: "auto"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      masterTl?.kill();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  mm.add('(max-width: 767px)', () => {
    // Mobile vertical stack animations (Cards)
    const mobileCards = gsap.utils.toArray('.mobile-purity-card') as HTMLElement[];
    
    // Set initial states
    gsap.set(mobileCards, { opacity: 0, y: 24, scale: 0.98 });
    
    mobileCards.forEach((card) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      });
    });

    // Mobile Bottle floating animation
    const mobileBottle = scope.querySelector('.mobile-bottle');
    if (mobileBottle) {
      gsap.fromTo(mobileBottle, 
        { y: -4, rotation: -1 },
        { 
          y: 4, 
          rotation: 1, 
          duration: 3.5, 
          ease: 'sine.inOut', 
          yoyo: true, 
          repeat: -1 
        }
      );
    }
  });

  return () => {
    mm.revert();
    masterTl?.kill();
    bgAnim1.kill();
    bgAnim2.kill();
  };
}
