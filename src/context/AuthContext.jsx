import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('sp_token')
    const saved = localStorage.getItem('sp_user')
    if (token && saved) {
      try {
        setUser(JSON.parse(saved))
        // Verify token is still valid
        authAPI.me().then(res => {
          if (res.data?.success) {
            setUser(res.data.data)
            localStorage.setItem('sp_user', JSON.stringify(res.data.data))
          }
        }).catch(() => {
          localStorage.removeItem('sp_token')
          localStorage.removeItem('sp_user')
          setUser(null)
        })
      } catch {
        localStorage.removeItem('sp_user')
        localStorage.removeItem('sp_token')
      }
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    if (!email || !password) throw new Error('Please fill in all fields')
    const res = await authAPI.login({ email, password })
    if (!res.data?.success) throw new Error(res.data?.message || 'Login failed')
    const { user: userData, token } = res.data.data
    setUser(userData)
    localStorage.setItem('sp_token', token)
    localStorage.setItem('sp_user', JSON.stringify(userData))
    toast.success(`Welcome back, ${userData.firstName}! 🎉`)
    return userData
  }

  const signup = async ({ firstName, lastName, email, password }) => {
    if (!firstName || !email || !password) throw new Error('Please fill in all fields')
    const res = await authAPI.signup({ firstName, lastName, email, password })
    if (!res.data?.success) throw new Error(res.data?.message || 'Signup failed')
    const { user: userData, token } = res.data.data
    setUser(userData)
    localStorage.setItem('sp_token', token)
    localStorage.setItem('sp_user', JSON.stringify(userData))
    toast.success(`Welcome to ScholarPath, ${firstName}! 🎓`)
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('sp_token')
    localStorage.removeItem('sp_user')
    toast.success('Signed out successfully')
  }

  const socialLogin = async (provider) => {
    toast.error(`${provider} login coming soon!`)
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
