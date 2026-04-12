import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useFilters } from '@hooks/useFilters'
import FilterSidebar from '@components/common/FilterSidebar'
import ScholarshipCard from '@components/common/ScholarshipCard'
import { useAuth } from '@context/AuthContext'
import { useScholarships } from '@context/ScholarshipContext'

const FREE_LIMIT = 25
const LOCK_KEY   = 'sp_db_locked' // 'true' = normal paywall | 'false' = full DB free for all

function getIsLocked() {
  const v = localStorage.getItem(LOCK_KEY)
  return v === null ? true : v === 'true'
}

export default function ListingPage() {
  const { filtered, paginated, filters, updateFilter, clearAll,
          page, setPage, totalPages, resultCount } = useFilters()
  const [searchParams]    = useSearchParams()
  const { isLoggedIn, isPaid } = useAuth()
  const { scholarships }  = useScholarships()
  const [freePage, setFreePage] = useState(1)
  const [locked, setLocked]     = useState(getIsLocked)

  // Sync when admin toggles from the same tab
  useEffect(() => {
    const sync = () => setLocked(getIsLocked())
    window.addEventListener('sp_lock_change', sync)
    return () => window.removeEventListener('sp_lock_change', sync)
  }, [])

  useEffect(() => { setFreePage(1) }, [filters])

  useEffect(() => {
    const country = searchParams.get('country')
    const degree  = searchParams.get('degree')
    if (country) updateFilter('countries', [country])
    if (degree)  updateFilter('degrees', [degree])
  }, [])

  const totalAll    = scholarships.length
  const allFree     = scholarships.filter(s => s.featured).slice(0, FREE_LIMIT)
  const lockedCount = totalAll - allFree.length

  // When locked=false (offer mode) everyone sees everything
  // When locked=true, only paid users see all
  const seeAll         = !locked || isPaid
  const freeFiltered   = seeAll ? [] : filtered.filter(s => s.featured).slice(0, FREE_LIMIT)
  const freeTotalPages = Math.ceil(freeFiltered.length / 6) || 1
  const freePaginated  = freeFiltered.slice((freePage-1)*6, freePage*6)

  const visibleCards = seeAll ? paginated        : freePaginated
  const curPage      = seeAll ? page             : freePage
  const curTotal     = seeAll ? totalPages       : freeTotalPages
  const setPage2     = seeAll ? setPage          : setFreePage
  const shownCount   = seeAll ? resultCount      : freeFiltered.length

  const showSignInBanner = locked && !isLoggedIn
  const showPaidBanner   = locked && isLoggedIn && !isPaid && freePage === freeTotalPages && freeFiltered.length > 0

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <span>Home</span><span className="opacity-40">›</span><span>Scholarships</span>
          </div>
          <h1>Browse All Scholarships</h1>
          <p>
            {!locked
              ? `🎉 Special offer — full database free for everyone! ${totalAll}+ scholarships`
              : seeAll
              ? `${totalAll}+ verified international scholarships — full access unlocked ✅`
              : `${allFree.length} free scholarships · ${lockedCount}+ more with any package`}
          </p>
          {/* Offer ribbon */}
          {!locked && (
            <div style={{ marginTop:12, display:'inline-flex', alignItems:'center', gap:8,
              background:'rgba(34,197,94,.15)', border:'1px solid rgba(34,197,94,.4)',
              borderRadius:50, padding:'6px 18px' }}>
              <span style={{ fontSize:14 }}>🎁</span>
              <span style={{ fontSize:12, fontWeight:800, color:'#22c55e' }}>
                Limited-time offer — full database is FREE to browse!
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className="grid md:grid-cols-[260px_1fr] gap-7 py-9 items-start">
          <FilterSidebar />
          <div>
            {/* Row header */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <h2 className="font-head font-bold text-navy-800 text-lg">
                  {seeAll ? 'All Scholarships' : 'Free Scholarships'}
                </h2>
                <span className="text-gray-500 text-sm">{shownCount} scholarships found</span>
              </div>
              <select className="input text-sm w-auto" value={filters.sort}
                onChange={e => updateFilter('sort', e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="deadline">Deadline: Soonest</option>
              </select>
            </div>

            {/* ── SIGN-IN BANNER (locked + not logged in) ── */}
            {showSignInBanner && (
              <div style={{ background:'linear-gradient(135deg,#eff6ff,#f0fdf4)', border:'2px solid #bfdbfe',
                borderRadius:16, padding:'16px 20px', marginBottom:20,
                display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ fontSize:32 }}>🎓</div>
                  <div>
                    <div style={{ fontSize:14, fontWeight:900, color:'#1e40af', marginBottom:2 }}>
                      Sign in FREE — get the full scholarship list
                    </div>
                    <div style={{ fontSize:12, color:'#3b82f6' }}>
                      Free account gives you access to all {totalAll}+ scholarships — no payment needed
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  <Link to="/dashboard"
                    style={{ padding:'9px 20px', background:'#0f2444', color:'#fff',
                      borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                    🚀 Sign In Free →
                  </Link>
                  <a href="https://wa.me/8801889700879?text=Hi! I want to access all scholarships on ScholarPath BD."
                    target="_blank" rel="noreferrer"
                    style={{ padding:'9px 18px', background:'#22c55e', color:'#fff',
                      borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700 }}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Cards */}
            {visibleCards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleCards.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="font-head font-bold text-navy-800 text-lg mb-2">No scholarships match</h3>
                <p className="text-gray-500 text-sm mb-5">Try removing some filters.</p>
                <button onClick={clearAll} className="btn btn-outline">Clear All Filters</button>
              </div>
            )}

            {/* Pagination */}
            {curTotal > 1 && (
              <div className="mt-8 overflow-x-auto pb-2">
                <div className="flex gap-2 justify-center" style={{ minWidth:'max-content', margin:'0 auto' }}>
                  <button onClick={() => { setPage2(p => Math.max(1,p-1)); window.scrollTo(0,0) }}
                    disabled={curPage===1} className="btn btn-outline btn-sm flex-shrink-0">← Prev</button>
                  {Array.from({length:curTotal},(_,i)=>i+1).map(p => (
                    <button key={p} onClick={() => { setPage2(p); window.scrollTo(0,0) }}
                      className={`btn btn-sm flex-shrink-0 ${p===curPage?'btn-primary':'btn-outline'}`}>{p}</button>
                  ))}
                  <button onClick={() => { setPage2(p => Math.min(curTotal,p+1)); window.scrollTo(0,0) }}
                    disabled={curPage===curTotal} className="btn btn-outline btn-sm flex-shrink-0">Next →</button>
                </div>
              </div>
            )}

            {/* Paid upgrade banner */}
            {showPaidBanner && (
              <div className="mt-8 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">
                <div className="text-3xl mb-2">🔒</div>
                <h3 className="font-head font-black text-navy-800 text-xl mb-1">
                  You've seen all {allFree.length} free scholarships
                </h3>
                <p className="text-gray-500 text-sm mb-4 max-w-md mx-auto">
                  Unlock <strong>{lockedCount}+ more</strong> — DAAD, Chevening, MEXT, Australia Awards and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/services" className="btn btn-primary px-6">🚀 View Packages — from ৳5,000</Link>
                  <a href="https://wa.me/8801889700879?text=Hi! I want to unlock all scholarships."
                    target="_blank" rel="noreferrer" className="btn btn-outline px-6">💬 WhatsApp to Unlock</a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  )
}
