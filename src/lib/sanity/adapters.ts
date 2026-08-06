import type {
  HomePageDocument,
  HeroDocument,
  PhilosophyDocument,
  JourneyDocument,
  ProductShowcaseDocument,
  PurityStatementDocument,
  CraftsmanshipDocument,
  EverydayDocument,
  ContactCtaDocument,
  SoulStatementDocument,
  ImageAsset,
  CTA,
} from '@/data/types';

import type {
  SanityRawHomePage,
  SanityRawHero,
  SanityRawSoulStatement,
  SanityRawPhilosophy,
  SanityRawPhilosophyChapter,
  SanityRawJourney,
  SanityRawJourneyStage,
  SanityRawProductShowcase,
  SanityRawPurityStatement,
  SanityRawCraftsmanship,
  SanityRawCraftStep,
  SanityRawEveryday,
  SanityRawEverydayMoment,
  SanityRawContactCta,
  SanityCloudinaryImage,
  SanityButton,
  SanityRawAboutPage,
  SanityRawAboutStoryChapter,
  SanityRawAboutValueItem,
  SanityRawManufacturingStage,
  SanityRawCommitmentPillar,
  SanityRawWhyItem,
  SanityRawContactPage,
} from './sanity.raw.types';

import type { AboutPageData } from '@/features/about/types';
import type { ContactPageData } from '@/features/contact/types';
import { fallbackContactPageData } from '@/data/contact/contact-page';

// ── Shared Primitive Mappers ──────────────────────────────────────────────────

function mapImage(
  raw: SanityCloudinaryImage | undefined,
  fallbackWidth = 1920,
  fallbackHeight = 1080,
): ImageAsset {
  return {
    src: raw?.secureUrl ?? '',
    alt: raw?.alt ?? '',
    width: raw?.width ?? fallbackWidth,
    height: raw?.height ?? fallbackHeight,
  };
}

function mapCta(raw: SanityButton | undefined): CTA {
  return {
    label: raw?.text ?? '',
    href: raw?.route ?? '',
  };
}

function mapOptionalCta(raw: SanityButton | undefined): CTA | undefined {
  if (!raw) return undefined;
  return { label: raw.text ?? '', href: raw.route ?? '' };
}

// ── Home Page Adapter ─────────────────────────────────────────────────────────

/**
 * Adapter mapping the raw Sanity HomePage query result perfectly to the expected
 * local frontend HomePageDocument interface. This guarantees zero UI changes.
 */
export function mapSanityHomeToFrontend(raw: SanityRawHomePage): HomePageDocument {
  return {
    _id: 'home-page',
    _type: 'homePage',
    hero: mapHero(raw.hero),
    soulStatement: mapSoulStatement(raw.soulStatement),
    philosophy: mapPhilosophy(raw.philosophy),
    journey: mapJourney(raw.journey),
    productShowcase: mapProductShowcase(raw.productShowcase),
    purityStatement: mapPurityStatement(raw.purityStatement),
    craftsmanship: mapCraftsmanship(raw.craftsmanship),
    everyday: mapEveryday(raw.everyday),
    contactCta: mapContactCta(raw.contactCta),
  };
}

// ── Individual Home Mappers ───────────────────────────────────────────────────

function mapHero(hero: SanityRawHero | undefined): HeroDocument {
  return {
    _id: 'home-hero',
    _type: 'hero',
    eyebrow: hero?.eyebrow,
    headline: hero?.headline ?? '',
    description: hero?.description ?? '',
    videoUrl: hero?.videoUrl,
    posterUrl: hero?.posterUrl,
    primaryCta: {
      label: hero?.primaryCta?.text ?? 'Explore Product',
      href: hero?.primaryCta?.route ?? '#product-showcase',
    },
    secondaryCta: mapOptionalCta(hero?.secondaryCta),
  };
}

function mapSoulStatement(soul: SanityRawSoulStatement | undefined): SoulStatementDocument {
  return {
    _id: 'home-soul-statement',
    _type: 'soulStatement',
    label: soul?.label ?? '',
    headline: soul?.headline ?? '',
    accentHeadline: soul?.accentHeadline ?? '',
    background: mapImage(soul?.background),
  };
}

function mapPhilosophyChapter(ch: SanityRawPhilosophyChapter): PhilosophyDocument['chapters'][number] {
  return {
    lines: ch.lines ?? [],
    accentLine: ch.accentLine,
  };
}

