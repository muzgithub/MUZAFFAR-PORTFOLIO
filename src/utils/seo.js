import { profile } from '../data/profile.js'
import { projects } from '../data/projects.js'
import { getProjectOverview } from './projects.js'

export const SITE_URL = 'https://muzaffar.vercel.app'
export const SITE_NAME = profile.name

export const DEFAULT_TITLE = `${profile.name} — ${profile.title}`

export const DEFAULT_DESCRIPTION =
  'Software Engineer with 6+ years of experience building WordPress, WooCommerce, PHP, Laravel and React web products.'

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`

export const DEFAULT_OG_IMAGE_ALT = DEFAULT_TITLE

export const DEFAULT_OG_IMAGE_WIDTH = 1200

export const DEFAULT_OG_IMAGE_HEIGHT = 630

export const PROFILE_IMAGE_URL = `${SITE_URL}/My%20Pic/My_Pic.png`

export const INDEXABLE_STATIC_PATHS = ['/', '/projects', '/resume', '/contact']

const MANAGED_SELECTOR = 'data-managed-seo'

function upsertMeta({ name, property, content }) {
  if (!content) {
    return
  }

  const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    if (property) {
      element.setAttribute('property', property)
    } else {
      element.setAttribute('name', name)
    }
    document.head.appendChild(element)
  }

  element.setAttribute(MANAGED_SELECTOR, 'true')
  element.setAttribute('content', content)
}

function removeMeta({ name, property }) {
  const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`
  document.head.querySelector(selector)?.remove()
}

function upsertLink(rel, href) {
  if (!href) {
    return
  }

  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute(MANAGED_SELECTOR, 'true')
  element.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  const existing = document.getElementById(id)
  existing?.remove()

  if (!data) {
    return
  }

  const script = document.createElement('script')
  script.id = id
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

export function toCanonicalUrl(path = '/') {
  if (!path || path === '/') {
    return `${SITE_URL}/`
  }

  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function truncateDescription(value, maxLength = 160) {
  const text = value.trim().replace(/\s+/g, ' ')

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, maxLength - 1).trim()}…`
}

export function isRichCaseStudy(project) {
  return Boolean(
    (project.features?.length ?? 0) > 0 ||
      (project.technicalImplementation?.length ?? 0) > 0 ||
      (project.results?.length ?? 0) > 0,
  )
}

export function getProjectSeoTitle(project) {
  if (isRichCaseStudy(project)) {
    return `${project.title} — Project Case Study | ${profile.name}`
  }

  return `${project.title} — ${profile.name}`
}

export function getProjectSeoDescription(project) {
  const overview = getProjectOverview(project)
  const tech =
    (project.technologies ?? []).length > 0
      ? ` Technologies: ${project.technologies.slice(0, 6).join(', ')}.`
      : ''

  return truncateDescription(`${overview}${tech}`)
}

export const PAGE_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: '/',
  },
  projects: {
    title: `Projects — ${profile.name}`,
    description: truncateDescription(
      `Browse ${projects.length} web development projects by ${profile.name}, including WordPress, WooCommerce, PHP, Laravel, ReactJS, Drupal, and MERN work.`,
    ),
    path: '/projects',
  },
  resume: {
    title: `${profile.name} — Resume`,
    description:
      'Professional resume for Muzaffar Ahmed, Software Engineer | Full Stack Developer, covering experience, skills, projects, education, and awards.',
    path: '/resume',
  },
  contact: {
    title: `${profile.name} — Contact`,
    description:
      'Contact Muzaffar Ahmed for professional opportunities, software development work, collaboration, and project discussions.',
    path: '/contact',
  },
  notFound: {
    title: `Page Not Found — ${profile.name}`,
    description: 'The requested page could not be found on the Muzaffar Ahmed portfolio.',
    path: '/404',
    noindex: true,
  },
  projectNotFound: {
    title: `Page Not Found — ${profile.name}`,
    description: 'This project is not available in the Muzaffar Ahmed portfolio.',
    path: '/404',
    noindex: true,
  },
}

export function getIndexablePaths() {
  return [...INDEXABLE_STATIC_PATHS, ...projects.map((project) => `/projects/${project.slug}`)]
}

export function getHomeJsonLd() {
  const siteUrl = toCanonicalUrl('/')
  const personId = `${siteUrl}#person`
  const websiteId = `${siteUrl}#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        jobTitle: profile.title,
        url: siteUrl,
        email: profile.email,
        image: PROFILE_IMAGE_URL,
        sameAs: [profile.linkedin, profile.github],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: siteUrl,
        name: profile.name,
        description: DEFAULT_DESCRIPTION,
        inLanguage: 'en',
        author: { '@id': personId },
      },
    ],
  }
}

export function getProjectJsonLd(project) {
  const path = `/projects/${project.slug}`
  const pageUrl = toCanonicalUrl(path)
  const siteUrl = toCanonicalUrl('/')

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: project.title,
        description: getProjectSeoDescription(project),
        isPartOf: { '@type': 'WebSite', '@id': `${siteUrl}#website`, url: siteUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: toCanonicalUrl('/projects') },
          { '@type': 'ListItem', position: 3, name: project.title, item: pageUrl },
        ],
      },
    ],
  }
}

export function applyPageSeo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd = null,
} = {}) {
  const canonical = toCanonicalUrl(path)

  document.title = title

  upsertMeta({ name: 'description', content: description })
  upsertLink('canonical', canonical)

  upsertMeta({ name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' })

  upsertMeta({ property: 'og:type', content: ogType })
  upsertMeta({ property: 'og:site_name', content: SITE_NAME })
  upsertMeta({ property: 'og:title', content: title })
  upsertMeta({ property: 'og:description', content: description })
  upsertMeta({ property: 'og:url', content: canonical })
  upsertMeta({ property: 'og:image', content: ogImage })

  if (ogImage === DEFAULT_OG_IMAGE) {
    upsertMeta({ property: 'og:image:width', content: String(DEFAULT_OG_IMAGE_WIDTH) })
    upsertMeta({ property: 'og:image:height', content: String(DEFAULT_OG_IMAGE_HEIGHT) })
    upsertMeta({ property: 'og:image:alt', content: DEFAULT_OG_IMAGE_ALT })
    upsertMeta({ name: 'twitter:image:alt', content: DEFAULT_OG_IMAGE_ALT })
  } else {
    removeMeta({ property: 'og:image:width' })
    removeMeta({ property: 'og:image:height' })
    removeMeta({ property: 'og:image:alt' })
    removeMeta({ name: 'twitter:image:alt' })
    upsertMeta({ property: 'og:image:alt', content: title })
    upsertMeta({ name: 'twitter:image:alt', content: title })
  }

  upsertMeta({ name: 'twitter:card', content: 'summary_large_image' })
  upsertMeta({ name: 'twitter:title', content: title })
  upsertMeta({ name: 'twitter:description', content: description })
  upsertMeta({ name: 'twitter:image', content: ogImage })

  upsertJsonLd('seo-jsonld', jsonLd)
}
