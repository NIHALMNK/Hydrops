// ── About page type definitions ─────────────────────────────────────────────

export interface AboutHeroData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  tagline: string;
}

export interface BrandIntroductionData {
  eyebrow: string;
  headline: string;
  body: string[];
  stat: { value: string; label: string };
}

export interface BrandStoryChapter {
  year: string;
  heading: string;
  body: string;
}

export interface BrandStoryData {
  eyebrow: string;
  headline: string;
  chapters: BrandStoryChapter[];
}

export interface MissionVisionData {
  mission: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  vision: {
    eyebrow: string;
    headline: string;
    body: string;
  };
}

export interface CoreValue {
  number: string;
  title: string;
  body: string;
}

export interface CoreValuesData {
  eyebrow: string;
  headline: string;
  values: CoreValue[];
}

export interface ManufacturingStage {
  step: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
}

export interface ManufacturingPhilosophyData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  stages: ManufacturingStage[];
}

export interface QualityPillar {
  label: string;
  headline: string;
  body: string;
}

export interface QualityCommitmentData {
  eyebrow: string;
  headline: string;
  body: string;
  pillars: QualityPillar[];
  seal: string;
}

export interface WhyItem {
  number: string;
  title: string;
  body: string;
}

export interface WhyChooseData {
  eyebrow: string;
  headline: string;
  items: WhyItem[];
}

export interface CompanyInfoData {
  eyebrow: string;
  headline: string;
  legalName: string;
  foundedLabel: string;
  foundedValue: string;
  originLabel: string;
  originValue: string;
  contactLabel: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
  };
  certifications: string[];
}

export interface AboutCTAData {
  eyebrow: string;
  headline: string;
  subheadline: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  tagline: string;
}

export interface AboutPageData {
  hero: AboutHeroData;
  introduction: BrandIntroductionData;
  story: BrandStoryData;
  missionVision: MissionVisionData;
  coreValues: CoreValuesData;
  manufacturing: ManufacturingPhilosophyData;
  quality: QualityCommitmentData;
  whyChoose: WhyChooseData;
  companyInfo: CompanyInfoData;
  cta: AboutCTAData;
}
