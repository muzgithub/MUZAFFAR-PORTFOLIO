import { LayoutGroup, motion } from 'motion/react'
import { projectFilters } from '../../data/projects.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

function ProjectFilters({ value, onChange }) {
  const reduced = usePrefersReducedMotion()

  return (
    <div className="project-filters">
      <p className="field__label" id="project-filters-label">
        Filter by category
      </p>
      <LayoutGroup id="project-filters">
        <div className="project-filters__list" role="group" aria-labelledby="project-filters-label">
          {projectFilters.map((filter) => {
            const selected = value === filter

            return (
              <button
                key={filter}
                type="button"
                className={`filter-chip filter-chip--motion ${selected ? 'is-active' : ''}`}
                aria-pressed={selected}
                onClick={() => onChange(filter)}
              >
                {selected && !reduced ? (
                  <motion.span
                    className="filter-chip__indicator"
                    layoutId="project-filter-indicator"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span>{filter}</span>
              </button>
            )
          })}
        </div>
      </LayoutGroup>
    </div>
  )
}

export default ProjectFilters
