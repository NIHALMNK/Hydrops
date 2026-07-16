import React, { forwardRef } from 'react';
import { HERO_SCENES } from '../content/heroScenes';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const HeroTypography = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center">
      {HERO_SCENES.map((scene) => (
        <div 
          key={scene.id} 
          id={`text-${scene.id}`}
          className={cn(
            "absolute inset-x-0 w-full flex flex-col justify-center px-4 md:px-12 lg:px-24 opacity-0 transform-gpu",
            scene.alignment === 'center' ? 'items-center text-center' : '',
            scene.alignment === 'left' ? 'items-start text-left' : '',
            scene.alignment === 'right' ? 'items-end text-right' : '',
          )}
          style={{ color: scene.textColor }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tight mb-4 drop-shadow-lg">
            {scene.title}
          </h2>
          {scene.subtitle && (
            <p className="text-lg md:text-2xl lg:text-3xl font-light opacity-90 drop-shadow-md">
              {scene.subtitle}
            </p>
          )}
        </div>
      ))}
    </div>
  );
});

HeroTypography.displayName = 'HeroTypography';
