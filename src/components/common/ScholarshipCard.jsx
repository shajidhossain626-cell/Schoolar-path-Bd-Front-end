import { Link } from 'react-router-dom'
import { useScholarships } from '@context/ScholarshipContext'
import { getFundingLabel } from '@utils/helpers'

export default function ScholarshipCard({ scholarship: s }) {
  const { isSaved, toggleSave } = useScholarships()
  const saved = isSaved(s.id)

  return (
    <div className="card card-hover p-5 relative flex flex-col">
      {/* Ribbon */}
      <div className="absolute top-3 right-3">
        {s.urgent
          ? <span className="badge badge-red text-[10px]">🔥 Urgent</span>
          : <span className={`badge text-[10px] ${s.funding === 'full' ? 'badge-green' : s.funding === 'partial' ? 'badge-gold' : 'badge-gray'}`}>
              {getFundingLabel(s.funding)}
            </span>}
      </div>

      <Link to={`/scholarships/${s.id}`} className="flex-1">
        <div className="text-3xl mb-2">{s.flag}</div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-1">{s.country}</p>
        <h3 className="font-head font-bold text-navy-800 text-base leading-snug mb-2 pr-16">{s.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{s.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {s.tags.map(t => <span key={t} className="tag">{t}</span>)}
        </div>
      </Link>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
        <div className={`text-xs flex items-center gap-1 ${s.urgent ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
          📅 {s.deadline}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-green-600">{s.amount}</span>
          <button
            onClick={() => toggleSave(s.id)}
            className={`text-base transition-colors ${saved ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}`}
            title={saved ? 'Remove from saved' : 'Save scholarship'}>
            🔖
          </button>
        </div>
      </div>
    </div>
  )
}
