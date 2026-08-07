import { MetadataRoute } from 'next';
import { siteConfig } from '@/constants/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hydrops — Pure Coconut Oil · India',
    short_name: 'Hydrops',
    description: siteConfig.description,
    start_url: '/',
    scope: '/',
    id: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#F8F6F1',
    theme_color: '#08180E',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}

