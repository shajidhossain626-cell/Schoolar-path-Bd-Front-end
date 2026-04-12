import { Link } from 'react-router-dom'

const RATES = {
  '€': 130, '£': 152, '$': 110,
  'CAD': 79, 'AUD': 70, 'SEK': 10.2,
  '¥': 0.72, '₩': 0.079, 'CHF': 125,
}

function toBDT(amount) {
  if (!amount) return null
  const m = amount.match(/(CAD|AUD|SEK|CHF|[€£$¥₩])\s*([\d,]+)/)
  if (!m) return null
  const rate = RATES[m[1]]
  const num  = parseInt(m[2].replace(/,/g,''), 10)
  if (!rate || !num) return null
  const bdt = Math.round(num * rate)
  if (bdt >= 100000) return `≈৳${(bdt/100000).toFixed(1)} lakh`
  if (bdt >= 1000)   return `≈৳${(bdt/1000).toFixed(0)}k`
  return `≈৳${bdt}`
}

export default function ScholarshipCard({ scholarship: s }) {
  const isUrgent = s.urgent
  const isFull   = s.funding === 'full'
  const bdtAmt   = toBDT(s.amount)

  return (
    <Link
      to={`/scholarships/${s.id}`}
      className="block bg-white border border-gray-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all no-underline"
      style={{ minWidth:0, overflow:'hidden', wordBreak:'break-word' }}
    >
      {/* Top: flag + badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="text-3xl flex-shrink-0">{s.flag}</div>
        {isUrgent ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 flex-shrink-0">🔥 URGENT</span>
        ) : isFull ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 flex-shrink-0">FULLY FUNDED</span>
        ) : (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">PARTIAL</span>
        )}
      </div>

      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{s.country}</p>
      <h3 className="font-head font-bold text-navy-800 text-base leading-snug mb-2 line-clamp-2">{s.name}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-3 line-clamp-2">{s.desc}</p>

      {s.tags && s.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {s.tags.slice(0,4).map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
      )}

      {/* Footer: deadline + amount + BDT */}
      <div className="flex items-end justify-between gap-2 pt-3 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <span>📅</span>
          <span className={isUrgent ? 'text-red-500 font-semibold' : ''}>{s.deadline}</span>
        </div>
        {s.amount && (
          <div className="flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1 text-xs font-bold text-green-600">
              <span>{s.amount}</span>
              <span>🏷️</span>
            </div>
            {bdtAmt && (
              <span style={{ fontSize:10, fontWeight:700, color:'#d97706', background:'#fef3c7', padding:'1px 7px', borderRadius:20 }}>
                {bdtAmt}/month
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  )
}
