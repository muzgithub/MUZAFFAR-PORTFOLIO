export function normalizeSearch(value) {
  return value.trim().toLowerCase()
}

export function projectMatchesQuery(project, query) {
  const term = normalizeSearch(query)

  if (!term) {
    return true
  }

  const haystack = [
    project.title,
    project.shortDescription,
    project.description,
    project.category,
    ...(project.categories ?? []),
    ...(project.technologies ?? []),
    ...(project.highlights ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()

  return haystack.includes(term)
}

export function projectMatchesCategory(project, category) {
  if (!category || category === 'All') {
    return true
  }

  const labels = [project.category, ...(project.categories ?? [])]

  if (category === 'PHP') {
    return labels.some((label) => label === 'PHP' || label === 'Core PHP')
  }

  if (category === 'React') {
    return labels.includes('React') || (project.technologies ?? []).includes('ReactJS')
  }

  if (category === 'WooCommerce') {
    return (project.technologies ?? []).includes('WooCommerce')
  }

  return labels.includes(category)
}

export function filterProjects(projects, { query = '', category = 'All' } = {}) {
  return projects.filter(
    (project) => projectMatchesCategory(project, category) && projectMatchesQuery(project, query),
  )
}

const TECH_GROUPS = [
  { name: 'Frontend', items: ['ReactJS', 'JavaScript', 'Twig', 'Bootstrap 5'] },
  { name: 'Backend', items: ['PHP', 'Core PHP', 'Laravel', 'Laravel 11', 'Node.js', 'Express.js'] },
  { name: 'CMS', items: ['WordPress', 'WooCommerce', 'Drupal', 'Custom Plugin Development', 'Custom Theme Development'] },
  { name: 'Database', items: ['MySQL', 'MongoDB'] },
  { name: 'APIs', items: ['REST APIs', 'JWT'] },
  { name: 'Payments', items: ['Razorpay'] },
  { name: 'AI', items: ['Gemini API', 'Groq API'] },
]

export function groupTechnologies(technologies = []) {
  const remaining = new Set(technologies)
  const groups = []

  for (const group of TECH_GROUPS) {
    const items = group.items.filter((item) => remaining.has(item))

    if (items.length > 0) {
      groups.push({ name: group.name, items })
      items.forEach((item) => remaining.delete(item))
    }
  }

  if (remaining.size > 0) {
    groups.push({
      name: 'Other',
      items: technologies.filter((item) => remaining.has(item)),
    })
  }

  return groups
}

export function getAdjacentProjects(projects, slug) {
  const index = projects.findIndex((project) => project.slug === slug)

  if (index === -1) {
    return { previous: null, next: null }
  }

  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

export function getRelatedProjects(projects, project, limit = 3) {
  const categorySet = new Set([project.category, ...(project.categories ?? [])])
  const techSet = new Set(project.technologies ?? [])

  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      const sharedCategories = [candidate.category, ...(candidate.categories ?? [])].filter((category) =>
        categorySet.has(category),
      ).length
      const sharedTechnologies = (candidate.technologies ?? []).filter((technology) => techSet.has(technology)).length

      return {
        project: candidate,
        score: sharedCategories + sharedTechnologies,
      }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }

      const aFeatured = a.project.featured ? 1 : 0
      const bFeatured = b.project.featured ? 1 : 0

      if (bFeatured !== aFeatured) {
        return bFeatured - aFeatured
      }

      return (a.project.featuredOrder ?? 99) - (b.project.featuredOrder ?? 99)
    })
    .slice(0, limit)
    .map((entry) => entry.project)
}

export function getProjectOverview(project) {
  if (project.description) {
    return project.description
  }

  return `${project.title} is a ${project.category} project.`
}

export function getProjectScreenshots(project) {
  const gallery = (project.gallery ?? []).filter(Boolean)

  if (gallery.length > 0) {
    return gallery
  }

  return project.image ? [project.image] : []
}
