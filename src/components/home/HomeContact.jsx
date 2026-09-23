import { motion, useTransform } from 'motion/react'
import { useRef } from 'react'
import { contactInfo } from '../../data/contact.js'
import { resumePdf } from '../../data/resume.js'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { usePointerParallax } from '../../hooks/usePointerParallax.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import ContactForm from '../contact/ContactForm.jsx'
import ExternalLink from '../projects/ExternalLink.jsx'
import MagneticButton from '../motion/MagneticButton.jsx'

const HEADLINE = ["Let's build", 'Something', 'useful.']

const DETAIL_ROWS = [
  {
    term: 'Email',
    content: (email) => (
      <a className="pe-contact-experience__link" href={`mailto:${email}`}>
        {email} →
      </a>
    ),
  },
  {
    term: 'LinkedIn',
    content: (_, linkedin) => (
      <ExternalLink className="pe-contact-experience__link" href={linkedin}>
        LinkedIn →
      </ExternalLink>
    ),
  },
  {
    term: 'Location',
    content: () => 'Tamil Nadu, India',
  },
  {
    term: 'Resume',
    content: () => (
      <a className="pe-contact-experience__link" href={resumePdf.href} download={resumePdf.filename}>
        Download resume →
      </a>
    ),
  },
]

function HomeContact() {
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const ref = useRef(null)
  const parallax = usePointerParallax({ max: 1, stiffness: 120, damping: 26 })
  const glowX = useTransform(parallax.springX, [-0.5, 0.5], ['40%', '58%'])
  const glowY = useTransform(parallax.springY, [-0.5, 0.5], ['36%', '52%'])
  const interactive = !reduced && finePointer

  const ease = [0.22, 1, 0.36, 1]
  const t = (delay, duration = 0.42) => (reduced ? { duration: 0 } : { duration, delay, ease })

  return (
    <section
      id="contact"
      ref={ref}
      className="pe-section pe-contact-experience"
      aria-labelledby="home-contact-title"
      onPointerMove={interactive ? parallax.onPointerMove : undefined}
      onPointerLeave={interactive ? parallax.onPointerLeave : undefined}
    >
      {interactive ? (
        <motion.div className="pe-contact-experience__glow" style={{ left: glowX, top: glowY }} aria-hidden="true" />
      ) : null}

      <div className="container pe-contact-experience__inner">
        <div className="pe-contact-experience__grid">
          <div className="pe-contact-experience__intro">
            <motion.p
              className="pe-kicker"
              initial={reduced ? false : { opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0.4 }}
              transition={t(0.04, 0.38)}
            >
              Contact
            </motion.p>
            <h2 id="home-contact-title" className="pe-contact-experience__headline">
              {HEADLINE.map((line, index) => (
                <motion.span
                  key={line}
                  initial={reduced ? false : { clipPath: 'inset(0 0 92% 0)', y: 6 }}
                  whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={t(0.06 + index * 0.06, 0.44)}
                >
                  {line}
                </motion.span>
              ))}
            </h2>
            <motion.p
              className="pe-contact-experience__lede pe-body-muted"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={t(0.28, 0.4)}
            >
              Have a project, opportunity or role in mind? Let&apos;s talk.
            </motion.p>

            <dl className="pe-contact-experience__details">
              {DETAIL_ROWS.map((row, index) => (
                <motion.div
                  key={row.term}
                  initial={reduced ? false : { opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={t(0.3 + index * 0.05, 0.38)}
                >
                  <dt>{row.term}</dt>
                  <dd>
                    {row.content(contactInfo.email, contactInfo.linkedin)}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>

          <motion.div
            className="pe-contact-experience__form-wrap"
            initial={reduced ? false : { clipPath: 'inset(0 0 6% 0)', y: 8 }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)', y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={t(0.22, 0.5)}
          >
            <ContactForm variant="home" />
          </motion.div>
        </div>

        <motion.footer
          className="pe-contact-experience__closing"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={t(0.12, 0.45)}
        >
          <div className="pe-contact-experience__divider" aria-hidden="true" />
          <div className="pe-contact-experience__closing-inner">
            <p className="pe-contact-experience__closing-title">
              <span>Looking for a</span>
              <span>software engineer?</span>
              <span className="pe-contact-experience__closing-accent">
                Let&apos;s talk. <span aria-hidden="true">→</span>
              </span>
            </p>
            <div className="pe-contact-experience__closing-actions">
              <MagneticButton
                href={`mailto:${contactInfo.email}`}
                variant="primary"
                className="pe-contact-experience__closing-cta"
              >
                Let&apos;s talk →
              </MagneticButton>
              <MagneticButton href={resumePdf.href} download={resumePdf.filename} variant="secondary">
                Download resume →
              </MagneticButton>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  )
}

export default HomeContact
