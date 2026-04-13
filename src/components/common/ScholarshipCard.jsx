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
      className="block bg-white border border-gray-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all no-underline"
      style={{ minWidth:0, overflow:'hidden', wordBreak:'break-word', padding:'14px 14px 12px' }}
    >
      {/* Top: flag + badge */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div style={{ fontSize:'clamp(22px,5vw,30px)', flexShrink:0, lineHeight:1 }}>{s.flag}</div>
        {isUrgent ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 flex-shrink-0">🔥 URGENT</span>
        ) : isFull ? (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 flex-shrink-0">FULLY FUNDED</span>
        ) : (
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex-shrink-0">PARTIAL</span>
        )}
      </div>

      <p style={{ fontSize:10, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:4 }}>{s.country}</p>
      <h3 style={{ fontWeight:800, color:'#0f2444', fontSize:'clamp(13px,3.5vw,15px)', lineHeight:1.3, marginBottom:6, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{s.name}</h3>
      <p style={{ color:'#6b7280', fontSize:11, lineHeight:1.55, marginBottom:8, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{s.desc}</p>

      {s.tags && s.tags.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:8 }}>
          {s.tags.slice(0,4).map(tag => (
            <span key={tag} style={{ fontSize:10, background:'#f3f4f6', color:'#6b7280', padding:'2px 8px', borderRadius:20 }}>{tag}</span>
          ))}
        </div>
      )}

      {/* Footer: deadline + amount + BDT */}
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:6, paddingTop:8, borderTop:'1px solid #f3f4f6', flexWrap:'wrap' }}>
        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'#9ca3af' }}>
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
