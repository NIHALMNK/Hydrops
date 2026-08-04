import { client } from './client';
import { HOME_PAGE_QUERY } from './queries';
import { mapSanityHomeToFrontend } from './adapters';
import { homePageData as fallbackHomePageData } from '@/data/home/home';
import type { HomePageDocument } from '@/data/types';

export async function getHomePage(): Promise<HomePageDocument> {
  try {
    const rawData = await client.fetch(HOME_PAGE_QUERY, {}, { next: { revalidate: 60 } });
    if (!rawData) {
      console.warn('Sanity returned null for home page, falling back to static data.');
      return fallbackHomePageData;
    }
    return mapSanityHomeToFrontend(rawData);
  } catch (error) {
    console.error('Failed to fetch home page from Sanity, falling back to static data:', error);
    return fallbackHomePageData;
  }
}
