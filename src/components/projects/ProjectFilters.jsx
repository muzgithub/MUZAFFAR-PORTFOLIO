import { projectFilters } from '../../data/projects.js'

function ProjectFilters({ value, onChange }) {
  return (
    <div className="project-filters">
      <p className="field__label" id="project-filters-label">
        Filter by category
      </p>
      <div className="project-filters__list" role="group" aria-labelledby="project-filters-label">
        {projectFilters.map((filter) => {
          const selected = value === filter

          return (
            <button
              key={filter}
              type="button"
              className={selected ? 'filter-chip is-active' : 'filter-chip'}
              aria-pressed={selected}
              onClick={() => onChange(filter)}
            >
              {filter}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectFilters
