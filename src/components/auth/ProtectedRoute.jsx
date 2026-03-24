import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:.15s]" />
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:.3s]" />
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location, openAuth: true }} replace />
  }

  return children
}
