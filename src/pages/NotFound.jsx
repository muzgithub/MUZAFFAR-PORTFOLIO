import { Link, useLocation } from 'react-router-dom'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { PAGE_SEO } from '../utils/seo.js'

function NotFound() {
  const { pathname } = useLocation()

  usePageSeo({ ...PAGE_SEO.notFound, path: pathname })

  return (
    <div className="page-placeholder container">
      <p className="label">404</p>
      <h1>Page not found</h1>
      <p className="text-secondary">The page you requested is not available on this portfolio.</p>
      <Link className="btn btn--primary" to="/">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound
