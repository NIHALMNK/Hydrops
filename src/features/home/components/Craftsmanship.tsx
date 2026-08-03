import Image from 'next/image';
import { SectionRipple } from './SectionRipple';
import type { CraftsmanshipDocument } from '@/types';

/**
 * Craftsmanship – Luxury Editorial Process Storytelling Section.
 * Features a centered 100vh pinned viewport (#craft-pinned-viewport) where every active
 * chapter card remains visually centered throughout the stacked scrolling sequence.
 */
interface Props { data: CraftsmanshipDocument; }

export function Craftsmanship({ data }: Props) {
  return (
    <section
      id="craftsmanship-section"
      className="relative w-full bg-[#F5F2EC] overflow-hidden select-none"
    >
      {/* Ambient warm radial lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(200,169,106,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Section Header — Scrolls into view naturally before card pinning begins */}
      <div className="text-center max-w-3xl mx-auto px-6 pt-24 pb-12 lg:pt-32 lg:pb-16">
        <p className="craft-label text-xs sm:text-sm font-medium tracking-[0.35em] uppercase text-[#C8A96A] mb-4 opacity-0">
          {data.heading.eyebrow}
        </p>
        <h2 className="craft-headline text-[clamp(2.5rem,5.5vw,4.5rem)] font-light text-[#1E1E1E] leading-[1.1] tracking-tight opacity-0">
          {data.heading.headline}{' '}
          <span className="text-[#205C3B] italic font-normal">{data.heading.supportingText}</span>
        </h2>
      </div>

      {/* 100vh Pinned Viewport Container (Ensures visual centering of active cards) */}
      <div id="craft-pinned-viewport" className="relative w-full lg:h-[calc(100vh-80px)] flex items-center justify-center">
        {/* Editorial Process Chapter Blocks Container */}
        <div
          id="craft-cards-stack-container"
          className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative h-auto lg:h-[500px] flex items-center justify-center"
        >
          {data.steps.map((step, i) => (
            <div
              key={i}
              className="craft-step-card relative lg:absolute lg:inset-x-6 w-full mb-16 lg:mb-0 opacity-100 lg:opacity-0 will-change-[transform,opacity]"
              style={{ zIndex: (i + 1) * 10 }}
            >
              {/* Luxury Editorial Card Container */}
              <div
                className={`bg-[#FAF8F5] border border-[#1E1E1E]/8 rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-12 lg:p-14 shadow-[0_20px_60px_-15px_rgba(30,30,30,0.05)] relative overflow-hidden flex flex-col ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-10 lg:gap-16`}
              >
                {/* Background Watermark Step Number */}
                <span className="absolute -bottom-8 -left-4 text-[12rem] lg:text-[16rem] font-bold text-[#1E1E1E]/[0.03] select-none pointer-events-none font-serif leading-none">
                  0{i + 1}
                </span>

                {/* Content Side */}
                <div className="craft-content-box flex-1 flex flex-col justify-center relative z-10 max-w-lg">
                  {/* Nature Badge Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#1E1E1E]/15 flex items-center justify-center mb-8 bg-[#F5F2EC]/80 backdrop-blur-sm shadow-sm">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                        stroke="#205C3B"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M7 15C7 10.5 10.5 7 15 7M15 7V12M15 7H10"
                        stroke="#C8A96A"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Step Label */}
                  <span className="craft-step-label text-xs font-semibold tracking-[0.3em] uppercase text-[#C8A96A] mb-3 block font-mono">
                    STEP {step.step}
                  </span>

                  {/* Luxury Heading */}
                  <h3 className="craft-step-headline text-[clamp(2rem,3.5vw,3.2rem)] font-light text-[#1E1E1E] leading-[1.12] tracking-tight mb-6 whitespace-pre-line font-serif">
                    {step.headline}
                  </h3>

                  {/* Paragraph Description */}
                  <p className="craft-step-desc text-[#1E1E1E]/65 font-light text-base sm:text-lg leading-relaxed max-w-[460px]">
                    {step.description}
                  </p>
                </div>

                {/* Large Image Box */}
                <div className="craft-image-box w-full lg:w-[480px] xl:w-[540px] h-[340px] sm:h-[420px] lg:h-[460px] relative rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex-shrink-0 group z-10">
                  <Image
                    src={step.image.src}
                    alt={step.image.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 540px"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Bottom Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                  {/* Top Corner Watermark Tag */}
                  <span className="absolute top-6 left-6 text-white/70 text-[10px] tracking-[0.3em] font-medium uppercase bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                    {step.step} / {step.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SectionRipple />
    </section>
  );
}
