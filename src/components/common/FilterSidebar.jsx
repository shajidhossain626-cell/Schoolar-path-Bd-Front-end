import { useState } from 'react'
import { useScholarships } from '@context/ScholarshipContext'
import { useFilters } from '@hooks/useFilters'

const DEGREE_OPTIONS  = [['bachelors', "Bachelor's"], ['masters', "Master's"], ['phd', 'PhD / Doctorate']]
const FUNDING_OPTIONS = [['full', 'Fully Funded'], ['partial', 'Partial Funding'], ['tuition', 'Tuition Only']]
const DEADLINE_OPTIONS = [['month', 'This Month'], ['3month', 'Next 3 Months'], ['6month', 'Next 6 Months'], ['', 'Any Time']]
const FIELD_OPTIONS = [
  ['engineering', 'Engineering & Tech'],
  ['business',   'Business & MBA'],
  ['medical',    'Medical & Health'],
  ['arts',       'Arts & Humanities'],
  ['social',     'Social Sciences'],
  ['multiple',   'Multiple / Any Field'],
]

function FilterGroup({ title, children }) {
  return (
    <div className="mb-5 pb-5 border-b border-gray-100 last:border-none last:mb-0 last:pb-0">
      <h4 className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">{title}</h4>
      {children}
    </div>
  )
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-2 py-1 cursor-pointer text-sm text-gray-700 hover:text-navy-800 transition-colors">
      <input type="checkbox" checked={checked} onChange={onChange} className="w-3.5 h-3.5 accent-blue-600 rounded" />
      {label}
    </label>
  )
}

function FilterContent({ filters, toggleArrayFilter, updateFilter, clearAll, resultCount, countryOptions }) {
  const hasFilters = filters.countries.length || filters.degrees.length || filters.funding.length ||
    filters.fields.length || filters.deadline || filters.search

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-head font-bold text-navy-800 text-sm">🎯 Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Clear All
          </button>
        )}
      </div>

      <div className="mb-4">
        <input
          className="input text-sm"
          placeholder="🔍 Search scholarships..."
          value={filters.search}
          onChange={e => updateFilter('search', e.target.value)}
        />
      </div>

      <FilterGroup title="Destination">
        {countryOptions.map(([country, flag]) => (
          <Checkbox key={country}
            checked={filters.countries.includes(country)}
            onChange={() => toggleArrayFilter('countries', country)}
            label={`${flag} ${country}`}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Degree Level">
        {DEGREE_OPTIONS.map(([val, label]) => (
          <Checkbox key={val}
            checked={filters.degrees.includes(val)}
            onChange={() => toggleArrayFilter('degrees', val)}
            label={label}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Funding Type">
        {FUNDING_OPTIONS.map(([val, label]) => (
          <Checkbox key={val}
            checked={filters.funding.includes(val)}
            onChange={() => toggleArrayFilter('funding', val)}
            label={label}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Deadline Window">
        {DEADLINE_OPTIONS.map(([val, label]) => (
          <label key={val} className="flex items-center gap-2 py-1 cursor-pointer text-sm text-gray-700 hover:text-navy-800">
            <input type="radio" name="deadline" value={val}
              checked={filters.deadline === val}
              onChange={() => updateFilter('deadline', val)}
              className="w-3.5 h-3.5 accent-blue-600"
            />
            {label}
          </label>
        ))}
      </FilterGroup>

      <FilterGroup title="Field of Study">
        {FIELD_OPTIONS.map(([val, label]) => (
          <Checkbox key={val}
            checked={filters.fields.includes(val)}
            onChange={() => toggleArrayFilter('fields', val)}
            label={label}
          />
        ))}
      </FilterGroup>

      <div className="mt-4 pt-4 border-t border-gray-100 text-center">
        <span className="text-xs text-gray-500">{resultCount} scholarships found</span>
      </div>
    </>
  )
}

export default function FilterSidebar() {
  const { filters, toggleArrayFilter, updateFilter, clearAll, resultCount } = useFilters()
  const { scholarships } = useScholarships()
  const [mobileOpen, setMobileOpen] = useState(false)

  const countryMap = {}
  scholarships.forEach(s => { if (s.country && s.flag) countryMap[s.country] = s.flag })
  const countryOptions = Object.entries(countryMap).sort((a, b) => a[0].localeCompare(b[0]))

  const hasFilters = filters.countries.length || filters.degrees.length || filters.funding.length ||
    filters.fields.length || filters.deadline || filters.search
  const activeCount = filters.countries.length + filters.degrees.length + filters.funding.length +
    filters.fields.length + (filters.deadline ? 1 : 0) + (filters.search ? 1 : 0)

  return (
    <>
      {/* ── MOBILE FILTER TOGGLE BUTTON ── */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', borderRadius: 12,
            background: mobileOpen ? '#0f2444' : '#fff',
            border: '1.5px solid',
            borderColor: mobileOpen ? '#0f2444' : '#e2e8f0',
            cursor: 'pointer', fontFamily: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 16 }}>🎯</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: mobileOpen ? '#fff' : '#0f172a' }}>
              Filters
            </span>
            {activeCount > 0 && (
              <span style={{
                fontSize: 10, fontWeight: 800, background: '#3b82f6', color: '#fff',
                padding: '2px 7px', borderRadius: 20,
              }}>
                {activeCount} active
              </span>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {hasFilters && !mobileOpen && (
              <button
                onClick={e => { e.stopPropagation(); clearAll() }}
                style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', background: '#fef2f2',
                  border: '1px solid #fecaca', borderRadius: 20, padding: '2px 8px', cursor: 'pointer' }}
              >
                Clear
              </button>
            )}
            <span style={{ fontSize: 18, color: mobileOpen ? '#fff' : '#64748b',
              transition: 'transform .2s', display: 'block',
              transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
              ▾
            </span>
          </div>
        </button>

        {/* Mobile filter panel */}
        {mobileOpen && (
          <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderTop: 'none',
            borderRadius: '0 0 12px 12px', padding: '16px', marginTop: -2,
            maxHeight: '70vh', overflowY: 'auto' }}>
            <FilterContent
              filters={filters}
              toggleArrayFilter={toggleArrayFilter}
              updateFilter={updateFilter}
              clearAll={() => { clearAll(); }}
              resultCount={resultCount}
              countryOptions={countryOptions}
            />
            <button
              onClick={() => setMobileOpen(false)}
              style={{ width: '100%', marginTop: 12, padding: '11px', background: '#0f2444',
                color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 800,
                cursor: 'pointer', fontFamily: 'inherit' }}>
              ✅ Show {resultCount} Scholarships
            </button>
          </div>
        )}
      </div>

      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-2xl p-5 sticky top-20 w-full overflow-hidden">
        <FilterContent
          filters={filters}
          toggleArrayFilter={toggleArrayFilter}
          updateFilter={updateFilter}
          clearAll={clearAll}
          resultCount={resultCount}
          countryOptions={countryOptions}
        />
      </div>
    </>
  )
}
