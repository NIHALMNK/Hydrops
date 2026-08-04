import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initMission(section: HTMLElement) {
  const articles = section.querySelectorAll('article');
  const triggers: ScrollTrigger[] = [];

  articles.forEach(article => {
    const headline = article.querySelector('h3');
    const paragraph = article.querySelector('p');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: article,
        start: 'top 80%',
      }
    });

    if (headline) gsap.set(headline, { opacity: 0, y: 30 });
    if (paragraph) gsap.set(paragraph, { opacity: 0, y: 20 });

    tl.to(headline, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' })
      .to(paragraph, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, '-=0.8');

    triggers.push(tl.scrollTrigger!);
  });

  return () => {
    triggers.forEach(t => t.kill());
  };
}
