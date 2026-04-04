import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)
const BACKEND = 'https://schoolar-path-backend.onrender.com'
const SK = 'sp_user_v2'
const USERS_KEY = 'sp_all_users'

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(SK)
    if (saved) {
      try { setUser(JSON.parse(saved)) }
      catch { localStorage.removeItem(SK) }
    }
    setLoading(false)
  }, [])

  const persist = (u) => {
    setUser(u)
    localStorage.setItem(SK, JSON.stringify(u))
    // also save to all-users registry for admin tracking
    saveToRegistry(u)
  }

  const saveToRegistry = (u) => {
    try {
      const existing = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
      const idx = existing.findIndex(x => x.email === u.email)
      const record = {
        id: u.id, name: u.name, email: u.email,
        plan: u.plan || 'Free', isPaid: u.isPaid || false,
        joinedAt: u.joinedAt || new Date().toISOString(),
        lastSeen: new Date().toISOString(),
        avatar: u.avatar,
      }
      if (idx >= 0) existing[idx] = { ...existing[idx], ...record }
      else existing.push(record)
      localStorage.setItem(USERS_KEY, JSON.stringify(existing))
    } catch {}
  }

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Please fill in all fields')
    try {
      const res  = await fetch(`${BACKEND}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      const u = buildUser(data.user || data, email)
      persist(u)
      toast.success(`Welcome back, ${u.firstName}! 🎉`)
      return u
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message?.includes('network')) {
        const u = localUser(email)
        persist(u)
        toast.success(`Welcome back! 🎉`)
        return u
      }
      throw err
    }
  }

  const signup = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) throw new Error('Please fill in all fields')
    try {
      const res  = await fetch(`${BACKEND}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: `${firstName} ${lastName || ''}`.trim(), email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Signup failed')
      const u = buildUser(data.user || data, email, firstName, lastName)
      persist(u)
      toast.success(`Welcome to ScholarPath BD, ${u.firstName}! 🎓`)
      return u
    } catch (err) {
      if (err.message === 'Failed to fetch' || err.message?.includes('network')) {
        const u = localUser(email, firstName, lastName)
        persist(u)
        toast.success(`Welcome, ${u.firstName}! 🎓`)
        return u
      }
      throw err
    }
  }

  // Grant paid access to a user (call this after payment confirmed)
  const grantAccess = (planName = 'Starter') => {
    if (!user) return
    const updated = { ...user, isPaid: true, plan: planName }
    persist(updated)
    toast.success(`✅ ${planName} access activated! You can now view all scholarships.`)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SK)
    toast.success('Signed out')
  }

  return (
    <AuthContext.Provider value={{
      user, loading, login, signup, logout, grantAccess,
      isLoggedIn: !!user,
      isPaid: user?.isPaid || false,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function buildUser(data, email, firstName, lastName) {
  const name  = data.name || `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0]
  const first = data.firstName || firstName || name.split(' ')[0]
  const last  = data.lastName  || lastName  || name.split(' ').slice(1).join(' ')
  return {
    id:        data.id    || data._id || `local_${Date.now()}`,
    name, firstName: first, lastName: last,
    email:     data.email || email,
    avatar:    `${first[0] || '?'}${last?.[0] || ''}`.toUpperCase(),
    plan:      data.plan  || 'Free',
    isPaid:    data.isPaid || false,
    joinedAt:  data.createdAt || new Date().toISOString(),
    token:     data.token || '',
  }
}

function localUser(email, firstName, lastName) {
  const name  = `${firstName || ''} ${lastName || ''}`.trim() || email.split('@')[0]
  const first = firstName || name.split(' ')[0]
  return buildUser({ email, name }, email, first, lastName)
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}

export const getAllUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]') }
  catch { return [] }
}

export const updateUserPlan = (email, plan) => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    const idx = users.findIndex(u => u.email === email)
    if (idx >= 0) {
      users[idx].plan = plan
      users[idx].isPaid = plan !== 'Free'
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      return true
    }
  } catch {}
  return false
}
