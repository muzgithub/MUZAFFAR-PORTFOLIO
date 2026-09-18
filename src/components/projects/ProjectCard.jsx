import { Link } from 'react-router-dom'
import ExternalLink from './ExternalLink.jsx'
import ProjectImagePlaceholder from './ProjectImagePlaceholder.jsx'
import Chip from '../ui/Chip.jsx'

function ProjectCard({ project }) {
  const tags = (project.technologies ?? []).slice(0, 4)

  return (
    <article className="project-card">
      <Link
        className="project-card__media"
        to={`/projects/${project.slug}`}
        aria-label={`${project.title} details`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} website screenshot`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <ProjectImagePlaceholder project={project} />
        )}
      </Link>
      <div className="project-card__body">
        <p className="label">{project.category}</p>
        <h3>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        {project.shortDescription ? <p className="caption">{project.shortDescription}</p> : null}
        {tags.length > 0 ? (
          <div className="cluster project-card__tags">
            {tags.map((tag) => (
              <Chip key={tag} tone="supporting">
                {tag}
              </Chip>
            ))}
          </div>
        ) : null}
        <div className="cluster project-card__actions">
          <Link className="btn btn--secondary" to={`/projects/${project.slug}`}>
            Details
          </Link>
          {project.url ? (
            <ExternalLink className="btn btn--ghost" href={project.url}>
              Live site
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
