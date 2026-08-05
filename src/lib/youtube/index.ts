/**
 * src/lib/youtube — Public API
 *
 * Clean barrel export for YouTube utilities.
 * Import from '@/lib/youtube' everywhere in the codebase.
 *
 * Usage:
 *   import { extractYouTubeVideoId, buildYouTubeEmbedUrl } from '@/lib/youtube';
 */

export {
  extractYouTubeVideoId,
  buildYouTubeEmbedUrl,
  buildYouTubeThumbnailUrl,
} from './normalizer';
