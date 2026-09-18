import Chip from '../ui/Chip.jsx'

function ProjectStack({ groups }) {
  if (!groups.length) {
    return null
  }

  return (
    <section className="case-study-section" aria-labelledby="technology-stack-heading">
      <h2 id="technology-stack-heading">Technology stack</h2>
      <div className="case-study-stack">
        {groups.map((group) => (
          <div key={group.name} className="case-study-stack__group">
            <h3>{group.name}</h3>
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
    </section>
  )
}

export default ProjectStack
