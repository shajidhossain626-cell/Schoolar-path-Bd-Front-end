import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { useScholarships } from '@context/ScholarshipContext'
import { useChat } from '@hooks/useAI'
import ScholarshipCard from '@components/common/ScholarshipCard'
import toast from 'react-hot-toast'

const APPLICATIONS = [
  { id:1, flag:'🇩🇪', name:'DAAD Research Scholarship 2025', country:'Germany', degree:"Master's", date:'Jan 15, 2025', via:'ScholarPath Premium', progress:65, status:'review' },
  { id:2, flag:'🇬🇧', name:'Chevening Scholarship 2025', country:'UK', degree:"Master's", date:'Dec 3, 2024', via:'ScholarPath Premium', progress:100, status:'accepted' },
  { id:3, flag:'🇯🇵', name:'MEXT Government Scholarship', country:'Japan', degree:'PhD', date:'Feb 1, 2025', via:'Self Applied', progress:30, status:'draft' },
]

const DOCUMENTS_INIT = [
  { name:'Academic Transcript.pdf', size:'2.4 MB', date:'Jan 10, 2025', status:'accepted', icon:'📄' },
  { name:'Passport Copy.pdf', size:'1.1 MB', date:'Jan 10, 2025', status:'accepted', icon:'🛂' },
  { name:'Statement of Purpose – DAAD.pdf', size:'485 KB', date:'Jan 12, 2025', status:'review', icon:'📝' },
  { name:'IELTS Certificate.pdf', size:'820 KB', date:'Jan 11, 2025', status:'accepted', icon:'🏆' },
  { name:'CV – Europass Format.pdf', size:'340 KB', date:'Jan 13, 2025', status:'draft', icon:'📋' },
]

const STATUS_MAP = { review:'pill-review', accepted:'pill-accepted', rejected:'pill-rejected', draft:'pill-draft', pending:'pill-pending' }
const STATUS_LABEL = { review:'Under Review', accepted:'✅ Accepted', rejected:'Rejected', draft:'In Progress', pending:'Pending' }

