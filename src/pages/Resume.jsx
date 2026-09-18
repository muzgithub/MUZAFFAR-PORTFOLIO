import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ExternalLink from '../components/projects/ExternalLink.jsx'
import ResumePdfActions from '../components/resume/ResumePdfActions.jsx'
import Button from '../components/ui/Button.jsx'
import Chip from '../components/ui/Chip.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { resume, resumePdf } from '../data/resume.js'
import { usePageSeo } from '../hooks/usePageSeo.js'
import { PAGE_SEO } from '../utils/seo.js'

function Resume() {
  usePageSeo(PAGE_SEO.resume)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  return (
    <article className="resume-page">
      <header className="resume-hero">
        <div className="container resume-hero__inner">
          <p className="label">Resume</p>
          <h1>{resume.name}</h1>
          <p className="resume-hero__title">{resume.title}</p>
          <p className="resume-hero__lede">{resume.heroSummary}</p>
          <ul className="resume-hero__contact">
            <li>
              <a href={`mailto:${resume.contact.email}`}>{resume.contact.email}</a>
            </li>
            <li>
              <a href={`tel:${resume.contact.phone.replace(/\s/g, '')}`}>{resume.contact.phone}</a>
            </li>
            <li>{resume.contact.location}</li>
            <li>
              <a href={resume.contact.linkedin} target="_blank" rel="noopener noreferrer">
                {resume.contact.linkedinLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <ResumePdfActions />
        </div>
      </header>

      <section className="resume-section" aria-labelledby="resume-summary-heading">
        <div className="container">
          <SectionHeading eyebrow="Overview" title="Professional summary" titleId="resume-summary-heading" />
          <div className="resume-prose">
            {resume.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="resume-section resume-section--muted" aria-labelledby="resume-skills-heading">
        <div className="container">
          <SectionHeading eyebrow="Capabilities" title="Skills" titleId="resume-skills-heading" />
          <div className="resume-skills">
            {resume.skills.map((group) => (
              <div key={group.id} className="resume-skills__group">
                <h3>{group.label}</h3>
                <div className="cluster">
                  {group.items.map((item) => (
                    <Chip key={item} tone="supporting">
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="resume-section" aria-labelledby="resume-experience-heading">
        <div className="container">
          <SectionHeading eyebrow="Career" title="Professional experience" titleId="resume-experience-heading" />
          <ol className="experience__list resume-experience">
            {resume.experience.map((role) => (
              <li key={role.id} className="experience__role">
                <div className="experience__meta">
                  <p className="experience__period">{role.period}</p>
                  <h3>{role.role}</h3>
                  <p className="experience__company">{role.company}</p>
                </div>
                <ul className="experience__highlights">
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="resume-section resume-section--muted" aria-labelledby="resume-projects-heading">
        <div className="container">
          <SectionHeading eyebrow="Selected work" title="Projects" titleId="resume-projects-heading">
            Projects listed on the latest resume. This list is separate from the full project directory.
          </SectionHeading>
          <div className="resume-projects">
            {resume.projects.map((project) => (
              <article key={project.id} className="resume-project">
                <h3>{project.title}</h3>
                <div className="cluster resume-project__tech">
                  {project.technologies.map((item) => (
                    <Chip key={item} tone="supporting">
                      {item}
                    </Chip>
                  ))}
                </div>
                <ul className="experience__highlights">
                  {project.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {project.caseStudySlug ? (
                  <Link className="btn btn--secondary resume-project__link" to={`/projects/${project.caseStudySlug}`}>
                    View Case Study
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="resume-section" aria-labelledby="resume-education-heading">
        <div className="container">
          <SectionHeading eyebrow="Background" title="Education" titleId="resume-education-heading" />
          <div className="resume-education">
            <p className="experience__period">{resume.education.period}</p>
            <h3>{resume.education.degree}</h3>
            <p className="text-secondary">{resume.education.institution}</p>
          </div>
        </div>
      </section>

      <section className="resume-section resume-section--muted" aria-labelledby="resume-awards-heading">
        <div className="container">
          <SectionHeading eyebrow="Recognition" title="Awards" titleId="resume-awards-heading" />
          <ul className="awards__list resume-awards">
            {resume.awards.map((award) => (
              <li key={award.id} className="awards__item">
                <h3>{award.title}</h3>
                <p className="awards__org">{award.organization}</p>
                <p className="caption">{award.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="resume-section resume-cta" aria-labelledby="resume-cta-heading">
        <div className="container resume-cta__inner">
          <h2 id="resume-cta-heading">Interested in working together?</h2>
          <p className="text-secondary">Reach out through the contact page, or download the resume PDF.</p>
          <div className="cluster resume-actions">
            <Link className="btn btn--primary" to="/contact">
              Contact
            </Link>
            <Button href={resumePdf.href} download={resumePdf.filename} variant="secondary">
              Download Resume
            </Button>
            <ExternalLink className="btn btn--ghost" href={resumePdf.href}>
              View Resume PDF
            </ExternalLink>
          </div>
        </div>
      </section>
    </article>
  )
}

export default Resume
