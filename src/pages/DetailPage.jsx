import { useParams, Link, useNavigate } from 'react-router-dom'
import { useScholarships } from '@context/ScholarshipContext'
import { useAI } from '@hooks/useAI'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function DetailPage() {
  const { id } = useParams()
  const { scholarships, isSaved, toggleSave } = useScholarships()
  const s = scholarships.find(x => String(x.id) === String(id) || x.slug === id)
  const navigate = useNavigate()
  const { ask, loading, answer } = useAI()
  const [aiQ, setAiQ] = useState('')

  if (!s) return (
    <div className="min-h-[50vh] flex items-center justify-center text-center">
      <div><h2 className="font-head font-bold text-xl text-navy-800 mb-3">Scholarship not found</h2>
      <Link to="/scholarships" className="btn btn-primary">Browse All Scholarships</Link></div>
    </div>
  )

  const saved = isSaved(s.id)

  return (
    <>
      {/* Hero */}
<div className="bg-gradient-to-br from-navy-900 to-navy-600 py-12 text-white">
  <div className="container">
    <div className="breadcrumb">
      <span onClick={() => navigate('/')}>Home</span>
      <span className="opacity-40">›</span>
      <span onClick={() => navigate('/scholarships')}>Scholarships</span>
      <span className="opacity-40">›</span>
      <span>{s.short || s.shortName}</span>
    </div>
    <div className="flex gap-6 items-start mt-2">
      <div className="text-6xl md:text-7xl flex-shrink-0">{s.flag}</div>
      <div>
        <div className="flex gap-2 flex-wrap mb-3">
          <span className={`badge text-[10px] ${(s.funding||'').toLowerCase() === 'full' ? 'badge-green' : 'badge-gold'}`}>
            {(s.funding||'').toLowerCase() === 'full' ? '✓ Fully Funded' : (s.funding||'').toLowerCase() === 'partial' ? 'Partial Funding' : 'Tuition Only'}
          </span>
          {(s.isUrgent || s.urgent) && <span className="badge badge-red text-[10px]">🔥 Urgent</span>}
        </div>
        <h1 className="font-head font-black text-2xl md:text-3xl mb-2">{s.name}</h1>
        <p className="text-white/65 text-sm mb-4">
          {s.country} · {(s.funding||'').toLowerCase() === 'full' ? 'Fully Funded' : (s.funding||'').toLowerCase() === 'partial' ? 'Partial Funding' : 'Tuition Only'}
        </p>
        <div className="flex flex-wrap gap-5 text-sm text-white/75">
          <span>🎓 {(() => {
            const deg = typeof s.degree === 'string' ? JSON.parse(s.degree || '[]') : (s.degree || [])
            return deg.map(d => {
              const dl = d.toLowerCase()
              return dl === 'bachelors' ? "Bachelor's" : dl === 'masters' ? "Master's" : 'PhD'
            }).join(' / ') || '—'
          })()}</span>
          <span>📅 {(() => {
            const d = s.deadlineDate || s.deadline
            if (!d) return '—'
            return new Date(d).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})
          })()}</span>
          <span>💰 {s.amount}</span>
          <span>🌍 {s.country}</span>
        </div>
      </div>
    </div>
  </div>
