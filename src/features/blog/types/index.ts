// ── Blog page type definitions ──────────────────────────────────────────────

export interface BlogHeroData {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
}

export interface TopicCard {
  title: string;
}

export interface TopicPreviewData {
  headline: string;
  topics: TopicCard[];
}

export interface BlogPageData {
  hero: BlogHeroData;
  topics: TopicPreviewData;
}
