import { HERO_CONSTANTS } from '../utils/constants';

// Dynamically generate the manifest from the configuration constant
export const FRAME_MANIFEST: string[] = Array.from({ length: HERO_CONSTANTS.TOTAL_FRAMES }, (_, i) => 
  `/Frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`
);
