// AdminPage.jsx — redirects to the real standalone admin panel
import { useEffect } from 'react'

export default function AdminPage() {
  useEffect(() => {
    window.location.href = '/admin.html'
  }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f2444' }}>
      <div style={{ color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
        <div style={{ fontSize: 16 }}>Redirecting to Admin Panel...</div>
      </div>
    </div>
  )
}
