import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { experience } from '../../data/experience.js'
import { Reveal } from '../motion/Reveal.jsx'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

const MARKERS = [
  { year: '2019', label: 'SM Matrix Solutions', index: 1 },
  { year: '2022', label: 'Colan Infotech', index: 0 },
  { year: 'Present', label: 'Colan Infotech', index: 0 },
]

function ExperienceTimeline() {
  const reduced = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 899px)')
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.72', 'end 0.32'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.05, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const clamped = Math.min(1, Math.max(0, value))
    const next = Math.min(experience.length - 1, Math.floor(clamped * experience.length))
    setActive((current) => (current === next ? current : next))
  })

  const job = experience[active]

  return (
    <section id="experience" ref={ref} className="pe-section pe-experience pe-experience--polish" aria-labelledby="pe-experience-title">
      <div className="container">
        <Reveal as="header" className="pe-section__head">
          <p className="pe-kicker">Experience</p>
          <h2 id="pe-experience-title">Engineering in production teams</h2>
        </Reveal>

        {!isMobile ? (
        <div className="pe-experience__layout">
          <div className="pe-experience__years" aria-hidden="true">
            {MARKERS.map((marker) => (
              <div
                key={marker.year}
                className={`pe-experience__year-block${active === marker.index ? ' is-active' : ''}`}
              >
                <p className="pe-experience__year">{marker.year}</p>
                <p className="pe-experience__org">{marker.label}</p>
              </div>
            ))}
          </div>

          <div className="pe-experience__rail" aria-hidden="true">
            <motion.span className="pe-experience__rail-fill" style={reduced ? { scaleY: 1 } : { scaleY: lineScale }} />
            <ol>
              {experience.map((item, index) => (
                <li key={item.id} className={index === active ? 'is-active' : ''}>
                  <motion.span
                    animate={
                      reduced
                        ? undefined
                        : { scale: index === active ? 1 : 0.85, opacity: index === active ? 1 : 0.55 }
                    }
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  />
                </li>
              ))}
            </ol>
          </div>

          <div className="pe-experience__detail">
            <AnimatePresence mode="wait">
              <motion.div
                key={job.id}
                initial={reduced ? false : { opacity: 0, y: 12, clipPath: 'inset(0 0 8% 0)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="pe-kicker">{job.period}</p>
                <h3>{job.company}</h3>
                <p className="pe-experience__role">{job.role}</p>
                <ul className="pe-experience__list">
                  {job.highlights.slice(0, 4).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        ) : null}

        {isMobile ? (
          <ol className="pe-experience__mobile">
            {experience.map((item) => (
              <li key={item.id}>
                <p className="pe-kicker">{item.period}</p>
                <h3>{item.company}</h3>
                <p className="pe-experience__role">{item.role}</p>
                <ul className="pe-experience__list">
                  {item.highlights.slice(0, 3).map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  )
}

export default ExperienceTimeline
