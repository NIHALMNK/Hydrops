import Image from 'next/image';
import { SectionRipple } from './SectionRipple';
import type { EverydayDocument } from '@/types';

/**
 * Everyday – Premium Cinematic Storytelling Journey.
 * Connected by an organic SVG snake path, animated MotionPath droplet,
 * glowing waypoints, and alternating editorial moment cards.
 */
interface Props { data: EverydayDocument; }

export function Everyday({ data }: Props) {
  return (
    <section
      id="everyday-section"
      className="relative w-full bg-[#F5F2EC] py-32 lg:py-48 overflow-hidden select-none"
    >
      {/* Ambient warm radial lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(200,169,106,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto px-6 mb-24 lg:mb-36 relative z-10">
        <p className="everyday-label text-xs sm:text-sm font-medium tracking-[0.35em] uppercase text-[#C8A96A] mb-4 opacity-0">
          {data.heading.eyebrow}
        </p>
        <h2 className="everyday-headline text-[clamp(2.5rem,5.5vw,4.5rem)] font-light text-[#1E1E1E] leading-[1.1] tracking-tight opacity-0">
          {data.heading.headline}{' '}
          <span className="text-[#1E1E1E]/40 font-normal">{data.headlineAccent}</span>
        </h2>
      </div>

      {/* Main Storytelling Journey Container */}
      <div id="everyday-moments-container" className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Organic SVG Snake Path Overlay */}
        <svg
          id="everyday-snake-svg"
          className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible hidden lg:block"
          preserveAspectRatio="none"
          viewBox="0 0 1200 2400"
        >
          <defs>
            <linearGradient id="dropletGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8A96A" />
              <stop offset="100%" stopColor="#205C3B" />
            </linearGradient>
            <filter id="dropletGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Track Guide Path (Light dashed line) */}
          <path
            id="everyday-snake-track-path"
            d="M 600,0 C 950,250 950,550 600,600 C 250,650 250,1150 600,1200 C 950,1250 950,1750 600,1800 C 250,1850 250,2350 600,2400"
            fill="none"
            stroke="#C8A96A"
            strokeOpacity="0.18"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {/* Animated SVG Path (Progressively draws on scroll) */}
          <path
            id="everyday-snake-drawn-path"
            d="M 600,0 C 950,250 950,550 600,600 C 250,650 250,1150 600,1200 C 950,1250 950,1750 600,1800 C 250,1850 250,2350 600,2400"
            fill="none"
            stroke="#C8A96A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* MotionPath Hydrops Droplet Indicator */}
          <g id="everyday-droplet" className="opacity-0" filter="url(#dropletGlow)">
            <circle r="16" fill="#C8A96A" fillOpacity="0.25" className="animate-ping" />
            <path
              d="M0 -12 C-5 -5, -8 0, -8 5 C-8 9.4, -4.4 13, 0 13 C4.4 13, 8 9.4, 8 5 C8 0, 5 -5, 0 -12 Z"
              fill="url(#dropletGradient)"
            />
            <circle r="3" fill="#FFFFFF" />
          </g>

          {/* Waypoints Along Path */}
          {[
            { cx: 600, cy: 300 },
            { cx: 600, cy: 900 },
            { cx: 600, cy: 1500 },
            { cx: 600, cy: 2100 },
          ].map((wp, idx) => (
            <g key={idx} className="everyday-waypoint" data-step={idx}>
              <circle
                cx={wp.cx}
                cy={wp.cy}
                r="18"
                fill="none"
                stroke="#C8A96A"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                className="waypoint-ring transition-all duration-500"
              />
              <circle
                cx={wp.cx}
                cy={wp.cy}
                r="6"
                fill="#F5F2EC"
                stroke="#C8A96A"
                strokeWidth="2"
                className="waypoint-dot transition-all duration-500"
              />
            </g>
          ))}
        </svg>

        {/* Moments Alternating Layout */}
        <div className="space-y-32 lg:space-y-48 relative z-20">
          {data.moments.map((moment, i) => (
            <div
              key={moment.id}
              className={`everyday-card-item relative w-full flex flex-col ${
                i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-10 lg:gap-16 opacity-0 will-change-[transform,opacity]`}
            >
              {/* Image Box (50%) */}
              <div className="everyday-card-image w-full lg:w-1/2 h-[340px] sm:h-[420px] lg:h-[480px] relative rounded-[2rem] sm:rounded-[2.4rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.14)] group flex-shrink-0">
                <Image
                  src={moment.image.src}
                  alt={moment.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

                {/* Accent Tag */}
                <span className="absolute bottom-6 left-6 text-white/80 text-[11px] tracking-[0.3em] font-medium uppercase bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full">
                  {moment.accent}
                </span>
              </div>

              {/* Content Box (50%) */}
              <div className="everyday-card-content flex-1 max-w-lg flex flex-col justify-center">
                <span className="everyday-card-label text-xs font-semibold tracking-[0.3em] uppercase text-[#C8A96A] mb-4 block font-mono">
                  {moment.label}
                </span>

                <h3 className="everyday-card-headline text-[clamp(2rem,3.5vw,3.2rem)] font-light text-[#1E1E1E] leading-[1.12] tracking-tight mb-6 whitespace-pre-line font-serif opacity-0 filter blur-[8px]">
                  {moment.headline}
                </h3>

                <p className="everyday-card-desc text-[#1E1E1E]/65 font-light text-base sm:text-lg leading-relaxed max-w-[460px] opacity-0">
                  {moment.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionRipple />
    </section>
  );
}
