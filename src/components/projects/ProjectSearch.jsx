function ProjectSearch({ value, onChange, id = 'project-search' }) {
  return (
    <div className="field project-search">
      <label className="field__label" htmlFor={id}>
        Search projects
      </label>
      <input
        id={id}
        className="field__control"
        type="search"
        name="q"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, technology, or category"
        autoComplete="off"
      />
    </div>
  )
}

export default ProjectSearch
