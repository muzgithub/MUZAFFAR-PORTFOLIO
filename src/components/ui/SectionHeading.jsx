function SectionHeading({ eyebrow, title, children, titleId }) {
  return (
    <header className="section-heading">
      {eyebrow ? <p className="section-heading__eyebrow">{eyebrow}</p> : null}
      <h2 className="section-heading__title" id={titleId}>
        {title}
      </h2>
      {children ? <p className="section-heading__copy">{children}</p> : null}
    </header>
  )
}

export default SectionHeading
