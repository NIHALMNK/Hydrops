/**
 * Helper to generate a valid Google Maps embed URL from a standard Google Maps URL
 * or return the provided custom embed URL.
 */
export function getMapEmbedUrl(googleMapsUrl?: string, customEmbedUrl?: string): string {
  if (customEmbedUrl && customEmbedUrl.trim().length > 0) {
    return customEmbedUrl;
  }

  const defaultEmbed =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.4682057814896!2d76.3262963!3d10.0607144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080b0000000001%3A0x0!2zMTDCsDAzJzM4LjYiTiA3NsKwMTknMzQuNyJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';

  if (!googleMapsUrl) return defaultEmbed;

  // Try extracting coordinates or place ID from googleMapsUrl if present
  try {
    const url = new URL(googleMapsUrl);
    // Check if query param 'q' or 'pb' exists
    const q = url.searchParams.get('q');
    if (q) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA_placeholder&q=${encodeURIComponent(q)}`;
    }
  } catch {
    // If parsing fails, return default embed
  }

  return defaultEmbed;
}
