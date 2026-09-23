import { AnimatePresence, motion } from 'motion/react'

import { useCallback, useRef, useState } from 'react'

import { Link } from 'react-router-dom'

import { projects } from '../../data/projects.js'

import ExternalLink from '../projects/ExternalLink.jsx'

import ShowcaseVisual from './ShowcaseVisual.jsx'

import MagneticButton from '../motion/MagneticButton.jsx'

import { Reveal } from '../motion/Reveal.jsx'

import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'



const SLUGS = [

  'localheromx',

  'carepilot-ai',

  'family-database',

  'pure-harvest-farms',

  'oil-for-less',

  'get-energy',

]



const transition = { duration: 0.58, ease: [0.22, 1, 0.36, 1] }



function ProjectShowcase() {

  const reduced = usePrefersReducedMotion()

  const featured = SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(Boolean)

  const [active, setActive] = useState(0)

  const navRef = useRef(null)

  const project = featured[active]



  const goTo = useCallback(

    (index) => {

      setActive((current) => {

        if (index < 0) {

          return featured.length - 1

        }

        if (index >= featured.length) {

          return 0

        }

        return index

      })

    },

    [featured.length],

  )



  const onNavKeyDown = useCallback(

    (event) => {

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {

        event.preventDefault()

        goTo(active + 1)

      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {

        event.preventDefault()

        goTo(active - 1)

      } else if (event.key === 'Home') {

        event.preventDefault()

        goTo(0)

      } else if (event.key === 'End') {

        event.preventDefault()

        goTo(featured.length - 1)

      }

    },

    [active, featured.length, goTo],

  )



  if (!project) {

    return null

  }



  const tags = (project.technologies ?? []).slice(0, 5)



  return (

    <section id="projects" className="pe-section pe-showcase pe-showcase--polish" aria-labelledby="pe-showcase-title">

      <div className="container">

        <Reveal as="header" className="pe-section__head">

          <p className="pe-kicker">Selected work</p>

          <h2 id="pe-showcase-title">Production products &amp; platforms</h2>

        </Reveal>



        <div className="pe-showcase__grid pe-showcase__grid--polish">

          <nav

            ref={navRef}

            className="pe-showcase__nav"

            aria-label="Featured projects"

            tabIndex={0}

            onKeyDown={onNavKeyDown}

          >

            <p className="pe-showcase__nav-hint" id="pe-showcase-nav-hint">

              Use arrow keys to change project when this list is focused.

            </p>

            <ul aria-describedby="pe-showcase-nav-hint">

              {featured.map((item, index) => (

                <li key={item.slug}>

                  <button

                    type="button"

                    className={index === active ? 'is-active' : ''}

                    onMouseEnter={() => setActive(index)}

                    onFocus={() => setActive(index)}

                    onClick={() => setActive(index)}

                    aria-current={index === active ? 'true' : undefined}

                    aria-label={`${item.title}, project ${index + 1} of ${featured.length}`}

                  >

                    <motion.span

                      className="pe-showcase__index"

                      animate={{ opacity: index === active ? 1 : 0.55, x: index === active ? 3 : 0 }}

                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}

                    >

                      {String(index + 1).padStart(2, '0')}

                    </motion.span>

                    <span className="pe-showcase__name">{item.title}</span>

                    <span className="pe-showcase__nav-arrow" aria-hidden="true">

                      →

                    </span>

                    {index === active && !reduced ? (

                      <motion.span

                        className="pe-showcase__indicator"

                        layoutId="pe-showcase-indicator"

                        transition={{ type: 'spring', stiffness: 360, damping: 36 }}

                      />

                    ) : null}

                  </button>

                </li>

              ))}

            </ul>

          </nav>



          <div className="pe-showcase__stage" aria-live="polite" aria-atomic="true">

            <AnimatePresence mode="wait" initial={false}>

              <motion.div

                key={project.slug}

                className="pe-showcase__panel pe-showcase__panel--split"

                initial={reduced ? false : { opacity: 0, clipPath: 'inset(3% 2% 3% 2%)', scale: 0.985 }}

                animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}

                exit={reduced ? undefined : { opacity: 0, scale: 0.985, clipPath: 'inset(2% 1% 2% 1%)' }}

                transition={transition}

              >

                <ShowcaseVisual project={project} />



                <div className="pe-showcase__body">

                  <div className="pe-showcase__meta">

                    <p className="pe-showcase__active-index">{String(active + 1).padStart(2, '0')}</p>

                    <p className="pe-kicker">{project.category}</p>

                    <h3>{project.title}</h3>

                    <p className="pe-body-muted">{project.shortDescription}</p>

                    {tags.length > 0 ? <p className="pe-showcase__tags">{tags.join(' · ')}</p> : null}

                    <div className="pe-showcase__links">

                      <Link to={`/projects/${project.slug}`} className="pe-link-arrow">

                        Case study →

                      </Link>

                      {project.url ? (

                        <ExternalLink href={project.url} className="pe-link-arrow">

                          Live site ↗

                        </ExternalLink>

                      ) : null}

                    </div>

                  </div>

                </div>

              </motion.div>

            </AnimatePresence>

          </div>

        </div>



        <div className="pe-showcase__cta">

          <MagneticButton to="/projects" variant="secondary">

            All {projects.length} projects →

          </MagneticButton>

        </div>

      </div>

    </section>

  )

}



export default ProjectShowcase
