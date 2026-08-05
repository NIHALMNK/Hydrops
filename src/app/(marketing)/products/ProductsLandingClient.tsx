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
import { EmptyState } from '@/features/products/components/EmptyState';

import type { ProductLandingData, ProductDetail, RelatedJournalArticle } from '@/features/products/types';

interface Props {
  data: ProductLandingData;
  flagshipDetail: ProductDetail | null;
  relatedArticles: RelatedJournalArticle[];
}

export function ProductsLandingClient({ data, flagshipDetail, relatedArticles }: Props) {
  const containerRef = useProductAnimations();

  if (!flagshipDetail) {
    return <EmptyState message={data.settings.emptyStateText} />;
  }

  return (
    <div ref={containerRef} className="w-full bg-[#F5F2EC] text-[#1A1A1A] min-h-screen selection:bg-[#C8A96A] selection:text-white">
      {/* 1. Hero */}
      <ProductHero product={flagshipDetail} />

      {/* 2. Key Highlights */}
      <ProductHighlights highlights={flagshipDetail.highlights} />

      {/* 3. The Hydrops Story */}
      <CraftsmanshipStory
        storyChapters={flagshipDetail.storyChapters}
        descriptionHtml={flagshipDetail.descriptionHtml}
      />

      {/* 4. Technical Profile (Specs + Storage) */}
      <TechnicalProfile
        specifications={flagshipDetail.specifications}
        storageCare={flagshipDetail.storageCare}
      />

      {/* 5. Benefits & Everyday Uses */}
      <BenefitsAndUses
        benefits={flagshipDetail.benefits}
        uses={flagshipDetail.uses}
      />

      {/* 6. Manufacturing Journey */}
      <ManufacturingTimeline manufacturingSteps={flagshipDetail.manufacturingSteps} />

      {/* 7. Certifications (Rendered only if actual docs exist) */}
      <CertificationSection certifications={flagshipDetail.certifications} />

      {/* 8. Related Journal Articles */}
      {data.settings.showRelatedArticles && (
        <RelatedJournalArticles articles={relatedArticles} />
      )}

      {/* 9. Contact CTA */}
      <ProductTrustCta settings={data.settings} />
    </div>
  );
}
