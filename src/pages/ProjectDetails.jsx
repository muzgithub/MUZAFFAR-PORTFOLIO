import { motion } from 'motion/react'
import { useEffect, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js'
import ProjectCaseStudy from '../components/projects/ProjectCaseStudy.jsx'
import { getProjectBySlug } from '../data/projects.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import {
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  SITE_URL,
  getProjectJsonLd,
  getProjectSeoDescription,
  getProjectSeoTitle,
} from '../utils/seo.js'

function ProjectDetails() {
  const reduced = usePrefersReducedMotion()
  const { slug } = useParams()
  const project = getProjectBySlug(slug)
  const projectPath = `/projects/${slug}`

  const pageSeo = useMemo(
    () =>
      project
        ? {
            title: getProjectSeoTitle(project),
            description: getProjectSeoDescription(project),
            path: projectPath,
            ogImage: project.image ? `${SITE_URL}${project.image}` : DEFAULT_OG_IMAGE,
            jsonLd: getProjectJsonLd(project),
          }
        : {
            ...PAGE_SEO.projectNotFound,
            path: projectPath,
          },
    [project, projectPath],
  )

  usePageSeo(pageSeo)

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

  return (
    <motion.div
      key={project.slug}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
    >
      <ProjectCaseStudy project={project} />
    </motion.div>
  )
}

export default ProjectDetails
