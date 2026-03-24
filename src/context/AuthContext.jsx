import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

const MOCK_USER = {
  id: 'user_001',
  name: 'Rafiqul Alam',
  firstName: 'Rafiqul',
  email: 'rafiqul@email.com',
  avatar: 'RA',
  plan: 'Standard',
  joinedAt: '2024-11-01',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check localStorage for persisted session
    const saved = localStorage.getItem('sp_user')
    if (saved) {
      try { setUser(JSON.parse(saved)) } catch { localStorage.removeItem('sp_user') }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Please fill in all fields')
    // TODO: replace with real API call → api.post('/auth/login', { email, password })
    await new Promise(r => setTimeout(r, 800)) // simulate network
    const userData = { ...MOCK_USER, email }
    setUser(userData)
    localStorage.setItem('sp_user', JSON.stringify(userData))
    toast.success(`Welcome back, ${userData.firstName}! 🎉`)
    return userData
  }

  const signup = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) throw new Error('Please fill in all fields')
    await new Promise(r => setTimeout(r, 900))
    const userData = { ...MOCK_USER, name: `${firstName} ${lastName}`, firstName, email, avatar: `${firstName[0]}${lastName?.[0] || ''}` }
    setUser(userData)
    localStorage.setItem('sp_user', JSON.stringify(userData))
    toast.success(`Welcome to ScholarPath, ${firstName}! 🎓`)
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sp_user')
    toast.success('Signed out successfully')
  }

  const socialLogin = async (provider) => {
    await new Promise(r => setTimeout(r, 700))
    const userData = { ...MOCK_USER }
    setUser(userData)
    localStorage.setItem('sp_user', JSON.stringify(userData))
    toast.success(`Signed in with ${provider}! 🎉`)
    return userData
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, socialLogin, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
