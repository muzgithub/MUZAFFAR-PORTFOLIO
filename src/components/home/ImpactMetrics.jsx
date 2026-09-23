import { motion } from 'motion/react'
import AnimatedCounter from '../ui/AnimatedCounter.jsx'
import { projects } from '../../data/projects.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

const STATS = [
  { value: '6+', label: 'Years' },
  { value: String(projects.length), label: 'Projects' },
  { value: '15+', label: 'Custom WordPress / WooCommerce' },
  { value: '90+', label: 'Lighthouse / PageSpeed' },
]

function ImpactMetrics() {
  const reduced = usePrefersReducedMotion()

  return (
    <section className="pe-impact" aria-label="Impact metrics">
      <div className="container pe-impact__strip">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="pe-impact__cell"
            initial={reduced ? false : { opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.05 }}
          >
            <p className="pe-impact__value">
              <AnimatedCounter value={stat.value} />
            </p>
            <p className="pe-impact__label">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default ImpactMetrics
