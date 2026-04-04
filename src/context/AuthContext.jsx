import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)
const SK = 'sp_user_v2'
const SCRIPT = 'https://script.google.com/macros/s/AKfycbzdH4qOsUowPdO_vFhAdu3Ip9z7NMSQ_ZHPtru4yYSXYA9UESlBhZ-DMde2VPb5SQVC/exec'

// Silent background sync — never blocks the UI
function syncToSheet(u) {
  fetch(SCRIPT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      action:   'saveUser',
      id:       u.id,
      name:     u.name,
      email:    u.email,
      plan:     u.plan || 'Free',
      joinedAt: u.joinedAt,
    })
  }).catch(() => {}) // never fail the UI
}

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem(SK)
    if (saved) {
      try {
        const u = JSON.parse(saved)
        setUser(u)
        syncToSheet(u) // update "Last Seen" in Google Sheets
      } catch { localStorage.removeItem(SK) }
    }
    setLoading(false)
  }, [])

  const persist = (u) => {
    setUser(u)
    localStorage.setItem(SK, JSON.stringify(u))
    syncToSheet(u) // save to Google Sheets every time
  }

  // ── Sign Up ──
  const signup = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) throw new Error('Please fill in all fields')
    if (password.length < 8) throw new Error('Password must be at least 8 characters')

    // Check if already registered in localStorage
    const existing = localStorage.getItem(`sp_pwd_${email}`)
    if (existing) throw new Error('An account with this email already exists. Please sign in.')

    // Save password hash locally (simple — for small user base)
    localStorage.setItem(`sp_pwd_${email}`, btoa(password))

    const u = makeUser({ email, firstName, lastName })
    persist(u)
    toast.success(`Welcome to ScholarPath BD, ${u.firstName}! 🎓`)
    return u
  }

  // ── Sign In ──
  const login = async (email, password) => {
    if (!email || !password) throw new Error('Please fill in all fields')

    const stored = localStorage.getItem(`sp_pwd_${email}`)
    if (!stored) throw new Error('No account found with this email. Please create an account first.')
    if (stored !== btoa(password)) throw new Error('Wrong password. Please try again.')

    // Reload their saved profile if they have one
    const savedUser = localStorage.getItem(`sp_profile_${email}`)
    const u = savedUser ? JSON.parse(savedUser) : makeUser({ email })
    persist(u)
    toast.success(`Welcome back, ${u.firstName}! 🎉`)
    return u
  }

  // ── Grant paid access (called from admin or after payment) ──
  const grantAccess = (planName = 'Starter') => {
    if (!user) return
    const updated = { ...user, isPaid: true, plan: planName }
    // Also save profile so it persists on re-login
    localStorage.setItem(`sp_profile_${user.email}`, JSON.stringify(updated))
    persist(updated)
    toast.success(`✅ ${planName} access activated! You can now view all scholarships.`)
  }

  const logout = () => {
    // Save profile before logout so plan persists on re-login
    if (user) localStorage.setItem(`sp_profile_${user.email}`, JSON.stringify(user))
    setUser(null)
    localStorage.removeItem(SK)
    toast.success('Signed out successfully')
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

function makeUser({ email, firstName, lastName }) {
  const first = firstName || email.split('@')[0]
  const last  = lastName || ''
  const name  = `${first} ${last}`.trim()
  return {
    id:       `u_${Date.now()}`,
    name,
    firstName: first,
    lastName:  last,
    email,
    avatar:   `${first[0] || '?'}${last?.[0] || ''}`.toUpperCase(),
    plan:     'Free',
    isPaid:   false,
    joinedAt: new Date().toISOString(),
  }
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