function mapPhilosophy(phil: SanityRawPhilosophy | undefined): PhilosophyDocument {
  return {
    _id: 'home-philosophy',
    _type: 'philosophy',
    persistentPhrase: phil?.persistentPhrase ?? '',
    chapters: (phil?.chapters ?? []).map(mapPhilosophyChapter),
    cta: mapOptionalCta(phil?.cta),
  };
}

function mapJourneyStage(st: SanityRawJourneyStage): JourneyDocument['stages'][number] {
  return {
    chapter: st.chapter ?? '',
    title: st.title ?? '',
    description: st.description ?? '',
    mood: st.mood ?? '',
    image: mapImage(st.image, 960, 1200),
  };
}

function mapJourney(journey: SanityRawJourney | undefined): JourneyDocument {
  return {
    _id: 'home-journey',
    _type: 'journeySection',
    ambientImage: mapImage(journey?.ambientImage),
    stages: (journey?.stages ?? []).map(mapJourneyStage),
  };
}

function mapProductShowcase(prod: SanityRawProductShowcase | undefined): ProductShowcaseDocument {
  return {
    _id: 'home-product-showcase',
    _type: 'productShowcase',
    label: prod?.label ?? '',
    headline: prod?.headline ?? '',
    description: prod?.description ?? '',
    primaryCta: mapCta(prod?.primaryCta),
    secondaryCta: mapCta(prod?.secondaryCta),
    productImage: mapImage(prod?.productImage, 768, 1536),
    floatingAsset: mapImage(prod?.floatingAsset, 512, 512),
  };
}

function mapPurityStatement(purity: SanityRawPurityStatement | undefined): PurityStatementDocument {
  return {
    _id: 'home-purity-statement',
    _type: 'purityStatement',
    label: purity?.label ?? '',
    supportingText: purity?.supportingText ?? '',
    statements: (purity?.statements ?? []).map((st) => ({
      line: st.line ?? '',
      delay: st.delay ?? 0,
      accent: st.accent,
    })),
  };
}

function mapCraftStep(st: SanityRawCraftStep): CraftsmanshipDocument['steps'][number] {
  return {
    step: st.step ?? '',
    title: st.title ?? '',
    headline: st.headline ?? '',
    description: st.description ?? '',
    image: mapImage(st.image, 960, 1200),
  };
}

function mapCraftsmanship(craft: SanityRawCraftsmanship | undefined): CraftsmanshipDocument {
  return {
    _id: 'home-craftsmanship',
    _type: 'craftsmanshipSection',
    heading: {
      eyebrow: craft?.heading?.label,
      headline: craft?.heading?.title ?? '',
      supportingText: craft?.heading?.subtitle,
    },
    steps: (craft?.steps ?? []).map(mapCraftStep),
  };
}

function mapEverydayMoment(m: SanityRawEverydayMoment): EverydayDocument['moments'][number] {
  return {
    id: m.id ?? '',
    label: m.label ?? '',
    headline: m.headline ?? '',
    description: m.description ?? '',
    accent: m.accent ?? '',
    image: mapImage(m.image, 1200, 900),
  };
}

function mapEveryday(everyday: SanityRawEveryday | undefined): EverydayDocument {
  return {
    _id: 'home-everyday',
    _type: 'everydaySection',
    heading: {
      eyebrow: everyday?.heading?.label,
      headline: everyday?.heading?.title ?? '',
    },
    headlineAccent: everyday?.headlineAccent ?? '',
    moments: (everyday?.moments ?? []).map(mapEverydayMoment),
  };
}

function mapContactCta(contact: SanityRawContactCta | undefined): ContactCtaDocument {
  return {
    _id: 'home-contact-cta',
    _type: 'contactCta',
    label: contact?.label ?? '',
    headline: contact?.headline ?? '',
    accentHeadline: contact?.accentHeadline ?? '',
    description: contact?.description ?? '',
    tagline: contact?.tagline ?? '',
    primaryCta: mapCta(contact?.primaryCta),
    secondaryCta: mapCta(contact?.secondaryCta),
    backgroundImage: mapImage(contact?.backgroundImage),
  };
}

// ── About Page Adapter ────────────────────────────────────────────────────────

