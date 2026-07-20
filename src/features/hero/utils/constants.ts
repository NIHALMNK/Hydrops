export const HERO_CONSTANTS = {
  TOTAL_FRAMES: 270, // Single source of truth for exported frame sequence
  FRAME_SCROLL_FACTOR: 3, // Each frame takes 3vh to scroll
  // Load ALL frames during the splash so the user can never encounter a cache miss while scrolling.
  // At ~22 KB/frame × 270 = 5.9 MB WebP, this completes in 2–4 s on a typical connection.
  INITIAL_BATCH_SIZE: 270,
};
