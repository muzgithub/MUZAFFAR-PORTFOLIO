function ExternalLink({ href, className, children, ...props }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  )
}

export default ExternalLink
