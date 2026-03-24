import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useFilters } from '@hooks/useFilters'
import FilterSidebar from '@components/common/FilterSidebar'
import ScholarshipCard from '@components/common/ScholarshipCard'

export default function ListingPage() {
  const { paginated, filters, updateFilter, clearAll, page, setPage, totalPages, resultCount } = useFilters()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const country = searchParams.get('country')
    const degree  = searchParams.get('degree')
    if (country) updateFilter('countries', [country])
    if (degree)  updateFilter('degrees', [degree])
  }, [])

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Scholarships</span></div>
          <h1>Browse All Scholarships</h1>
          <p>500+ verified international scholarships for Bangladeshi students</p>
        </div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-[260px_1fr] gap-7 py-9 items-start">
          <FilterSidebar />
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-head font-bold text-navy-800 text-lg">All Scholarships</h2>
                <span className="text-gray-500 text-sm">Showing {resultCount} results</span>
              </div>
              <select className="input text-sm w-auto"
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="deadline">Deadline: Soonest</option>
              </select>
            </div>

            {paginated.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {paginated.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-head font-bold text-navy-800 text-lg mb-2">No scholarships match</h3>
                <p className="text-gray-500 text-sm mb-5">Try removing some filters or broadening your search.</p>
                <button onClick={clearAll} className="btn btn-outline">Clear All Filters</button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex gap-2 mt-8 justify-center flex-wrap">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => { setPage(p); window.scrollTo({ top: 200, behavior: 'smooth' }) }}
                    className={`w-9 h-9 flex items-center justify-center rounded-lg border text-sm font-semibold transition-all ${page === p ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}>
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
