import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { scholarshipAPI } from '../services/api'
import { SCHOLARSHIPS as LOCAL_SCHOLARSHIPS } from '@data/scholarships'

const ScholarshipContext = createContext(null)

// ── helpers ──
function toArr(v) {
  if (!v) return []
  if (Array.isArray(v)) return v
  try { const p = JSON.parse(v); return Array.isArray(p) ? p : [String(v)] } catch { return [String(v)] }
}

function fmtDeadline(v) {
  if (!v) return '—'
  try { return new Date(v).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
  catch { return v }
}

function normalizeScholarship(s) {
  return {
    ...s,
    tags:        toArr(s.tags),
    degree:      toArr(s.degree),
    benefits:    toArr(s.benefits),
    eligibility: toArr(s.eligibility),
    documents:   toArr(s.documents),
    steps:       toArr(s.steps),
    desc:        s.description || s.desc || '',
    short:       s.shortName || s.short || '',
    deadlineDate: s.deadlineDate || s.deadline || '',
    // human-readable deadline for display
    deadlineFormatted: fmtDeadline(s.deadlineDate || s.deadline),
    // normalize funding & field to lowercase for filter comparisons
    fundingNorm: (s.funding || '').toLowerCase(),
    fieldNorm:   (s.field   || '').toLowerCase(),
  }
}

export function ScholarshipProvider({ children }) {
  const [scholarships, setScholarships] = useState(
    LOCAL_SCHOLARSHIPS.map(normalizeScholarship)
  )
  const [savedIds, setSavedIds]   = useState(new Set())
  const [loading,  setLoading]    = useState(true)
  const [filters,  setFilters]    = useState({
    countries: [], degrees: [], funding: [], fields: [],
    deadline: '', sort: 'latest', search: '',
  })

  // ── load scholarships from backend ──
  useEffect(() => {
    const load = async () => {
      try {
        const res = await scholarshipAPI.list({ limit: 100 })
        if (res.data?.success && res.data.data?.length > 0) {
          setScholarships(res.data.data.map(normalizeScholarship))
        }
      } catch {
        // keep local fallback
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // ── load saved ids ──
  useEffect(() => {
    const token = localStorage.getItem('sp_token')
    if (!token) return
    scholarshipAPI.saved()
      .then(res => {
        if (res.data?.success) {
          setSavedIds(new Set(res.data.data.map(s => s.id || s.slug)))
        }
      })
      .catch(() => {})
  }, [])

  // ── toggle save ──
  const toggleSave = useCallback(async (id) => {
    const token = localStorage.getItem('sp_token')
    if (!token) {
      setSavedIds(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
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
          saved ? next.add(id) : next.delete(id)
          return next
        })
      }
    } catch {
      setSavedIds(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
      })
    }
  }, [])

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds])

  // ── filter & sort ──
  const getFiltered = useCallback((overrides = {}) => {
    const f   = { ...filters, ...overrides }
    const DAY = 86_400_000
    const now = Date.now()

    let result = scholarships.filter(s => {
      // country
      if (f.countries.length &&
          !f.countries.map(x => x.toLowerCase()).includes(s.country.toLowerCase()))
        return false

      // degree  — compare lowercase both sides
      if (f.degrees.length) {
        const deg = toArr(s.degree).map(d => d.toLowerCase())
        if (!f.degrees.some(d => deg.includes(d.toLowerCase()))) return false
      }

      // funding — compare lowercase
      if (f.funding.length &&
          !f.funding.some(x => x.toLowerCase() === s.fundingNorm))
        return false

      // field — compare lowercase
      if (f.fields.length &&
          !f.fields.some(x => x.toLowerCase() === s.fieldNorm))
        return false

      // deadline window
      if (f.deadline) {
        const dl   = s.deadlineDate || s.deadline
        const diff = new Date(dl) - now
        if (f.deadline === 'month'  && diff > 30  * DAY) return false
        if (f.deadline === '3month' && diff > 90  * DAY) return false
        if (f.deadline === '6month' && diff > 180 * DAY) return false
      }

      // search
      if (f.search) {
        const hay = [s.name, s.country, ...toArr(s.tags), s.desc || '']
          .join(' ').toLowerCase()
        if (!hay.includes(f.search.toLowerCase())) return false
      }

      return true
    })

    // sort
    if (f.sort === 'deadline') {
      result.sort((a, b) =>
        new Date(a.deadlineDate || a.deadline || 0) -
        new Date(b.deadlineDate || b.deadline || 0)
      )
    } else {
      result.sort((a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )
    }

    return result
  }, [filters, scholarships])

  const savedScholarships = scholarships.filter(
    s => savedIds.has(s.id) || savedIds.has(s.slug)
  )

  return (
    <ScholarshipContext.Provider value={{
      scholarships, savedIds, savedScholarships, loading,
      filters, setFilters, toggleSave, isSaved, getFiltered,
      fmtDeadline, // export helper so any page can use it
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
