// Dynamically generate the manifest for the 300 frames in public/Frames/
export const FRAME_MANIFEST: string[] = Array.from({ length: 300 }, (_, i) => 
  `/Frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.png`
);
