import type { HomePageDocument, HeroDocument, PhilosophyDocument, JourneyDocument, ProductShowcaseDocument, PurityStatementDocument, CraftsmanshipDocument, EverydayDocument, ContactCtaDocument, SoulStatementDocument } from '@/data/types';
// Note: In a real implementation, you would import the generated types from './types' 
// e.g. import { HomePageQueryResult } from './types'
// and use them as the input type here. For now, we use `any` to represent the raw Sanity data.

/**
 * Adapter mapping the raw Sanity HomePage query result perfectly to the expected 
 * local frontend HomePageDocument interface. This guarantees zero UI changes.
 */
export function mapSanityHomeToFrontend(raw: any): HomePageDocument {
  return {
    _id: raw._id || 'home-page',
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

// -- Individual Mappers --

function mapHero(hero: any): HeroDocument {
  return {
    _id: hero?._key || 'home-hero',
    _type: 'hero',
    eyebrow: hero?.eyebrow,
    headline: hero?.headline || '',
    description: hero?.description || '',
    videoUrl: hero?.videoUrl,
    posterUrl: hero?.posterUrl,
    primaryCta: {
      label: hero?.primaryCta?.text || 'Explore Product',
      href: hero?.primaryCta?.route || '#product-showcase',
    },
    secondaryCta: hero?.secondaryCta ? {
      label: hero.secondaryCta.text,
      href: hero.secondaryCta.route,
    } : undefined,
  };
}

function mapSoulStatement(soul: any): SoulStatementDocument {
  return {
    _id: soul?._key || 'home-soul-statement',
    _type: 'soulStatement',
    label: soul?.label || '',
    headline: soul?.headline || '',
    accentHeadline: soul?.accentHeadline || '',
    background: {
      src: soul?.background?.secureUrl || '',
      alt: soul?.background?.alt || '',
      width: soul?.background?.width || 1920,
      height: soul?.background?.height || 1080,
    }
  };
}

function mapPhilosophy(phil: any): PhilosophyDocument {
  return {
    _id: phil?._key || 'home-philosophy',
    _type: 'philosophy',
    persistentPhrase: phil?.persistentPhrase || '',
    chapters: (phil?.chapters || []).map((ch: any) => ({
      lines: ch.lines || [],
      accentLine: ch.accentLine,
    })),
    cta: phil?.cta ? {
      label: phil.cta.text,
      href: phil.cta.route,
    } : undefined,
  };
}

function mapJourney(journey: any): JourneyDocument {
  return {
    _id: journey?._key || 'home-journey',
    _type: 'journeySection',
    ambientImage: {
      src: journey?.ambientImage?.secureUrl || '',
      alt: journey?.ambientImage?.alt || '',
      width: journey?.ambientImage?.width || 1920,
      height: journey?.ambientImage?.height || 1080,
    },
    stages: (journey?.stages || []).map((st: any) => ({
      chapter: st.chapter,
      title: st.title,
      description: st.description,
      mood: st.mood || '',
      image: {
        src: st.image?.secureUrl || '',
        alt: st.image?.alt || '',
        width: st.image?.width || 960,
        height: st.image?.height || 1200,
      }
    })),
  };
}

function mapProductShowcase(prod: any): ProductShowcaseDocument {
  return {
    _id: prod?._key || 'home-product-showcase',
    _type: 'productShowcase',
    label: prod?.label || '',
    headline: prod?.headline || '',
    description: prod?.description || '',
    primaryCta: {
      label: prod?.primaryCta?.text || '',
      href: prod?.primaryCta?.route || '',
    },
    secondaryCta: {
      label: prod?.secondaryCta?.text || '',
      href: prod?.secondaryCta?.route || '',
    },
    productImage: {
      src: prod?.productImage?.secureUrl || '',
      alt: prod?.productImage?.alt || '',
      width: prod?.productImage?.width || 768,
      height: prod?.productImage?.height || 1536,
    },
    floatingAsset: {
      src: prod?.floatingAsset?.secureUrl || '',
      alt: prod?.floatingAsset?.alt || '',
      width: prod?.floatingAsset?.width || 512,
      height: prod?.floatingAsset?.height || 512,
    }
  };
}

function mapPurityStatement(purity: any): PurityStatementDocument {
  return {
    _id: purity?._key || 'home-purity-statement',
    _type: 'purityStatement',
    label: purity?.label || '',
    supportingText: purity?.supportingText || '',
    statements: (purity?.statements || []).map((st: any) => ({
      line: st.line,
      delay: st.delay,
      accent: st.accent,
    })),
  };
}

function mapCraftsmanship(craft: any): CraftsmanshipDocument {
  return {
    _id: craft?._key || 'home-craftsmanship',
    _type: 'craftsmanshipSection',
    heading: {
      eyebrow: craft?.heading?.label,
      headline: craft?.heading?.title || '',
      supportingText: craft?.heading?.subtitle,
    },
    steps: (craft?.steps || []).map((st: any) => ({
      step: st.step,
      title: st.title,
      headline: st.headline,
      description: st.description,
      image: {
        src: st.image?.secureUrl || '',
        alt: st.image?.alt || '',
        width: st.image?.width || 960,
        height: st.image?.height || 1200,
      }
    })),
  };
}

function mapEveryday(everyday: any): EverydayDocument {
  return {
    _id: everyday?._key || 'home-everyday',
    _type: 'everydaySection',
    heading: {
      eyebrow: everyday?.heading?.label,
      headline: everyday?.heading?.title || '',
    },
    headlineAccent: everyday?.headlineAccent || '',
    moments: (everyday?.moments || []).map((m: any) => ({
      id: m.id,
      label: m.label,
      headline: m.headline,
      description: m.description,
      accent: m.accent || '',
      image: {
        src: m.image?.secureUrl || '',
        alt: m.image?.alt || '',
        width: m.image?.width || 1200,
        height: m.image?.height || 900,
      }
    })),
  };
}

function mapContactCta(contact: any): ContactCtaDocument {
  return {
    _id: contact?._key || 'home-contact-cta',
    _type: 'contactCta',
    label: contact?.label || '',
    headline: contact?.headline || '',
    accentHeadline: contact?.accentHeadline || '',
    description: contact?.description || '',
    tagline: contact?.tagline || '',
    primaryCta: {
      label: contact?.primaryCta?.text || '',
      href: contact?.primaryCta?.route || '',
    },
    secondaryCta: {
      label: contact?.secondaryCta?.text || '',
      href: contact?.secondaryCta?.route || '',
    },
    backgroundImage: {
      src: contact?.backgroundImage?.secureUrl || '',
      alt: contact?.backgroundImage?.alt || '',
      width: contact?.backgroundImage?.width || 1920,
      height: contact?.backgroundImage?.height || 1080,
    }
  };
}
