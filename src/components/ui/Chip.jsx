function Chip({ children, tone = 'secondary' }) {
  return <span className={`chip chip--${tone}`}>{children}</span>
}

export default Chip
