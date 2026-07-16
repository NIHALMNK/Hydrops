import React, { forwardRef } from 'react';
import Image from 'next/image';

export const HeroLogo = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div 
      ref={ref}
      className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center opacity-0"
      style={{ transform: 'scale(0.92)', filter: 'blur(8px)' }}
    >
      <div className="relative w-[220px] sm:w-[280px] md:w-[340px] lg:w-[420px] xl:w-[520px] aspect-video">
        <Image 
          src="/images/brand/logo.png"
          alt="Hydrops Logo"
          fill
          sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 420px, 520px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
});
HeroLogo.displayName = 'HeroLogo';
