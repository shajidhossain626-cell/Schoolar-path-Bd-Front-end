import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NewsletterFull } from '@components/common/NewsletterSignup'
import { useScholarships } from '@context/ScholarshipContext'
import ScholarshipCard from '@components/common/ScholarshipCard'

const STATS = [['80+', 'Scholarships'], ['2,400+', 'Students Helped'], ['94%', 'Success Rate'], ['20+', 'Countries']]
const STEPS = [
  { n: 1, title: 'Discover & Match', desc: 'Use our smart filters and search to find scholarships perfectly matched to your profile, field, and goals.' },
  { n: 2, title: 'Prepare & Upload', desc: 'Get a personalized document checklist. Upload files securely to your dashboard. Our experts review everything.' },
  { n: 3, title: 'Apply & Succeed', desc: 'Apply independently or let our team handle it completely. Track your application in real-time and celebrate your acceptance!' },
]

const DEADLINES = [
  { flag:'🇩🇪', country:'Germany',        name:'DAAD Research Scholarship',         date:'Oct 15, 2026', days:186, color:'#DD0000', urgent:false },
  { flag:'🇬🇧', country:'United Kingdom',  name:'Chevening Scholarship',              date:'Nov 5, 2026',  days:207, color:'#012169', urgent:false },
  { flag:'🇰🇷', country:'South Korea',     name:'GKS Graduate Scholarship',           date:'Feb 28, 2026', days:57,  color:'#CD2E3A', urgent:true  },
  { flag:'🇨🇳', country:'China',           name:'CSC Government Scholarship',         date:'Apr 30, 2026', days:118, color:'#DE2910', urgent:false },
  { flag:'🇦🇺', country:'Australia',       name:'Australia Awards Scholarship',       date:'Apr 30, 2026', days:118, color:'#00008B', urgent:false },
  { flag:'🇯🇵', country:'Japan',           name:'MEXT Government Scholarship',        date:'Apr 15, 2026', days:103, color:'#BC002D', urgent:false },
  { flag:'🇸🇪', country:'Sweden',          name:'Swedish Institute Scholarship',      date:'Feb 25, 2026', days:54,  color:'#006AA7', urgent:true  },
  { flag:'🇧🇪', country:'Belgium',         name:'VLIR-UOS Scholarship',               date:'Feb 28, 2026', days:57,  color:'#000000', urgent:true  },
  { flag:'🇫🇷', country:'France',          name:'Eiffel Excellence Scholarship',      date:'Jan 8, 2026',  days:6,   color:'#002395', urgent:true  },
  { flag:'🇭🇺', country:'Hungary',         name:'Stipendium Hungaricum',              date:'Jan 15, 2027', days:389, color:'#CE2939', urgent:false },
  { flag:'🇳🇱', country:'Netherlands',     name:'Orange Knowledge Programme',         date:'Jul 1, 2026',  days:180, color:'#AE1C28', urgent:false },
  { flag:'🇮🇹', country:'Italy',           name:'Padua International Excellence',     date:'May 2, 2026',  days:120, color:'#009246', urgent:false },
]

// FIX 8 (bonus): Safe degree array parser — avoids JSON.parse crash in render
function parseDegrees(degree) {
  try {
    const arr = typeof degree === 'string' ? JSON.parse(degree || '[]') : degree || []
    return arr.map(d => d === 'masters' ? "Master's" : d === 'phd' ? 'PhD' : "Bachelor's").join('/')
  } catch {
    return ''
  }
}

