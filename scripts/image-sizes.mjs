// Records the pixel size of every image the site shows, so each <img> can carry width/height (no layout shift).
// Local files (public/images) are read every run; hot-linked images listed in src/data/images.js are fetched once and
// kept in the JSON, so later builds stay offline. Usage: node scripts/image-sizes.mjs   (needs `sharp`)
// Keys: a local file's name without .webp (800w copies skipped: same shape), or the image id for a hot-linked photo.
import sharp from 'sharp'
import fs from 'node:fs'
import { createHash } from 'node:crypto'
const tag = (url) => createHash('sha1').update(url).digest('hex').slice(0, 8) // notices when a photo is swapped
const OUT = 'src/data/image-sizes.json'
const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {}
const sizes = {}
for (const f of fs.readdirSync('public/images').filter((n) => n.endsWith('.webp') && !n.endsWith('-800.webp'))) {
  const { width, height } = await sharp(`public/images/${f}`).metadata()
  sizes[f.slice(0, -5)] = [width, height]
}
const remote = [...fs.readFileSync('src/data/images.js', 'utf8').matchAll(/f\('([^']+)'.*?\bsrc: '(https:\/\/[^']+)'/g)]
for (const [, id, url] of remote) {
  if (old[id]?.[2] === tag(url)) { sizes[id] = old[id]; continue }
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const { width, height } = await sharp(Buffer.from(await res.arrayBuffer())).metadata()
    sizes[id] = [width, height, tag(url)]
  } catch (e) { console.warn(`image-sizes: no size for ${id} (${e.message})`) }
}
fs.writeFileSync(OUT, JSON.stringify(Object.fromEntries(Object.entries(sizes).sort()), null, 0).replace(/\],"/g, '],\n"') + '\n')
console.log(`image-sizes: ${Object.keys(sizes).length} images`)
