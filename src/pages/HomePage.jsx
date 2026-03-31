import { Link, useNavigate } from 'react-router-dom'
import { useScholarships } from '@context/ScholarshipContext'
import ScholarshipCard from '@components/common/ScholarshipCard'

const STATS = [['500+', 'Scholarships'], ['2,400+', 'Students Helped'], ['94%', 'Success Rate'], ['20+', 'Countries']]
const STEPS = [
  { n: 1, title: 'Discover & Match', desc: 'Use our smart filters and search to find scholarships perfectly matched to your profile, field, and goals.' },
  { n: 2, title: 'Prepare & Upload', desc: 'Get a personalized document checklist. Upload files securely to your dashboard. Our experts review everything.' },
  { n: 3, title: 'Apply & Succeed', desc: 'Apply independently or let our team handle it completely. Track your application in real-time and celebrate your acceptance!' },
]
const TESTIMONIALS = [
  { stars: 5, text: '"ScholarPath helped me land a fully-funded DAAD scholarship to Germany. Their AI matched me to the right program instantly, and the team guided me through every step."', name: 'Rafiqul Alam', meta: 'MSc CS, TU Munich 🇩🇪 · DAAD Scholar', av: 'RA' },
  { stars: 5, text: '"Chevening was overwhelming. ScholarPath\'s Premium package was worth every taka. They wrote my essays, prepared my CV, and I got accepted first try!"', name: 'Nusrat Khan', meta: 'LSE London 🇬🇧 · Chevening Scholar', av: 'NK' },
  { stars: 5, text: '"The MEXT scholarship process is notoriously complex. ScholarPath\'s AI answered all my questions instantly. Now I\'m studying robotics at Osaka University!"', name: 'Sabbir Hossain', meta: 'Osaka University 🇯🇵 · MEXT Scholar', av: 'SH' },
]

export default function HomePage() {
  const { scholarships } = useScholarships()
  const navigate = useNavigate()
  const featured = scholarships.slice(0, 6)
  const countryMap = {}
  scholarships.forEach(s => { if (s.country && s.flag) countryMap[s.country] = s.flag })

  return (
    <>

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
                      <div className="text-xs text-white/50">{s.country} · {(typeof s.degree === 'string' ? JSON.parse(s.degree||'[]') : s.degree||[]).map(d=>d==='masters'?"Master's":d==='phd'?'PhD':"Bachelor's").join('/')}</div>
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
              { label: 'Degree Level', id: 'degree', opts: [['', 'All Levels'], ['bachelors', "Bachelor's"], ['masters', "Master's"], ['phd', 'PhD']] },
              { label: 'Destination', id: 'country', opts: [['', 'All Countries'], ...Object.entries(countryMap).sort((a,b)=>a[0].localeCompare(b[0])).map(([c,f])=>[c,`${c} ${f}`])] },
              { label: 'Field of Study', id: 'field',  opts: [['', 'All Fields'], ['engineering', 'Engineering & Tech'], ['business', 'Business & MBA'], ['medical', 'Medical & Health'], ['arts', 'Arts & Humanities'], ['social', 'Social Sciences'], ['multiple', 'Multiple / Any Field']] },
            ].map(({ label, id, opts }) => (
              <div key={id}>
                <label className="label">{label}</label>
                <select id={id} className="input text-sm">{opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
              </div>
            ))}
            <button className="btn btn-primary" onClick={() => {
              const d = document.getElementById('degree')?.value
              const c = document.getElementById('country')?.value
              const f = document.getElementById('field')?.value
              const params = new URLSearchParams()
              if (d) params.set('degree', d)
              if (c) params.set('country', c)
              if (f) params.set('field', f)
              navigate(`/scholarships?${params}`)
            }}>Search →</button>
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
            <Link to="/scholarships" className="btn btn-outline btn-lg">View All 500+ Scholarships →</Link>
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

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-gold mb-3">⭐ Success Stories</span>
            <h2>Real Students, Real Results</h2>
            <p>Join thousands who achieved their study-abroad dreams with ScholarPath.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="card p-6">
                <div className="text-amber-400 text-base mb-3">{'★'.repeat(t.stars)}</div>
                <p className="text-gray-600 text-sm leading-relaxed italic mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center font-head font-bold text-white text-sm flex-shrink-0">{t.av}</div>
                  <div>
                    <div className="font-bold text-sm text-navy-800">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
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
