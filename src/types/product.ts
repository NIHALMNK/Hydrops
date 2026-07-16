export interface ProductFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price?: number;
  images: {
    main: string;
    gallery: string[];
  };
  features: ProductFeature[];
  specifications: Record<string, string>;
  isAvailable: boolean;
}
