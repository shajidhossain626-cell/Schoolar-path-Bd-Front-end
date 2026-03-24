import { useState, useCallback } from 'react'
import { useScholarships } from '@context/ScholarshipContext'

export function useFilters() {
  const { filters, setFilters, getFiltered } = useScholarships()
  const [page, setPage] = useState(1)
  const PER_PAGE = 6

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setPage(1)
  }, [setFilters])

  const toggleArrayFilter = useCallback((key, value) => {
    setFilters(prev => {
      const arr = prev[key]
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
      return { ...prev, [key]: next }
    })
    setPage(1)
  }, [setFilters])

  const clearAll = useCallback(() => {
    setFilters({ countries: [], degrees: [], funding: [], fields: [], deadline: '', sort: 'latest', search: '' })
    setPage(1)
  }, [setFilters])

  const filtered = getFiltered()
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return {
    filters, updateFilter, toggleArrayFilter, clearAll,
    filtered, paginated, page, setPage, totalPages,
    resultCount: filtered.length,
  }
}
