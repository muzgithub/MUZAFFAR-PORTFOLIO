import { experience } from '../../data/experience.js'
import SectionHeading from '../ui/SectionHeading.jsx'

function Experience() {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading eyebrow="Career" title="Experience" titleId="experience-title">
          Roles and responsibilities from the latest resume. Employment history is separate from the technical journey below.
        </SectionHeading>

        <ol className="experience__list">
          {experience.map((role) => (
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
  )
}

export default Experience
