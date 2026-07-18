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

    const transitionDuration = 0.8;
    const pauseDuration = 3;
    const stepDuration = transitionDuration + pauseDuration;

    const buildMasterTimeline = () => {
      const tl = gsap.timeline({ repeat: -1 });

      cards.forEach((card, i) => {
         const startTime = i * stepDuration;
         const title = card.querySelector('.purity-card-title');
         const label = card.querySelector('.purity-card-label');
         
         // Activate this card
         tl.to(card, { opacity: 1, scale: 1.15, duration: transitionDuration, ease: 'power2.inOut' }, startTime);
         tl.to(title, { fontWeight: 600, color: '#0B0B0B', duration: transitionDuration, ease: 'power2.inOut' }, startTime);
         tl.to(label, { opacity: 1, color: '#388e4a', duration: transitionDuration, ease: 'power2.inOut' }, startTime);

         // Bottle rotation
         tl.to(bottleContainer, {
            rotateX: bottleAngles[i].rotateX,
            rotateY: bottleAngles[i].rotateY,
            duration: transitionDuration,
            ease: 'power2.inOut'
         }, startTime);

         // Halo pulse
         tl.to(halo, {
            scale: 1.1, backgroundColor: 'rgba(56, 142, 74, 0.15)', duration: transitionDuration, ease: 'power2.inOut'
         }, startTime);
         
         // Deactivate this card at the NEXT step's start time
         let nextStartTime = (i + 1) * stepDuration;
         if (i === cards.length - 1) {
            nextStartTime = 0; // Wrap around for the last card
         }
         
         tl.to(card, { opacity: 0.4, scale: 0.95, duration: transitionDuration, ease: 'power2.inOut' }, nextStartTime);
         tl.to(title, { fontWeight: 400, color: '#888', duration: transitionDuration, ease: 'power2.inOut' }, nextStartTime);
         tl.to(label, { opacity: 0.6, color: '#888', duration: transitionDuration, ease: 'power2.inOut' }, nextStartTime);
         
         tl.to(halo, {
            scale: 1, backgroundColor: 'rgba(56, 142, 74, 0)', duration: transitionDuration, ease: 'power2.inOut'
         }, nextStartTime);
      });

      tl.to({}, { duration: stepDuration }, (cards.length - 1) * stepDuration);
      return tl;
    };

    masterTl = buildMasterTimeline();

    // Hover interactions
    cards.forEach((card, i) => {
      const onEnter = () => {
        masterTl?.pause();
        
        // Temporarily animate bottle to face hovered card
        gsap.to(bottleContainer, {
          rotateX: bottleAngles[i].rotateX,
          rotateY: bottleAngles[i].rotateY,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: "auto"
        });
        
        // Temporarily highlight this card
        gsap.to(card, { opacity: 1, scale: 1.15, duration: 0.5, ease: 'power2.out', overwrite: "auto" });
        gsap.to(card.querySelector('.purity-card-title'), { fontWeight: 600, color: '#0B0B0B', duration: 0.5, overwrite: "auto" });
        gsap.to(card.querySelector('.purity-card-label'), { opacity: 1, color: '#388e4a', duration: 0.5, overwrite: "auto" });
        gsap.to(halo, { scale: 1.1, backgroundColor: 'rgba(56, 142, 74, 0.2)', duration: 0.5, overwrite: "auto" });
      };
      
      const onLeave = () => {
        // Rebuild timeline to discard any overwritten tweens, and resume from current progress
        if (masterTl) {
          const currentTime = masterTl.time();
          masterTl.kill();
          masterTl = buildMasterTimeline();
          
          // Animate the properties back to what the timeline wants them to be at this exact moment
          // Scrubbing to the time will instantly snap them. To smooth it, we can tween the timeline's playhead!
          // But snapping is usually fine if they move away, since it resumes.
          // Wait, the user said "Resume from current progress. Do NOT restart the timeline."
          // So snapping to current progress is the correct behavior for "resuming".
          // If we want a smooth transition back, we can do a quick tween to the timeline's expected values.
          masterTl.pause(currentTime);
          
          // To make the transition smooth, we can let GSAP tween the masterTl playhead for 0.5s, 
          // but since they just unhovered, jumping back to the actual timeline state is often best.
          // Let's just play it.
          masterTl.play(currentTime);
        }
      };
      
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
      
      (card as any)._orbitEnter = onEnter;
      (card as any)._orbitLeave = onLeave;
    });

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

    // Pause orbit when out of view
    ScrollTrigger.create({
      trigger: scope,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => masterTl?.play(),
      onLeave: () => masterTl?.pause(),
      onEnterBack: () => masterTl?.play(),
      onLeaveBack: () => masterTl?.pause(),
    });

    return () => {
      masterTl?.kill();
      cards.forEach(card => {
        if ((card as any)._orbitEnter) card.removeEventListener('mouseenter', (card as any)._orbitEnter);
        if ((card as any)._orbitLeave) card.removeEventListener('mouseleave', (card as any)._orbitLeave);
      });
      window.removeEventListener('mousemove', handleMouseMove);
    };
  });

  mm.add('(max-width: 767px)', () => {
    // Mobile vertical stack animations
    cards.forEach((card) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
  });

  return () => {
    mm.revert();
    masterTl?.kill();
    bgAnim1.kill();
    bgAnim2.kill();
  };
}
