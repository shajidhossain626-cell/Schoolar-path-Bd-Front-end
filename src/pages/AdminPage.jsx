import { useState, useEffect } from 'react'
import { getAllUsers, updateUserPlan } from '@context/AuthContext'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASS = 'admin@2026'
const PLANS = ['Free', 'Starter', 'Professional', 'Elite']

export default function AdminPage() {
  const [auth, setAuth]       = useState(false)
  const [pass, setPass]       = useState('')
  const [users, setUsers]     = useState([])
  const [search, setSearch]   = useState('')
  const [filter, setFilter]   = useState('all')
  const [msg, setMsg]         = useState('')
  const navigate              = useNavigate()

  useEffect(() => {
    if (auth) loadUsers()
  }, [auth])

  const loadUsers = () => setUsers(getAllUsers())

  const handleLogin = () => {
    if (pass === ADMIN_PASS) { setAuth(true); setMsg('') }
    else setMsg('Wrong password')
  }

  const changePlan = (email, plan) => {
    updateUserPlan(email, plan)
    loadUsers()
  }

  const filtered = users.filter(u => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) ||
                        u.email?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'paid' ? u.isPaid : !u.isPaid)
    return matchSearch && matchFilter
  })

  const stats = {
    total: users.length,
    paid: users.filter(u => u.isPaid).length,
    free: users.filter(u => !u.isPaid).length,
    today: users.filter(u => new Date(u.joinedAt).toDateString() === new Date().toDateString()).length,
  }

  if (!auth) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-10 w-full max-w-sm text-center">
        <div className="text-5xl mb-4">🔐</div>
        <h1 className="font-head font-black text-navy-800 text-2xl mb-2">Admin Panel</h1>
        <p className="text-gray-400 text-sm mb-6">ScholarPath BD · User Management</p>
        <input type="password" placeholder="Admin password" value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="input w-full mb-3 text-center" />
        {msg && <p className="text-red-500 text-sm mb-3">{msg}</p>}
        <button onClick={handleLogin} className="btn btn-primary btn-block">Login →</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-800 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <div className="font-head font-black text-lg">ScholarPath BD — Admin</div>
          <div className="text-white/50 text-xs">User Management Dashboard</div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/')} className="btn btn-ghost btn-sm text-white/70">← Website</button>
          <button onClick={() => setAuth(false)} className="btn btn-outline btn-sm text-white border-white/20">Logout</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.total, icon: '👥', color: 'bg-blue-50 border-blue-200' },
            { label: 'Paid Users', value: stats.paid, icon: '✅', color: 'bg-green-50 border-green-200' },
            { label: 'Free Users', value: stats.free, icon: '🔒', color: 'bg-yellow-50 border-yellow-200' },
            { label: 'Joined Today', value: stats.today, icon: '🆕', color: 'bg-purple-50 border-purple-200' },
          ].map(s => (
            <div key={s.label} className={`rounded-2xl border-2 ${s.color} p-5`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="font-head font-black text-3xl text-navy-800">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-3 flex-wrap">
              <input placeholder="Search by name or email..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="input w-64 text-sm" />
              <select value={filter} onChange={e => setFilter(e.target.value)} className="input text-sm w-auto">
                <option value="all">All Users</option>
                <option value="paid">Paid Only</option>
                <option value="free">Free Only</option>
              </select>
            </div>
            <button onClick={loadUsers} className="btn btn-outline btn-sm">🔄 Refresh</button>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-head font-bold text-navy-800">Registered Users ({filtered.length})</h2>
            <span className="text-xs text-gray-400">Change plan to grant/revoke access</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-400">
              <div className="text-4xl mb-3">👤</div>
              <p className="text-sm">No users found. Users appear here when they sign up on your website.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Seen</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grant Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(u => (
                    <tr key={u.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {u.avatar || u.name?.[0] || '?'}
                          </div>
                          <div className="font-medium text-navy-800 text-sm">{u.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${u.isPaid ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                          {u.isPaid ? '✅ ' : '🔒 '}{u.plan || 'Free'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {u.joinedAt ? new Date(u.joinedAt).toLocaleDateString('en-BD', { day:'numeric', month:'short', year:'numeric' }) : '—'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {u.lastSeen ? new Date(u.lastSeen).toLocaleDateString('en-BD', { day:'numeric', month:'short' }) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={u.plan || 'Free'}
                          onChange={e => changePlan(u.email, e.target.value)}
                          className="input text-sm py-1.5 w-auto">
                          {PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* How to grant access note */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-5">
          <div className="font-head font-bold text-navy-800 mb-2">🔑 How to grant access after payment</div>
          <div className="text-sm text-gray-600 leading-relaxed">
            When a client pays via bKash and you confirm their payment — come here, find their email in the table, and change their plan from <strong>Free</strong> to <strong>Starter / Professional / Elite</strong>. They will instantly see all {'{'}100+{'}'} scholarships on their next visit.
          </div>
        </div>

      </div>
    </div>
  )
}