export function mapSanityAboutToFrontend(raw: SanityRawAboutPage): AboutPageData {
  return {
    hero: {
      eyebrow: raw.hero?.eyebrow ?? '',
      headline: raw.hero?.headline ?? '',
      subheadline: raw.hero?.subheadline ?? '',
      tagline: raw.hero?.tagline ?? '',
    },
    introduction: {
      eyebrow: raw.introduction?.eyebrow ?? '',
      headline: raw.introduction?.headline ?? '',
      body: raw.introduction?.body ?? [],
      stat: {
        value: raw.introduction?.stat?.value ?? '',
        label: raw.introduction?.stat?.label ?? '',
      },
    },
    story: {
      eyebrow: raw.story?.eyebrow ?? '',
      headline: raw.story?.headline ?? '',
      image: mapImage(raw.story?.image, 1200, 1600),
      imageCaption: raw.story?.imageCaption ?? '',
      chapters: (raw.story?.chapters ?? []).map((ch: SanityRawAboutStoryChapter) => ({
        year: ch.year ?? '',
        heading: ch.heading ?? '',
        body: ch.body ?? '',
      })),
    },
    missionVision: {
      mission: {
        eyebrow: raw.mission?.eyebrow ?? '',
        headline: raw.mission?.headline ?? '',
        body: raw.mission?.body ?? '',
      },
      vision: {
        eyebrow: raw.vision?.eyebrow ?? '',
        headline: raw.vision?.headline ?? '',
        body: raw.vision?.body ?? '',
      },
    },
    coreValues: {
      eyebrow: raw.coreValues?.eyebrow ?? '',
      headline: raw.coreValues?.headline ?? '',
      values: (raw.coreValues?.items ?? []).map((v: SanityRawAboutValueItem) => ({
        number: v.number ?? '',
        title: v.title ?? '',
        body: v.body ?? '',
      })),
    },
    manufacturing: {
      eyebrow: raw.manufacturing?.eyebrow ?? '',
      headline: raw.manufacturing?.headline ?? '',
      subheadline: raw.manufacturing?.subheadline ?? '',
      stages: (raw.manufacturing?.stages ?? []).map((st: SanityRawManufacturingStage) => ({
        step: st.step ?? '',
        title: st.title ?? '',
        body: st.body ?? '',
        image: mapImage(st.image, 960, 1200),
      })),
    },
    quality: {
      eyebrow: raw.quality?.eyebrow ?? '',
      headline: raw.quality?.headline ?? '',
      body: raw.quality?.body ?? '',
      pillars: (raw.quality?.pillars ?? []).map((p: SanityRawCommitmentPillar) => ({
        label: p.label ?? '',
        headline: p.headline ?? '',
        body: p.body ?? '',
      })),
      seal: typeof raw.quality?.seal === 'string' ? raw.quality.seal : (raw.quality?.seal?.title ?? ''),
    },
    whyChoose: {
      eyebrow: raw.whyChoose?.eyebrow ?? '',
      headline: raw.whyChoose?.headline ?? '',
      items: (raw.whyChoose?.items ?? []).map((i: SanityRawWhyItem) => ({
        number: i.number ?? '',
        title: i.title ?? '',
        body: i.body ?? '',
      })),
    },
    companyInfo: {
      eyebrow: raw.companyInfo?.eyebrow ?? '',
      heading: raw.companyInfo?.heading ?? '',
      description: raw.companyInfo?.description ?? '',
      companyName: raw.companyInfo?.companyName ?? '',
      legalName: raw.companyInfo?.legalName ?? '',
      founded: raw.companyInfo?.founded ?? '',
      origin: raw.companyInfo?.origin ?? '',
      email: raw.companyInfo?.email ?? '',
      phone: raw.companyInfo?.phone ?? '',
      address: {
        line1: raw.companyInfo?.address?.line1 ?? '',
        line2: raw.companyInfo?.address?.line2 ?? '',
        line3: raw.companyInfo?.address?.line3 ?? '',
      },
      coordinates: raw.companyInfo?.coordinates ?? '',
      mapUrl: raw.companyInfo?.mapUrl ?? '',
      businessHours: raw.companyInfo?.businessHours ?? '',
      certifications: raw.companyInfo?.certifications ?? [],
      primaryCta: {
        label: raw.companyInfo?.primaryCta?.text ?? '',
        href: raw.companyInfo?.primaryCta?.route ?? '',
      },
      secondaryCta: {
        label: raw.companyInfo?.secondaryCta?.text ?? '',
        href: raw.companyInfo?.secondaryCta?.route ?? '',
      },
    },
  };
}

