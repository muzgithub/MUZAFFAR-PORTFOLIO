function ProjectVisualFrame({ children, className = '' }) {
  return (
    <div className={`project-visual-frame ${className}`.trim()}>
      <div className="project-visual-frame__chrome" aria-hidden="true">
        <span />
        <span />
        <span />
        <i className="project-visual-frame__bar" />
      </div>
      <div className="project-visual-frame__viewport">{children}</div>
    </div>
  )
}

export default ProjectVisualFrame
