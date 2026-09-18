import ProjectFilters from '../components/projects/ProjectFilters.jsx'
import ProjectGrid from '../components/projects/ProjectGrid.jsx'
import ProjectSearch from '../components/projects/ProjectSearch.jsx'
import Button from '../components/ui/Button.jsx'
import { projects } from '../data/projects.js'
import { useProjectFilters } from '../hooks/useProjectFilters.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { PAGE_SEO } from '../utils/seo.js'

function Projects() {
  usePageSeo(PAGE_SEO.projects)

  const { query, setQuery, category, setCategory, results, isFiltered, clearFilters } =
    useProjectFilters(projects)

  return (
    <div className="projects-page">
      <div className="container">
        <header className="projects-page__header">
          <p className="label">Directory</p>
          <h1>Projects</h1>
          <p className="text-secondary">
            {results.length} of {projects.length} projects
            {isFiltered ? ' matching the current search and filter' : ''}
          </p>
        </header>

        <div className="projects-page__controls">
          <ProjectSearch value={query} onChange={setQuery} />
          <ProjectFilters value={category} onChange={setCategory} />
          {isFiltered ? (
            <Button type="button" variant="ghost" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </div>

        {results.length > 0 ? (
          <ProjectGrid projects={results} />
        ) : (
          <div className="projects-empty" role="status">
            <h2>No matching projects</h2>
            <p className="text-secondary">Try another search term or clear the current filter.</p>
            <Button type="button" variant="secondary" onClick={clearFilters}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
