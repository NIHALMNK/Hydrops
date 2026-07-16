import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initPhilosophy(scope: HTMLElement) {
  const textElement = scope.querySelector('.philosophy-text');
  if (!textElement) return;

  const splitText = new SplitType(textElement as HTMLElement, { types: 'words' });

  gsap.set(textElement, { opacity: 1, y: 0 }); // reset initial state
  gsap.set(splitText.words, { opacity: 0, y: 20 });

  ScrollTrigger.create({
    trigger: scope,
    start: 'top 70%',
    animation: gsap.to(splitText.words, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power3.out',
    }),
  });
}
