'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { HomeAnimationController } from '@/features/home/animations/master';

export function HomeAnimationWrapper({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const controller = new HomeAnimationController(mainRef);
    
    const timer = setTimeout(() => {
      controller.init();
    }, 100);

    return () => {
      clearTimeout(timer);
      controller.cleanup();
    };
  }, []);

  return (
    <main ref={mainRef} className="w-full relative overflow-hidden" style={{ backgroundColor: '#F5F2EC' }}>
      {children}
    </main>
  );
}
