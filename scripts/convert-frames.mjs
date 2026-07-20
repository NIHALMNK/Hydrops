// scripts/convert-frames.mjs
// Run once: node scripts/convert-frames.mjs
// Requires: npm install sharp --save-dev

import sharp from 'sharp';
import { readdir, unlink } from 'fs/promises';
import { join, extname } from 'path';

const FRAMES_DIR = './public/Frames';
const QUALITY = 82; // 80-85 sweet spot: visually lossless at ~1/5 the PNG size

async function convertFrames() {
  const files = (await readdir(FRAMES_DIR))
    .filter(f => extname(f).toLowerCase() === '.png')
    .sort();

  console.log(`Converting ${files.length} PNG frames to WebP (quality ${QUALITY})...`);

  let done = 0;
  for (const file of files) {
    const input  = join(FRAMES_DIR, file);
    const output = join(FRAMES_DIR, file.replace(/\.png$/i, '.webp'));

    await sharp(input)
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(output);

    done++;
    if (done % 30 === 0) {
      console.log(`  ${done}/${files.length} done...`);
    }
  }

  console.log('\nAll frames converted. Deleting PNGs...');
  for (const file of files) {
    await unlink(join(FRAMES_DIR, file));
  }
  console.log('Done! frameManifest.ts now points to .webp automatically.');
}

convertFrames().catch(console.error);
