export const HOME_SCROLL_SECTIONS = [
  { key: 'home', selector: 'section.hero' },
  { key: 'projects', selector: '#projects' },
  { key: 'about', selector: '#about' },
  { key: 'skills', selector: '#skills' },
  { key: 'experience', selector: '#experience' },
]

function parseLength(value, rootFontSize) {
  const trimmed = value.trim()

  if (!trimmed) {
    return 0
  }

  if (trimmed.endsWith('rem')) {
    return parseFloat(trimmed) * rootFontSize
  }

  if (trimmed.endsWith('px')) {
    return parseFloat(trimmed)
  }

  return parseFloat(trimmed) || 0
}

export function getHomeScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function getHomeScrollActivationOffsetPx() {
  const root = document.documentElement
  const styles = getComputedStyle(root)
  const rootFontSize = parseFloat(styles.fontSize) || 16

  return (
    parseLength(styles.getPropertyValue('--header-height'), rootFontSize) +
    parseLength(styles.getPropertyValue('--space-4'), rootFontSize)
  )
}

export function getElementDocumentTop(element) {
  return element.getBoundingClientRect().top + window.scrollY
}

export function scrollToHomeTop() {
  window.scrollTo({
    top: 0,
    behavior: getHomeScrollBehavior(),
  })
}

export function scrollToHomeSection(sectionId, { force = false } = {}) {
  const target = document.getElementById(sectionId)

  if (!target) {
    return
  }

  const offset = getHomeScrollActivationOffsetPx()
  const currentTop = target.getBoundingClientRect().top

  if (!force && Math.abs(currentTop - offset) <= 3) {
    window.dispatchEvent(new Event('scroll'))
    return
  }

  const top = getElementDocumentTop(target) - offset

  window.scrollTo({
    top: Math.max(top, 0),
    behavior: getHomeScrollBehavior(),
  })
}

export function resolveHomeActiveSection() {
  const offset = getHomeScrollActivationOffsetPx()
  const scrollPosition = window.scrollY + offset

  const sections = HOME_SCROLL_SECTIONS.map(({ key, selector }) => {
    const element = document.querySelector(selector)
    return element ? { key, element } : null
  }).filter(Boolean)

  if (sections.length === 0) {
    return 'home'
  }

  let active = sections[0].key

  for (const section of sections) {
    if (getElementDocumentTop(section.element) <= scrollPosition + 1) {
      active = section.key
    }
  }

  return active
}
