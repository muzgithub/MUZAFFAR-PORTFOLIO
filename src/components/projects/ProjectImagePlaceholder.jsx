function getProjectInitials(title) {
  const words = title
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) {
    return '?'
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  return `${words[0][0] ?? ''}${words[1][0] ?? ''}`.toUpperCase()
}

function ProjectImagePlaceholder({ project, className = '' }) {
  const primaryTechnology = project.technologies?.[0] ?? null
  const initials = getProjectInitials(project.title)
  const classes = ['project-image-placeholder', className].filter(Boolean).join(' ')

  return (
    <div
      className={classes}
      role="img"
      aria-label={`${project.title}: project preview unavailable`}
    >
      <div className="project-image-placeholder__grid" aria-hidden="true" />
      <div className="project-image-placeholder__content">
        <p className="project-image-placeholder__category label">{project.category}</p>
        <p className="project-image-placeholder__initials" aria-hidden="true">
          {initials}
        </p>
        {primaryTechnology ? (
          <p className="project-image-placeholder__technology caption">{primaryTechnology}</p>
        ) : null}
        <p className="project-image-placeholder__note">Project preview unavailable</p>
      </div>
    </div>
  )
}

export default ProjectImagePlaceholder
