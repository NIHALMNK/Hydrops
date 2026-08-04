import type { HomePageDocument } from '@/types';
import { HERO_VIDEO, HERO_POSTER } from '@/features/hero/constants/hero';

const productImage = {
  src: '/images/products/hydrops-coconut-oil.png',
  alt: 'Hydrops Coconut Oil Bottle',
  width: 768,
  height: 1536,
};

export const homePageData: HomePageDocument = {
  _id: 'home-page',
  _type: 'homePage',
  hero: {
    _id: 'home-hero',
    _type: 'hero',
    eyebrow: 'CRYSTAL CLEAR · NATURALLY PURE',
    headline: 'Colorless Crystal Clear Coconut Oil',
    description: 'Experience the purest form of coconut oil. Double filtered to achieve a crystal clear finish that preserves natural goodness without any residue.',
    primaryCta: { label: 'Explore Product', href: '#product-showcase' },
    secondaryCta: { label: 'Contact Us', href: '/contact' },
    videoUrl: HERO_VIDEO,
    posterUrl: HERO_POSTER,
  },
  soulStatement: {
    _id: 'home-soul-statement',
    _type: 'soulStatement',
    background: { src: '/images/backgrounds/coconuts-and-leaves-on-blue-background-free-photo.jpeg', alt: 'Coconuts and leaves on blue background', width: 1920, height: 1080 },
    label: 'HYDROPS',
    headline: "Purity isn't a claim.",
    accentHeadline: "It's a commitment.",
  },
  philosophy: {
    _id: 'home-philosophy',
    _type: 'philosophy',
    topRightDecoration: { src: '/assets/Gemini_Generated_Image_n90cohn90cohn90c.png', alt: 'Palm fronds decoration', width: 1024, height: 1024 },
    bottomLeftDecoration: { src: '/assets/Gemini_Generated_Image_6ra6rf6ra6rf6ra6.png', alt: 'Coconut cluster decoration', width: 1024, height: 1024 },
    watermark: 'HYDROPS',
    persistentPhrase: 'Every Drop',
    chapters: [
      { lines: ['Begins'], accentLine: 'With Purity.' },
      { lines: ['Carefully Selected.', 'Patiently Crafted.'], accentLine: 'Crystal Clear.' },
      { lines: ['Earns Your Trust.'] },
    ],
    cta: { label: 'Discover The Journey', href: '#journey-section' },
  },
  journey: {
    _id: 'home-journey',
    _type: 'journeySection',
    ambientImage: { src: '/assets/trees.jpg', alt: 'Ambient grove landscape', width: 1920, height: 1080 },
    stages: [
      { chapter: '01', title: 'Morning.', description: 'Before sunrise, the coconut groves of Kerala awaken. The air carries salt and earth. The day begins not in a factory, but in a grove that has fed families for centuries.', image: { src: '/images/journey/1-morning.png', alt: 'Morning in Kerala coconut groves', width: 960, height: 1200 }, mood: 'Dawn light finds the treetops.' },
      { chapter: '02', title: 'Harvest.', description: 'Only the coconuts that have ripened completely are chosen. Not by machine — by hand, and by experience passed down through generations.', image: { src: '/images/journey/3-harvest.png', alt: 'Harvesting coconuts by hand', width: 960, height: 1200 }, mood: 'Harvesting coconuts by hand' },
      { chapter: '03', title: 'Patience.', description: 'The finest oil cannot be rushed. Our extraction process honours the natural pace of the coconut, preserving everything the tree intended to give.', image: { src: '/images/journey/4-selection.png', alt: 'Coconut selection process', width: 960, height: 1200 }, mood: 'Nothing valuable was ever made in a hurry.' },
      { chapter: '04', title: 'Purity.', description: 'Double filtered. Crystal clear. What remains is the purest expression of the coconut — without compromise, without residue, without anything unnecessary.', image: { src: '/images/journey/6-hydrops.png', alt: 'Hydrops coconut oil bottle', width: 960, height: 1200 }, mood: 'This is Hydrops.' },
    ],
  },
  productShowcase: {
    _id: 'home-product-showcase', _type: 'productShowcase', label: 'OUR PRODUCT', headline: 'Colorless Crystal Clear Coconut Oil', description: 'Experience the purest form of coconut oil. Double filtered to achieve a crystal clear finish that preserves natural goodness without any residue.', primaryCta: { label: 'Explore Product', href: '/products' }, secondaryCta: { label: 'Contact Us', href: '/contact' }, productImage, floatingAsset: { src: '/images/assets/premium-floating-coconut.png', alt: '', width: 512, height: 512 },
  },
  purityStatement: {
    _id: 'home-purity-statement', _type: 'purityStatement', label: 'Double Filtered · Crystal Clear · Zero Residue', statements: [{ line: 'Nothing Hidden.', delay: 0 }, { line: 'Nothing Added.', delay: 0.15 }, { line: 'Only Purity.', delay: 0.3, accent: true }], supportingText: 'Every bottle of Hydrops passes through two rigorous filtration stages — not one — leaving only what the coconut intended.',
  },
  craftsmanship: {
    _id: 'home-craftsmanship', _type: 'craftsmanshipSection', heading: { eyebrow: 'Craftsmanship', headline: 'Every step.', supportingText: 'Deliberate.' }, steps: [
      { step: '01', title: 'Inspection', headline: 'Only the best\nmake it through.', description: "Every coconut is assessed by hand. Density, moisture, maturity. Nothing enters our process that doesn't meet our standards — no exceptions.", image: { src: '/images/quality/craft-inspect.png', alt: 'Hand inspecting a fresh coconut in morning light', width: 960, height: 1200 } },
      { step: '02', title: 'Filtration', headline: 'Clarity is not\nan accident.', description: 'Two separate filtration stages. First, gross impurities. Then, microscopic particles. What remains is oil so clear, you can see straight through it.', image: { src: '/images/quality/craft-filter.png', alt: 'Crystal-clear oil filtering in warm light', width: 960, height: 1200 } },
      { step: '03', title: 'Preservation', headline: 'Purity sealed\nat its peak.', description: 'The moment the oil reaches its ideal clarity, it is sealed. No delays. No exposure. The bottle captures the oil exactly as it was when it emerged from filtration.', image: { src: '/images/quality/craft-bottle.png', alt: 'Premium bottle with crystal-clear oil on dark surface', width: 960, height: 1200 } },
      { step: '04', title: 'Integrity', headline: 'Our promise\nin every seal.', description: 'The final seal is a guarantee. What you open is exactly what was intended — uncompromised, untouched, unaltered. This is what we call the Hydrops Promise.', image: { src: '/images/quality/craft-seal.png', alt: 'Hands carefully sealing a premium bottle', width: 960, height: 1200 } },
    ],
  },
  everyday: {
    _id: 'home-everyday', _type: 'everydaySection', heading: { eyebrow: 'Everyday Life', headline: 'Not a pantry staple.' }, headlineAccent: 'A daily companion.', moments: [
      { id: 'morning', label: 'Morning', headline: 'The day starts\nwith intention.', description: 'A single pour. The golden clarity catching the first light. A ritual so simple, it becomes sacred.', image: { src: '/images/everyday/morning.png', alt: 'Morning kitchen with Hydrops coconut oil', width: 1200, height: 900 }, accent: 'Morning light, 6:14 AM.' },
      { id: 'kitchen', label: 'Kitchen', headline: 'Cook with\npure confidence.', description: 'No residue. No off-flavour. High smoke point and crystal clarity. Hydrops disappears into the food — leaving only taste.', image: { src: '/images/everyday/kitchen.png', alt: 'Cooking with crystal-clear coconut oil', width: 1200, height: 900 }, accent: 'High smoke point. Neutral profile.' },
      { id: 'family', label: 'Family', headline: 'Some things are\nworth passing down.', description: 'The tradition of coconut oil has been central to Indian households for generations. Hydrops gives that tradition the clarity it deserves.', image: { src: '/images/everyday/family.png', alt: 'Family passing down the tradition of coconut oil', width: 1200, height: 900 }, accent: 'Three generations. One bottle.' },
      { id: 'wellness', label: 'Wellness', headline: 'Pure outside.\nPure within.', description: 'The same purity that makes it ideal for cooking makes it extraordinary for skin and hair. One oil. Many purposes. Zero compromise.', image: { src: '/images/everyday/wellness.png', alt: 'Wellness ritual with Hydrops coconut oil', width: 1200, height: 900 }, accent: 'Skin. Hair. Mind. Body.' },
    ],
  },
  contactCta: {
    _id: 'home-contact-cta', _type: 'contactCta', label: 'Hydrops · Pure Coconut Oil', headline: 'Ready to experience', accentHeadline: 'real purity?', description: 'Connect with us for wholesale inquiries, distribution partnerships, and bulk supply across India.', primaryCta: { label: 'Contact Us', href: '/contact' }, secondaryCta: { label: 'WhatsApp', href: 'https://wa.me/917012123505' }, tagline: 'Crafted with care. Filtered with precision. Trusted by families.', backgroundImage: productImage,
  },
};
