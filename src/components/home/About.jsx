import { profile } from '../../data/profile.js'
import SectionHeading from '../ui/SectionHeading.jsx'

const aboutPortraitSrc = '/My%20Pic/My_Pic.png'

function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__content">
          <SectionHeading eyebrow="About" title="A WordPress and PHP foundation, expanded into full-stack work" titleId="about-title" />
          <div className="about__copy">
            {profile.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="about__path">
            <p className="label">{profile.about.evolutionLabel}</p>
            <ol className="about__evolution">
              {profile.about.evolution.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
        <figure className="about__media">
          <img
            src={aboutPortraitSrc}
            alt="Muzaffar Ahmed — Software Engineer and Full Stack Developer"
            loading="lazy"
            decoding="async"
            width={800}
            height={1000}
          />
        </figure>
      </div>
    </section>
  )
}

export default About
