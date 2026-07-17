import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initJourney(scope: HTMLElement) {
  const track = scope.querySelector('.journey-track') as HTMLElement;
  const chapters = gsap.utils.toArray('.journey-chapter') as HTMLElement[];

  if (!track || chapters.length === 0) return;

  // The total horizontal scroll distance is (number of chapters - 1) * viewport width
  const getScrollAmount = () => -(window.innerWidth * (chapters.length - 1));

  // The main horizontal scrolling timeline
  const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: 'none',
  });

  ScrollTrigger.create({
    trigger: scope,
    start: 'top top',
    end: () => `+=${window.innerWidth * (chapters.length - 1)}`,
    pin: true,
    animation: tween,
    scrub: 1,
    invalidateOnRefresh: true,
  });

  // Individual chapter cinematic animations
  chapters.forEach((chapter, i) => {
    const text = chapter.querySelector('.journey-text');
    const visual = chapter.querySelector('.journey-visual');
    const imageInner = chapter.querySelector('.journey-image-inner');

    if (!text || !visual || !imageInner) return;

    if (i === 0) {
      // First chapter enters before horizontal scrolling starts
      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scope,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });

      gsap.to(visual, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scope,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      });
    } else {
      // Subsequent chapters animate as they scroll horizontally into view
      gsap.to(text, {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chapter,
          containerAnimation: tween,
          start: 'left 75%',
          end: 'left 25%',
          scrub: 1,
        }
      });

      gsap.to(visual, {
        opacity: 1,
        scale: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chapter,
          containerAnimation: tween,
          start: 'left 85%',
          end: 'left 35%',
          scrub: 1,
        }
      });
    }

    // Parallax inner image scale for all chapters
    gsap.to(imageInner, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: chapter,
        containerAnimation: tween,
        start: 'left right',
        end: 'right left',
        scrub: true,
      }
    });
  });
}
