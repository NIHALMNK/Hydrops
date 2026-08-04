'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { AboutAnimationController } from '@/features/about/animations/master';

export function AboutAnimationWrapper({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    // Implement soft fade page transition
    const main = mainRef.current;
    if (main) {
      main.style.opacity = '0';
      main.style.transition = 'opacity 1s ease-in-out';
      requestAnimationFrame(() => {
        main.style.opacity = '1';
      });
    }

    const controller = new AboutAnimationController(mainRef);
    
    const timer = setTimeout(() => {
      controller.init();
    }, 100);

    return () => {
      clearTimeout(timer);
      controller.cleanup();
    };
  }, []);

  return (
    <main ref={mainRef} className="w-full relative overflow-hidden bg-[#0A0A0A]">
      {children}
    </main>
  );
}
