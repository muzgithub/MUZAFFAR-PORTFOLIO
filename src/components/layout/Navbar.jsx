import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { profile } from '../../data/profile.js'
import { resumePdf } from '../../data/resume.js'
import { useHomeScrollSpy } from '../../hooks/useHomeScrollSpy.js'
import { scrollToHomeSection, scrollToHomeTop } from '../../utils/homeScroll.js'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import Button from '../ui/Button.jsx'

function isItemActive(item, pathname, hash, homeActiveSection) {
  if (pathname === '/') {
    if (item.end) {
      return homeActiveSection === 'home'
    }

    if (item.hash) {
      return homeActiveSection === item.hash.replace('#', '')
    }

    if (item.hash === '#projects') {
      return homeActiveSection === 'projects'
    }

    return false
  }

  if (item.hash === '#projects') {
    return pathname === '/projects' || pathname.startsWith('/projects/')
  }

  if (item.hash) {
    return false
  }

  if (item.end) {
    return false
  }

  return pathname === item.to
}

function Navbar() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const homeActiveSection = useHomeScrollSpy(isHome, hash)
  const [open, setOpen] = useState(false)

  function handleNavClick(item, event) {
    if (item.end) {
      if (pathname === '/') {
        event.preventDefault()
        if (hash) {
          navigate('/', { replace: true })
        }
        scrollToHomeTop()
      }
      return
    }

    const sectionId = item.hash?.replace('#', '')

    if (!sectionId || pathname !== '/') {
      return
    }

    if (hash === item.hash) {
      event.preventDefault()
      scrollToHomeSection(sectionId, { force: true })
    }
  }
  const menuId = useId()
  const toggleRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const main = document.getElementById('main-content')

    if (!open) {
      document.body.style.overflow = ''
      main?.removeAttribute('aria-hidden')
      return undefined
    }

    document.body.style.overflow = 'hidden'
    main?.setAttribute('aria-hidden', 'true')
    firstLinkRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      main?.removeAttribute('aria-hidden')
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="site-logo" to="/" aria-label={`${profile.name}, home`}>
          <span className="site-logo__mark" aria-hidden="true">
            MA
          </span>
          <span className="site-logo__name site-logo__name--full">{profile.name}</span>
          <span className="site-logo__name site-logo__name--short">{profile.shortName}</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {profile.navigation.map((item) => {
            const active = isItemActive(item, pathname, hash, homeActiveSection)

            return (
              <Link
                key={item.label}
                to={item.to}
                className={active ? 'is-active' : undefined}
                aria-current={active ? 'page' : undefined}
                onClick={(event) => handleNavClick(item, event)}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="site-header__actions">
          <Button href={resumePdf.href} download={resumePdf.filename} variant="secondary">
            Download Resume
          </Button>
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((current) => !current)}
          >
            <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="site-menu is-open" id={menuId} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className="site-menu__nav" aria-label="Mobile">
            {profile.navigation.map((item, index) => {
              const active = isItemActive(item, pathname, hash, homeActiveSection)

              return (
                <Link
                  key={item.label}
                  ref={index === 0 ? firstLinkRef : undefined}
                  to={item.to}
                  className={active ? 'is-active' : undefined}
                  aria-current={active ? 'page' : undefined}
                  onClick={(event) => {
                    handleNavClick(item, event)
                    setOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
            <Button href={resumePdf.href} download={resumePdf.filename} variant="primary">
              Download Resume
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
