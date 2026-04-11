import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

const NAV_LINKS = [
  { to: '/',            label: 'Home',         end: true },
  { to: '/scholarships', label: 'Scholarships' },
  { to: '/services',     label: 'Services' },
  { to: '/tools',        label: 'Free Tools', highlight: true },
  { to: '/universities', label: 'Universities' },
  { to: '/blog',         label: 'Blog' },
  { to: '/about',        label: 'About' },
  { to: '/contact',      label: 'Contact' },
]

export default function Navbar({ onOpenAuth }) {
  const { user, logout, isLoggedIn } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleDashboard = () => {
    if (isLoggedIn) navigate('/dashboard')
    else onOpenAuth()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-head font-black text-lg text-navy-800">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-navy-800 rounded-lg flex items-center justify-center text-base flex-shrink-0">🎓</div>
            Scholar<span className="text-green-600">Path BD</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label, end, highlight }) => (
              <NavLink key={to} to={to} end={end}
                className={({ isActive }) =>
                  highlight
                    ? `px-3 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1 ${isActive ? 'text-green-700 bg-green-50' : 'text-green-600 hover:bg-green-50'}`
                    : `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'text-blue-600 bg-blue-50 font-semibold' : 'text-gray-500 hover:text-navy-800 hover:bg-gray-100'}`}>
                {highlight && <span style={{fontSize:12}}>🎁</span>}{label}
                {highlight && <span style={{fontSize:9,fontWeight:800,background:'#22c55e',color:'#fff',padding:'1px 5px',borderRadius:20,marginLeft:2}}>FREE</span>}
              </NavLink>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <div className="hidden md:flex items-center gap-1.5 bg-gray-100 rounded-xl px-3 py-1.5">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-navy-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.avatar}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.firstName}</span>
                </div>
                <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-sm hidden md:flex">Dashboard</button>
                <button onClick={logout} className="btn btn-ghost btn-sm hidden md:flex">Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={onOpenAuth} className="btn btn-ghost btn-sm hidden md:flex">Sign In</button>
                <button onClick={onOpenAuth} className="btn btn-primary btn-sm">Get Started</button>
              </>
            )}
            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:bg-gray-100'}`}>
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100 flex gap-2">
            {isLoggedIn
              ? <><button onClick={() => { navigate('/dashboard'); setMobileOpen(false) }} className="btn btn-primary btn-sm flex-1">Dashboard</button>
                  <button onClick={logout} className="btn btn-ghost btn-sm">Sign Out</button></>
              : <button onClick={() => { onOpenAuth(); setMobileOpen(false) }} className="btn btn-primary btn-sm flex-1">Sign In / Register</button>
            }
          </div>
        </div>
      )}
    </nav>
  )
}
