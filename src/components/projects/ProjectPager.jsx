import { Link } from 'react-router-dom'

function ProjectPager({ previous, next }) {
  if (!previous && !next) {
    return null
  }

  return (
    <nav className="case-study-pager" aria-label="Adjacent projects">
      {previous ? (
        <Link className="case-study-pager__link" to={`/projects/${previous.slug}`}>
          <span className="label">Previous project</span>
          <span>{previous.title}</span>
        </Link>
      ) : (
        <span className="case-study-pager__spacer" aria-hidden="true" />
      )}
      {next ? (
        <Link className="case-study-pager__link case-study-pager__link--next" to={`/projects/${next.slug}`}>
          <span className="label">Next project</span>
          <span>{next.title}</span>
        </Link>
      ) : null}
    </nav>
  )
}

export default ProjectPager
