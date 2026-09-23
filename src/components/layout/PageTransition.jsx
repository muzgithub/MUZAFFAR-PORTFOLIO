import { AnimatePresence, motion } from 'motion/react'
import { useLocation } from 'react-router-dom'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

function PageTransition({ children }) {
  const { pathname } = useLocation()
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return children
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="page-transition"
        initial={{ opacity: 0, clipPath: 'inset(0 0 2% 0)', scale: 0.995 }}
        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1 }}
        exit={{ opacity: 0, clipPath: 'inset(2% 0 0 0)', scale: 0.998 }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default PageTransition
