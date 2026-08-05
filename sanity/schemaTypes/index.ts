// Base Objects
import { cloudinaryImage } from './objects/cloudinaryImage';
import { button } from './objects/button';
import { headingBlock } from './objects/headingBlock';
import { seo } from './objects/seo';
import { socialLink } from './objects/socialLink';
import { address } from './objects/address';
import { businessHours } from './objects/businessHours';
import { contactInfo } from './objects/contactInfo';

// Product Objects
import { productHighlight } from './objects/product/highlight';
import { productSpecification } from './objects/product/specification';
import { productStorageCare } from './objects/product/storageCare';
import { productFeature } from './objects/product/feature';
import { productUsage } from './objects/product/usage';
import { productNutritionItem } from './objects/product/nutritionItem';
import { productProcessStep } from './objects/product/processStep';
import { productCertification } from './objects/product/certification';
import { productComparisonItem } from './objects/product/comparisonItem';
import { productDownload } from './objects/product/download';
import { productQuickFact } from './objects/product/quickFact';
import { productFaq } from './objects/product/faq';
import { productStoryChapter } from './objects/product/storyChapter';

// Product Page Section Objects
import { productHeroSection } from './objects/product/heroSection';
import { productHighlightsSection } from './objects/product/highlightsSection';
import { productStorySection } from './objects/product/storySection';
import { productTechnicalProfileSection } from './objects/product/technicalProfileSection';
import { productBenefitsSection } from './objects/product/benefitsSection';
import { productManufacturingSection } from './objects/product/manufacturingSection';
import { productTrustSection } from './objects/product/trustSection';
import { productRelatedArticlesSection } from './objects/product/relatedArticlesSection';
import { productCtaSection } from './objects/product/ctaSection';

// Homepage Section Objects
import { hero } from './objects/hero';
import { soulStatement } from './objects/soulStatement';
import { philosophy } from './objects/philosophy';
import { journey } from './objects/journey';
import { productShowcase } from './objects/productShowcase';
import { purityStatement } from './objects/purityStatement';
import { craftsmanship } from './objects/craftsmanship';
import { everyday } from './objects/everyday';
import { contactCta } from './objects/contactCta';

// Home Page Documents
import { homeHero } from './documents/home/hero';
import { homeSoulStatement } from './documents/home/soulStatement';
import { homePhilosophy } from './documents/home/philosophy';
import { homeJourney } from './documents/home/journey';
import { homeProductShowcase } from './documents/home/productShowcase';
import { homePurityStatement } from './documents/home/purityStatement';
import { homeCraftsmanship } from './documents/home/craftsmanship';
import { homeEveryday } from './documents/home/everyday';
import { homeContactCta } from './documents/home/contactCta';

// About Page Documents
import { aboutHero } from './documents/about/hero';
import { aboutIntroduction } from './documents/about/introduction';
import { aboutStory } from './documents/about/story';
import { aboutMission } from './documents/about/mission';
import { aboutVision } from './documents/about/vision';
import { aboutValues } from './documents/about/values';
import { aboutManufacturing } from './documents/about/manufacturing';
import { aboutCommitment } from './documents/about/commitment';
import { aboutWhyHydrops } from './documents/about/whyHydrops';
import { aboutCompanyInfo } from './documents/about/companyInfo';

// Product Documents
import { product } from './documents/products/product';
import { productSettings } from './documents/products/productSettings';

// Blog / Journal Documents
import { blogCategory } from './documents/blog/category';
import { blogAuthor } from './documents/blog/author';
import { blogTag } from './documents/blog/tag';
import { blogSeries } from './documents/blog/series';
import { blogPost } from './documents/blog/post';
import { blogSettings } from './documents/blog/settings';

// Singletons
import { brand } from './singletons/brand';
import { business } from './singletons/business';
import { contact } from './singletons/contact';
import { social } from './singletons/social';
import { seoSettings } from './singletons/seoSettings';
import { navigation } from './singletons/navigation';
import { footer } from './singletons/footer';

export const schema = {
  types: [
    // Base Objects
    cloudinaryImage,
    button,
    headingBlock,
    seo,
    socialLink,
    address,
    businessHours,
    contactInfo,

    // Product Objects
    productHighlight,
    productSpecification,
    productStorageCare,
    productFeature,
    productUsage,
    productNutritionItem,
    productProcessStep,
    productCertification,
    productComparisonItem,
    productDownload,
    productQuickFact,
    productFaq,
    productStoryChapter,

    // Product Page Section Objects
    productHeroSection,
    productHighlightsSection,
    productStorySection,
    productTechnicalProfileSection,
    productBenefitsSection,
    productManufacturingSection,
    productTrustSection,
    productRelatedArticlesSection,
    productCtaSection,

    // Homepage Section Objects
    hero,
    soulStatement,
    philosophy,
    journey,
    productShowcase,
    purityStatement,
    craftsmanship,
    everyday,
    contactCta,

    // Home Page Documents
    homeHero,
    homeSoulStatement,
    homePhilosophy,
    homeJourney,
    homeProductShowcase,
    homePurityStatement,
    homeCraftsmanship,
    homeEveryday,
    homeContactCta,

    // About Page Documents
    aboutHero,
    aboutIntroduction,
    aboutStory,
    aboutMission,
    aboutVision,
    aboutValues,
    aboutManufacturing,
    aboutCommitment,
    aboutWhyHydrops,
    aboutCompanyInfo,

    // Product Documents
    product,
    productSettings,

    // Blog / Journal Documents
    blogCategory,
    blogAuthor,
    blogTag,
    blogSeries,
    blogPost,
    blogSettings,

    // Singletons
    brand,
    business,
    contact,
    social,
    seoSettings,
    navigation,
    footer,
  ],
};
