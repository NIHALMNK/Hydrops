'use client';

import React from 'react';
import { useProductAnimations } from '@/features/products/animations/useProductAnimations';
import { ProductHero } from '@/features/products/components/ProductHero';
import { ProductHighlights } from '@/features/products/components/ProductHighlights';
import { CraftsmanshipStory } from '@/features/products/components/CraftsmanshipStory';
import { TechnicalProfile } from '@/features/products/components/TechnicalProfile';
import { BenefitsAndUses } from '@/features/products/components/BenefitsAndUses';
import { ManufacturingTimeline } from '@/features/products/components/ManufacturingTimeline';
import { CertificationSection } from '@/features/products/components/CertificationSection';
import { RelatedJournalArticles } from '@/features/products/components/RelatedJournalArticles';
import { ProductTrustCta } from '@/features/products/components/ProductTrustCta';

import type { ProductDetailData } from '@/features/products/types';

interface Props {
  data: ProductDetailData;
}

export function ProductDetailClient({ data }: Props) {
  const containerRef = useProductAnimations();
  const { product, settings, relatedArticles } = data;

  // Educational Product JSON-LD
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://hydropsindia.com/products/${product.slug}#product`,
    url: `https://hydropsindia.com/products/${product.slug}`,
    name: product.name,
    description: product.tagline || product.seo.metaDescription || 'Pure virgin double-filtered coconut oil crafted in India.',
    image: product.primaryFeaturedImage?.src ? [product.primaryFeaturedImage.src] : ['https://hydropsindia.com/images/brand/logo.png'],
    brand: {
      '@type': 'Brand',
      name: 'Hydrops',
      logo: 'https://hydropsindia.com/images/brand/logo.png',
    },
    category: 'Botanical Cold Pressed Virgin Oils',
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hydropsindia.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: 'https://hydropsindia.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://hydropsindia.com/products/${product.slug}`,
      },
    ],
  };


  return (
    <div ref={containerRef} className="w-full bg-[#F5F2EC] text-[#1A1A1A] min-h-screen selection:bg-[#C8A96A] selection:text-white">
      {/* Structured JSON-LD Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* 1. Hero */}
      <ProductHero product={product} />

      {/* 2. Key Highlights */}
      <ProductHighlights highlights={product.highlights} />

      {/* 3. The Hydrops Story */}
      <CraftsmanshipStory
        storyChapters={product.storyChapters}
        descriptionHtml={product.descriptionHtml}
      />

      {/* 4. Technical Profile (Specs + Storage) */}
      <TechnicalProfile
        specifications={product.specifications}
        storageCare={product.storageCare}
      />

      {/* 5. Benefits & Everyday Uses */}
      <BenefitsAndUses
        benefits={product.benefits}
        uses={product.uses}
      />

      {/* 6. Manufacturing Journey */}
      <ManufacturingTimeline manufacturingSteps={product.manufacturingSteps} />

      {/* 7. Certifications (Rendered only if actual docs exist) */}
      <CertificationSection certifications={product.certifications} />

      {/* 8. Related Journal Articles */}
      {settings.showRelatedArticles && relatedArticles.length > 0 && (
        <RelatedJournalArticles articles={relatedArticles} />
      )}

      {/* 9. Contact CTA */}
      <ProductTrustCta settings={settings} />
    </div>
  );
}
