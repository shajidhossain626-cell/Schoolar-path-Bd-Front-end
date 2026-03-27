import { useCallback } from 'react'
import { useScholarships } from '@context/ScholarshipContext'
import { useSearchParams } from 'react-router-dom'

export function useFilters() {
  const { filters, setFilters, getFiltered } = useScholarships()
  const [searchParams, setSearchParams] = useSearchParams()
  const PER_PAGE = 6

  // page stored in URL — survives back navigation
  const page = parseInt(searchParams.get('page') || '1', 10)

  const setPage = useCallback((p) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.set('page', String(p))
      return next
    }, { replace: true })
  }, [setSearchParams])

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }, [setFilters, setPage])

  const toggleArrayFilter = useCallback((key, value) => {
    setFilters(prev => {
      const arr = prev[key]
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
    setPage(1)
  }, [setFilters, setPage])

  const clearAll = useCallback(() => {
    setFilters({ countries: [], degrees: [], funding: [], fields: [], deadline: '', sort: 'latest', search: '' })
    setPage(1)
  }, [setFilters, setPage])

  const filtered    = getFiltered()
  const totalPages  = Math.ceil(filtered.length / PER_PAGE)
  const safePage    = Math.min(Math.max(page, 1), totalPages || 1)
  const paginated   = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE)

  return {
    filters, updateFilter, toggleArrayFilter, clearAll,
    filtered, paginated, page: safePage, setPage, totalPages,
    resultCount: filtered.length,
  }
}
