import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { useScholarships } from '@context/ScholarshipContext'
import ScholarshipCard from '@components/common/ScholarshipCard'
import { useState } from 'react'
import toast from 'react-hot-toast'

const INTAKE_URL  = 'https://www.scholarpathbd.com/intake.html'
const WHATSAPP    = 'https://wa.me/8801889700879'

const DOC_CHECKLIST = [
  { icon:'🛂', name:'Passport',              sub:'Valid passport — photo page' },
  { icon:'📄', name:'Academic Transcripts',  sub:'All years — certified copy' },
  { icon:'🎓', name:'Degree Certificate',    sub:'Bachelor\'s / Master\'s degree' },
  { icon:'🏆', name:'IELTS / TOEFL',         sub:'Official score report' },
  { icon:'📝', name:'Statement of Purpose',  sub:'Tailored to target scholarship' },
  { icon:'📋', name:'CV / Resume',           sub:'Europass format for Europe' },
  { icon:'💌', name:'Recommendation Letters',sub:'2–3 from professors / employers' },
  { icon:'🪪', name:'National ID',           sub:'NID — both sides' },
  { icon:'📸', name:'Passport Photos',       sub:'White background, recent' },
  { icon:'🔬', name:'Research Proposal',     sub:'For PhD applicants only' },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { savedScholarships } = useScholarships()
  const [section, setSection] = useState('overview')
  const [checked, setChecked] = useState({})
  const navigate = useNavigate()

  const doneCount = Object.values(checked).filter(Boolean).length

  const NAV = [
    { id:'overview',  icon:'🏠', label:'Overview' },
    { id:'saved',     icon:'🔖', label:'Saved Scholarships' },
    { id:'checklist', icon:'📄', label:'Document Checklist' },
    { id:'track',     icon:'📋', label:'Track Application' },
  ]

  return (
    <div className="container">
      <div className="grid md:grid-cols-[220px_1fr] gap-6 py-7 min-h-screen">

        {/* Sidebar */}
        <aside className="md:sticky md:top-20 h-fit">
          <div className="card p-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center font-head font-bold text-white text-sm flex-shrink-0">
                {user?.avatar || user?.firstName?.[0] || '?'}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-navy-800 truncate">{user?.name || user?.firstName}</div>
                <div className="text-xs text-gray-500 truncate">{user?.email}</div>
              </div>
            </div>
            <nav className="space-y-0.5">
              {NAV.map(({ id, icon, label }) => (
                <button key={id} onClick={() => setSection(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left ${section === id ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100 hover:text-navy-800'}`}>
                  <span className="text-base w-5 text-center">{icon}</span>{label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2 space-y-0.5">
                <button onClick={() => navigate('/services')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 text-left">
                  <span className="text-base w-5 text-center">⭐</span>Our Services
                </button>
                <button onClick={logout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 text-left">
                  <span className="text-base w-5 text-center">🚪</span>Sign Out
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div>

          {/* ── OVERVIEW ── */}
          {section === 'overview' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">Welcome back, {user?.firstName || user?.name}! 👋</h2>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <div className="card p-4">
                  <div className="text-2xl mb-2">🔖</div>
                  <div className="font-head font-black text-3xl text-navy-800">{savedScholarships.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Saved Scholarships</div>
                </div>
                <div className="card p-4">
                  <div className="text-2xl mb-2">📄</div>
                  <div className="font-head font-black text-3xl text-navy-800">{doneCount}/{DOC_CHECKLIST.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Documents Ready</div>
                </div>
                <div className="card p-4">
                  <div className="text-2xl mb-2">🌍</div>
                  <div className="font-head font-black text-3xl text-navy-800">{new Set(savedScholarships.map(s=>s.country)).size}</div>
                  <div className="text-xs text-gray-500 mt-1">Countries Exploring</div>
                </div>
              </div>

              {/* Apply CTA */}
              <div className="bg-gradient-to-br from-navy-900 to-navy-600 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <h3 className="font-head font-black text-lg mb-2">Ready to apply? 🚀</h3>
                    <p className="text-sm text-white/70 mb-4 max-w-md">Fill our intake form — takes 5 minutes. Upload your documents. Our team contacts you on WhatsApp within 24 hours with a personalised scholarship plan.</p>
                    <div className="flex gap-3 flex-wrap">
                      <a href={INTAKE_URL} target="_blank" rel="noreferrer"
                        className="btn btn-primary text-sm no-underline">📋 Fill Intake Form</a>
                      <a href={WHATSAPP} target="_blank" rel="noreferrer"
                        className="btn text-sm no-underline" style={{background:'#25D366',color:'#fff',border:'none'}}>💬 WhatsApp Us</a>
                    </div>
                  </div>
                  <div className="text-5xl">🎓</div>
                </div>
              </div>

              {/* Saved scholarships preview */}
              {savedScholarships.length > 0 && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-head font-bold text-navy-800 text-base">🔖 Your Saved Scholarships</h3>
                    <button onClick={() => setSection('saved')} className="text-xs text-blue-600 font-semibold">View All →</button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {savedScholarships.slice(0, 4).map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
                  </div>
                </>
              )}

              {/* Doc checklist preview */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-head font-bold text-navy-800 text-base">📄 Document Readiness</h3>
                <button onClick={() => setSection('checklist')} className="text-xs text-blue-600 font-semibold">View Checklist →</button>
              </div>
              <div className="card p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-600">{doneCount} of {DOC_CHECKLIST.length} documents ready</span>
                  <span className="text-xs font-bold text-blue-600">{Math.round(doneCount/DOC_CHECKLIST.length*100)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-500"
                    style={{width:`${Math.round(doneCount/DOC_CHECKLIST.length*100)}%`}} />
                </div>
                <p className="text-xs text-gray-400 mt-2">Tick items as you prepare — then upload everything via intake form</p>
              </div>
            </>
          )}

          {/* ── SAVED ── */}
          {section === 'saved' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">🔖 Saved Scholarships</h2>
                <Link to="/scholarships" className="btn btn-primary btn-sm">+ Find More</Link>
              </div>
              {savedScholarships.length > 0
                ? <div className="grid sm:grid-cols-2 gap-4">
                    {savedScholarships.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
                  </div>
                : <div className="text-center py-16">
                    <div className="text-5xl mb-4">🔖</div>
                    <h3 className="font-head font-bold text-navy-800 text-lg mb-2">No saved scholarships yet</h3>
                    <p className="text-sm text-gray-500 mb-4">Browse scholarships and click the bookmark to save them here</p>
                    <Link to="/scholarships" className="btn btn-primary">Browse Scholarships</Link>
                  </div>
              }
            </>
          )}

          {/* ── DOCUMENT CHECKLIST ── */}
          {section === 'checklist' && (
            <>
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-head font-black text-2xl text-navy-800">📄 Document Checklist</h2>
                <span className="badge badge-blue">{doneCount}/{DOC_CHECKLIST.length} Ready</span>
              </div>
              <p className="text-sm text-gray-500 mb-5">Tick each document as you prepare it. When ready, upload everything via the intake form.</p>

              {/* Progress bar */}
              <div className="card p-4 mb-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Overall readiness</span>
                  <span className="font-bold text-blue-600">{Math.round(doneCount/DOC_CHECKLIST.length*100)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-green-500 rounded-full transition-all duration-500"
                    style={{width:`${Math.round(doneCount/DOC_CHECKLIST.length*100)}%`}} />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {DOC_CHECKLIST.map((doc, i) => (
                  <label key={i} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${checked[i] ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                    <input type="checkbox" checked={!!checked[i]}
                      onChange={() => setChecked(prev => ({...prev, [i]: !prev[i]}))}
                      className="w-4 h-4 accent-green-500 flex-shrink-0" />
                    <span className="text-xl flex-shrink-0">{doc.icon}</span>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${checked[i] ? 'text-green-700 line-through' : 'text-navy-800'}`}>{doc.name}</div>
                      <div className="text-xs text-gray-500">{doc.sub}</div>
                    </div>
                    {checked[i] && <span className="text-green-500 text-lg flex-shrink-0">✓</span>}
                  </label>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">📋</div>
                <h4 className="font-head font-bold text-navy-800 text-base mb-2">Ready to submit your documents?</h4>
                <p className="text-xs text-gray-500 mb-4">Upload all your documents through our secure intake form. Our team reviews them and contacts you within 24 hours.</p>
                <a href={INTAKE_URL} target="_blank" rel="noreferrer"
                  className="btn btn-primary text-sm no-underline inline-flex items-center gap-2">
                  📤 Upload via Intake Form
                </a>
              </div>
            </>
          )}

          {/* ── TRACK APPLICATION ── */}
          {section === 'track' && (
            <>
              <h2 className="font-head font-black text-2xl text-navy-800 mb-2">📋 Track Your Application</h2>
              <p className="text-sm text-gray-500 mb-6">Submitted your intake form? Here is how to track your application status.</p>

              {/* Steps */}
              <div className="space-y-4 mb-6">
                {[
                  { step:1, icon:'📋', title:'Fill Intake Form', desc:'Submit your details and upload documents. Takes 5 minutes.', done:true, cta:{label:'Fill Form Now', href:INTAKE_URL} },
                  { step:2, icon:'💬', title:'We Contact You on WhatsApp', desc:'Our team reviews your profile and contacts you within 24 hours on WhatsApp with a personalised plan.', done:false },
                  { step:3, icon:'💳', title:'Choose Package & Pay', desc:'Select Basic, Standard, or Premium. Pay via bKash or Nagad. We start work immediately.', done:false },
                  { step:4, icon:'✍️', title:'SOP & Document Preparation', desc:'Our team prepares your Statement of Purpose, reviews your CV, and prepares all application documents.', done:false },
                  { step:5, icon:'🚀', title:'Application Submitted', desc:'We submit your application to the scholarship body and track the deadline.', done:false },
                  { step:6, icon:'🎉', title:'Result & Visa Guidance', desc:'We notify you of the result and guide you through visa application if accepted.', done:false },
                ].map(({ step, icon, title, desc, done, cta }) => (
                  <div key={step} className={`flex gap-4 p-4 rounded-xl border ${done ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-white'}`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${done ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      {done ? '✓' : step}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm mb-1 ${done ? 'text-green-700' : 'text-navy-800'}`}>{icon} {title}</div>
                      <p className="text-xs text-gray-500 leading-relaxed mb-2">{desc}</p>
                      {cta && (
                        <a href={cta.href} target="_blank" rel="noreferrer"
                          className="btn btn-primary btn-sm text-xs no-underline inline-flex">
                          {cta.label} →
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="card p-5 text-center">
                <h4 className="font-head font-bold text-navy-800 text-base mb-2">Already submitted? Check your status 💬</h4>
                <p className="text-xs text-gray-500 mb-4">Message us on WhatsApp with your name and email — we will give you a full update within 2 hours.</p>
                <a href={WHATSAPP} target="_blank" rel="noreferrer"
                  className="btn text-sm no-underline inline-flex items-center gap-2" style={{background:'#25D366',color:'#fff',border:'none'}}>
                  💬 Message Us on WhatsApp
                </a>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
