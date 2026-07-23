import type { SimplePageDocument } from '@/types';
import { contactSeo } from '@/data/site/seo';

export const contactPageData: SimplePageDocument = {
  _id: 'contact-page', _type: 'contactPage', seo: contactSeo, heading: 'Contact Us', description: "We'd love to hear from you. Reach out about products, orders, or anything else.",
};
