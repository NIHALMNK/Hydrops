import Image from 'next/image';
import type { BrandStoryData } from '@/features/about/types';

interface Props {
  data: BrandStoryData;
}

/**
 * BrandStory — three timeline chapters on a dark canvas.
 * Each chapter has a year/location marker, a heading, and a body paragraph.
 * Image: philosophy-coconut.png as an editorial full-bleed aside.
 */
export function BrandStory({ data }: Props) {
  return (
    <section
      id="about-story"
      aria-labelledby="story-heading"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Gold thread — top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.45), transparent)',
        }}
      />

      <div className="container mx-auto px-8 md:px-16 lg:px-24 py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left — editorial image column */}
          <div className="lg:w-5/12">
            <div
              className="relative w-full aspect-[3/4] rounded-[1.5rem] overflow-hidden"
              style={{ boxShadow: '0 48px 96px -24px rgba(0,0,0,0.5)' }}
            >
              <Image
                src="/images/brand/philosophy-coconut.png"
                alt="Coconuts from Kerala, the source of Hydrops pure coconut oil"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                loading="lazy"
              />
              {/* Vignette */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[1.5rem]"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 55%, rgba(10,10,10,0.55))',
                }}
              />
              {/* Caption */}
              <p
                className="absolute bottom-6 left-6 text-white/40"
                style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}
              >
                Kerala · India
              </p>
            </div>
          </div>

          {/* Right — story chapters */}
          <div className="lg:w-7/12 flex flex-col justify-center">
            {/* Section heading */}
            <p
              className="text-[#C8A96A] font-medium uppercase mb-8"
              style={{ fontSize: '11px', letterSpacing: '0.4em' }}
            >
              {data.eyebrow}
            </p>
            <h2
              id="story-heading"
              className="font-light text-white mb-16 text-balance"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
                whiteSpace: 'pre-line',
              }}
            >
              {data.headline}
            </h2>

            {/* Timeline chapters */}
            <ol className="flex flex-col gap-12">
              {data.chapters.map((chapter, i) => (
                <li
                  key={i}
                  className="flex gap-8"
                >
                  {/* Year / marker */}
                  <div className="flex flex-col items-center gap-3 shrink-0">
                    <span
                      className="text-[#C8A96A] font-medium"
                      style={{ fontSize: '11px', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}
                    >
                      {chapter.year}
                    </span>
                    {i < data.chapters.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="flex-1 w-px"
                        style={{
                          background:
                            'linear-gradient(to bottom, rgba(200,169,106,0.3), transparent)',
                          minHeight: 40,
                        }}
                      />
                    )}
                  </div>

                  {/* Chapter content */}
                  <div className="pb-2">
                    <h3
                      className="font-light text-white mb-4"
                      style={{
                        fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.005em',
                      }}
                    >
                      {chapter.heading}
                    </h3>
                    <p
                      className="text-white/45 font-light leading-relaxed"
                      style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}
                    >
                      {chapter.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>

      {/* Gold thread — bottom */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-full h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(200,169,106,0.35), transparent)',
        }}
      />
    </section>
  );
}