</div>
      <div className="container">
        <div className="grid md:grid-cols-[1fr_310px] gap-7 py-9">
          {/* Main */}
          <div>
            {[
              { icon: '📋', title: 'Overview', content: <p className="text-gray-600 text-sm leading-relaxed">{s.overview}</p> },
              { icon: '🎁', title: 'Benefits & Funding', content: <ul className="space-y-2">{s.benefits.map((b,i) => <li key={i} className="flex gap-2 text-sm text-gray-600"><span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>{b}</li>)}</ul> },
              { icon: '✅', title: 'Eligibility Criteria', content: <ul className="space-y-2">{s.eligibility.map((e,i) => <li key={i} className="flex gap-2 text-sm text-gray-600"><span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>{e}</li>)}</ul> },
              { icon: '📄', title: 'Required Documents', content: <ul className="space-y-2">{s.documents.map((d,i) => <li key={i} className="flex gap-2 text-sm text-gray-600"><span className="text-green-600 font-bold mt-0.5 flex-shrink-0">✓</span>{d}</li>)}</ul> },
            ].map(({ icon, title, content }) => (
              <div key={title} className="mb-7">
                <h2 className="font-head font-bold text-navy-800 text-lg mb-4 pb-2.5 border-b-2 border-gray-100 flex items-center gap-2">
                  {icon} {title}
                </h2>
                {content}
              </div>
            ))}

            {/* Application Steps */}
            <div className="mb-7">
              <h2 className="font-head font-bold text-navy-800 text-lg mb-4 pb-2.5 border-b-2 border-gray-100">🗺 Application Steps</h2>
              <div className="space-y-4">
                {s.steps.map((step, i) => (
                  <div key={i} className="flex gap-4 relative">
                    {i < s.steps.length - 1 && <div className="absolute left-[17px] top-10 bottom-[-16px] w-0.5 bg-gray-200" />}
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-navy-800 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 relative z-10">
                      {i + 1}
                    </div>
                    <div className="pt-1.5">
                      <p className="text-sm text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Q&A */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h2 className="font-head font-bold text-navy-800 text-base mb-4 flex items-center gap-2">🤖 Ask AI About This Scholarship</h2>
              <div className="flex gap-2">
                <input className="input flex-1 text-sm" value={aiQ} onChange={e => setAiQ(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && ask(`About ${s.name}: ${aiQ}`)}
                  placeholder={`Ask anything about ${s.short} scholarship...`} />
                <button className="btn btn-blue btn-sm" disabled={loading || !aiQ.trim()}
                  onClick={() => ask(`About ${s.name} (${s.country}): ${aiQ}`)}>
                  {loading ? '...' : 'Ask →'}
                </button>
              </div>
              {answer && (
                <div className="mt-4 bg-blue-50 border border-blue-200/50 rounded-xl p-4">
                  <div className="text-xs font-bold text-blue-600 mb-2">✦ AI Answer</div>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{answer}</div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Apply card */}
            <div className="rounded-2xl overflow-hidden mb-5 border border-gray-200 shadow-card">
  <div className="bg-gradient-to-br from-navy-900 to-navy-600 p-5 text-white text-center">
    <div className="text-2xl mb-2">🎓</div>
    <h3 className="font-head font-bold text-base mb-1">Apply With ScholarPath BD</h3>
    <p className="text-xs text-white/60">Our experts handle everything — docs, SOP, submission</p>
  </div>
  <div className="bg-white p-4">
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 text-center">Choose Your Package</p>
    <a href="/intake.html" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer mb-2 group no-underline">
      <span className="text-xl">🌱</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-navy-800 group-hover:text-blue-700">Basic</div>
        <div className="text-[11px] text-gray-500">Document checklist + guidance</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-black text-sm text-navy-800">৳3,000</div>
        <div className="text-[10px] text-gray-400">one-time</div>
      </div>
    </a>
    <a href="/intake.html" className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-600 bg-blue-50 cursor-pointer mb-2 group no-underline relative">
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">⭐ Most Popular</span>
      <span className="text-xl">🚀</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-blue-700">Standard</div>
        <div className="text-[11px] text-gray-500">SOP writing + full support</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-black text-sm text-blue-700">৳7,500</div>
        <div className="text-[10px] text-gray-400">per scholarship</div>
      </div>
    </a>
    <a href="/intake.html" className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer mb-4 group no-underline">
      <span className="text-xl">👑</span>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-sm text-navy-800 group-hover:text-amber-700">Premium</div>
        <div className="text-[11px] text-gray-500">End-to-end concierge service</div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="font-black text-sm text-navy-800">৳10,000</div>
        <div className="text-[10px] text-gray-400">per scholarship</div>
      </div>
    </a>
    <a href="/intake.html" className="btn btn-primary btn-block text-center no-underline flex items-center justify-center gap-2 mb-3">
      📋 Start Your Application
    </a>
    <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400">
      <span>✅ 24hr response</span>
      <span>·</span>
      <span>🔒 Secure</span>
      <span>·</span>
      <span>💬 WhatsApp support</span>
    </div>
  </div>
  <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 text-center">
    <Link to="/services" className="text-xs text-blue-600 font-semibold hover:text-blue-700">
      View full package details →
    </Link>
  </div>
</div>
```

Press `Ctrl+S` → push:
```
git add .
git commit -m "replace apply card with package selector"
git push

            {/* Quick facts */}
<div className="card p-5 mb-4">
  <h3 className="font-head font-bold text-navy-800 text-sm mb-4">⚡ Quick Facts</h3>
  {[
    ['Country', `${s.flag} ${s.country}`],
    ['Level', (() => {
      const deg = typeof s.degree === 'string' ? JSON.parse(s.degree || '[]') : (s.degree || [])
      return deg.map(d => {
        const dl = d.toLowerCase()
        return dl === 'bachelors' ? 'BSc' : dl === 'masters' ? 'MSc' : 'PhD'
      }).join(' / ') || '—'
    })()],
    ['Funding', (() => {
      const f = (s.funding || '').toLowerCase()
      return f === 'full' ? 'Fully Funded' : f === 'partial' ? 'Partial' : 'Tuition Only'
    })()],
    ['Deadline', s.deadlineFormatted || new Date(s.deadlineDate || s.deadline).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})],,
    ['Amount', s.amount || '—'],
    ['Field', (() => {
      const f = (s.field || '').toLowerCase()
      return f.charAt(0).toUpperCase() + f.slice(1) || '—'
    })()],
  ].map(([k, v]) => (
    <div key={k} className="flex justify-between text-sm py-2 border-b border-gray-50 last:border-0">
      <span className="text-gray-500">{k}</span>
      <span className={`font-semibold ${k === 'Funding' && (s.funding||'').toLowerCase() === 'full' ? 'text-green-600' : k === 'Deadline' && s.isUrgent ? 'text-red-500' : 'text-gray-800'}`}>{v}</span>
    </div>
  ))}
</div>
            {/* Save / Counselor */}
            <div className="card p-5 mb-4">
              <button onClick={() => { toggleSave(s.id); toast.success(saved ? 'Removed from saved' : 'Saved! 🔖') }}
                className={`btn btn-block mb-2 ${saved ? 'btn-primary' : 'btn-outline'}`}>
                🔖 {saved ? 'Saved ✓ — Remove' : 'Save for Later'}
              </button>
              <Link to="/contact" className="btn btn-ghost btn-block text-sm">📞 Talk to a Counselor</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
