import type { BlogSettings } from '@/features/blog/types';

interface Props {
  settings: BlogSettings;
  articleCount?: number;
  categoryCount?: number;
}

export function BlogJournalHero({ settings, articleCount = 6, categoryCount = 5 }: Props) {
  return (
    <section className="relative pt-16 pb-10 md:pt-24 md:pb-14 px-6 md:px-12 max-w-7xl mx-auto text-left">
      {/* Top Metadata Row */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          {settings.journalEyebrow || 'HYDROPS JOURNAL'}
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
          <span>·</span>
          <span>{articleCount} Stories</span>
          <span>·</span>
          <span>{categoryCount} Topics</span>
          <span>·</span>
          <span className="text-neutral-500">Updated weekly</span>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 leading-[1.1] mb-6">
        {settings.journalTagline || 'Stories of purity, health, and craft.'}
      </h1>

      {/* Editorial Subtitle */}
      <p className="text-base md:text-xl font-normal text-neutral-600 max-w-3xl leading-relaxed">
        Insights into pure hydration, coconut science, wellness practices, and the craftsmanship behind every bottle.
      </p>
    </section>
  );
}
