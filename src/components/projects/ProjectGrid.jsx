import { AnimatePresence, motion } from 'motion/react'
import ProjectCard from './ProjectCard.jsx'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.js'

function ProjectGrid({ projects }) {
  const reduced = usePrefersReducedMotion()

  return (
    <motion.div className="project-grid" layout={!reduced}>
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            layout={!reduced}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{
              duration: 0.36,
              delay: reduced ? 0 : Math.min(index, 8) * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <ProjectCard project={project} index={index + 1} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectGrid
