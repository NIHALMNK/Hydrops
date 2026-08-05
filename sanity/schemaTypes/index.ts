// Objects
import { cloudinaryImage } from './objects/cloudinaryImage';
import { button } from './objects/button';
import { headingBlock } from './objects/headingBlock';
import { seo } from './objects/seo';
import { socialLink } from './objects/socialLink';
import { address } from './objects/address';
import { businessHours } from './objects/businessHours';
import { contactInfo } from './objects/contactInfo';

// Homepage Section Objects (kept as objects — used as embedded types by home documents)
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
