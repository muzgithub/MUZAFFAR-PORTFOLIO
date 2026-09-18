import { skills } from '../../data/skills.js'
import Chip from '../ui/Chip.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

function Skills() {
  const established = skills.filter((group) => group.established)
  const exploring = skills.filter((group) => !group.established)

  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading eyebrow="Technology stack" title="Skills" titleId="skills-title">
          Established professional skills first. Exploring technologies are listed separately.
        </SectionHeading>

        <div className="skills__groups">
          {established.map((group) => (
            <div key={group.id} className="skills__group">
              <h3>{group.label}</h3>
              <div className="cluster">
                {group.items.map((item) => (
                  <Chip key={item} tone={group.tone}>
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          ))}
        </div>

        {exploring.map((group) => (
          <div key={group.id} className="skills__exploring">
            <h3>{group.label}</h3>
            {group.note ? <p className="caption">{group.note}</p> : null}
            <div className="cluster">
              {group.items.map((item) => (
                <Chip key={item} tone={group.tone}>
                  {item}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
