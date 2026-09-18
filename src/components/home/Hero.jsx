import { profile } from '../../data/profile.js'
import { resumePdf } from '../../data/resume.js'
import ExternalLink from '../projects/ExternalLink.jsx'
import Button from '../ui/Button.jsx'
import Chip from '../ui/Chip.jsx'

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="container hero__inner">
        <p className="label" id="hero-name">
          {profile.name}
        </p>
        <h1>{profile.title}</h1>
        <p className="hero__headline">{profile.headline}</p>

        <div className="hero__stack">
          <div>
            <p className="label">Primary</p>
            <div className="cluster hero__primary">
              {profile.hero.primary.map((item) => (
                <Chip key={item} tone="primary">
                  {item}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="label">Also</p>
            <div className="cluster">
              {profile.hero.secondary.map((item) => (
                <Chip key={item} tone="secondary">
                  {item}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="label">Full-stack</p>
            <div className="cluster">
              {profile.hero.fullstack.map((item) => (
                <Chip key={item} tone="fullstack">
                  {item}
                </Chip>
              ))}
            </div>
          </div>
        </div>

        <div className="cluster hero__ctas">
          <Button to="/projects">View Projects</Button>
          <Button href={resumePdf.href} download={resumePdf.filename} variant="secondary">
            Download Resume
          </Button>
          <Button to="/contact" variant="ghost">
            Contact Me
          </Button>
        </div>

        <div className="cluster hero__social">
          <ExternalLink href={profile.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={profile.github}>GitHub</ExternalLink>
        </div>
      </div>
    </section>
  )
}

export default Hero
