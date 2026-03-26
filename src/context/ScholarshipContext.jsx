import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { scholarshipAPI } from '../services/api'
import { SCHOLARSHIPS as LOCAL_SCHOLARSHIPS } from '@data/scholarships'

const ScholarshipContext = createContext(null)

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useState(LOCAL_SCHOLARSHIPS)
  const [savedIds, setSavedIds] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    countries: [], degrees: [], funding: [], fields: [],
    deadline: '', sort: 'latest', search: '',
  })

  // Load scholarships from backend on mount
  useEffect(() => {
    const loadScholarships = async () => {
      try {
        const res = await scholarshipAPI.list({ limit: 100 })
        if (res.data?.success && res.data.data?.length > 0) {
          // Normalize backend data to match local format
          const normalized = res.data.data.map(s => ({
            ...s,
            // parse JSON strings back to arrays
            tags: typeof s.tags === 'string' ? tryParse(s.tags, []) : (s.tags || []),
            degree: typeof s.degree === 'string' ? tryParse(s.degree, []) : (s.degree || []),
            benefits: typeof s.benefits === 'string' ? tryParse(s.benefits, []) : (s.benefits || []),
            eligibility: typeof s.eligibility === 'string' ? tryParse(s.eligibility, []) : (s.eligibility || []),
            documents: typeof s.documents === 'string' ? tryParse(s.documents, []) : (s.documents || []),
            steps: typeof s.steps === 'string' ? tryParse(s.steps, []) : (s.steps || []),
            // map backend field names to frontend field names
            desc: s.description || s.desc || '',
            deadlineDate: s.deadline,
            short: s.shortName || s.short || '',
            amount: s.amount,
          }))
          setScholarships(normalized)
        }
      } catch (err) {
        console.log('Using local scholarships data')
        // Keep local data as fallback
      } finally {
        setLoading(false)
      }
    }
    loadScholarships()
  }, [])

  // Load saved scholarships from backend
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
      if (f.degrees.length) {
        const deg = Array.isArray(s.degree) ? s.degree : tryParse(s.degree, [])
        if (!f.degrees.some(d => deg.map(x => x.toLowerCase()).includes(d.toLowerCase()))) return false
      }
      if (f.funding.length && !f.funding.map(x=>x.toUpperCase()).includes((s.funding||'').toUpperCase())) return false
      if (f.fields.length && !f.fields.map(x=>x.toUpperCase()).includes((s.field||'').toUpperCase())) return false
      if (f.deadline) {
        const deadlineDate = s.deadlineDate || s.deadline
        const diff = new Date(deadlineDate) - now
        if (f.deadline === 'month'  && diff > 30 * DAY)  return false
        if (f.deadline === '3month' && diff > 90 * DAY)  return false
        if (f.deadline === '6month' && diff > 180 * DAY) return false
      }
      if (f.search) {
        const tags = Array.isArray(s.tags) ? s.tags : tryParse(s.tags, [])
        const hay = `${s.name} ${s.country} ${tags.join(' ')} ${s.description || s.desc || ''}`.toLowerCase()
        if (!hay.includes(f.search.toLowerCase())) return false
      }
      return true
    })

    if (f.sort === 'deadline') {
      result.sort((a, b) => new Date(a.deadlineDate || a.deadline) - new Date(b.deadlineDate || b.deadline))
    } else {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    }

    return result
  }, [filters, scholarships])

  const savedScholarships = scholarships.filter(s => savedIds.has(s.id) || savedIds.has(s.slug))

  return (
    <ScholarshipContext.Provider value={{
      scholarships, savedIds, savedScholarships, loading,
      filters, setFilters, toggleSave, isSaved, getFiltered,
    }}>
      {children}
    </ScholarshipContext.Provider>
  )
}

function tryParse(str, fallback) {
  try { return JSON.parse(str) } catch { return fallback }
}

export const useScholarships = () => {
  const ctx = useContext(ScholarshipContext)
  if (!ctx) throw new Error('useScholarships must be inside ScholarshipProvider')
  return ctx
}
