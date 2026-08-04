import type { BlogHeroData } from '@/features/blog/types';

interface Props {
  data: BlogHeroData;
}

export function BlogHero({ data }: Props) {
  return (
    <section 
      id="blog-hero"
      className="container mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-16"
    >
      <p 
        className="blog-hero-eyebrow font-medium tracking-[0.4em] uppercase text-xs mb-8"
        style={{ color: 'rgba(30,30,30,0.4)' }}
      >
        {data.eyebrow}
      </p>

      <h1 
        className="blog-hero-heading font-light tracking-tight"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: 'rgba(30,30,30,0.85)',
          lineHeight: 1.1,
        }}
      >
        {data.headline}
      </h1>

      <p 
        className="blog-hero-desc mt-6 text-[1.1rem] leading-relaxed max-w-2xl whitespace-pre-wrap"
        style={{ color: 'rgba(30,30,30,0.55)' }}
      >
        {data.description}
      </p>
    </section>
  );
}
