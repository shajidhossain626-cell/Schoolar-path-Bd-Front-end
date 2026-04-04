import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)
const SK     = 'sp_user_v2'
const SCRIPT = 'https://script.google.com/macros/s/AKfycbzdH4qOsUowPdO_vFhAdu3Ip9z7NMSQ_ZHPtru4yYSXYA9UESlBhZ-DMde2VPb5SQVC/exec'

// Save user to Google Sheets — silent, never blocks UI
function syncToSheet(u) {
  fetch(SCRIPT, {
    method:  'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({
      action: 'saveUser',
      id:     u.id,
      name:   u.name,
      email:  u.email,
      plan:   u.plan || 'Free',
      joinedAt: u.joinedAt,
    })
  }).catch(() => {})
}

// Fetch the latest plan from Google Sheets
// Returns 'Free' if user not found or on any error
async function fetchPlanFromSheet(email) {
  try {
    const url = `${SCRIPT}?action=getUserPlan&email=${encodeURIComponent(email)}&t=${Date.now()}`
    const res  = await fetch(url)
    const json = await res.json()
    if (json.success && json.plan) return json.plan
  } catch {}
  return null // null means "not found in sheets — keep local"
}

export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null)
  const [loading, setLoading] = useState(true)

  // On page load — restore session from localStorage only
  // Do NOT sync to Sheets here — it would overwrite admin's plan change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SK)
      if (saved) {
        const u = JSON.parse(saved)
        setUser(u)
      }
    } catch {
      localStorage.removeItem(SK)
    }
    setLoading(false)
  }, [])

  // Save user to localStorage + Google Sheets
  const persist = (u) => {
    setUser(u)
    localStorage.setItem(SK, JSON.stringify(u))
    // Also save a profile copy keyed by email so plan survives logout/login
    localStorage.setItem(`sp_profile_${u.email}`, JSON.stringify(u))
    syncToSheet(u)
  }

  // ── Sign Up ──
  const signup = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) throw new Error('Please fill in all fields')
    if (password.length < 8) throw new Error('Password must be at least 8 characters')

    const existing = localStorage.getItem(`sp_pwd_${email}`)
    if (existing) throw new Error('An account already exists with this email. Please sign in.')

    // Save password locally
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
    if (!stored) throw new Error('No account found. Please create an account first.')
    if (stored !== btoa(password)) throw new Error('Wrong password. Please try again.')

    // Load saved profile (has their name, id etc)
    const savedProfile = localStorage.getItem(`sp_profile_${email}`)
    let u = savedProfile ? JSON.parse(savedProfile) : makeUser({ email })

    // ✅ Fetch latest plan from Google Sheets
    // This is how admin changes take effect — on next login
    const sheetPlan = await fetchPlanFromSheet(email)
    if (sheetPlan !== null) {
      u = { ...u, plan: sheetPlan, isPaid: sheetPlan !== 'Free' }
    }

    persist(u)
    toast.success(`Welcome back, ${u.firstName}! 🎉`)
    return u
  }

  // ── Grant access (manual, called from admin or after payment confirmation) ──
  const grantAccess = (planName = 'Starter') => {
    if (!user) return
    const updated = { ...user, isPaid: true, plan: planName }
    persist(updated)
    toast.success(`✅ ${planName} access activated!`)
  }

  // ── Logout ──
  const logout = () => {
    // Save profile before logout so plan persists on re-login
    if (user) localStorage.setItem(`sp_profile_${user.email}`, JSON.stringify(user))
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

function makeUser({ email, firstName, lastName }) {
  const first = firstName || email.split('@')[0]
  const last  = lastName  || ''
  const name  = `${first} ${last}`.trim()
  return {
    id:        `u_${Date.now()}`,
    name,
    firstName: first,
    lastName:  last,
    email,
    avatar:    `${first[0] || '?'}${last?.[0] || ''}`.toUpperCase(),
    plan:      'Free',
    isPaid:    false,
    joinedAt:  new Date().toISOString(),
  }
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
