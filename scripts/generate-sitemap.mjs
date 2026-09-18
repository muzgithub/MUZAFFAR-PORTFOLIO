import { writeFileSync } from 'node:fs'
import { projects } from '../src/data/projects.js'

const SITE_URL = 'https://muzaffar.vercel.app'

const staticPaths = ['/', '/projects', '/resume', '/contact']
const projectPaths = projects.map((project) => `/projects/${project.slug}`)
const paths = [...staticPaths, ...projectPaths]

const urls = paths
  .map((path) => {
    const loc = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
    return `  <url><loc>${loc}</loc></url>`
  })
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml, 'utf8')
console.log(`sitemap.xml written with ${paths.length} URLs`)
