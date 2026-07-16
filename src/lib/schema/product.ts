import { Product } from '@/types';
import { siteConfig } from '@/constants/site';

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.gallery.map(img => `${siteConfig.url}${img}`),
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'Hydrops'
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: product.price,
      availability: product.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    }
  };
}
