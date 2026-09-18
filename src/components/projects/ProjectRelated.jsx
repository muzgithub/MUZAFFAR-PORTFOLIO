import ProjectCard from './ProjectCard.jsx'

function ProjectRelated({ projects }) {
  if (!projects.length) {
    return null
  }

  return (
    <section className="case-study-section" aria-labelledby="related-projects-heading">
      <h2 id="related-projects-heading">Related projects</h2>
      <div className="project-grid project-grid--related">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectRelated
