// Objects
import { cloudinaryImage } from './objects/cloudinaryImage';
import { button } from './objects/button';
import { headingBlock } from './objects/headingBlock';
import { seo } from './objects/seo';
import { socialLink } from './objects/socialLink';
import { address } from './objects/address';
import { businessHours } from './objects/businessHours';
import { contactInfo } from './objects/contactInfo';

// Homepage Sections (Objects)
import { hero } from './objects/hero';
import { soulStatement } from './objects/soulStatement';
import { philosophy } from './objects/philosophy';
import { journey } from './objects/journey';
import { productShowcase } from './objects/productShowcase';
import { purityStatement } from './objects/purityStatement';
import { craftsmanship } from './objects/craftsmanship';
import { everyday } from './objects/everyday';
import { contactCta } from './objects/contactCta';

// Documents
import { product } from './documents/product';

// Singletons
import { brand } from './singletons/brand';
import { business } from './singletons/business';
import { contact } from './singletons/contact';
import { social } from './singletons/social';
import { seoSettings } from './singletons/seoSettings';
import { navigation } from './singletons/navigation';
import { footer } from './singletons/footer';
import { homePage } from './singletons/homePage';

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

    // Documents
    product,

    // Singletons
    brand,
    business,
    contact,
    social,
    seoSettings,
    navigation,
    footer,
    homePage,
  ],
};
