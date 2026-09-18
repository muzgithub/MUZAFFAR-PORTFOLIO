import { Link } from 'react-router-dom'

function Button({
  children,
  variant = 'primary',
  type = 'button',
  href,
  to,
  disabled = false,
  ...props
}) {
  const className = `btn btn--${variant}`

  if (to) {
    return (
      <Link className={className} to={to} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={className} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={className} type={type} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
