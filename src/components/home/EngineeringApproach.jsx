import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useRef, useState } from 'react'
import { Reveal } from '../motion/Reveal.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

const STEPS = [
  { number: '01', title: 'Understand', text: 'Business requirements and user needs.' },
  { number: '02', title: 'Plan', text: 'Architecture, data flow and technical approach.' },
  { number: '03', title: 'Build', text: 'Turning the plan into a maintainable production-ready implementation.' },
  { number: '04', title: 'Optimize', text: 'Performance, SEO, security and reliability.' },
  { number: '05', title: 'Deliver', text: 'Tested production-ready solutions.' },
]

function EngineeringApproach() {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.3'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.08, 1])
  const progressScale = useTransform(scrollYProgress, [0, 1], [0.15, 1])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const clamped = Math.min(1, Math.max(0, value))
    const next = Math.min(STEPS.length - 1, Math.floor(clamped * STEPS.length))
    setActive((current) => (current === next ? current : next))
  })

  const step = STEPS[active]

  return (
    <section id="approach" ref={ref} className="pe-section pe-process-major pe-process-major--polish" aria-labelledby="pe-process-title">
      <div className="container pe-process-major__grid">
        <Reveal as="header" className="pe-process-major__head">
          <p className="pe-kicker">Process</p>
          <h2 id="pe-process-title">How I work</h2>
        </Reveal>

        <nav className="pe-process-major__nav" aria-label="Process steps">
          <div className="pe-process-major__rail" aria-hidden="true">
            <motion.span style={reduced ? { scaleY: 1 } : { scaleY: lineScale }} />
          </div>
          <ol>
            {STEPS.map((item, index) => (
              <li key={item.number} className={index === active ? 'is-active' : ''}>
                <button type="button" onClick={() => setActive(index)}>
                  <span>{item.number}</span> {item.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div className="pe-process-major__stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.number}
              initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 16 }}
              animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="pe-process-major__num">{step.number}</p>
              <h3 className="pe-process-major__title">{step.title}</h3>
              <p className="pe-body-muted pe-process-major__text">{step.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="pe-process-major__progress" aria-hidden="true">
          <div className="pe-process-major__progress-track">
            {STEPS.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
                tabIndex={-1}
              >
                {item.number}
              </button>
            ))}
            {!reduced ? (
              <motion.span className="pe-process-major__progress-fill" style={{ scaleX: progressScale }} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EngineeringApproach
