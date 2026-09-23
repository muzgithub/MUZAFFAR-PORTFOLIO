import { motion, useScroll, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

function CaseStudyProgress() {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  if (reduced) {
    return null
  }

  return <motion.div className="case-study-progress" style={{ scaleX }} aria-hidden="true" />
}

export default CaseStudyProgress
