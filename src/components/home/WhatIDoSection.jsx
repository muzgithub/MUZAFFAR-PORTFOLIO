import { motion } from 'motion/react'
import { Reveal } from '../motion/Reveal.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

const PRINCIPLES = [
  { num: '01', title: 'Build', text: 'Custom websites, applications and e-commerce systems.' },
  { num: '02', title: 'Improve', text: 'Performance, UX, maintainability and scalability.' },
  { num: '03', title: 'Deliver', text: 'Production-ready solutions built around business requirements.' },
]

function WhatIDoSection() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="pe-section pe-intro" aria-labelledby="what-i-do-title">
      <div className="container pe-intro__grid">
        <Reveal>
          <p className="pe-kicker">Introduction</p>
          <h2 id="what-i-do-title" className="pe-intro__statement">
            I build web products for real business needs.
          </h2>
        </Reveal>
        <ul className="pe-intro__principles">
          {PRINCIPLES.map((item, index) => (
            <motion.li
              key={item.num}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.38, delay: reduced ? 0 : index * 0.06 }}
            >
              <span className="pe-kicker">{item.num}</span>
              <strong>{item.title}</strong>
              <p className="pe-body-muted">{item.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default WhatIDoSection
