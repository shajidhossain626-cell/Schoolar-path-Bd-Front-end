import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFilters } from '@hooks/useFilters'
import FilterSidebar from '@components/common/FilterSidebar'
import ScholarshipCard from '@components/common/ScholarshipCard'
import { useAuth } from '@context/AuthContext'
import { useScholarships } from '@context/ScholarshipContext'

const FREE_LIMIT = 26
const PER_PAGE = 6

export default function ListingPage() {
  const { paginated, filters, updateFilter, clearAll, page, setPage, totalPages, resultCount } = useFilters()
  const [searchParams] = useSearchParams()
  const { isLoggedIn, isPaid } = useAuth()
  const { scholarships } = useScholarships()
  const [freePage, setFreePage] = useState(1)

  useEffect(() => {
    const country = searchParams.get('country')
    const degree  = searchParams.get('degree')
    if (country) updateFilter('countries', [country])
    if (degree)  updateFilter('degrees', [degree])
  }, [])

  const freeScholarships   = scholarships.filter(s => s.featured).slice(0, FREE_LIMIT)
  const totalAll           = scholarships.length
  const lockedCount        = totalAll - freeScholarships.length
  const freeTotalPages     = Math.ceil(freeScholarships.length / PER_PAGE)
  const freePaginated      = freeScholarships.slice((freePage - 1) * PER_PAGE, freePage * PER_PAGE)

  const visibleCards = isPaid ? paginated : freePaginated
  const currentPage  = isPaid ? page : freePage
  const currentTotal = isPaid ? totalPages : freeTotalPages
  const handlePage   = isPaid ? setPage : setFreePage

  // Only show unlock banner on the very last free page
  const showUnlockBanner = !isPaid && freePage === freeTotalPages

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Scholarships</span></div>
          <h1>Browse All Scholarships</h1>
          <p>
            {isPaid
              ? `${totalAll}+ verified international scholarships — full access unlocked ✅`
              : `${freeScholarships.length} free scholarships available · ${lockedCount}+ more with any package`}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-[260px_1fr] gap-7 py-9 items-start">
          <FilterSidebar />
          <div>
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-head font-bold text-navy-800 text-lg">
                  {isPaid ? 'All Scholarships' : 'Free Scholarships'}
                </h2>
                <span className="text-gray-500 text-sm">
                  {isPaid
                    ? `${resultCount} scholarships found`
                    : `Page ${freePage} of ${freeTotalPages} · ${freeScholarships.length} free scholarships`}
                </span>
              </div>
              <select className="input text-sm w-auto"
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="deadline">Deadline: Soonest</option>
              </select>
            </div>

            {/* Scholarship cards */}
            {visibleCards.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-5">
                {visibleCards.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-head font-bold text-navy-800 text-lg mb-2">No scholarships match</h3>
                <p className="text-gray-500 text-sm mb-5">Try removing some filters or broadening your search.</p>
                <button onClick={clearAll} className="btn btn-outline">Clear All Filters</button>
              </div>
            )}

            {/* Pagination — always visible, never blocked */}
            {currentTotal > 1 && (
              <div className="flex gap-2 mt-8 justify-center flex-wrap">
                <button
                  onClick={() => handlePage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline btn-sm">← Prev</button>
                {Array.from({ length: currentTotal }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => handlePage(p)}
                    className={`btn btn-sm ${p === currentPage ? 'btn-primary' : 'btn-outline'}`}>{p}</button>
                ))}
                <button
                  onClick={() => handlePage(p => Math.min(currentTotal, p + 1))}
                  disabled={currentPage === currentTotal}
                  className="btn btn-outline btn-sm">Next →</button>
              </div>
            )}

            {/* Unlock banner — only appears BELOW pagination on the last free page */}
            {showUnlockBanner && (
              <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-head font-black text-navy-800 text-xl mb-1">
                  You've seen all {freeScholarships.length} free scholarships
                </h3>
                <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
                  Unlock <strong>{lockedCount}+ more scholarships</strong> including DAAD, Chevening, MEXT, Australia Awards and many more — starting from just ৳5,000.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/services" className="btn btn-primary px-6">
                    🚀 View Packages — from ৳5,000
                  </Link>
                  <a href="https://wa.me/8801889700879?text=Hi! I want to unlock all scholarships."
                    target="_blank" rel="noreferrer"
                    className="btn btn-outline px-6">
                    💬 WhatsApp to Unlock
                  </a>
                </div>
                {!isLoggedIn && (
                  <p className="text-xs text-gray-400 mt-3">
                    Already have a package?{' '}
                    <Link to="/dashboard" className="text-blue-600 underline">Sign in to unlock →</Link>
                  </p>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
