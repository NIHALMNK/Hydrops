import gsap from 'gsap';

export function initWhyHydrops(scope: HTMLElement) {
  const pinWrapper = scope.querySelector('.why-pin-wrapper') as HTMLElement;
  const cards = gsap.utils.toArray('.why-card') as HTMLElement[];

  const mm = gsap.matchMedia();

  // Keep track of card colors for background atmosphere sync
  const cardBgColors = [
    '#FBF8F2', // Base section
    '#F6F2EA', // Card 2
    '#EEF5EC', // Card 3
    '#FCFAF7', // Card 4
    '#F2F7EF', // Card 5
    '#0F5A32', // Card 6
  ];
  
  const radialBg = scope.querySelector('.why-radial-bg');

  mm.add('(min-width: 768px)', () => {
    if (!pinWrapper || cards.length === 0) return;

    // Reset any previous content hiding, ensure everything is fully opaque.
    const contents = cards.map(c => c.querySelector('.why-card-content'));
    gsap.set(contents, { opacity: 1 });
    gsap.set(cards, { opacity: 1 });

    // Set initial states: Card 0 is at center. All other cards are hidden below the screen.
    gsap.set(cards, { zIndex: (i) => i }); // Card 0 = 0, Card 1 = 1, etc. Higher index is on top.
    gsap.set(cards.slice(1), { 
      y: window.innerHeight, 
      scale: 1,
      rotateX: 0
    });
    gsap.set(cards[0], { y: 0, scale: 1, rotateX: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: () => `+=${cards.length * window.innerHeight * 0.8}`,
        pin: pinWrapper,
        scrub: 1.5,
        anticipatePin: 1,
      }
    });

    cards.forEach((card, i) => {
      if (i === 0) return;

      const prevCards = cards.slice(0, i);

      tl.addLabel(`slide${i}`);

      // The incoming card rises from below the screen (100vh) to the center (0)
      tl.to(card, {
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }, `slide${i}`);

      // The previous cards (already in the stack) are pushed backward and upward
      // Each gets slightly smaller and higher so their top edges peek out behind the new active card.
      tl.to(prevCards, {
        y: (index) => `-${(i - index) * 24}px`, // Push up (y is negative)
        scale: (index) => 1 - ((i - index) * 0.04), // Shrink slightly to create depth
        rotateX: 2, // Tilt slightly back
        duration: 1,
        ease: 'power3.out',
      }, `slide${i}`);

      // Subtly shift the background radial light to match the current card
      if (radialBg && i < cardBgColors.length) {
         tl.to(radialBg, {
           backgroundColor: cardBgColors[i],
           duration: 1,
           ease: 'none',
         }, `slide${i}`);
      }
    });

    // Let the final card linger
    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  });

  mm.add('(max-width: 767px)', () => {
    // Mobile: Independent storytelling blocks
    gsap.set(cards, { opacity: 0, y: 20, scale: 0.98 });
    const contents = cards.map(c => c.querySelector('.why-card-content'));
    gsap.set(contents, { opacity: 1 });
    
    cards.forEach((card) => {
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
  });

  return () => {
    mm.revert();
  };
}
