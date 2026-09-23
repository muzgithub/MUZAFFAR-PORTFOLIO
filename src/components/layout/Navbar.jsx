import { LayoutGroup, motion } from 'motion/react'

import { useEffect, useId, useRef, useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

import { profile } from '../../data/profile.js'

import { resumePdf } from '../../data/resume.js'

import { useHomeScrollSpy } from '../../hooks/useHomeScrollSpy.js'

import { scrollToHomeSection, scrollToHomeTop } from '../../utils/homeScroll.js'

import ThemeToggle from '../ui/ThemeToggle.jsx'



function isItemActive(item, pathname, hash, homeActiveSection) {

  if (pathname === '/') {

    if (item.hash) {

      return homeActiveSection === item.hash.replace('#', '')

    }

    return false

  }

  if (item.hash === '#projects') {

    return pathname === '/projects' || pathname.startsWith('/projects/')

  }

  if (item.hash) {

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

  const [scrolled, setScrolled] = useState(false)

  const menuId = useId()

  const toggleRef = useRef(null)

  const firstLinkRef = useRef(null)

  const reduced = usePrefersReducedMotion()



  useEffect(() => {

    const onScroll = () => setScrolled(window.scrollY > 20)

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)

  }, [])



  function handleLogoClick(event) {

    if (pathname === '/') {

      event.preventDefault()

      if (hash) {

        navigate('/', { replace: true })

      }

      scrollToHomeTop()

    }

  }



  function handleNavClick(item, event) {

    const sectionId = item.hash?.replace('#', '')

    if (!sectionId || pathname !== '/') {

      return

    }

    if (hash === item.hash) {

      event.preventDefault()

      scrollToHomeSection(sectionId, { force: true })

    }

  }



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



  const onHero = isHome && !scrolled



  return (

    <header className={`pe-nav ${onHero ? 'pe-nav--top' : ''} ${scrolled ? 'pe-nav--scrolled' : ''}`}>

      <div className="pe-nav__inner container">

        <div className="pe-nav__bar">

          <Link

            className="pe-nav__brand"

            to="/"

            aria-label={`${profile.name}, home`}

            onClick={handleLogoClick}

          >

            MUZAFFAR.AHMED

          </Link>



          <nav className="pe-nav__links" aria-label="Primary">

            <LayoutGroup id="pe-nav">

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

                    {active && !reduced ? (

                      <motion.span

                        className="pe-nav__pill"

                        layoutId="pe-nav-pill"

                        transition={{ type: 'spring', stiffness: 380, damping: 36 }}

                      />

                    ) : null}

                    {item.label}

                  </Link>

                )

              })}

            </LayoutGroup>

          </nav>



          <div className="pe-nav__tools">

            <a className="pe-nav__resume" href={resumePdf.href} download={resumePdf.filename}>

              Resume

            </a>

            <ThemeToggle />

            <button

              ref={toggleRef}

              type="button"

              className="pe-nav__menu"

              aria-expanded={open}

              aria-controls={menuId}

              onClick={() => setOpen((current) => !current)}

            >

              <span className="visually-hidden">{open ? 'Close menu' : 'Menu'}</span>

              <span aria-hidden="true" />

              <span aria-hidden="true" />

            </button>

          </div>

        </div>

      </div>



      {open ? (

        <div className="pe-nav__drawer" id={menuId} role="dialog" aria-modal="true" aria-label="Menu">

          <nav className="pe-nav__drawer-nav">

            {profile.navigation.map((item, index) => (

              <Link

                key={item.label}

                ref={index === 0 ? firstLinkRef : undefined}

                to={item.to}

                onClick={(event) => {

                  handleNavClick(item, event)

                  setOpen(false)

                }}

              >

                {item.label}

              </Link>

            ))}

            <a href={resumePdf.href} download={resumePdf.filename}>

              Download resume

            </a>

          </nav>

        </div>

      ) : null}

    </header>

  )

}



export default Navbar
