import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProjectCaseStudy from '../components/projects/ProjectCaseStudy.jsx'
import { getProjectBySlug } from '../data/projects.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import {
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  SITE_URL,
  getProjectSeoDescription,
  getProjectSeoTitle,
} from '../utils/seo.js'

function ProjectDetails() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const projectPath = `/projects/${slug}`

  usePageSeo(
    project
      ? {
          title: getProjectSeoTitle(project),
          description: getProjectSeoDescription(project),
          path: projectPath,
          ogImage: project.image ? `${SITE_URL}${project.image}` : DEFAULT_OG_IMAGE,
        }
      : {
          ...PAGE_SEO.projectNotFound,
          path: projectPath,
        },
  )

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [slug])

  if (!project) {
    return (
      <div className="case-study case-study--missing">
        <div className="container">
          <p className="label">Projects</p>
          <h1>Project not found</h1>
          <p className="text-secondary">
            That project is not in this portfolio. It may have an outdated URL, or it is not published here.
          </p>
          <Link className="btn btn--primary" to="/projects">
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return <ProjectCaseStudy project={project} />
}

export default ProjectDetails
