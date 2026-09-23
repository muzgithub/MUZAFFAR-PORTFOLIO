import { Link } from 'react-router-dom'
import ExternalLink from './ExternalLink.jsx'
import ProjectPreviewArt from './ProjectPreviewArt.jsx'
import ProjectVisualFrame from './ProjectVisualFrame.jsx'
import Chip from '../ui/Chip.jsx'

function ProjectCard({ project, index }) {
  const tags = (project.technologies ?? []).slice(0, 4)
  const number = index ? String(index).padStart(2, '0') : null

  return (
    <article className="project-card">
      {number ? <p className="project-card__number">{number}</p> : null}
      <Link
        className="project-card__media"
        to={`/projects/${project.slug}`}
        aria-label={`${project.title} details`}
      >
        <ProjectVisualFrame>
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} website screenshot`}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <ProjectPreviewArt project={project} />
          )}
        </ProjectVisualFrame>
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
          <Link className="btn btn--secondary project-card__case-link" to={`/projects/${project.slug}`}>
            View project →
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
