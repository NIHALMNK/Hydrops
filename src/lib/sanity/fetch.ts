import { client } from './client';
import { HOME_PAGE_QUERY, ABOUT_PAGE_QUERY } from './queries';
import { mapSanityHomeToFrontend, mapSanityAboutToFrontend } from './adapters';
import { homePageData as fallbackHomePageData } from '@/data/home/home';
import type { HomePageDocument } from '@/data/types';
import type { AboutPageData } from '@/features/about/types';

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

import { aboutData as fallbackAboutPageData } from '@/data/about/about';

export async function getAboutPage(): Promise<AboutPageData> {
  try {
    const rawData = await client.fetch(ABOUT_PAGE_QUERY, {}, { next: { revalidate: 60 } });
    if (!rawData) {
      console.warn('Sanity returned null for about page, falling back to static data.');
      return fallbackAboutPageData;
    }
    return mapSanityAboutToFrontend(rawData);
  } catch (error) {
    console.error('Failed to fetch about page from Sanity, falling back to static data:', error);
    return fallbackAboutPageData;
  }
}
