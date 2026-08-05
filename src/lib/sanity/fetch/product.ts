/**
 * src/lib/sanity/fetch/product.ts
 *
 * All Sanity fetch functions for Hydrops Products.
 * 100% live CMS fetching — zero fallback mock data.
 */

import { client } from '../client';

import {
  PRODUCT_SETTINGS_QUERY,
  FLAGSHIP_PRODUCT_QUERY,
  PRODUCT_LIST_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_ALL_SLUGS_QUERY,
  PRODUCT_RELATED_ARTICLES_QUERY,
} from '../queries/product';

import {
  mapProductSettings,
  mapProductSummary,
  mapProductSummaries,
  mapProductDetail,
  mapRelatedJournalArticles,
  validateProduct,
} from '../adapters/product';

import type {
  ProductSettings,
  ProductSummary,
  ProductDetail,
  RelatedJournalArticle,
  ProductLandingData,
  ProductDetailData,
} from '@/features/products/types';

import type {
  SanityRawProductSettings,
  SanityRawProductSummary,
  SanityRawProductDetail,
  SanityRawBlogPostSummary,
} from '../sanity.raw.types';

const REVALIDATE = 60;

// ── Settings ──────────────────────────────────────────────────────────────────

export async function getProductSettings(): Promise<ProductSettings> {
  try {
    const raw = await client.fetch<SanityRawProductSettings | null>(
      PRODUCT_SETTINGS_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    return mapProductSettings(raw);
  } catch (error) {
    console.error('[product] Failed to fetch product settings:', error);
    return mapProductSettings(null);
  }
}

// ── Flagship Product ──────────────────────────────────────────────────────────

export async function getFlagshipProduct(): Promise<ProductSummary | null> {
  try {
    const raw = await client.fetch<SanityRawProductSummary | null>(
      FLAGSHIP_PRODUCT_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw) return null;
    return mapProductSummary(raw);
  } catch (error) {
    console.error('[product] Failed to fetch flagship product:', error);
    return null;
  }
}

// ── Product List ──────────────────────────────────────────────────────────────

export async function getProducts(): Promise<ProductSummary[]> {
  try {
    const raws = await client.fetch<SanityRawProductSummary[]>(
      PRODUCT_LIST_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    if (!raws || raws.length === 0) return [];
    return mapProductSummaries(raws);
  } catch (error) {
    console.error('[product] Failed to fetch product list:', error);
    return [];
  }
}

// ── Individual Product Detail ─────────────────────────────────────────────────

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    const raw = await client.fetch<SanityRawProductDetail | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: REVALIDATE } },
    );
    if (!raw) return null;
    const product = await mapProductDetail(raw);
    if (!validateProduct(product)) {
      console.warn(`[product] Product "${slug}" failed validation.`);
      return null;
    }
    return product;
  } catch (error) {
    console.error(`[product] Failed to fetch product "${slug}":`, error);
    return null;
  }
}

// ── Related Journal Articles ──────────────────────────────────────────────────

export async function getRelatedJournalArticles(): Promise<RelatedJournalArticle[]> {
  try {
    const raws = await client.fetch<SanityRawBlogPostSummary[]>(
      PRODUCT_RELATED_ARTICLES_QUERY,
      {},
      { next: { revalidate: REVALIDATE } },
    );
    if (!raws || raws.length === 0) return [];
    return mapRelatedJournalArticles(raws);
  } catch (error) {
    console.error('[product] Failed to fetch related journal articles:', error);
    return [];
  }
}

// ── Showcase Landing Composite Data ───────────────────────────────────────────

export async function getProductLandingData(): Promise<ProductLandingData> {
  const [settings, flagshipProduct, allProducts] = await Promise.all([
    getProductSettings(),
    getFlagshipProduct(),
    getProducts(),
  ]);

  return { settings, flagshipProduct, allProducts };
}

// ── Product Detail Composite Data ─────────────────────────────────────────────

export async function getProductDetailData(slug: string): Promise<ProductDetailData | null> {
  const [product, settings, relatedArticles] = await Promise.all([
    getProductBySlug(slug),
    getProductSettings(),
    getRelatedJournalArticles(),
  ]);

  if (!product) return null;

  return { product, settings, relatedArticles };
}

// ── All Slugs (for generateStaticParams) ──────────────────────────────────────

export async function getProductAllSlugs(): Promise<string[]> {
  try {
    const raw = await client.fetch<{ slug: string }[]>(
      PRODUCT_ALL_SLUGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    );
    return (raw ?? []).map((r) => r.slug).filter(Boolean);
  } catch (error) {
    console.error('[product] Failed to fetch product slugs:', error);
    return [];
  }
}
