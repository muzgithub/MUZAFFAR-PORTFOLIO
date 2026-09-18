import { getFeaturedProjects } from '../../data/projects.js'
import Button from '../ui/Button.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import ProjectGrid from '../projects/ProjectGrid.jsx'

function FeaturedProjects() {
  const featured = getFeaturedProjects()

  return (
    <section className="section featured-projects" id="projects" aria-labelledby="featured-projects-title">
      <div className="container">
        <div className="featured-projects__header">
          <SectionHeading eyebrow="Selected work" title="Featured projects" titleId="featured-projects-title">
            A focused set of WordPress, PHP, Laravel, Drupal, and MERN work. The full directory is on the Projects page.
          </SectionHeading>
          <Button to="/projects" variant="secondary">
            All projects
          </Button>
        </div>
        <ProjectGrid projects={featured} />
      </div>
    </section>
  )
}

export default FeaturedProjects
