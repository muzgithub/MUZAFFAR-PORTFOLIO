const SLUG_THEME = {
  localheromx: 'wp',
  'carepilot-ai': 'mern',
  'family-database': 'laravel',
  'pure-harvest-farms': 'drupal',
  'oil-for-less': 'php',
  'get-energy': 'energy',
}

function ProjectPreviewArt({ project }) {
  const slug = project.slug ?? project.id
  const theme = SLUG_THEME[slug] ?? 'default'

  const initials = project.title
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase()

  const stack = (project.technologies ?? []).slice(0, 3).join(' · ')

  return (
    <div className={`project-preview-art project-preview-art--${theme}`} aria-hidden="true">
      <div className="project-preview-art__grid" />
      <div className="project-preview-art__geometry" />
      <div className="project-preview-art__content">
        <span className="project-preview-art__category">{project.category}</span>
        <span className="project-preview-art__initials">{initials || 'P'}</span>
        <span className="project-preview-art__title">{project.title}</span>
        {stack ? <span className="project-preview-art__stack">{stack}</span> : null}
      </div>
    </div>
  )
}

export default ProjectPreviewArt