function AppCard({ a }) {
  return (
    <div className="card p-4 flex gap-4 items-center hover:shadow-card transition-shadow">
      <span className="text-3xl flex-shrink-0">{a.flag}</span>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-navy-800 mb-0.5 truncate">{a.name}</h4>
        <p className="text-xs text-gray-500 mb-1.5">{a.country} · {a.degree} · {a.date} · {a.via}</p>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${a.progress}%` }} /></div>
      </div>
      <div className="text-right flex-shrink-0">
        <span className={`pill ${STATUS_MAP[a.status]}`}>{STATUS_LABEL[a.status]}</span>
        <div className="text-[11px] text-gray-400 mt-1">{a.progress}%</div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { savedScholarships } = useScholarships()
  const { messages, send, loading: chatLoading } = useChat()
  const [section, setSection] = useState('overview')
  const [docs, setDocs] = useState(DOCUMENTS_INIT)
  const [chatInput, setChatInput] = useState('')
  const navigate = useNavigate()

  const STATS = [
    { icon:'🔖', val: savedScholarships.length, label:'Saved' },
    { icon:'📋', val: APPLICATIONS.length, label:'Applications' },
    { icon:'📄', val: docs.length, label:'Documents' },
    { icon:'✅', val: 1, label:'Accepted' },
  ]

  const NAV = [
    { id:'overview', icon:'🏠', label:'Overview' },
    { id:'saved', icon:'🔖', label:'Saved Scholarships' },
    { id:'applications', icon:'📋', label:'My Applications' },
    { id:'documents', icon:'📄', label:'Documents' },
    { id:'payments', icon:'💳', label:'Payment History' },
    { id:'ai', icon:'🤖', label:'AI Advisor' },
  ]

  const handleFileUpload = (e) => {
    const files = [...e.target.files]
    files.forEach(f => {
      setDocs(prev => [{ name: f.name, size: `${(f.size/1024/1024).toFixed(1)} MB`, date: 'Today', status: 'review', icon: '📄' }, ...prev])
    })
    toast.success(`${files.length} file(s) uploaded successfully! 📤`)
  }

  return (
    <div className="container">
      <div className="grid md:grid-cols-[220px_1fr] gap-6 py-7 min-h-screen">
        {/* Sidebar */}
        <aside className="md:sticky md:top-20 h-fit">
          <div className="card p-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center font-head font-bold text-white text-sm flex-shrink-0">{user?.avatar}</div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-navy-800 truncate">{user?.name}</div>
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
                  <span className="text-base w-5 text-center">⭐</span>Upgrade Plan
                </button>
                <button onClick={logout} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 text-left">
                  <span className="text-base w-5 text-center">🚪</span>Sign Out
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div>
          {/* OVERVIEW */}
          {section === 'overview' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">Welcome back, {user?.firstName}! 👋</h2>
                <span className="badge badge-green">🟢 {user?.plan} Plan</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {STATS.map(({ icon, val, label }) => (
                  <div key={label} className="card p-4">
                    <div className="text-2xl mb-2">{icon}</div>
                    <div className="font-head font-black text-3xl text-navy-800">{val}</div>
                    <div className="text-xs text-gray-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
              <h3 className="font-head font-bold text-navy-800 text-base mb-3">📋 Recent Applications</h3>
              <div className="space-y-3 mb-6">{APPLICATIONS.slice(0,2).map(a => <AppCard key={a.id} a={a} />)}</div>
              <h3 className="font-head font-bold text-navy-800 text-base mb-3">🔖 Recently Saved</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {savedScholarships.slice(0,4).map(s => <ScholarshipCard key={s.id} scholarship={s} />)}
              </div>
            </>
          )}

          {/* SAVED */}
          {section === 'saved' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">🔖 Saved Scholarships</h2>
                <Link to="/scholarships" className="btn btn-primary btn-sm">+ Find More</Link>
              </div>
              {savedScholarships.length > 0
                ? <div className="grid sm:grid-cols-2 gap-4">{savedScholarships.map(s => <ScholarshipCard key={s.id} scholarship={s} />)}</div>
                : <div className="text-center py-16"><div className="text-5xl mb-4">🔖</div><h3 className="font-head font-bold text-navy-800 text-lg mb-2">No saved scholarships yet</h3><Link to="/scholarships" className="btn btn-primary">Browse Scholarships</Link></div>}
            </>
          )}

          {/* APPLICATIONS */}
          {section === 'applications' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">📋 My Applications</h2>
                <Link to="/scholarships" className="btn btn-primary btn-sm">+ New Application</Link>
              </div>
              <div className="space-y-3">{APPLICATIONS.map(a => <AppCard key={a.id} a={a} />)}</div>
            </>
          )}

          {/* DOCUMENTS */}
          {section === 'documents' && (
            <>
              <h2 className="font-head font-black text-2xl text-navy-800 mb-5">📄 Documents</h2>
              <label className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer block mb-5">
                <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" className="hidden" onChange={handleFileUpload} />
                <div className="text-5xl mb-3">📤</div>
                <h4 className="font-semibold text-gray-700 mb-1">Drop files here or click to upload</h4>
                <p className="text-xs text-gray-400">PDF, DOC, JPG up to 10MB · Passport, Transcripts, IELTS, SOP, CV</p>
              </label>
              <div className="space-y-2">
                {docs.map((d, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all">
                    <span className="text-xl">{d.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-800 truncate">{d.name}</div>
                      <div className="text-xs text-gray-500">{d.size} · {d.date}</div>
                    </div>
                    <span className={`pill ${STATUS_MAP[d.status]} text-[10px]`}>{STATUS_LABEL[d.status]}</span>
                    <button onClick={() => toast.success(`Downloading ${d.name}...`)} className="text-gray-400 hover:text-gray-600 text-sm">⬇</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* PAYMENTS */}
          {section === 'payments' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">💳 Payment History</h2>
                <Link to="/services" className="btn btn-primary btn-sm">Upgrade Plan</Link>
              </div>
              <div className="card overflow-hidden mb-5">
                <table className="w-full border-collapse">
                  <thead><tr className="border-b-2 border-gray-200">
                    {['Date', 'Description', 'Amount', 'Status', 'Invoice'].map(h => <th key={h} className="text-left p-3 text-xs font-bold text-gray-500 uppercase tracking-wide">{h}</th>)}
                  </tr></thead>
                  <tbody>
                    {[
                      ['Jan 14, 2025', 'Standard Plan – DAAD Application', '৳5,000'],
                      ['Dec 1, 2024', 'Premium Plan – Chevening', '৳8,000'],
                      ['Nov 20, 2024', 'Initial Consultation', '৳500'],
                    ].map(([date, desc, amt], i) => (
                      <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-3 text-sm text-gray-600">{date}</td>
                        <td className="p-3 text-sm text-gray-700">{desc}</td>
                        <td className="p-3 text-sm font-bold text-navy-800">{amt}</td>
                        <td className="p-3"><span className="pill pill-accepted text-[10px]">Paid</span></td>
                        <td className="p-3"><button onClick={() => toast.success('Downloading invoice...')} className="btn btn-ghost btn-sm">⬇ PDF</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-5 flex-wrap gap-4">
                <div><div className="text-xs text-gray-500">Total Invested</div><div className="font-head font-black text-3xl text-navy-800">৳13,500</div></div>
                <div className="text-right"><div className="text-xs text-gray-500">Scholarship Value Won</div><div className="font-head font-black text-3xl text-green-600">£18,500/yr</div></div>
              </div>
            </>
          )}

          {/* AI ADVISOR */}
          {section === 'ai' && (
            <>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-head font-black text-2xl text-navy-800">🤖 AI Advisor</h2>
                <span className="badge badge-blue">Powered by Claude AI</span>
              </div>
              <div className="card overflow-hidden">
                <div className="h-96 overflow-y-auto p-5 space-y-3 flex flex-col">
                  {messages.map((m, i) => (
                    <div key={i} className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'bg-navy-800 text-white self-end rounded-br-sm' : 'bg-blue-50 text-navy-800 self-start rounded-bl-sm'}`}>
                      {m.content}
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="bg-blue-50 rounded-2xl rounded-bl-sm px-4 py-3 self-start">
                      <div className="flex gap-1.5">{[0,.15,.3].map(d => <div key={d} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}s` }} />)}</div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-200 flex gap-2">
                  <input className="input flex-1 text-sm" value={chatInput} onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && chatInput.trim()) { send(chatInput); setChatInput('') } }}
                    placeholder="Ask about scholarships, eligibility, documents..." />
                  <button className="btn btn-blue btn-sm" disabled={chatLoading || !chatInput.trim()}
                    onClick={() => { if (chatInput.trim()) { send(chatInput); setChatInput('') } }}>
                    Send ✦
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Which scholarships am I most eligible for?', 'How to improve my SOP for DAAD?', 'What IELTS score for Chevening?', 'List PhD engineering scholarships'].map(q => (
                  <button key={q} onClick={() => { setChatInput(q); send(q) }}
                    className="px-3 py-1.5 border border-blue-200/60 bg-blue-50/60 rounded-full text-xs text-blue-600 hover:bg-blue-100 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
