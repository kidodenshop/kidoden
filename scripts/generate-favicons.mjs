import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const inputImage = path.resolve('public/baby_face.png');

  if (!fs.existsSync(inputImage)) {
    console.error('Input image not found:', inputImage);
    process.exit(1);
  }

  // 1. Generate 32x32 PNG for favicon.ico replacement
  const buf32 = await sharp(inputImage)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  fs.writeFileSync('public/favicon.ico', buf32);
  fs.writeFileSync('src/app/favicon.ico', buf32);

  // 2. Generate standard favicon sizes
  const sizes = [
    { name: 'public/favicon-16x16.png', size: 16 },
    { name: 'public/favicon-32x32.png', size: 32 },
    { name: 'public/favicon-48x48.png', size: 48 },
    { name: 'public/icon-192.png', size: 192 },
    { name: 'public/icon-512.png', size: 512 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'src/app/icon.png', size: 192 },
    { name: 'src/app/apple-icon.png', size: 180 },
  ];

  for (const item of sizes) {
    await sharp(inputImage)
      .resize(item.size, item.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(item.name);
    console.log(`Generated ${item.name}`);
  }

  console.log('All favicons successfully generated!');
}

generateFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
