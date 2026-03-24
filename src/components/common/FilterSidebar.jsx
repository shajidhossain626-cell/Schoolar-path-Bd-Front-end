import { useFilters } from '@hooks/useFilters'

const COUNTRY_OPTIONS = ['Germany', 'United Kingdom', 'United States', 'Canada', 'Australia', 'Japan', 'South Korea', 'China']
const FLAGS = { Germany:'🇩🇪', 'United Kingdom':'🇬🇧', 'United States':'🇺🇸', Canada:'🇨🇦', Australia:'🇦🇺', Japan:'🇯🇵', 'South Korea':'🇰🇷', China:'🇨🇳' }
const DEGREE_OPTIONS = [['bachelors', "Bachelor's"], ['masters', "Master's"], ['phd', 'PhD / Doctorate']]
const FUNDING_OPTIONS = [['full', 'Fully Funded'], ['partial', 'Partial Funding'], ['tuition', 'Tuition Only']]
const DEADLINE_OPTIONS = [['month', 'This Month'], ['3month', 'Next 3 Months'], ['6month', 'Next 6 Months'], ['', 'Any Time']]
const FIELD_OPTIONS = [['engineering', 'Engineering & Tech'], ['business', 'Business & MBA'], ['medical', 'Medical & Health'], ['arts', 'Arts & Humanities'], ['social', 'Social Sciences']]

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

export default function FilterSidebar() {
  const { filters, toggleArrayFilter, updateFilter, clearAll, resultCount } = useFilters()

  const hasFilters = filters.countries.length || filters.degrees.length || filters.funding.length ||
    filters.fields.length || filters.deadline || filters.search

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-head font-bold text-navy-800 text-sm">🎯 Filters</h3>
        {hasFilters && (
          <button onClick={clearAll} className="text-xs text-blue-600 font-semibold hover:text-blue-700 transition-colors">
            Clear All
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          className="input text-sm"
          placeholder="🔍 Search scholarships..."
          value={filters.search}
          onChange={e => updateFilter('search', e.target.value)}
        />
      </div>

      <FilterGroup title="Destination">
        {COUNTRY_OPTIONS.map(c => (
          <Checkbox key={c}
            checked={filters.countries.includes(c)}
            onChange={() => toggleArrayFilter('countries', c)}
            label={`${FLAGS[c] || ''} ${c}`}
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
    </div>
  )
}