export default function HomePage() {
  const { scholarships } = useScholarships()
  const navigate = useNavigate()
  const featured = scholarships.slice(0, 6)
  const [deadlineIdx, setDeadlineIdx] = useState(0)

  // FIX 2–7: Controlled state for Quick Search selects (replaces document.getElementById)
  const [degree, setDegree] = useState('')
  const [country, setCountry] = useState('')
  const [field, setField] = useState('')

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setDeadlineIdx(i => (i + 1) % DEADLINES.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const countryMap = {}
  scholarships.forEach(s => { if (s.country && s.flag) countryMap[s.country] = s.flag })

  // FIX 2–4: Use React state instead of document.getElementById
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (degree) params.set('degree', degree)
    if (country) params.set('country', country)
    if (field) params.set('field', field)
    navigate(`/scholarships?${params}`)
  }

  return (
    <>
      <style>{`
        @keyframes dlpulse { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>

      {/* HERO */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-600 py-16 md:py-24 text-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-white/10 border border-white/20 text-white/80 text-xs font-bold px-3 py-1 rounded-full mb-5">🇧🇩 Bangladesh's #1 Scholarship Consultancy</span>
              <h1 className="font-head font-black text-4xl md:text-5xl leading-tight mb-5">
                Find Your Dream<br />
                <span className="text-green-400">Scholarship</span><br />
                With Us
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                We help Bangladeshi students win international scholarships — DAAD, Chevening, MEXT, Fulbright and more. Expert guidance, SOP writing, and full application support.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <a href="/intake.html" className="btn btn-primary px-6 py-3 text-sm font-bold">📋 Apply With Us</a>
                <Link to="/scholarships" className="btn px-6 py-3 text-sm font-bold" style={{background:'rgba(255,255,255,0.1)',color:'#fff',border:'1px solid rgba(255,255,255,0.2)'}}>🔍 Browse Scholarships</Link>
              </div>
              <div className="flex flex-wrap gap-5">
                {STATS.map(([val, label]) => (
                  <div key={label}>
                    <div className="font-head font-black text-2xl text-green-400">{val}</div>
                    <div className="text-white/50 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Top Opportunities</div>
                {scholarships.slice(0,4).map(s => (
                  <Link key={s.id} to={`/scholarships/${s.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all mb-1 no-underline">
                    <span className="text-2xl flex-shrink-0">{s.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{s.short || s.name}</div>
                      {/* FIX 8 (bonus): replaced inline JSON.parse with safe parseDegrees() helper */}
                      <div className="text-xs text-white/50">{s.country} · {parseDegrees(s.degree)}</div>
                    </div>
                    <div className="text-xs font-bold text-green-400 flex-shrink-0">{s.amount}</div>
                  </Link>
                ))}
                <Link to="/scholarships" className="block text-center text-xs text-white/40 hover:text-white/70 mt-3 transition-colors">
                  View all {scholarships.length}+ scholarships →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK SEARCH */}
      <div className="bg-white shadow-card border-b border-gray-100">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
            {[
              {
                label: 'Degree Level', id: 'degree',
                value: degree, onChange: e => setDegree(e.target.value),   // FIX 5
                opts: [['', 'All Levels'], ['bachelors', "Bachelor's"], ['masters', "Master's"], ['phd', 'PhD']],
              },
              {
                label: 'Destination', id: 'country',
                value: country, onChange: e => setCountry(e.target.value), // FIX 6
                opts: [['', 'All Countries'], ...Object.entries(countryMap).sort((a,b)=>a[0].localeCompare(b[0])).map(([c,f])=>[c,`${c} ${f}`])],
              },
              {
                label: 'Field of Study', id: 'field',
                value: field, onChange: e => setField(e.target.value),     // FIX 7
                opts: [['', 'All Fields'], ['engineering', 'Engineering & Tech'], ['business', 'Business & MBA'], ['medical', 'Medical & Health'], ['arts', 'Arts & Humanities'], ['social', 'Social Sciences'], ['multiple', 'Multiple / Any Field']],
              },
            ].map(({ label, id, opts, value, onChange }) => (
              <div key={id}>
                <label className="label">{label}</label>
                {/* FIX 5–7: controlled selects with value + onChange */}
                <select id={id} className="input text-sm" value={value} onChange={onChange}>
                  {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </div>
            ))}
            {/* FIX 2–4: use handleSearch() with state instead of document.getElementById */}
            <button className="btn btn-primary" onClick={handleSearch}>Search →</button>
          </div>
        </div>
      </div>

      {/* TRUST BAR */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="container">
          <div className="flex flex-wrap items-center justify-around gap-3 text-xs font-medium text-gray-600">
            {['🏆 Trusted by 2,400+ students', '🔒 Verified scholarships only', '🎯 Smart scholarship matching', '👨‍💼 Expert counselors on call', '⚡ Daily updates'].map(t => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* DEADLINE CAROUSEL */}
      <div style={{ background:'#0f2444', padding:0 }}>
        <div style={{ paddingTop:0, paddingBottom:0 }}>
          <div style={{ display:'flex', alignItems:'center', width:'100%' }}>

            {/* Red label — always visible */}
            <div style={{ background:'#ef4444', padding:'12px 14px', display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#fff', animation:'dlpulse 1s infinite' }} />
              <span style={{ fontSize:10, fontWeight:800, color:'#fff', textTransform:'uppercase', letterSpacing:'.1em', whiteSpace:'nowrap' }}>
                Deadlines
              </span>
            </div>

            {/* Sliding content — takes all remaining space */}
            <div style={{ flex:1, overflow:'hidden', position:'relative', height:44, minWidth:0 }}>
              {DEADLINES.map((d, i) => (
                <div key={d.name}
                  style={{
                    position:'absolute', inset:0,
                    display:'flex', alignItems:'center',
                    gap:8, padding:'0 12px',
                    transition:'opacity .5s ease, transform .5s ease',
                    opacity: i === deadlineIdx ? 1 : 0,
                    transform: i === deadlineIdx ? 'translateY(0)' : i < deadlineIdx ? 'translateY(-100%)' : 'translateY(100%)',
                  }}>
                  {/* Flag */}
                  <span style={{ fontSize:18, flexShrink:0 }}>{d.flag}</span>
                  {/* Name — takes available space, truncates */}
                  <span style={{ fontSize:12, fontWeight:700, color:'rgba(255,255,255,.95)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1, minWidth:0 }}>
                    {d.name}
                  </span>
                  {/* Date badge — always visible, right-aligned */}
                  <span style={{
                    fontSize:10, fontWeight:800, padding:'3px 9px', borderRadius:20, whiteSpace:'nowrap', flexShrink:0,
                    background: d.urgent ? '#ef4444' : d.days <= 120 ? '#f59e0b' : '#22c55e',
                    color:'#fff'
                  }}>
                    {d.urgent ? '🔥' : ''} {d.date}
                  </span>
                </div>
              ))}
            </div>

            {/* Dots — hidden on mobile, visible on md+ */}
            <div className="hidden md:flex" style={{ gap:4, padding:'0 10px', flexShrink:0 }}>
              {DEADLINES.map((_, i) => (
                <button key={i} onClick={() => setDeadlineIdx(i)}
                  style={{ width: i===deadlineIdx ? 14 : 5, height:5, borderRadius:3, background: i===deadlineIdx ? '#22c55e' : 'rgba(255,255,255,.25)', border:'none', cursor:'pointer', padding:0, transition:'all .3s' }} />
              ))}
            </div>

            {/* View All — hidden on mobile */}
            <Link to="/scholarships" className="hidden md:block"
              style={{ padding:'12px 14px', fontSize:11, fontWeight:800, color:'rgba(255,255,255,.5)', textDecoration:'none', whiteSpace:'nowrap', flexShrink:0, borderLeft:'1px solid rgba(255,255,255,.1)' }}>
              All →
            </Link>

          </div>
        </div>
      </div>

      {/* FEATURED SCHOLARSHIPS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue mb-3">✨ Featured</span>
            <h2>Hot Scholarships This Month</h2>
            <p>Fully-funded and partially-funded opportunities open for Bangladeshi students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/scholarships" className="btn btn-outline btn-lg">View All 80+ Scholarships →</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green mb-3">🗺 How It Works</span>
            <h2>From Search to Acceptance</h2>
            <p>We simplify the entire process from finding the right scholarship to celebrating your acceptance.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-0.5 bg-gradient-to-r from-blue-500 to-green-500 rounded" />
            {STEPS.map(({ n, title, desc }) => (
              <div key={n} className="text-center px-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-navy-800 rounded-[18px] flex items-center justify-center font-head font-black text-3xl text-white mx-auto mb-6 relative z-10 shadow-lg">
                  {n}
                </div>
                <h3 className="font-head font-bold text-navy-800 text-lg mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE TOOLS SECTION */}
      <section style={{ background:'linear-gradient(135deg,#f0fdf4 0%,#eff6ff 100%)', padding:'72px 0' }}>
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:40 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#dcfce7', border:'1px solid #bbf7d0', borderRadius:50, padding:'6px 16px', marginBottom:16 }}>
              <span style={{ fontSize:14 }}>🎁</span>
              <span style={{ fontSize:11, fontWeight:800, color:'#166534', letterSpacing:'.08em', textTransform:'uppercase' }}>100% Free — No Signup</span>
            </div>
            <h2 className="font-head font-black text-3xl text-navy-800 mb-3">Free Tools for Bangladeshi Students</h2>
            <p className="text-gray-500 text-base max-w-md mx-auto">Start your scholarship journey with our free tools — used by 2,400+ students</p>
          </div>

          {/* Featured tool card */}
          <div style={{ background:'#fff', borderRadius:24, border:'2px solid #22c55e', boxShadow:'0 16px 48px rgba(34,197,94,.12)', padding:'32px', marginBottom:20, display:'flex', alignItems:'center', gap:28, flexWrap:'wrap' }}>
            <div style={{ flex:1, minWidth:240 }}>
              <div style={{ fontSize:42, marginBottom:12 }}>🎯</div>
              <div style={{ display:'inline-block', background:'#dcfce7', color:'#166534', fontSize:11, fontWeight:800, padding:'3px 12px', borderRadius:20, marginBottom:10, textTransform:'uppercase', letterSpacing:'.06em' }}>Most Popular Tool</div>
              <h3 className="font-head font-black text-2xl text-navy-800 mb-2">Scholarship Eligibility Checker</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">Enter your CGPA, IELTS, age & field — see which scholarships you qualify for in 30 seconds. With match score and tips for each.</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:20 }}>
                {['12 scholarships checked','% match score','Free consultation'].map(f => (
                  <span key={f} style={{ fontSize:11, fontWeight:700, background:'#f0fdf4', color:'#166534', padding:'4px 11px', borderRadius:20, border:'1px solid #bbf7d0' }}>✓ {f}</span>
                ))}
              </div>
              <Link to="/tools/eligibility-checker" className="btn btn-primary">🎯 Check My Eligibility — Free →</Link>
            </div>
            <div style={{ background:'#f8fafc', borderRadius:16, padding:'20px', minWidth:200, flexShrink:0 }}>
              <div style={{ fontSize:11, fontWeight:800, color:'#94a3b8', marginBottom:12, textTransform:'uppercase', letterSpacing:'.06em' }}>Sample results</div>
              {[{n:'Chevening UK',s:87,c:'#22c55e'},{n:'DAAD Germany',s:74,c:'#22c55e'},{n:'GKS Korea',s:52,c:'#f59e0b'},{n:'MEXT Japan',s:40,c:'#f97316'}].map(r => (
                <div key={r.n} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #e2e8f0' }}>
                  <span style={{ fontSize:12, color:'#475569', fontWeight:600 }}>{r.n}</span>
                  <span style={{ fontSize:13, fontWeight:900, color:r.c }}>{r.s}%</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign:'center' }}>
            <Link to="/tools" className="btn btn-outline btn-lg">View All Free Tools →</Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SECTION */}
      <section style={{ background:'linear-gradient(135deg,#0f2444 0%,#1a3a6b 50%,#0f2444 100%)', padding:'72px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.07, backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'26px 26px' }} />
        <div style={{ position:'absolute', top:-60, right:-60, width:320, height:320, background:'radial-gradient(circle,rgba(34,197,94,.15),transparent 65%)', borderRadius:'50%' }} />
        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:580 }}>
          <span style={{ fontSize:48, display:'block', marginBottom:16 }}>🔔</span>
          <h2 className="font-head font-black text-3xl text-white mb-3">Never Miss a Scholarship Deadline</h2>
          <p style={{ color:'rgba(255,255,255,.6)', fontSize:15, lineHeight:1.7, margin:'0 auto 32px', maxWidth:440 }}>
            Get weekly alerts for new scholarships, upcoming deadlines, and insider tips — delivered straight to your inbox. Free forever.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:20, flexWrap:'wrap', marginBottom:28 }}>
            {['📅 Deadline alerts','🆕 New scholarships','💡 Weekly tips','🎁 Free forever'].map(f => (
              <span key={f} style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,.75)' }}>{f}</span>
            ))}
          </div>
          <div style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.12)', borderRadius:18, padding:'28px' }}>
            <NewsletterFull source="Homepage" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy-800 to-navy-600 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,107,245,.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(5,150,105,.1),transparent_50%)]" />
        <div className="container relative z-10">
          <span className="badge badge-navy mb-5">🚀 Start Today — It's Free</span>
          <h2 className="font-head font-black text-3xl md:text-4xl text-white mb-4">Ready to Study Abroad?</h2>
          <p className="text-white/65 text-base mb-8 max-w-md mx-auto">Join 2,400+ students who used ScholarPath to win international scholarships.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/scholarships" className="btn btn-primary btn-xl">🔍 Browse Scholarships</Link>
            <Link to="/services" className="btn btn-white btn-xl">View Our Packages →</Link>
          </div>
        </div>
      </section>
    </>
  )
}
