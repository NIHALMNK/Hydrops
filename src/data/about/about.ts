import type { AboutPageData } from '@/features/about/types';

/**
 * All About page content lives here.
 * Components consume this data — no business content is hardcoded inside JSX.
 *
 * Images reference existing assets under /public/images/.
 * Entries marked [PLACEHOLDER] require a real asset before launch.
 */
export const aboutData: AboutPageData = {

  // ── 1. Hero ───────────────────────────────────────────────────────────────
  hero: {
    eyebrow: 'Our Story',
    headline: 'Born from the\ngroves of India.',
    subheadline: 'Pure. Considered. Uncompromising.',
    tagline: 'Hydrops · Pure Coconut Oil · India',
  },

  // ── 2. Brand Introduction ─────────────────────────────────────────────────
  introduction: {
    eyebrow: 'Who We Are',
    headline: 'A company built around a single belief — that purity is never an accident.',
    body: [
      'Hydrops was founded with one guiding conviction: that the people of India deserve a coconut oil that is genuinely, verifiably pure. Not just marketed as natural. Actually pure.',
      'Every decision we make — from the grove we source from, to the filtration stages we run, to the seal we apply — is guided by that single standard. We do not compromise on it, ever.',
    ],
    stat: {
      value: '2×',
      label: 'Double filtered for crystal-clear purity',
    },
  },

  // ── 3. Brand Story ────────────────────────────────────────────────────────
  story: {
    eyebrow: 'The Journey',
    headline: 'A story rooted\nin the coconut.',
    chapters: [
      {
        year: '2024',
        heading: 'The Beginning',
        body: 'Hydrops was founded in Bangalore with a simple observation: most coconut oils on the market made promises they could not keep. We set out to build something different — a brand where purity is a provable standard, not a marketing claim.',
      },
      {
        year: 'Kerala',
        heading: 'The Source',
        body: 'We traced our supply back to the coconut groves of Kerala, where centuries of agricultural knowledge produce some of the finest coconuts in the world. We built direct relationships with growers who share our commitment to quality from the very first step.',
      },
      {
        year: 'Today',
        heading: 'The Standard',
        body: 'Every bottle of Hydrops is the result of a process that has been tested, refined, and held to the highest standards. Our double-filtration process removes every impurity while preserving the natural goodness of the coconut — nothing less is acceptable.',
      },
    ],
  },

  // ── 4. Mission & Vision ───────────────────────────────────────────────────
  missionVision: {
    mission: {
      eyebrow: 'Mission',
      headline: 'To make genuine purity accessible to every Indian household.',
      body: 'We believe that uncompromising quality should not be a luxury. Our mission is to produce the purest coconut oil in India and to make it available to every family, at every table, without compromise on standards or integrity.',
    },
    vision: {
      eyebrow: 'Vision',
      headline: 'To become India\'s most trusted name in pure coconut oil.',
      body: 'We envision a future where Hydrops is synonymous with purity — where every household that opens a bottle of Hydrops does so with complete confidence in what they are using. Trust, built one bottle at a time.',
    },
  },

  // ── 5. Core Values ────────────────────────────────────────────────────────
  coreValues: {
    eyebrow: 'What We Stand For',
    headline: 'Values we live by\nand work by.',
    values: [
      {
        number: '01',
        title: 'Uncompromising Purity',
        body: 'We do not take shortcuts in our process. Double filtration is not optional — it is our baseline. Every drop that leaves our facility has passed through both stages, every time.',
      },
      {
        number: '02',
        title: 'Honest Transparency',
        body: 'We make no claims we cannot support. Every ingredient, every process stage, every quality standard is documented and available. We believe you have the right to know exactly what is in your bottle.',
      },
      {
        number: '03',
        title: 'Respect for Tradition',
        body: 'Coconut oil has been a cornerstone of Indian kitchens for generations. We honour that tradition by refusing to dilute or adulterate our oil, and by preserving the natural profile that generations have trusted.',
      },
      {
        number: '04',
        title: 'Responsible Sourcing',
        body: 'We source directly from growers in Kerala who practice sustainable agriculture. We pay fair prices, build long-term partnerships, and ensure the communities at the beginning of our supply chain benefit from what we produce.',
      },
      {
        number: '05',
        title: 'Continuous Improvement',
        body: 'Purity has no ceiling. We constantly evaluate our process, our equipment, and our standards to find new ways to raise the quality of every bottle we produce.',
      },
      {
        number: '06',
        title: 'Customer First',
        body: 'The family at the end of our supply chain is our ultimate judge. Every decision we make is weighed against one question: does this serve them better?',
      },
    ],
  },

  // ── 6. Manufacturing Philosophy ───────────────────────────────────────────
  manufacturing: {
    eyebrow: 'How We Make It',
    headline: 'Every step.\nDeliberate.',
    subheadline: 'Our process is not automated away from human judgment. At every critical stage, trained eyes and hands ensure that what we produce meets the Hydrops standard.',
    stages: [
      {
        step: '01',
        title: 'Selection',
        body: 'Only fully ripened coconuts are accepted. Each batch is assessed for density, moisture content, and visual quality before it enters our process. Nothing sub-standard enters.',
        image: '/images/quality/craft-inspect.png',
        imageAlt: 'Hand carefully inspecting a fresh coconut for quality and maturity',
      },
      {
        step: '02',
        title: 'Extraction',
        body: 'We use a cold-extraction method that preserves the natural fatty acid profile and aroma of the coconut without the application of heat. The oil emerges as nature intended it.',
        image: '/images/journey/4-selection.png',
        imageAlt: 'Careful selection and extraction process in natural light',
      },
      {
        step: '03',
        title: 'First Filtration',
        body: 'The first pass removes macro-impurities — solids, particulates, and any matter that does not belong in the oil. The result is noticeably cleaner, but not yet Hydrops.',
        image: '/images/quality/craft-filter.png',
        imageAlt: 'Crystal-clear coconut oil undergoing first filtration stage',
      },
      {
        step: '04',
        title: 'Second Filtration',
        body: 'The second pass targets microscopic particles that survive the first stage. After this filtration, the oil achieves the crystal clarity that defines Hydrops. This is the step that separates us.',
        image: '/images/quality/craft-bottle.png',
        imageAlt: 'Premium Hydrops bottle with crystal-clear oil on a dark surface',
      },
    ],
  },

  // ── 7. Quality Commitment ─────────────────────────────────────────────────
  quality: {
    eyebrow: 'Our Commitment',
    headline: 'Quality is not a destination.\nIt is our daily practice.',
    body: 'We do not inspect quality at the end of the line. We build it into every step of the process. By the time oil reaches a Hydrops bottle, it has been evaluated at multiple points by people who are personally accountable for what they pass through.',
    pillars: [
      {
        label: 'Sourcing',
        headline: 'Only Kerala-origin coconuts',
        body: 'We source exclusively from established coconut groves in Kerala, known for producing the highest-quality coconuts in India.',
      },
      {
        label: 'Process',
        headline: 'Double filtration, every batch',
        body: 'No batch bypasses our two-stage filtration. It is a non-negotiable part of what Hydrops means — not an option we apply selectively.',
      },
      {
        label: 'Standards',
        headline: 'Food-grade at every stage',
        body: 'Our facility, equipment, and packaging meet food-grade standards throughout — not just at the point of filling.',
      },
      {
        label: 'Integrity',
        headline: 'No additives. No preservatives.',
        body: 'Hydrops coconut oil contains exactly one ingredient: coconut oil. Nothing is added. Nothing is removed beyond impurities.',
      },
    ],
    seal: 'Double Filtered · Crystal Clear · Zero Additives · Food Grade',
  },

  // ── 8. Why Choose Hydrops ─────────────────────────────────────────────────
  whyChoose: {
    eyebrow: 'Why Hydrops',
    headline: 'Reasons that matter.',
    items: [
      {
        number: '01',
        title: 'You can see the difference',
        body: 'Hydrops oil is crystal clear. That clarity is not cosmetic — it is the result of a filtration process thorough enough to remove everything that should not be there.',
      },
      {
        number: '02',
        title: 'Sourced with integrity',
        body: 'We know exactly where our coconuts come from. Direct sourcing from Kerala groves means no intermediaries, no mystery, and accountability at every point.',
      },
      {
        number: '03',
        title: 'Suited for everything',
        body: 'From high-heat cooking to cold-pressed skincare to daily wellness rituals — the purity and neutrality of Hydrops oil make it versatile across every use.',
      },
      {
        number: '04',
        title: 'A brand you can hold accountable',
        body: 'We publish our standards and stand behind every bottle. If Hydrops ever fails to meet its own stated quality, we want to hear from you.',
      },
    ],
  },

  // ── 9. Company Information ────────────────────────────────────────────────
  companyInfo: {
    eyebrow: 'Company Details',
    headline: 'Hydrops India',
    legalName: 'Hydrops India Pvt. Ltd.',
    foundedLabel: 'Founded',
    foundedValue: '2024',
    originLabel: 'Origin',
    originValue: 'Bangalore, Karnataka, India',
    contactLabel: 'Contact',
    email: 'contact@hydrops.in',
    phone: '+91 1234567890',
    address: {
      line1: '123 Coconut Avenue',
      line2: 'Bangalore, Karnataka 560001',
      line3: 'India',
    },
    certifications: [
      'FSSAI Certified',
      'Food Grade Facility',
      'Double Filtered Standard',
    ],
  },

  // ── 10. Call To Action ────────────────────────────────────────────────────
  cta: {
    eyebrow: 'Hydrops · Pure Coconut Oil',
    headline: 'Taste the difference\npurity makes.',
    subheadline: 'Experience Hydrops',
    body: 'Discover our range of double-filtered virgin coconut oil — crafted for your kitchen, your wellness, and your trust.',
    primaryLabel: 'Explore Products',
    primaryHref: '/products',
    secondaryLabel: 'Get In Touch',
    secondaryHref: '/contact',
    tagline: 'Crafted with care. Filtered with precision. Trusted by families.',
  },
};
