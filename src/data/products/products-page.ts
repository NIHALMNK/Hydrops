import type { SimplePageDocument } from '@/types';
import { productsSeo } from '@/data/site/seo';

export const productsPageData: SimplePageDocument = {
  _id: 'products-page', _type: 'productsPage', seo: productsSeo, heading: 'Our Products', description: 'Double-filtered purity in every drop. Discover the Hydrops product range.',
};
