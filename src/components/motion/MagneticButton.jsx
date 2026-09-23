import { motion, useMotionValue, useSpring } from 'motion/react'
import { useRef } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import Button from '../ui/Button.jsx'

function MagneticButton({ children, strength = 4, className = '', ...props }) {
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  function onMove(event) {
    if (!ref.current) {
      return
    }

    const bounds = ref.current.getBoundingClientRect()
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * strength)
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * strength)
  }

  function onLeave() {
    x.set(0)
    y.set(0)
  }

  if (reduced || !finePointer) {
    return (
      <Button className={className} {...props}>
        {children}
      </Button>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY, display: 'inline-flex' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <Button className={className} {...props}>
        {children}
      </Button>
    </motion.div>
  )
}

export default MagneticButton
