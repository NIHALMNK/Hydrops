import Image from 'next/image';
import type { ContactHeroData } from '../types';

interface Props {
  data: ContactHeroData;
}

export function ContactHero({ data }: Props) {
  // Helper to split heading and apply gold accent styling to highlightedWord
  const renderHeading = () => {
    if (!data.highlightedWord || !data.heading.includes(data.highlightedWord)) {
      return data.heading;
    }
    const parts = data.heading.split(data.highlightedWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#C8A96A] italic font-normal">{data.highlightedWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="relative w-full pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Background image atmosphere if available */}
      {data.backgroundImage?.src && (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <Image
            src={data.backgroundImage.src}
            alt={data.backgroundImage.alt || ''}
            fill
            className="object-cover opacity-10 blur-xl"
            sizes="100vw"
            priority
          />
        </div>
      )}

      {/* Hero content container */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {data.eyebrow && (
          <span className="inline-block text-[11px] sm:text-xs font-medium tracking-[0.35em] text-[#C8A96A] uppercase mb-4 sm:mb-6">
            {data.eyebrow}
          </span>
        )}

        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-light font-serif text-[#1A1A1A] leading-[1.08] tracking-tight mb-6 sm:mb-8">
          {renderHeading()}
        </h1>

        <p className="text-base sm:text-lg font-light text-[#1A1A1A]/70 max-w-2xl mx-auto leading-relaxed">
          {data.description}
        </p>

        {/* Delicate decorative gold divider */}
        <div className="w-16 h-[1px] bg-[#C8A96A]/40 mx-auto mt-10 sm:mt-12" />
      </div>
    </section>
  );
}
