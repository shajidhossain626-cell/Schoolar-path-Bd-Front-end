import { Link } from 'react-router-dom'

export default function ScholarshipCard({ scholarship: s }) {
  const isUrgent = s.urgent
  const isFull   = s.funding === 'full'

  return (
    <Link
      to={`/scholarships/${s.id}`}
      className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all no-underline"
      style={{ minWidth: 0, overflow: 'hidden', wordBreak: 'break-word' }}
    >
      {/* Top row: flag + badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="text-3xl flex-shrink-0">{s.flag}</div>
        {isUrgent ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 flex-shrink-0">
            🔥 URGENT
          </span>
        ) : isFull ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 flex-shrink-0">
            FULLY FUNDED
          </span>
        ) : (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">
            PARTIAL
          </span>
        )}
      </div>

      {/* Country */}
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
        {s.country}
      </p>

      {/* Name */}
      <h3 className="font-head font-bold text-navy-800 text-base leading-snug mb-2 line-clamp-2">
        {s.name}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">
        {s.desc}
      </p>

      {/* Tags */}
      {s.tags && s.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {s.tags.slice(0, 4).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: deadline + amount */}
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
          <span>📅</span>
          <span className={isUrgent ? 'text-red-500 font-semibold' : ''}>{s.deadline}</span>
        </div>
        {s.amount && (
          <div className="flex items-center gap-1 text-xs font-bold text-green-600 flex-shrink-0">
            <span>{s.amount}</span>
            <span>🏷️</span>
          </div>
        )}
      </div>
    </Link>
  )
}
