import { Product } from '@/types';

export const productsData: Product[] = [
  {
    id: 'hydrops-premium-coconut-oil',
    name: 'Hydrops Premium Coconut Oil',
    slug: 'premium-coconut-oil',
    description: '100% pure, cold-pressed premium coconut oil perfect for corporate gifting and everyday culinary use.',
    shortDescription: '100% pure, cold-pressed premium coconut oil.',
    price: 499,
    images: {
      main: '/images/products/main.jpg',
      gallery: ['/images/products/gallery-1.jpg', '/images/products/gallery-2.jpg'],
    },
    features: [
      { title: 'Cold-pressed', description: 'Extracted without heat to retain maximum nutrients.' },
      { title: '100% Pure', description: 'No additives or preservatives.' }
    ],
    specifications: {
      'Volume': '500ml',
      'Extraction Method': 'Cold Pressed',
      'Origin': 'Kerala, India'
    },
    isAvailable: true,
  }
];
