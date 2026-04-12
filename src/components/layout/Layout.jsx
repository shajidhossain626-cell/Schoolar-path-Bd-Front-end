import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import AuthModal from '@components/auth/AuthModal'

export default function Layout() {
  const [showAuth, setShowAuth] = useState(false)
  const location = useLocation()

  // Close modal on route change
  useEffect(() => { setShowAuth(false) }, [location.pathname])

  // Allow any page to trigger the auth modal via window event
  // Usage anywhere: window.dispatchEvent(new Event('sp_open_auth'))
  useEffect(() => {
    const open = () => setShowAuth(true)
    window.addEventListener('sp_open_auth', open)
    return () => window.removeEventListener('sp_open_auth', open)
  }, [])

  return (
    <>
      <Navbar onOpenAuth={() => setShowAuth(true)} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </>
  )
}
