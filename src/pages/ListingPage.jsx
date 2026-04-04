import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFilters } from '@hooks/useFilters'
import FilterSidebar from '@components/common/FilterSidebar'
import ScholarshipCard from '@components/common/ScholarshipCard'
import { useAuth } from '@context/AuthContext'
import { useScholarships } from '@context/ScholarshipContext'

const FREE_LIMIT = 25
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

  // All 25 free scholarships
  const freeScholarships = scholarships.filter(s => s.featured).slice(0, FREE_LIMIT)
  const totalAll = scholarships.length
  const lockedCount = totalAll - freeScholarships.length

  // Free pagination — independent of paid pagination
  const freeTotalPages = Math.ceil(freeScholarships.length / PER_PAGE)
  const freePaginated  = freeScholarships.slice((freePage - 1) * PER_PAGE, freePage * PER_PAGE)

  // Which cards to show
  const visibleCards = isPaid ? paginated : freePaginated
  const currentPage  = isPaid ? page : freePage
  const currentTotal = isPaid ? totalPages : freeTotalPages
  const handlePage   = isPaid ? setPage : setFreePage

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Scholarships</span></div>
          <h1>Browse All Scholarships</h1>
          <p>
            {isPaid
              ? `${totalAll}+ verified international scholarships — full access unlocked ✅`
              : `Showing ${FREE_LIMIT} free scholarships · ${lockedCount}+ more unlocked with any package`}
          </p>
        </div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-[260px_1fr] gap-7 py-9 items-start">
          <FilterSidebar />
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-head font-bold text-navy-800 text-lg">
                  {isPaid ? 'All Scholarships' : 'Free Scholarships'}
                </h2>
                <span className="text-gray-500 text-sm">
                  {isPaid
                    ? `Showing ${resultCount} results`
                    : `Showing ${freeScholarships.length} free scholarships (page ${freePage} of ${freeTotalPages})`}
                </span>
              </div>
              <select className="input text-sm w-auto"
                value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="deadline">Deadline: Soonest</option>
              </select>
            </div>

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

            {/* PAYWALL SECTION — show for non-paid users */}
            {!isPaid && (
              <div className="mt-10">
                {/* Blurred preview cards */}
                <div className="relative">
                  <div className="grid sm:grid-cols-2 gap-5 blur-sm pointer-events-none select-none opacity-60">
                    {scholarships.slice(FREE_LIMIT, FREE_LIMIT + 4).map(s => (
                      <ScholarshipCard key={s.id} scholarship={s} />
                    ))}
                  </div>

                  {/* Lock overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-8 text-center max-w-md mx-4">
                      <div className="text-5xl mb-4">🔒</div>
                      <h3 className="font-head font-black text-navy-800 text-2xl mb-2">
                        {lockedCount}+ More Scholarships Locked
                      </h3>
                      <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                        You're seeing <strong>{FREE_LIMIT} free scholarships</strong>. Get full access to our complete database of <strong>{totalAll}+ scholarships</strong> — including DAAD, Chevening, MEXT, Australia Awards and many more — by signing up for any package.
                      </p>
                      <div className="flex flex-col gap-3">
                        {!isLoggedIn && (
                          <p className="text-xs text-gray-400 mb-1">Already have a package? <Link to="/dashboard" className="text-blue-600 underline">Sign in to unlock</Link></p>
                        )}
                        <Link to="/services" className="btn btn-primary btn-block text-base py-3">
                          🚀 View Packages — from ৳5,000
                        </Link>
                        <a href="https://wa.me/8801889700879?text=Hi! I want to unlock all scholarships." target="_blank" rel="noreferrer"
                          className="btn btn-outline btn-block">
                          💬 WhatsApp Us to Unlock
                        </a>
                      </div>
                      <div className="flex justify-center gap-6 mt-5 text-xs text-gray-400">
                        <span>✓ 100+ scholarships</span>
                        <span>✓ Instant access</span>
                        <span>✓ Updated weekly</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination — works for both free and paid */}
            {currentTotal > 1 && (
              <div className="flex gap-2 mt-8 justify-center flex-wrap">
                <button
                  onClick={() => handlePage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline btn-sm">← Prev</button>
                {Array.from({ length: Math.min(currentTotal, 7) }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => handlePage(p)}
                    className={`btn btn-sm ${p === currentPage ? 'btn-primary' : 'btn-outline'}`}>{p}</button>
                ))}
                <button
                  onClick={() => handlePage(p => Math.min(currentTotal, p + 1))}
                  disabled={currentPage === currentTotal}
                  className="btn btn-outline btn-sm">Next →</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
