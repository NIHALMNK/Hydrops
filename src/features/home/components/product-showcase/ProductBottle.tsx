'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EnvironmentLayer } from '../../../../components/ui/EnvironmentLayer';

export function ProductBottle() {
  return (
    <div className="product-bottle-container w-full h-full flex items-center justify-center relative perspective-[1000px] z-10">
      
      {/* Layer 1: Background & Environment */}
      <EnvironmentLayer light="none" reflection="none" fibre={0} />

      {/* Layer 2: Crystal Halo (Broken, soft, uneven light, warm ivory) */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[100%] rounded-[100%] opacity-20 mix-blend-screen pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 40% 40%, rgba(255,253,240,0.6) 0%, rgba(255,253,240,0.2) 40%, transparent 70%), radial-gradient(ellipse at 60% 60%, rgba(255,253,240,0.4) 0%, rgba(255,253,240,0.1) 50%, transparent 80%)',
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.15, 0.25, 0.15],
          scale: [0.95, 1.02, 0.95],
        }}
        transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
      />

      {/* Layer 3: Bottle with Float Animation */}
      <motion.div 
        className="product-bottle origin-center z-20 w-full flex justify-center h-full relative"
        animate={{
          y: [-6, 6, -6],
        }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="product-parallax relative aspect-[1/2.2] flex justify-center items-center mt-auto mb-auto" style={{ height: 'clamp(420px, 48vw, 720px)' }}>
          
          {/* Contact Shadow & Soft Reflection underneath the bottle */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[120%] max-w-[400px] h-[40px] bg-black/[0.03] blur-[20px] rounded-[100%] z-0" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] max-w-[250px] h-[20px] bg-black/[0.06] blur-[12px] rounded-[100%] z-0" />

          {/* Hydrops Bottle */}
          <Image 
            src="/images/products/hydrops-coconut-oil.png"
            alt="Hydrops Coconut Oil Bottle"
            fill
            className="object-contain z-20"
            sizes="(max-width: 768px) 75vw, (max-width: 1200px) 48vw, 720px"
            priority
          />
          
        </div>
      </motion.div>

      {/* Layer 4: Floating Coconut orbiting the bottle */}
      <motion.div 
        className="absolute top-[25%] left-[32%] w-[100px] md:w-[150px] h-[100px] md:h-[150px] z-30 opacity-95"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 2, 0, -1, 0],
          x: [0, -5, 5, 0],
        }}
        transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
      >
        <Image src="/images/assets/premium-floating-coconut.png" alt="" fill sizes="(max-width: 768px) 100px, 150px" className="object-contain drop-shadow-2xl" />
      </motion.div>

      {/* Layer 5: Crystal Oil Droplets (CSS Based for perfect clarity) */}
      <Droplet top="30%" left="35%" size="30px" delay={0} />
      <Droplet top="65%" right="28%" size="20px" delay={2} />
      <Droplet top="55%" left="22%" size="45px" delay={4} />

      {/* Layer 6: Foreground Glow (Very soft light overlay) */}
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] pointer-events-none z-50 mix-blend-overlay"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
      />
    </div>
  );
}

// Reusable CSS Droplet Component
function Droplet({ top, left, right, size, delay }: { top?: string, left?: string, right?: string, size: string, delay: number }) {
  return (
    <motion.div
      className="absolute z-40 rounded-full"
      style={{
        top, left, right,
        width: size,
        height: size,
        background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.2) 20%, rgba(200,169,106,0.1) 60%, transparent 100%)',
        boxShadow: 'inset -2px -2px 6px rgba(200,169,106,0.2), inset 2px 2px 6px rgba(255,255,255,0.8), 0 10px 20px rgba(0,0,0,0.05)',
        backdropFilter: 'blur(4px)',
      }}
      animate={{
        y: [-8, 8, -8],
        x: [-2, 2, -2],
      }}
      transition={{
        duration: 7,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      }}
    />
  );
}
