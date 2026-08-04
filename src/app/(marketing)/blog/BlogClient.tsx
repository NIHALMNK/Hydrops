'use client';

import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { BlogAnimationController } from '@/features/blog/animations/master';

export function BlogAnimationWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useIsomorphicLayoutEffect(() => {
    let controller: BlogAnimationController | null = null;
    
    // Slight delay ensures DOM is fully painted
    const timer = setTimeout(() => {
      controller = new BlogAnimationController();
    }, 50);

    return () => {
      clearTimeout(timer);
      if (controller) {
        controller.destroy();
      }
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen w-full relative" style={{ backgroundColor: '#F5F2EC', paddingTop: '8rem' }}>
      {/* ── Background Elements ── */}
      <div className="blog-hero-bg absolute inset-0 z-0 pointer-events-none">
        {/* Botanical Silhouette (Blurred & extremely low opacity) */}
        <div 
          className="blog-silhouette absolute right-0 top-0 w-full md:w-[60%] h-full opacity-[0.03] blur-xl"
          style={{
            background: 'url(/images/brand/philosophy-coconut.png) no-repeat center right',
            backgroundSize: 'contain',
          }}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </main>
  );
}