// ── Contact Page Adapter ──────────────────────────────────────────────────────

export function mapSanityContactToFrontend(raw: SanityRawContactPage | undefined | null): ContactPageData {
  if (!raw) return fallbackContactPageData;

  return {
    hero: {
      eyebrow: raw.eyebrow ?? fallbackContactPageData.hero.eyebrow,
      heading: raw.heading ?? fallbackContactPageData.hero.heading,
      highlightedWord: raw.highlightedWord ?? fallbackContactPageData.hero.highlightedWord,
      description: raw.description ?? fallbackContactPageData.hero.description,
      backgroundImage: raw.backgroundImage ? mapImage(raw.backgroundImage) : undefined,
    },
    cards: {
      phone: {
        title: raw.phoneTitle ?? fallbackContactPageData.cards.phone.title,
        phoneNumbers: raw.phoneNumbers && raw.phoneNumbers.length > 0 ? raw.phoneNumbers : fallbackContactPageData.cards.phone.phoneNumbers,
      },
      whatsapp: {
        title: raw.whatsappTitle ?? fallbackContactPageData.cards.whatsapp.title,
        buttonText: raw.whatsappButtonText ?? fallbackContactPageData.cards.whatsapp.buttonText,
        whatsappNumber: raw.whatsappNumber ?? fallbackContactPageData.cards.whatsapp.whatsappNumber,
      },
      location: {
        title: raw.locationTitle ?? fallbackContactPageData.cards.location.title,
        address: raw.locationAddress ?? fallbackContactPageData.cards.location.address,
        googleMapsUrl: raw.googleMapsUrl ?? fallbackContactPageData.cards.location.googleMapsUrl,
      },
      businessHours: {
        title: raw.hoursTitle ?? fallbackContactPageData.cards.businessHours.title,
        workingHours: raw.workingHours ?? fallbackContactPageData.cards.businessHours.workingHours,
      },
    },
    formContent: {
      sectionTitle: raw.formSectionTitle ?? fallbackContactPageData.formContent.sectionTitle,
      heading: raw.formHeading ?? fallbackContactPageData.formContent.heading,
      description: raw.formDescription ?? fallbackContactPageData.formContent.description,
      submitButtonText: raw.submitButtonText ?? fallbackContactPageData.formContent.submitButtonText,
      successMessage: raw.successMessage ?? fallbackContactPageData.formContent.successMessage,
      errorMessage: raw.errorMessage ?? fallbackContactPageData.formContent.errorMessage,
      labels: {
        fullName: raw.fullNameLabel ?? fallbackContactPageData.formContent.labels.fullName,
        email: raw.emailLabel ?? fallbackContactPageData.formContent.labels.email,
        phone: raw.phoneLabel ?? fallbackContactPageData.formContent.labels.phone,
        subject: raw.subjectLabel ?? fallbackContactPageData.formContent.labels.subject,
        message: raw.messageLabel ?? fallbackContactPageData.formContent.labels.message,
      },
      placeholders: {
        fullName: raw.fullNamePlaceholder ?? fallbackContactPageData.formContent.placeholders.fullName,
        email: raw.emailPlaceholder ?? fallbackContactPageData.formContent.placeholders.email,
        phone: raw.phonePlaceholder ?? fallbackContactPageData.formContent.placeholders.phone,
        subject: raw.subjectPlaceholder ?? fallbackContactPageData.formContent.placeholders.subject,
        message: raw.messagePlaceholder ?? fallbackContactPageData.formContent.placeholders.message,
      },
    },
    map: {
      googleMapsUrl: raw.googleMapsUrl ?? fallbackContactPageData.map.googleMapsUrl,
      mapEmbedUrl: raw.mapEmbedUrl,
    },
    cta: {
      title: raw.ctaTitle ?? fallbackContactPageData.cta.title,
      description: raw.ctaDescription ?? fallbackContactPageData.cta.description,
      buttons: raw.ctaButtons && raw.ctaButtons.length > 0
        ? raw.ctaButtons.map((b) => ({
            type: b.type ?? 'call',
            label: b.label ?? 'Contact Us',
            url: b.url ?? 'tel:+917012123505',
          }))
        : fallbackContactPageData.cta.buttons,
    },
  };
}

