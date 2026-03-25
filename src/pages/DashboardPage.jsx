import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import { useScholarships } from '@context/ScholarshipContext'
import { useChat } from '@hooks/useAI'
import ScholarshipCard from '@components/common/ScholarshipCard'
import { applicationAPI, documentAPI, paymentAPI } from '../services/api'
import toast from 'react-hot-toast'

const STATUS_MAP = { UNDER_REVIEW:'pill-review', review:'pill-review', ACCEPTED:'pill-accepted', accepted:'pill-accepted', REJECTED:'pill-rejected', rejected:'pill-rejected', DRAFT:'pill-draft', draft:'pill-draft', SUBMITTED:'pill-review', pending:'pill-pending' }
const STATUS_LABEL = { UNDER_REVIEW:'Under Review', review:'Under Review', ACCEPTED:'✅ Accepted', accepted:'✅ Accepted', REJECTED:'Rejected', rejected:'Rejected', DRAFT:'In Progress', draft:'In Progress', SUBMITTED:'Submitted', pending:'Pending' }

function AppCard({ a }) {
  const status = (a.status || 'draft').toLowerCase()
  const scholarship = a.scholarship || {}
  return (
    <div className="card p-4 flex gap-4 items-center hover:shadow-card transition-shadow">
      <span className="text-3xl flex-shrink-0">{scholarship.flag || '🎓'}</span>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-navy-800 mb-0.5 truncate">{scholarship.name || a.scholarshipName || 'Scholarship'}</h4>
        <p className="text-xs text-gray-500 mb-1.5">{scholarship.country || ''} · {a.appliedVia || 'self'} · {new Date(a.createdAt).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</p>
        <div className="progress-bar"><div className="progress-fill" style={{ width: `${a.progress || 0}%` }} /></div>
      </div>
      <div className="text-right flex-shrink-0">
        <span className={`pill ${STATUS_MAP[a.status] || 'pill-draft'}`}>{STATUS_LABEL[a.status] || a.status}</span>
        <div className="text-[11px] text-gray-400 mt-1">{a.progress || 0}%</div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { savedScholarships } = useScholarships()
  const { messages, send, loading: chatLoading } = useChat()
  const [section, setSection] = useState('overview')
  const [applications, setApplications] = useState([])
  const [docs, setDocs] = useState([])
  const [payments, setPayments] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [chatInput, setChatInput] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      setLoadingData(true)
      try {
        const [appsRes, docsRes, paysRes] = await Promise.allSettled([
          applicationAPI.list(),
          documentAPI.list(),
          paymentAPI.history(),
        ])
        if (appsRes.status === 'fulfilled' && appsRes.value.data?.success) {
          setApplications(appsRes.value.data.data || [])
        }
        if (docsRes.status === 'fulfilled' && docsRes.value.data?.success) {
          setDocs(docsRes.value.data.data || [])
        }
        if (paysRes.status === 'fulfilled' && paysRes.value.data?.success) {
          setPayments(paysRes.value.data.data || [])
        }
      } catch (e) {
        console.error('Dashboard load error:', e)
      } finally {
        setLoadingData(false)
      }
    }
    loadData()
  }, [])

  const acceptedCount = applications.filter(a => a.status === 'ACCEPTED').length

  const STATS = [
    { icon:'🔖', val: savedScholarships.length, label:'Saved' },
    { icon:'📋', val: applications.length, label:'Applications' },
    { icon:'📄', val: docs.length, label:'Documents' },
    { icon:'✅', val: acceptedCount, label:'Accepted' },
  ]

  const NAV = [
    { id:'overview', icon:'🏠', label:'Overview' },
    { id:'saved', icon:'🔖', label:'Saved Scholarships' },
    { id:'applications', icon:'📋', label:'My Applications' },
    { id:'documents', icon:'📄', label:'Documents' },
    { id:'payments', icon:'💳', label:'Payment History' },
    { id:'ai', icon:'🤖', label:'AI Advisor' },
  ]

  const handleFileUpload = async (e) => {
    const files = [...e.target.files]
    for (const f of files) {
      const form = new FormData()
      form.append('file', f)
      try {
        const res = await documentAPI.upload(form)
        if (res.data?.success) {
          setDocs(prev => [res.data.data, ...prev])
        } else {
          // fallback local preview
          setDocs(prev => [{ id: Date.now(), name: f.name, fileSize: `${(f.size/1024/1024).toFixed(1)} MB`, uploadedAt: new Date().toISOString(), status: 'PENDING', icon: '📄' }, ...prev])
        }
      } catch {
        setDocs(prev => [{ id: Date.now(), name: f.name, fileSize: `${(f.size/1024/1024).toFixed(1)} MB`, uploadedAt: new Date().toISOString(), status: 'PENDING', icon: '📄' }, ...prev])
      }
    }
    toast.success(`${files.length} file(s) uploaded! 📤`)
  }

  const displayName = user?.firstName || user?.name || 'Student'
  const displayEmail = user?.email || ''
  const displayAvatar = user?.avatar || (user?.firstName?.[0] || 'U') + (user?.lastName?.[0] || '')

  return (
    <div className="container">
      <div className="grid md:grid-cols-[220px_1fr] gap-6 py-7 min-h-screen">
        {/* Sidebar */}
        <aside className="md:sticky md:top-20 h-fit">
          <div className="card p-4">
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center font-head font-bold text-white text-sm flex-shrink-0">{displayAvatar}</div>
              <div className="min-w-0">
                <div className="font-bold text-sm text-navy-800 truncate">{displayName}</div>
                <div className="text-xs text-gray-500 truncate">{displayEmail}</div>
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

        {/* Main */}
        <main className="min-w-0">

          {/* OVERVIEW */}
          {section === 'overview' && (
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {STATS.map(({ icon, val, label }) => (
                  <div key={label} className="card p-4 text-center">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-2xl font-head font-black text-navy-800">{loadingData ? '—' : val}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                  </div>
                ))}
              </div>

              <div className="card p-5 mb-4">
                <h3 className="font-head font-bold text-navy-800 mb-3">📋 Recent Applications</h3>
                {loadingData ? (
                  <div className="text-center py-8 text-gray-400">Loading...</div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">📋</div>
                    <p className="text-gray-500 text-sm">No applications yet</p>
                    <Link to="/scholarships" className="btn btn-primary btn-sm mt-3 inline-block">Browse Scholarships</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.slice(0, 3).map(a => <AppCard key={a.id} a={a} />)}
                  </div>
                )}
              </div>

              <div className="card p-5">
                <h3 className="font-head font-bold text-navy-800 mb-3">🔖 Recently Saved</h3>
                {savedScholarships.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🔖</div>
                    <p className="text-gray-500 text-sm">No saved scholarships yet</p>
                    <Link to="/scholarships" className="btn btn-primary btn-sm mt-3 inline-block">Browse Scholarships</Link>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {savedScholarships.slice(0, 2).map(s => <ScholarshipCard key={s.id || s.slug} scholarship={s} />)}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SAVED */}
          {section === 'saved' && (
            <div className="card p-5">
              <h3 className="font-head font-bold text-navy-800 mb-4">🔖 Saved Scholarships</h3>
              {savedScholarships.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">🔖</div>
                  <p className="text-gray-500 mb-4">You haven't saved any scholarships yet</p>
                  <Link to="/scholarships" className="btn btn-primary">Browse Scholarships</Link>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {savedScholarships.map(s => <ScholarshipCard key={s.id || s.slug} scholarship={s} />)}
                </div>
              )}
            </div>
          )}

          {/* APPLICATIONS */}
          {section === 'applications' && (
            <div className="card p-5">
              <h3 className="font-head font-bold text-navy-800 mb-4">📋 My Applications</h3>
              {loadingData ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : applications.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📋</div>
                  <p className="text-gray-500 mb-4">No applications yet</p>
                  <Link to="/scholarships" className="btn btn-primary">Find Scholarships</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map(a => <AppCard key={a.id} a={a} />)}
                </div>
              )}
            </div>
          )}

          {/* DOCUMENTS */}
          {section === 'documents' && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-head font-bold text-navy-800">📄 My Documents</h3>
                <label className="btn btn-primary btn-sm cursor-pointer">
                  + Upload
                  <input type="file" multiple className="hidden" onChange={handleFileUpload} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                </label>
              </div>
              {docs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">📄</div>
                  <p className="text-gray-500 mb-4">No documents uploaded yet</p>
                  <label className="btn btn-primary cursor-pointer">
                    Upload Your First Document
                    <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                  </label>
                </div>
              ) : (
                <div className="space-y-2">
                  {docs.map((d, i) => (
                    <div key={d.id || i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-xl">📄</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-navy-800 truncate">{d.name}</div>
                        <div className="text-xs text-gray-500">{d.fileSize || d.size} · {new Date(d.uploadedAt || d.date).toLocaleDateString()}</div>
                      </div>
                      <span className={`pill ${d.status === 'VERIFIED' || d.status === 'accepted' ? 'pill-accepted' : d.status === 'REJECTED' || d.status === 'rejected' ? 'pill-rejected' : 'pill-review'}`}>
                        {d.status === 'VERIFIED' ? '✅ Verified' : d.status === 'REJECTED' ? 'Rejected' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* PAYMENTS */}
          {section === 'payments' && (
            <div className="card p-5">
              <h3 className="font-head font-bold text-navy-800 mb-4">💳 Payment History</h3>
              {loadingData ? (
                <div className="text-center py-8 text-gray-400">Loading...</div>
              ) : payments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-3">💳</div>
                  <p className="text-gray-500 mb-4">No payments yet</p>
                  <button onClick={() => navigate('/services')} className="btn btn-primary">View Packages</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {payments.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-bold text-sm text-navy-800">{p.plan} Package</div>
                        <div className="text-xs text-gray-500">{new Date(p.createdAt).toLocaleDateString()} · {p.method}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">৳{(p.amount||0).toLocaleString()}</div>
                        <span className={`pill ${p.status === 'SUCCESS' ? 'pill-accepted' : p.status === 'PENDING' ? 'pill-review' : 'pill-rejected'}`}>{p.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AI ADVISOR */}
          {section === 'ai' && (
            <div className="card p-5 flex flex-col" style={{ height: '70vh' }}>
              <h3 className="font-head font-bold text-navy-800 mb-4">🤖 AI Scholarship Advisor</h3>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-3 bg-gray-50 rounded-xl">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">🤖</div>
                    <p className="text-gray-500 text-sm">Ask me anything about scholarships!</p>
                    <div className="flex flex-wrap gap-2 justify-center mt-3">
                      {['What scholarships suit me?', 'How to write a good SOP?', 'IELTS requirements?'].map(q => (
                        <button key={q} onClick={() => send(q)} className="text-xs bg-white border border-gray-200 rounded-full px-3 py-1.5 text-blue-600 hover:bg-blue-50">{q}</button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border border-gray-200 text-gray-700 rounded-bl-sm'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && <div className="flex justify-start"><div className="bg-white border border-gray-200 px-4 py-2.5 rounded-2xl text-sm text-gray-400">Thinking...</div></div>}
              </div>
              <div className="flex gap-2">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && chatInput.trim()) { send(chatInput); setChatInput('') } }}
                  placeholder="Ask about scholarships..." className="input flex-1 text-sm" />
                <button onClick={() => { if (chatInput.trim()) { send(chatInput); setChatInput('') } }} className="btn btn-primary">Send</button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
