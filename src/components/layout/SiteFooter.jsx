import { Link } from 'react-router-dom'
import { profile } from '../../data/profile.js'
import { resumePdf } from '../../data/resume.js'
import ExternalLink from '../projects/ExternalLink.jsx'

function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer site-footer--premium">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{profile.name}</p>
          <p className="text-secondary">{profile.title}</p>
        </div>
        <nav className="site-footer__links" aria-label="Footer">
          <Link to="/#projects">Work</Link>
          <Link to="/#about">About</Link>
          <Link to="/#contact">Contact</Link>
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          <a href={resumePdf.href} download={resumePdf.filename}>
            Resume
          </a>
        </nav>
        <p className="site-footer__copy text-secondary">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
