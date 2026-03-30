"import { Link, useNavigate } from 'react-router-dom'"
import { useNavigate } from 'react-router-dom'
import { useScholarships } from '@context/ScholarshipContext'

import { useScholarships } from '@context/ScholarshipContext'
import ScholarshipCard from '@components/common/ScholarshipCard'
import AISearchBar from '@components/common/AISearchBar'

const STATS = [['500+', 'Scholarships'], ['2,400+', 'Students Helped'], ['94%', 'Success Rate'], ['20+', 'Countries']]
const STEPS = [
  { n: 1, title: 'Discover & Match', desc: 'Use our AI advisor and smart filters to find scholarships perfectly matched to your profile, field, and goals.' },
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
  const countryMap = {}
  scholarships.forEach(s => { if (s.country && s.flag) countryMap[s.country] = s.flag })
  
  const navigate = useNavigate()
  const featured = scholarships.slice(0, 6)

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-navy-800 via-navy-800 to-navy-600 min-h-[90vh] flex items-center py-16 relative overflow-hidden">
        <div className="dot-pattern absolute inset-0 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-600/8 rounded-full blur-[80px]" />
        <div className="container relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Bangladesh's #1 AI Scholarship Platform</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-[1.08]">
                Find Your <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Dream</span><br />Scholarship with AI
              </h1>
              <p className="text-white/65 text-base leading-relaxed max-w-md mb-8">
                Discover 500+ fully-funded international scholarships. Our AI advisor matches you instantly — then our experts handle the entire application for you.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/scholarships" className="btn btn-primary btn-lg">🔍 Browse Scholarships</Link>
                <Link to="/services" className="btn btn-white btn-lg">View Packages →</Link>
              </div>
              <div className="flex gap-8">
                {STATS.map(([val, label]) => (
                  <div key={label}>
                    <div className="font-head font-black text-2xl text-white">{val}</div>
                    <div className="text-xs text-white/50 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero card */}
            <div className="hidden md:block">
              <div className="bg-white/7 backdrop-blur-xl border border-white/12 rounded-3xl p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Top Opportunities</span>
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/20 border border-green-500/30 rounded-full text-[11px] font-bold text-green-400">✦ Live</span>
                </div>
                {scholarships.slice(0, 4).map(s => (
                  <Link key={s.id} to={`/scholarships/${s.id}`}
                    className="flex items-center gap-3 p-3 bg-white/5 border border-white/8 rounded-xl mb-2 last:mb-0 hover:bg-white/10 transition-colors">
                    <span className="text-2xl">{s.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{s.name}</div>
                      <div className="text-xs text-white/45 flex gap-2 mt-0.5">
                        <span>{s.country}</span><span>{s.tags[0]}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-green-400 flex-shrink-0">{s.amount}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI SEARCH */}
      <section className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <span className="badge badge-blue mb-3">✦ AI Scholarship Advisor</span>
              <h2 className="font-head font-black text-2xl text-navy-800 mb-2">Ask Anything About Scholarships</h2>
              <p className="text-gray-500 text-sm">Get instant AI-powered answers about eligibility, deadlines, documents, and more</p>
            </div>
            <AISearchBar />
          </div>
        </div>
      </section>

      {/* QUICK SEARCH */}
      <div className="bg-white shadow-card border-b border-gray-100">
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
            {[
              { label: 'Degree Level', id: 'degree', opts: [['', 'All Levels'], ['bachelors', "Bachelor's"], ['masters', "Master's"], ['phd', 'PhD']] },
              { label: 'Destination', id: 'country', opts: [['', 'All Countries'], ...Object.entries(countryMap).sort((a,b)=>a[0].localeCompare(b[0])).map(([c,f])=>[c, `${c} ${f}`])] },
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
            {['🏆 Trusted by 2,400+ students', '🔒 Verified scholarships only', '🤖 AI-powered matching', '👨‍💼 Expert counselors on call', '⚡ Daily updates'].map(t => (
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
