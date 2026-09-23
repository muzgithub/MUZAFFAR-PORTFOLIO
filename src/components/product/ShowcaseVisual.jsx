import { motion, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '../../hooks/useMediaQuery.js'
import { usePointerParallax } from '../../hooks/usePointerParallax.js'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'
import ProjectPreviewArt from '../projects/ProjectPreviewArt.jsx'
import ProjectVisualFrame from '../projects/ProjectVisualFrame.jsx'

function ShowcaseVisual({ project }) {
  const reduced = usePrefersReducedMotion()
  const finePointer = useMediaQuery('(pointer: fine)')
  const parallax = usePointerParallax({ max: 5, stiffness: 160, damping: 28 })
  const interactive = !reduced && finePointer
  const contentX = useTransform(parallax.translateX, (v) => v * 0.85)
  const contentY = useTransform(parallax.translateY, (v) => v * 0.85)
  const frameX = useTransform(parallax.translateX, (v) => v * -0.35)
  const frameY = useTransform(parallax.translateY, (v) => v * -0.35)

  const inner = project.image ? (
    <img src={project.image} alt={`${project.title} preview`} loading="lazy" decoding="async" />
  ) : (
    <ProjectPreviewArt project={project} />
  )

  return (
    <div
      className="pe-showcase__visual pe-showcase__visual--hero pe-showcase__visual--interactive"
      onPointerMove={interactive ? parallax.onPointerMove : undefined}
      onPointerLeave={interactive ? parallax.onPointerLeave : undefined}
    >
      <Link to={`/projects/${project.slug}`} className="pe-showcase__visual-link">
        <motion.div
          className="pe-showcase__visual-frame-shift"
          style={interactive ? { x: frameX, y: frameY } : undefined}
        >
          <ProjectVisualFrame>
            <motion.div
              className="pe-showcase__visual-content-shift"
              style={interactive ? { x: contentX, y: contentY } : undefined}
            >
              {inner}
            </motion.div>
          </ProjectVisualFrame>
        </motion.div>
        <span className="pe-showcase__visual-cta" aria-hidden="true">
          View case study →
        </span>
      </Link>
    </div>
  )
}

export default ShowcaseVisual
