import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const portraitPath = join(root, 'public', 'My Pic', 'My_Pic.png')
const outPath = join(root, 'public', 'og-image.png')

const WIDTH = 1200
const HEIGHT = 630

const portraitBase64 = readFileSync(portraitPath).toString('base64')

const layoutSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <clipPath id="portraitClip">
      <rect x="748" y="72" width="380" height="486" rx="20"/>
    </clipPath>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#E5E7EB" stroke-width="1"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#F7F8FA"/>
      <stop offset="55%" stop-color="#F7F8FA"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#fade)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.55"/>
  <rect x="72" y="88" width="6" height="72" rx="3" fill="#4F7CFF"/>
  <text x="92" y="118" fill="#111318" font-family="'Segoe UI', system-ui, sans-serif" font-size="52" font-weight="800" letter-spacing="-1">MUZAFFAR AHMED</text>
  <text x="92" y="178" fill="#111318" font-family="'Segoe UI', system-ui, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.5">Software Engineer</text>
  <text x="92" y="218" fill="#4F7CFF" font-family="'Segoe UI', system-ui, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.5">| Full Stack Developer</text>
  <text x="92" y="278" fill="#717784" font-family="'Segoe UI', system-ui, sans-serif" font-size="22" font-weight="500">
    <tspan x="92" dy="0">6+ years building business-focused web products,</tspan>
    <tspan x="92" dy="32">e-commerce platforms and custom digital solutions.</tspan>
  </text>
  <text x="92" y="378" fill="#111318" font-family="'Segoe UI', system-ui, sans-serif" font-size="20" font-weight="600" letter-spacing="0.5">WordPress · PHP · WooCommerce · Laravel · React</text>
  <rect x="748" y="72" width="380" height="486" rx="20" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="2"/>
  <image href="data:image/png;base64,${portraitBase64}" x="748" y="72" width="380" height="486" preserveAspectRatio="xMidYMid slice" clip-path="url(#portraitClip)"/>
</svg>
`

await sharp(Buffer.from(layoutSvg))
  .png()
  .toFile(outPath)

const meta = await sharp(outPath).metadata()
if (meta.width !== WIDTH || meta.height !== HEIGHT) {
  throw new Error(`Expected ${WIDTH}x${HEIGHT}, got ${meta.width}x${meta.height}`)
}

console.log(`og-image.png written (${meta.width}x${meta.height})`)
