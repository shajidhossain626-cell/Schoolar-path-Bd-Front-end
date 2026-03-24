import { createContext, useContext, useState, useCallback } from 'react'
import { SCHOLARSHIPS } from '@data/scholarships'

const ScholarshipContext = createContext(null)

export function ScholarshipProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set([1, 2, 5]))
  const [filters, setFilters] = useState({
    countries: [], degrees: [], funding: [], fields: [],
    deadline: '', sort: 'latest', search: '',
  })

  const toggleSave = useCallback((id) => {
    setSavedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds])

  const getFiltered = useCallback((overrides = {}) => {
    const f = { ...filters, ...overrides }
    const DAY = 86400000
    const now = Date.now()

    let result = SCHOLARSHIPS.filter(s => {
      if (f.countries.length && !f.countries.includes(s.country)) return false
      if (f.degrees.length && !f.degrees.some(d => s.degree.includes(d))) return false
      if (f.funding.length && !f.funding.includes(s.funding)) return false
      if (f.fields.length && !f.fields.includes(s.field)) return false
      if (f.deadline) {
        const diff = new Date(s.deadlineDate) - now
        if (f.deadline === 'month'  && diff > 30 * DAY)  return false
        if (f.deadline === '3month' && diff > 90 * DAY)  return false
        if (f.deadline === '6month' && diff > 180 * DAY) return false
      }
      if (f.search) {
        const hay = `${s.name} ${s.country} ${s.tags.join(' ')} ${s.desc}`.toLowerCase()
        if (!hay.includes(f.search.toLowerCase())) return false
      }
      return true
    })

    if (f.sort === 'deadline') result.sort((a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate))
    else result.sort((a, b) => b.id - a.id)

    return result
  }, [filters])

  const savedScholarships = SCHOLARSHIPS.filter(s => savedIds.has(s.id))

  return (
    <ScholarshipContext.Provider value={{
      scholarships: SCHOLARSHIPS, savedIds, savedScholarships,
      filters, setFilters, toggleSave, isSaved, getFiltered,
    }}>
      {children}
    </ScholarshipContext.Provider>
  )
}

export const useScholarships = () => {
  const ctx = useContext(ScholarshipContext)
  if (!ctx) throw new Error('useScholarships must be inside ScholarshipProvider')
  return ctx
}
