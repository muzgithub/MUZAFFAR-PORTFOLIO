import { useMemo, useState } from 'react'
import { filterProjects } from '../utils/projects.js'

export function useProjectFilters(projects) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  const results = useMemo(
    () => filterProjects(projects, { query, category }),
    [projects, query, category],
  )

  const isFiltered = query.trim() !== '' || category !== 'All'

  const clearFilters = () => {
    setQuery('')
    setCategory('All')
  }

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    isFiltered,
    clearFilters,
  }
}
