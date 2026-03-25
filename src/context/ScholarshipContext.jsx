import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { scholarshipAPI } from '../services/api'
import { SCHOLARSHIPS } from '@data/scholarships'

const ScholarshipContext = createContext(null)

export function ScholarshipProvider({ children }) {
  const [savedIds, setSavedIds] = useState(new Set())
  const [scholarships, setScholarships] = useState(SCHOLARSHIPS) // fallback to local data
  const [filters, setFilters] = useState({
    countries: [], degrees: [], funding: [], fields: [],
    deadline: '', sort: 'latest', search: '',
  })

  // Load saved scholarships from backend on mount
  useEffect(() => {
    const token = localStorage.getItem('sp_token')
    if (token) {
      scholarshipAPI.saved().then(res => {
        if (res.data?.success) {
          const ids = new Set(res.data.data.map(s => s.id || s.slug))
          setSavedIds(ids)
        }
      }).catch(() => {})
    }
  }, [])

  const toggleSave = useCallback(async (id) => {
    const token = localStorage.getItem('sp_token')
    if (!token) {
      setSavedIds(prev => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
      return
    }
    try {
      const res = await scholarshipAPI.save(id)
      if (res.data?.success) {
        const saved = res.data.data.saved
        setSavedIds(prev => {
          const next = new Set(prev)
          if (saved) next.add(id)
          else next.delete(id)
          return next
        })
      }
    } catch {
      // fallback to local toggle
      setSavedIds(prev => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }
  }, [])

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds])

  const getFiltered = useCallback((overrides = {}) => {
    const f = { ...filters, ...overrides }
    const DAY = 86400000
    const now = Date.now()

    let result = scholarships.filter(s => {
      if (f.countries.length && !f.countries.includes(s.country)) return false
      if (f.degrees.length && !f.degrees.some(d => {
        const deg = typeof s.degree === 'string' ? JSON.parse(s.degree || '[]') : (s.degree || [])
        return deg.includes(d)
      })) return false
      if (f.funding.length && !f.funding.includes(s.funding)) return false
      if (f.fields.length && !f.fields.includes(s.field)) return false
      if (f.deadline) {
        const deadlineDate = s.deadlineDate || s.deadline
        const diff = new Date(deadlineDate) - now
        if (f.deadline === 'month'  && diff > 30 * DAY)  return false
        if (f.deadline === '3month' && diff > 90 * DAY)  return false
        if (f.deadline === '6month' && diff > 180 * DAY) return false
      }
      if (f.search) {
        const tags = typeof s.tags === 'string' ? JSON.parse(s.tags || '[]') : (s.tags || [])
        const hay = `${s.name} ${s.country} ${tags.join(' ')} ${s.description || s.desc || ''}`.toLowerCase()
        if (!hay.includes(f.search.toLowerCase())) return false
      }
      return true
    })

    if (f.sort === 'deadline') result.sort((a, b) => new Date(a.deadlineDate || a.deadline) - new Date(b.deadlineDate || b.deadline))
    else result.sort((a, b) => (b.id > a.id ? 1 : -1))

    return result
  }, [filters, scholarships])

  const savedScholarships = scholarships.filter(s => savedIds.has(s.id) || savedIds.has(s.slug))

  return (
    <ScholarshipContext.Provider value={{
      scholarships, savedIds, savedScholarships,
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
