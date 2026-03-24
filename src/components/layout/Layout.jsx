import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import AuthModal from '@components/auth/AuthModal'

export default function Layout() {
  const [authOpen, setAuthOpen] = useState(false)
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <main className="flex-1">
        <Outlet context={{ openAuth: () => setAuthOpen(true) }} />
      </main>
      {!isDashboard && <Footer />}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}
