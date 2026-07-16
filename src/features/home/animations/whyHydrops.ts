import gsap from 'gsap';

export function initWhyHydrops(scope: HTMLElement) {
  const pinWrapper = scope.querySelector('.why-pin-wrapper') as HTMLElement;
  const cards = gsap.utils.toArray('.why-card') as HTMLElement[];

  if (!pinWrapper || cards.length === 0) return;

  // Set all cards (except the first) to be hidden directly below the container.
  gsap.set(cards.slice(1), { yPercent: 100 });

  // Create a single master timeline.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scope, // Pinned based on the outer section
      start: 'top top',
      // Duration scales perfectly with the number of cards
      end: () => `+=${cards.length * window.innerHeight}`,
      pin: pinWrapper, // Pin only the inner wrapper
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    }
  });

  cards.forEach((card, i) => {
    if (i === 0) return; // Card 1 is already correctly placed

    const prevCard = cards[i - 1];

    tl.to(card, {
      yPercent: 0,
      duration: 1,
      ease: 'power1.inOut',
    }, `slide${i}`)
    .to(prevCard, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: 'power1.inOut',
    }, `slide${i}`);
  });

  // Let the final card linger slightly before the wrapper unpins 
  // so the scroll out feels completely natural and deliberate.
  tl.to({}, { duration: 0.5 });

  return () => {
    tl.kill();
  };
}
