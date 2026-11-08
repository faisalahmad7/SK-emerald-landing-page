// Regenerates every WebP used by the site from the original JPEGs kept in /source-images.
// Usage: node scripts/make-images.mjs   (needs `sharp`)
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
const SRC = 'source-images', OUT = 'public/images'
fs.mkdirSync(OUT, { recursive: true })
const q = { quality: 82, effort: 5 }

// 1. every original -> WebP (full size, capped at 1600w) + an 800w variant for srcset when larger.
for (const f of fs.readdirSync(SRC).filter((n) => /^\d+\.jpg$/.test(n))) {
  const id = path.basename(f, '.jpg')
  const im = sharp(path.join(SRC, f)); const { width } = await im.metadata()
  await im.clone().resize({ width: Math.min(width, 1600) }).webp(q).toFile(`${OUT}/${id}.webp`)
  if (width > 900) await im.clone().resize({ width: 800 }).webp(q).toFile(`${OUT}/${id}-800.webp`)
}
// 2. purpose-cropped assets. [outName, sourceId, left, top, width, height] as fractions of the original.
const CROPS = [
  ['collection-sofas', 0, 0, 0.06, 1, 0.78],            // cream corner sofa, cinematic landscape
  ['collection-recliners', 6, 0.27, 0.05, 0.73, 0.95],   // aqua recliner, street background cropped out
  ['detail-gold-leg', 2, 0.0, 0.46, 0.34, 0.54],         // velvet + gold-tone leg
  ['collection-beds', 19, 0.22, 0.52, 0.78, 0.34],       // bed with LED underglow, landscape tile crop
  ['detail-glass-cabinet', 20, 0.45, 0.28, 0.55, 0.36],  // glass-front overhead unit with strip light
  ['detail-fluted-panel', 17, 0.05, 0.0, 0.9, 0.27],     // brass-ruled fluted panel
]
for (const [name, id, l, t, w, h] of CROPS) {
  const m = await sharp(path.join(SRC, `${id}.jpg`)).metadata()
  const L = Math.round(l * m.width), T = Math.round(t * m.height)
  await sharp(path.join(SRC, `${id}.jpg`))
    .extract({ left: L, top: T, width: Math.min(Math.round(w * m.width), m.width - L), height: Math.min(Math.round(h * m.height), m.height - T) })
    .webp(q).toFile(`${OUT}/${name}.webp`)
}
console.log('done')
