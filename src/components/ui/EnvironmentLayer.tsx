'use client';

import { motion } from 'framer-motion';

export type LightStyle = 'morning' | 'museum' | 'directional' | 'bottle-halo' | 'ambient' | 'none';

interface EnvironmentLayerProps {
  light?: LightStyle;
  reflection?: 'crystal' | 'none';
  fibre?: number; // 0 to 1 opacity
  vignette?: boolean;
  ambientMotion?: 'ambient' | 'none';
}

export function EnvironmentLayer({
  light = 'none',
  reflection = 'none',
  fibre = 0,
  vignette = false,
  ambientMotion = 'none',
}: EnvironmentLayerProps) {
  // Breathing animation configuration
  const breatheAnimation = ambientMotion === 'ambient' ? {
    opacity: [0.8, 1, 0.8],
    scale: [1, 1.02, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  } : {};

  const reflectionAnimation = ambientMotion === 'ambient' ? {
    x: ['-2%', '2%', '-2%'],
    y: ['-1%', '3%', '-1%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear"
    }
  } : {};

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      
      {/* 1. Lighting Layer */}
      {light !== 'none' && (
        <motion.div 
          className="absolute inset-0"
          animate={breatheAnimation}
        >
          {light === 'morning' && (
            <div className="absolute top-0 left-0 w-[80vw] h-[80vw] -translate-x-1/4 -translate-y-1/4 bg-[radial-gradient(circle,rgba(255,255,255,0.7)_0%,transparent_60%)] blur-3xl opacity-80 mix-blend-overlay" />
          )}
          
          {light === 'museum' && (
            // Centered spotlight, slightly elongated (droplet geometry reference)
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[80vw] rounded-[100%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.6)_0%,transparent_60%)] blur-[80px] opacity-70 mix-blend-overlay" />
          )}

          {light === 'directional' && (
            <div className="absolute top-0 left-0 w-[50vw] h-full bg-[linear-gradient(to_right,rgba(255,255,255,0.6)_0%,transparent_100%)] blur-2xl opacity-60 mix-blend-overlay" />
          )}

          {light === 'bottle-halo' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[60vw] rounded-[100%] bg-[radial-gradient(ellipse,rgba(255,255,255,0.8)_0%,transparent_70%)] blur-[60px] opacity-90 mix-blend-overlay" />
          )}

          {light === 'ambient' && (
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.5)_0%,transparent_80%)] blur-3xl opacity-50 mix-blend-overlay" />
          )}
        </motion.div>
      )}

      {/* 2. Crystal Reflection Layer (Caustics) */}
      {reflection === 'crystal' && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center opacity-[0.015] mix-blend-overlay"
          animate={reflectionAnimation}
        >
          {/* Elongated droplet-inspired reflection shapes */}
          <div className="relative w-full h-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full absolute inset-0 blur-[2px]">
               <path d="M 20 100 C 10 50, 40 10, 50 0 C 60 10, 90 50, 80 100 Z" fill="#C8A96A" className="opacity-50 transform -rotate-12 translate-x-[10%] scale-y-150" />
               <path d="M 20 100 C 10 50, 40 10, 50 0 C 60 10, 90 50, 80 100 Z" fill="#FFFFFF" className="opacity-80 transform rotate-12 translate-x-[40%] scale-y-125" />
               <path d="M 20 100 C 10 50, 40 10, 50 0 C 60 10, 90 50, 80 100 Z" fill="#C8A96A" className="opacity-40 transform rotate-45 translate-x-[70%] scale-y-110" />
            </svg>
          </div>
        </motion.div>
      )}

      {/* 3. Vignette Layer */}
      {vignette && (
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_50%,rgba(0,0,0,0.03)_100%)] mix-blend-multiply" />
      )}

      {/* 4. Organic Fibre Layer */}
      {fibre > 0 && (
        <div 
          className="absolute inset-0 mix-blend-multiply" 
          style={{ opacity: fibre }}
        >
          <svg className="w-full h-full">
            <filter id="organic-fibre">
              {/* baseFrequency="0.01 0.4" creates horizontal stretching for a fibre-like appearance */}
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.3" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#organic-fibre)" />
          </svg>
        </div>
      )}
      
    </div>
  );
}
