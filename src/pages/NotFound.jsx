import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Reveal } from '../components/motion/Reveal.jsx'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { PAGE_SEO } from '../utils/seo.js'

function NotFound() {
  const { pathname } = useLocation()

  usePageSeo({ ...PAGE_SEO.notFound, path: pathname })

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <Reveal className="page-placeholder container">
      <p className="label">404</p>
      <h1>Page not found</h1>
      <p className="text-secondary">The page you requested is not available on this portfolio.</p>
      <Link className="btn btn--primary" to="/">
        Back to Home
      </Link>
    </Reveal>
  )
}

export default NotFound
