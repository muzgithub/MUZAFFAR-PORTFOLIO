import { Link } from 'react-router-dom'
import Chip from '../ui/Chip.jsx'
import ExternalLink from './ExternalLink.jsx'
import ProjectPager from './ProjectPager.jsx'
import ProjectRelated from './ProjectRelated.jsx'
import ProjectStack from './ProjectStack.jsx'
import {
  getAdjacentProjects,
  getProjectOverview,
  getProjectScreenshots,
  getRelatedProjects,
  groupTechnologies,
} from '../../utils/projects.js'
import { projects } from '../../data/projects.js'

function DetailList({ title, groups, headingId }) {
  if (!groups.length) {
    return null
  }

  return (
    <section className="case-study-section" aria-labelledby={headingId}>
      <h2 id={headingId}>{title}</h2>
      <div className="case-study-detail-list">
        {groups.map((group) => (
          <div key={group.title} className="case-study-detail">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCaseStudy({ project }) {
  const extraCategories = (project.categories ?? []).filter((category) => category !== project.category)
  const stackGroups = groupTechnologies(project.technologies)
  const screenshots = getProjectScreenshots(project)
  const related = getRelatedProjects(projects, project)
  const { previous, next } = getAdjacentProjects(projects, project.slug)
  const overview = getProjectOverview(project)
  const hasRole = Boolean(project.role)
  const hasResponsibilities = (project.responsibilities ?? []).length > 0
  const hasChallenges =
    (project.challenges ?? []).length > 0 && (project.solutions ?? []).length > 0
  const hasResults = (project.results ?? []).length > 0
  const hasGithub = Boolean(project.githubUrl)

  return (
    <article className="case-study">
      <div className="container">
        <nav className="case-study__crumb" aria-label="Breadcrumb">
          <Link className="case-study__back" to="/projects">
            ← Back to Projects
          </Link>
        </nav>

        <header className="case-study-hero">
          <p className="label">{project.category}</p>
          <h1>{project.title}</h1>
          {project.shortDescription ? <p className="case-study-hero__lede">{project.shortDescription}</p> : null}
          {(project.technologies ?? []).length > 0 ? (
            <div className="cluster case-study-hero__tags">
              {project.technologies.map((technology) => (
                <Chip key={technology} tone="supporting">
                  {technology}
                </Chip>
              ))}
            </div>
          ) : null}
          {project.url ? (
            <div className="cluster case-study-hero__actions">
              <ExternalLink className="btn btn--primary" href={project.url}>
                Visit Live Project
              </ExternalLink>
              {hasGithub ? (
                <ExternalLink className="btn btn--secondary" href={project.githubUrl}>
                  View repository
                </ExternalLink>
              ) : null}
            </div>
          ) : null}
        </header>

        <section className="case-study-section" aria-labelledby="project-overview-heading">
          <h2 id="project-overview-heading">Project overview</h2>
          <p>{overview}</p>
        </section>

        <section className="case-study-section" aria-labelledby="project-metadata-heading">
          <h2 id="project-metadata-heading">Project metadata</h2>
          <dl className="case-study-meta">
            <div>
              <dt>Category</dt>
              <dd>{project.category}</dd>
            </div>
            {extraCategories.length > 0 ? (
              <div>
                <dt>Also listed as</dt>
                <dd>{extraCategories.join(', ')}</dd>
              </div>
            ) : null}
            {project.year ? (
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            ) : null}
            {project.type ? (
              <div>
                <dt>Type</dt>
                <dd>{project.type}</dd>
              </div>
            ) : null}
          </dl>
        </section>

        {hasRole ? (
          <section className="case-study-section" aria-labelledby="project-role-heading">
            <h2 id="project-role-heading">My role</h2>
            <p>{project.role}</p>
          </section>
        ) : null}

        {hasResponsibilities ? (
          <section className="case-study-section" aria-labelledby="project-responsibilities-heading">
            <h2 id="project-responsibilities-heading">Responsibilities</h2>
            <ul className="case-study-plain-list">
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <ProjectStack groups={stackGroups} />

        <DetailList title="Features" groups={project.features ?? []} headingId="project-features-heading" />

        <DetailList
          title="Technical implementation"
          groups={project.technicalImplementation ?? []}
          headingId="project-implementation-heading"
        />

        {hasChallenges ? (
          <section className="case-study-section" aria-labelledby="project-challenges-heading">
            <h2 id="project-challenges-heading">Challenges and solutions</h2>
            <div className="case-study-detail-list">
              <div className="case-study-detail">
                <h3>Challenges</h3>
                <ul>
                  {project.challenges.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="case-study-detail">
                <h3>Solutions</h3>
                <ul>
                  {project.solutions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : null}

        {hasResults ? (
          <section className="case-study-section" aria-labelledby="project-results-heading">
            <h2 id="project-results-heading">Results</h2>
            <ul className="case-study-plain-list">
              {project.results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {screenshots.length > 0 ? (
          <section className="case-study-section" aria-labelledby="project-screenshots-heading">
            <h2 id="project-screenshots-heading">{screenshots.length > 1 ? 'Screenshots' : 'Screenshot'}</h2>
            <div className="case-study-gallery">
              {screenshots.map((src, index) => (
                <figure key={src}>
                  <img
                    src={src}
                    alt={
                      screenshots.length > 1
                        ? `${project.title} website screenshot ${index + 1}`
                        : `${project.title} website screenshot`
                    }
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {project.url ? (
          <section className="case-study-section" aria-labelledby="live-project-heading">
            <h2 id="live-project-heading">Live project</h2>
            <p className="text-secondary">Open the public site in a new tab.</p>
            <ExternalLink className="btn btn--primary" href={project.url}>
              Visit Live Project
            </ExternalLink>
          </section>
        ) : null}

        <ProjectPager previous={previous} next={next} />
        <ProjectRelated projects={related} />
      </div>
    </article>
  )
}

export default ProjectCaseStudy
