import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'

// ── NAV GROUPS ──

const TOOLS_LINKS = [
  { to:'/tools/eligibility-checker', icon:'🎯', label:'Eligibility Checker', sub:'See which scholarships you qualify for', badge:'Popular' },
  { to:'/tools/document-checklist',  icon:'📋', label:'Document Checklist', sub:'Never miss a required document' },
  { to:'/tools/sop-analyzer',        icon:'✍️', label:'SOP Strength Analyzer', sub:'Score your Statement of Purpose' },
  { to:'/tools/cost-calculator',     icon:'💰', label:'Cost Calculator', sub:'Monthly living costs by country' },
  { to:'/tools/cgpa-converter',      icon:'📊', label:'CGPA Converter', sub:'4.0 / 5.0 / 10.0 / % conversion' },
]
const COMPANY = [
  { to:'/blog',    icon:'📖', label:'Blog & Guides', sub:'Tips, deadlines, success stories' },
  { to:'/about',   icon:'👥', label:'About Us',       sub:'Our team and mission' },
  { to:'/contact', icon:'💬', label:'Contact',        sub:'Get in touch with us' },
]

function Dropdown({ label, items, onClose }) {
  return (
    <div style={{
      position:'absolute', top:'calc(100% + 10px)', left:'50%', transform:'translateX(-50%)',
      background:'var(--nav-drop-bg)',
      border:'1px solid var(--nav-drop-border)',
      borderRadius:16, padding:8, minWidth:280,
      boxShadow:'0 20px 48px rgba(0,0,0,.15)',
      backdropFilter:'blur(16px)',
      zIndex:200, animation:'dropIn .18s ease'
    }}>
      {items.map(item => (
        <NavLink key={item.to} to={item.to} onClick={onClose}
          style={({ isActive }) => ({
            display:'flex', alignItems:'center', gap:12, padding:'10px 12px',
            borderRadius:10, textDecoration:'none',
            background: isActive ? 'var(--nav-active-bg)' : 'transparent',
            transition:'background .12s',
          })}
          onMouseEnter={e => { if (!e.currentTarget.classList.contains('active')) e.currentTarget.style.background = 'var(--nav-hover-bg)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <div style={{ width:36, height:36, borderRadius:10, background:'var(--nav-icon-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 }}>
            {item.icon}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ fontSize:13, fontWeight:700, color:'var(--nav-text)', lineHeight:1.2 }}>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize:9, fontWeight:800, background:'#22c55e', color:'#fff', padding:'2px 6px', borderRadius:20, textTransform:'uppercase', letterSpacing:'.04em' }}>
                  {item.badge}
                </span>
              )}
            </div>
            <div style={{ fontSize:11, color:'var(--nav-subtext)', marginTop:2 }}>{item.sub}</div>
          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default function Navbar({ onOpenAuth }) {
  const { user, logout, isLoggedIn } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState(null)
  const [openDrop, setOpenDrop] = useState(null)
  const [dark, setDark] = useState(() => localStorage.getItem('sp_dark') === 'true')
  const navigate = useNavigate()
  const location = useLocation()
  const navRef = useRef(null)

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('sp_dark', dark)
  }, [dark])

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e) { if (navRef.current && !navRef.current.contains(e.target)) setOpenDrop(null) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setMobileSection(null) }, [location.pathname])

  function toggleDrop(name) { setOpenDrop(o => o === name ? null : name) }

  const DropBtn = ({ name, label, icon }) => (
    <button
      onClick={() => toggleDrop(name)}
      style={{
        display:'flex', alignItems:'center', gap:5,
        padding:'8px 12px', borderRadius:9, border:'none', cursor:'pointer',
        background: openDrop===name ? 'var(--nav-hover-bg)' : 'transparent',
        color:'var(--nav-text)', fontSize:13, fontWeight:600,
        transition:'all .15s', fontFamily:'inherit',
      }}
      onMouseEnter={e => { if(openDrop!==name) e.currentTarget.style.background='var(--nav-hover-bg)' }}
      onMouseLeave={e => { if(openDrop!==name) e.currentTarget.style.background='transparent' }}
    >
      {icon && <span style={{fontSize:14}}>{icon}</span>}
      {label}
      <span style={{ fontSize:10, opacity:.6, marginLeft:1, transition:'transform .2s', transform: openDrop===name?'rotate(180deg)':'rotate(0)' }}>▾</span>
    </button>
  )

  return (
    <>
      <style>{`
        :root {
          --nav-bg: rgba(255,255,255,0.96);
          --nav-border: rgba(0,0,0,0.08);
          --nav-text: #0f172a;
          --nav-subtext: #64748b;
          --nav-hover-bg: rgba(0,0,0,0.05);
          --nav-active-bg: rgba(59,130,246,0.08);
          --nav-drop-bg: rgba(255,255,255,0.98);
          --nav-drop-border: rgba(0,0,0,0.08);
          --nav-icon-bg: rgba(0,0,0,0.05);
        }
        .dark {
          --nav-bg: rgba(10,14,30,0.97);
          --nav-border: rgba(255,255,255,0.08);
          --nav-text: #e2e8f0;
          --nav-subtext: #64748b;
          --nav-hover-bg: rgba(255,255,255,0.07);
          --nav-active-bg: rgba(99,102,241,0.15);
          --nav-drop-bg: rgba(15,20,40,0.98);
          --nav-drop-border: rgba(255,255,255,0.1);
          --nav-icon-bg: rgba(255,255,255,0.07);
          /* Global dark mode */
          --bg-page: #080c1a;
          --bg-card: #0f1629;
          --bg-card2: #141d35;
          --border-color: rgba(255,255,255,0.08);
          --text-primary: #e2e8f0;
          --text-secondary: #94a3b8;
        }
        .dark body { background:#080c1a !important; color:#e2e8f0 !important }
        .dark .bg-white, .dark .card, .dark [class*="bg-white"] { background:#0f1629 !important }
        .dark [class*="bg-gray-50"] { background:#0d1428 !important }
        .dark [class*="bg-gray-100"] { background:#141d35 !important }
        .dark [class*="border-gray"] { border-color:rgba(255,255,255,.08) !important }
        .dark [class*="text-gray-500"], .dark [class*="text-gray-600"] { color:#64748b !important }
        .dark [class*="text-navy-800"], .dark [class*="text-navy-700"] { color:#c7d2fe !important }
        .dark [class*="text-gray-700"], .dark [class*="text-gray-900"] { color:#e2e8f0 !important }
        .dark h1,  .dark h2, .dark h3 { color:#e2e8f0 }
        .dark input, .dark select, .dark textarea { background:#141d35 !important; border-color:rgba(255,255,255,.12) !important; color:#e2e8f0 !important }
        .dark [style*="background: #fff"], .dark [style*="background:#fff"] { background:#0f1629 !important }
        .dark [style*="background: white"] { background:#0f1629 !important }
        .dark [style*="color: #0f172a"], .dark [style*="color:#0f172a"] { color:#e2e8f0 !important }
        .dark [style*="color: #374151"] { color:#cbd5e1 !important }
        .dark [style*="color: #475569"] { color:#94a3b8 !important }
        .dark [style*="background: #f7f8fc"], .dark [style*="background:#f7f8fc"], .dark [style*="background: #f7f9fc"], .dark [style*="background:#f7f9fc"] { background:#080c1a !important }
        .dark [style*="background: #f8fafc"], .dark [style*="background:#f8fafc"] { background:#0d1428 !important }
        .dark [style*="background: #f1f5f9"], .dark [style*="background:#f1f5f9"] { background:#141d35 !important }
        .dark [style*="border: 1px solid #e2e8f0"], .dark [style*="border:1px solid #e2e8f0"] { border-color:rgba(255,255,255,.08) !important }
        .dark [style*="border-color: #e2e8f0"] { border-color:rgba(255,255,255,.08) !important }
        @keyframes dropIn { from { opacity:0; transform:translateX(-50%) translateY(-6px) } to { opacity:1; transform:translateX(-50%) translateY(0) } }
        @keyframes slideDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
      `}</style>

      <nav ref={navRef} style={{
        position:'sticky', top:0, zIndex:100,
        background:'var(--nav-bg)',
        borderBottom:'1px solid var(--nav-border)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
      }}>
        <div className="container">
          <div style={{ display:'flex', alignItems:'center', height:64, gap:4 }}>

            {/* ── LOGO ── */}
            <Link to="/" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', marginRight:8, flexShrink:0 }}>
              <div style={{ width:34, height:34, background:'linear-gradient(135deg,#3b82f6,#0f2444)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🎓</div>
              <div style={{ lineHeight:1 }}>
                <span style={{ fontSize:15, fontWeight:900, color:'var(--nav-text)', letterSpacing:'-.02em' }}>Scholar</span>
                <span style={{ fontSize:15, fontWeight:900, color:'#22c55e', letterSpacing:'-.02em' }}>Path BD</span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden md:flex" style={{ alignItems:'center', gap:2, flex:1 }}>

              <NavLink to="/" end
                style={({ isActive }) => ({ padding:'8px 12px', borderRadius:9, textDecoration:'none', fontSize:13, fontWeight:600, color: isActive?'#3b82f6':'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', transition:'all .15s' })}>
                Home
              </NavLink>

              <NavLink to="/scholarships"
                style={({ isActive }) => ({ padding:'8px 12px', borderRadius:9, textDecoration:'none', fontSize:13, fontWeight:600, color: isActive?'#3b82f6':'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', transition:'all .15s' })}>
                Scholarships
              </NavLink>

              <NavLink to="/universities"
                style={({ isActive }) => ({ padding:'8px 12px', borderRadius:9, textDecoration:'none', fontSize:13, fontWeight:600, color: isActive?'#3b82f6':'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', transition:'all .15s' })}>
                Universities
              </NavLink>

              <NavLink to="/services"
                style={({ isActive }) => ({ padding:'8px 12px', borderRadius:9, textDecoration:'none', fontSize:13, fontWeight:600, color: isActive?'#3b82f6':'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', transition:'all .15s' })}>
                Services
              </NavLink>

              {/* Explore dropdown */}
              <div style={{ position:'relative' }}>
                <DropBtn name="explore" label="Explore" />
                {openDrop === 'explore' && <Dropdown items={EXPLORE} onClose={() => setOpenDrop(null)} />}
              </div>

              {/* Free Tools dropdown */}
              <div style={{ position:'relative' }}>
                <button
                  onClick={() => toggleDrop('tools')}
                  style={{
                    display:'flex', alignItems:'center', gap:5,
                    padding:'7px 12px', borderRadius:9, border:'1px solid rgba(34,197,94,.3)', cursor:'pointer',
                    background: openDrop==='tools' ? 'rgba(34,197,94,.12)' : 'rgba(34,197,94,.07)',
                    color:'#16a34a', fontSize:13, fontWeight:700,
                    transition:'all .15s', fontFamily:'inherit',
                  }}
                >
                  <span style={{fontSize:13}}>🎁</span>
                  Free Tools
                  <span style={{ fontSize:9, fontWeight:800, background:'#22c55e', color:'#fff', padding:'1px 5px', borderRadius:20 }}>5</span>
                  <span style={{ fontSize:10, opacity:.7, marginLeft:1, transition:'transform .2s', transform: openDrop==='tools'?'rotate(180deg)':'rotate(0)' }}>▾</span>
                </button>
                {openDrop === 'tools' && (
                  <div style={{
                    position:'absolute', top:'calc(100% + 10px)', left:'50%', transform:'translateX(-50%)',
                    background:'var(--nav-drop-bg)', border:'1px solid var(--nav-drop-border)',
                    borderRadius:16, padding:8, minWidth:300,
                    boxShadow:'0 20px 48px rgba(0,0,0,.15)', backdropFilter:'blur(16px)',
                    zIndex:200, animation:'dropIn .18s ease'
                  }}>
                    <div style={{ padding:'8px 12px 6px', fontSize:10, fontWeight:800, color:'var(--nav-subtext)', textTransform:'uppercase', letterSpacing:'.1em' }}>Free Tools — No Signup</div>
                    {TOOLS_LINKS.map(item => (
                      <NavLink key={item.to} to={item.to} onClick={() => setOpenDrop(null)}
                        style={({ isActive }) => ({ display:'flex', alignItems:'center', gap:12, padding:'9px 12px', borderRadius:10, textDecoration:'none', background: isActive?'var(--nav-active-bg)':'transparent', transition:'background .12s' })}
                        onMouseEnter={e => e.currentTarget.style.background='var(--nav-hover-bg)'}
                        onMouseLeave={e => e.currentTarget.style.background='transparent'}
                      >
                        <div style={{ width:34, height:34, borderRadius:9, background:'var(--nav-icon-bg)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:16, flexShrink:0 }}>{item.icon}</div>
                        <div>
                          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                            <span style={{ fontSize:12, fontWeight:700, color:'var(--nav-text)' }}>{item.label}</span>
                            {item.badge && <span style={{ fontSize:9, fontWeight:800, background:'#22c55e', color:'#fff', padding:'2px 6px', borderRadius:20 }}>{item.badge}</span>}
                          </div>
                          <div style={{ fontSize:11, color:'var(--nav-subtext)', marginTop:1 }}>{item.sub}</div>
                        </div>
                      </NavLink>
                    ))}
                    <div style={{ borderTop:'1px solid var(--nav-border)', margin:'6px 4px 4px', padding:'6px 8px 0' }}>
                      <NavLink to="/tools" onClick={() => setOpenDrop(null)}
                        style={{ display:'block', textAlign:'center', padding:'8px', borderRadius:9, textDecoration:'none', fontSize:12, fontWeight:700, color:'#16a34a', background:'rgba(34,197,94,.07)' }}>
                        View all tools →
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>

              {/* Company dropdown */}
              <div style={{ position:'relative' }}>
                <DropBtn name="company" label="More" />
                {openDrop === 'company' && <Dropdown items={COMPANY} onClose={() => setOpenDrop(null)} />}
              </div>
            </div>

            {/* ── RIGHT ACTIONS ── */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginLeft:'auto', flexShrink:0 }}>

              {/* Dark mode toggle */}
              <button onClick={() => setDark(d => !d)}
                title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  width:36, height:36, borderRadius:10, border:'1px solid var(--nav-border)',
                  background:'var(--nav-hover-bg)', cursor:'pointer', fontSize:16,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  transition:'all .2s', flexShrink:0
                }}>
                {dark ? '☀️' : '🌙'}
              </button>

              {/* Auth */}
              {isLoggedIn ? (
                <div className="hidden md:flex" style={{ alignItems:'center', gap:6 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 12px', borderRadius:10, background:'var(--nav-hover-bg)' }}>
                    <div style={{ width:26, height:26, borderRadius:'50%', background:'linear-gradient(135deg,#3b82f6,#0f2444)', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:11, fontWeight:800 }}>
                      {user.avatar}
                    </div>
                    <span style={{ fontSize:13, fontWeight:600, color:'var(--nav-text)' }}>{user.firstName}</span>
                  </div>
                  <button onClick={() => navigate('/dashboard')} className="btn btn-primary btn-sm">Dashboard</button>
                  <button onClick={logout} style={{ padding:'7px 12px', borderRadius:8, border:'1px solid var(--nav-border)', background:'transparent', color:'var(--nav-text)', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Sign Out</button>
                </div>
              ) : (
                <div className="hidden md:flex" style={{ alignItems:'center', gap:6 }}>
                  <button onClick={onOpenAuth} style={{ padding:'8px 14px', borderRadius:9, border:'1px solid var(--nav-border)', background:'transparent', color:'var(--nav-text)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>Sign In</button>
                  <button onClick={onOpenAuth} style={{ padding:'8px 16px', borderRadius:9, border:'none', background:'linear-gradient(135deg,#0f2444,#1a3a6b)', color:'#fff', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>Get Started →</button>
                </div>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(o => !o)}
                className="md:hidden"
                style={{ width:36, height:36, borderRadius:10, border:'1px solid var(--nav-border)', background:'var(--nav-hover-bg)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:5, padding:9 }}>
                <div style={{ width:'100%', height:2, background:'var(--nav-text)', borderRadius:2, transition:'all .2s', transform: mobileOpen?'rotate(45deg) translate(0,7px)':'none' }} />
                <div style={{ width:'100%', height:2, background:'var(--nav-text)', borderRadius:2, opacity: mobileOpen?0:1, transition:'all .2s' }} />
                <div style={{ width:'100%', height:2, background:'var(--nav-text)', borderRadius:2, transition:'all .2s', transform: mobileOpen?'rotate(-45deg) translate(0,-7px)':'none' }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="md:hidden" style={{ background:'var(--nav-drop-bg)', borderTop:'1px solid var(--nav-border)', padding:'12px 16px 20px', animation:'slideDown .2s ease' }}>

            <NavLink to="/" onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({ display:'block', padding:'10px 12px', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:600, color:'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', marginBottom:4 })}>
              🏠 Home
            </NavLink>

            <NavLink to="/scholarships" onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({ display:'block', padding:'10px 12px', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:600, color:'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', marginBottom:4 })}>
              🎓 Scholarships
            </NavLink>

            <NavLink to="/universities" onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({ display:'block', padding:'10px 12px', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:600, color:'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', marginBottom:4 })}>
              🏛️ Universities
            </NavLink>

            <NavLink to="/services" onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({ display:'block', padding:'10px 12px', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:600, color:'var(--nav-text)', background: isActive?'var(--nav-active-bg)':'transparent', marginBottom:4 })}>
              🚀 Services
            </NavLink>

            {/* Explore section */}
            <button onClick={() => setMobileSection(s => s==='explore'?null:'explore')}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:10, border:'none', background:'transparent', color:'var(--nav-text)', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', marginBottom:4 }}>
              <span>🔭 Explore</span>
              <span style={{ fontSize:11, opacity:.5, transform: mobileSection==='explore'?'rotate(180deg)':'none', transition:'transform .2s' }}>▾</span>
            </button>
            {mobileSection === 'explore' && EXPLORE.map(item => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px 9px 28px', borderRadius:10, textDecoration:'none', marginBottom:2, color:'var(--nav-text)' }}>
                <span style={{fontSize:16}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{item.label}</div>
                  <div style={{fontSize:11,color:'var(--nav-subtext)'}}>{item.sub}</div>
                </div>
              </NavLink>
            ))}

            {/* Free Tools section */}
            <button onClick={() => setMobileSection(s => s==='tools'?null:'tools')}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:10, border:'1px solid rgba(34,197,94,.25)', background:'rgba(34,197,94,.06)', color:'#16a34a', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', marginBottom:4 }}>
              <span>🎁 Free Tools</span>
              <span style={{ fontSize:11, opacity:.6, transform: mobileSection==='tools'?'rotate(180deg)':'none', transition:'transform .2s' }}>▾</span>
            </button>
            {mobileSection === 'tools' && TOOLS_LINKS.map(item => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px 9px 28px', borderRadius:10, textDecoration:'none', marginBottom:2, color:'var(--nav-text)' }}>
                <span style={{fontSize:16}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{item.label}</div>
                  <div style={{fontSize:11,color:'var(--nav-subtext)'}}>{item.sub}</div>
                </div>
              </NavLink>
            ))}

            {/* Company section */}
            <button onClick={() => setMobileSection(s => s==='company'?null:'company')}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 12px', borderRadius:10, border:'none', background:'transparent', color:'var(--nav-text)', fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:'inherit', marginBottom:4 }}>
              <span>🏢 Company</span>
              <span style={{ fontSize:11, opacity:.5, transform: mobileSection==='company'?'rotate(180deg)':'none', transition:'transform .2s' }}>▾</span>
            </button>
            {mobileSection === 'company' && COMPANY.map(item => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px 9px 28px', borderRadius:10, textDecoration:'none', marginBottom:2, color:'var(--nav-text)' }}>
                <span style={{fontSize:16}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:13,fontWeight:600}}>{item.label}</div>
                  <div style={{fontSize:11,color:'var(--nav-subtext)'}}>{item.sub}</div>
                </div>
              </NavLink>
            ))}

            {/* Auth */}
            <div style={{ borderTop:'1px solid var(--nav-border)', marginTop:12, paddingTop:12, display:'flex', gap:8 }}>
              <button onClick={() => setDark(d=>!d)}
                style={{ padding:'10px 14px', borderRadius:10, border:'1px solid var(--nav-border)', background:'var(--nav-hover-bg)', cursor:'pointer', fontSize:16 }}>
                {dark ? '☀️' : '🌙'}
              </button>
              {isLoggedIn
                ? <><button onClick={() => { navigate('/dashboard'); setMobileOpen(false) }} className="btn btn-primary btn-sm" style={{flex:1}}>Dashboard</button>
                    <button onClick={logout} style={{ padding:'10px 14px', borderRadius:10, border:'1px solid var(--nav-border)', background:'transparent', color:'var(--nav-text)', fontSize:13, fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>Sign Out</button></>
                : <button onClick={() => { onOpenAuth(); setMobileOpen(false) }} className="btn btn-primary btn-sm" style={{flex:1}}>Sign In / Register</button>
              }
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
