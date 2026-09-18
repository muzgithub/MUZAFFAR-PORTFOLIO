function Card({ children, muted = false }) {
  return <article className={muted ? 'card card--muted' : 'card'}>{children}</article>
}

export default Card
