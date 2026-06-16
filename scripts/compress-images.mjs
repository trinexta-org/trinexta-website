import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const DIRS = [
  'public/images/nos-offres',
  'public/demos',
];

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getFiles(full));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        files.push(full);
      }
    }
  }
  return files;
}

async function compress(file) {
  const { size: before } = await stat(file);
  const ext = extname(file).toLowerCase();
  const img = sharp(file).resize({ width: MAX_WIDTH, withoutEnlargement: true });

  let buf;
  if (ext === '.png') {
    buf = await img.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer();
  } else {
    buf = await img.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  }

  const after = buf.length;
  if (after < before) {
    await sharp(buf).toFile(file);
    const saved = ((before - after) / before * 100).toFixed(1);
    console.log(`✓ ${file} | ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (-${saved}%)`);
  } else {
    console.log(`= ${file} | already optimal, skipped`);
  }
}

const files = (await Promise.all(DIRS.map(getFiles))).flat();
console.log(`Compressing ${files.length} images...\n`);
for (const f of files) await compress(f);
console.log('\nDone.');
