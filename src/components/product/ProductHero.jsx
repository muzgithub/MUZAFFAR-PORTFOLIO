import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { resumePdf } from '../../data/resume.js'
import { profile } from '../../data/profile.js'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { usePointerParallax } from '../../hooks/usePointerParallax.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import MagneticButton from '../motion/MagneticButton.jsx'

const portraitSrc = '/My%20Pic/My_Pic.png'

const HEADLINE = [
  { text: 'I build', accent: false, motion: 'clip' },
  { text: 'digital products', accent: true, motion: 'clip-accent' },
  { text: 'that work.', accent: false, motion: 'clip' },
]

const META = ['6+ years', '27 projects', 'Web development', 'Tamil Nadu, India']

const HERO_TECH = [...profile.hero.primary, ...profile.hero.secondary.slice(0, 2)]

function ProductHero() {
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const ref = useRef(null)
  const parallax = usePointerParallax({ max: 10, stiffness: 150, damping: 28 })
  const bgShiftX = useTransform(parallax.translateX, (v) => v * 0.2)
  const bgShiftY = useTransform(parallax.translateY, (v) => v * 0.2)
  const gridShiftX = useTransform(parallax.translateX, (v) => v * 0.35)
  const gridShiftY = useTransform(parallax.translateY, (v) => v * 0.35)
  const portraitShiftX = useTransform(parallax.translateX, (v) => v * 0.72)
  const portraitShiftY = useTransform(parallax.translateY, (v) => v * 0.72)
  const frameShiftX = useTransform(parallax.translateX, (v) => v * -0.15)
  const frameShiftY = useTransform(parallax.translateY, (v) => v * -0.15)
  const metaShiftX = useTransform(parallax.translateX, (v) => v * 0.95)
  const metaShiftY = useTransform(parallax.translateY, (v) => v * 0.95)
  const lightX = useTransform(parallax.springX, [-0.5, 0.5], ['38%', '62%'])
  const lightY = useTransform(parallax.springY, [-0.5, 0.5], ['32%', '58%'])

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 28])

  const interactive = !reduced && finePointer

  const ease = [0.22, 1, 0.36, 1]
  const t = (delay, duration = 0.42) => (reduced ? { duration: 0 } : { duration, delay, ease })

  const lineInitial = (type) => {
    if (reduced) {
      return false
    }
    if (type === 'clip-accent') {
      return { opacity: 0, clipPath: 'inset(0 100% 0 0)', scale: 0.98 }
    }
    if (type === 'clip') {
      return { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
    }
    return { opacity: 0, y: 14 }
  }

  const lineAnimate = (type) => {
    if (type === 'clip-accent') {
      return { opacity: 1, clipPath: 'inset(0 0% 0 0)', scale: 1 }
    }
    if (type === 'clip') {
      return { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
    }
    return { opacity: 1, y: 0 }
  }

  return (
    <section
      id="home"
      ref={ref}
      className="pe-hero pe-hero--motion pe-hero--polish"
      aria-labelledby="pe-hero-title"
      onPointerMove={interactive ? parallax.onPointerMove : undefined}
      onPointerLeave={interactive ? parallax.onPointerLeave : undefined}
    >
      <div className="pe-hero__layers" aria-hidden="true">
        <motion.div
          className="pe-hero__ambient"
          style={interactive ? { x: bgShiftX, y: bgShiftY } : undefined}
        />
        <motion.div
          className="pe-hero__grid"
          style={interactive ? { x: gridShiftX, y: gridShiftY } : undefined}
        />
        {interactive ? (
          <motion.div className="pe-hero__spotlight" style={{ left: lightX, top: lightY }} />
        ) : null}
      </div>

      <div className="container pe-hero__layout">
        <motion.div className="pe-hero__copy" style={interactive ? { y: copyY } : undefined}>
          <motion.p
            className="pe-kicker"
            initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
            transition={t(0.06, 0.38)}
          >
            Software Engineer / Full Stack Developer
          </motion.p>
          <motion.p
            className="pe-hero__availability"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.1, 0.36)}
          >
            <span className="pe-hero__availability-dot" aria-hidden="true" />
            Open to software engineering opportunities
          </motion.p>
          <h1 id="pe-hero-title" className="pe-hero__title pe-hero__title--display">
            {HEADLINE.map((line, index) => (
              <motion.span
                key={line.text}
                className={line.accent ? 'pe-hero__accent' : undefined}
                initial={lineInitial(line.motion)}
                animate={lineAnimate(line.motion)}
                transition={
                  line.motion === 'clip-accent' && !reduced
                    ? { type: 'spring', stiffness: 280, damping: 30, delay: 0.16 + index * 0.05 }
                    : t(0.1 + index * 0.08, 0.46)
                }
              >
                {line.text}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="pe-hero__lede"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={t(0.32, 0.4)}
          >
            Software Engineer with 6+ years building business-focused web products, e-commerce platforms and custom
            digital solutions.
          </motion.p>
          <motion.div
            className="pe-hero__actions"
            initial={reduced ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={t(0.38, 0.4)}
          >
            <MagneticButton to="/#projects" variant="primary">
              View work →
            </MagneticButton>
            <MagneticButton href={resumePdf.href} download={resumePdf.filename} variant="secondary">
              Resume ↓
            </MagneticButton>
          </motion.div>
          <motion.ul
            className="pe-hero__tech pe-hero__tech--inline"
            initial={reduced ? false : { opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
            transition={t(0.44, 0.36)}
          >
            {HERO_TECH.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="pe-hero__visual">
          <motion.div
            className="pe-hero__portrait-wrap"
            style={interactive ? { x: portraitShiftX, y: portraitShiftY } : undefined}
            initial={reduced ? false : { opacity: 0, scale: 0.96, clipPath: 'inset(8% 6% 0 6%)' }}
            animate={{ opacity: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={t(0.42, 0.52)}
          >
            <div className="pe-hero__tech-frame" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <motion.div
              className="pe-hero__portrait-frame"
              style={interactive ? { x: frameShiftX, y: frameShiftY } : undefined}
            >
              <img
                src={portraitSrc}
                alt="Muzaffar Ahmed — professional portrait"
                width={720}
                height={900}
                decoding="async"
                fetchPriority="high"
              />
            </motion.div>
            <motion.ul
              className="pe-hero__meta-ring"
              style={interactive ? { x: metaShiftX, y: metaShiftY } : undefined}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={t(0.5, 0.42)}
            >
              {META.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ProductHero
