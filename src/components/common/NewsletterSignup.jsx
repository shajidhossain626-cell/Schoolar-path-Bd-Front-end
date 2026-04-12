import { useState } from 'react'

const SCRIPT = 'https://script.google.com/macros/s/AKfycbzdH4qOsUowPdO_vFhAdu3Ip9z7NMSQ_ZHPtru4yYSXYA9UESlBhZ-DMde2VPb5SQVC/exec'

async function subscribe(email, name, source) {
  await fetch(SCRIPT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ action: 'subscribe', email, name, source })
  })
}

// ── COMPACT version — for footer, sidebar, banners ──
export function NewsletterCompact({ source = 'Website' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | done | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    try {
      await subscribe(email, '', source)
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') return (
    <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:10 }}>
      <span style={{ fontSize:20 }}>🎉</span>
      <div>
        <div style={{ fontSize:13, fontWeight:700, color:'#166534' }}>You're subscribed!</div>
        <div style={{ fontSize:11, color:'#16a34a' }}>Check your email for a welcome message.</div>
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
      <input
        type="email" required
        placeholder="your@email.com"
        value={email} onChange={e => setEmail(e.target.value)}
        style={{
          flex:1, minWidth:200, padding:'10px 14px',
          border:'1.5px solid rgba(255,255,255,.2)', borderRadius:10,
          fontSize:13, outline:'none', background:'rgba(255,255,255,.1)',
          color:'#fff', fontFamily:'inherit',
        }}
        onFocus={e => e.target.style.borderColor='#22c55e'}
        onBlur={e => e.target.style.borderColor='rgba(255,255,255,.2)'}
      />
      <button type="submit" disabled={status==='loading'}
        style={{
          padding:'10px 20px', background:'#22c55e', color:'#fff',
          border:'none', borderRadius:10, fontSize:13, fontWeight:800,
          cursor: status==='loading'?'wait':'pointer', fontFamily:'inherit',
          whiteSpace:'nowrap', flexShrink:0, transition:'opacity .15s'
        }}>
        {status==='loading' ? '⏳ Subscribing...' : '🔔 Subscribe'}
      </button>
      {status === 'error' && <div style={{ width:'100%', fontSize:11, color:'#fca5a5' }}>Something went wrong. Try again.</div>}
    </form>
  )
}

// ── FULL version — standalone section with features list ──
export function NewsletterFull({ source = 'Newsletter Page' }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setStatus('loading')
    try {
      await subscribe(email, name, source)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') return (
    <div style={{ textAlign:'center', padding:'40px 20px' }}>
      <div style={{ fontSize:56, marginBottom:16 }}>🎉</div>
      <div style={{ fontSize:24, fontWeight:900, color:'#0f172a', marginBottom:8 }}>You're subscribed!</div>
      <div style={{ fontSize:14, color:'#64748b', maxWidth:380, margin:'0 auto', lineHeight:1.7 }}>
        Check your email for a welcome message from ScholarPath BD. We'll send you scholarship deadlines and updates every week.
      </div>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth:420, margin:'0 auto' }}>
      <div style={{ marginBottom:12 }}>
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name} onChange={e => setName(e.target.value)}
          style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:14, outline:'none', fontFamily:'inherit', marginBottom:10 }}
          onFocus={e => e.target.style.borderColor='#0f2444'}
          onBlur={e => e.target.style.borderColor='#e2e8f0'}
        />
        <input
          type="email" required
          placeholder="your@email.com *"
          value={email} onChange={e => setEmail(e.target.value)}
          style={{ width:'100%', padding:'12px 16px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:14, outline:'none', fontFamily:'inherit' }}
          onFocus={e => e.target.style.borderColor='#0f2444'}
          onBlur={e => e.target.style.borderColor='#e2e8f0'}
        />
      </div>
      <button type="submit" disabled={status==='loading'}
        style={{ width:'100%', padding:'13px', background:'#0f2444', color:'#fff', border:'none', borderRadius:11, fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'inherit', transition:'all .15s' }}>
        {status==='loading' ? '⏳ Subscribing...' : '🔔 Subscribe to Scholarship Alerts'}
      </button>
      {status === 'error' && <div style={{ marginTop:8, fontSize:12, color:'#ef4444', textAlign:'center' }}>Something went wrong. Please try again.</div>}
      <div style={{ marginTop:10, fontSize:11, color:'#94a3b8', textAlign:'center' }}>
        No spam · Unsubscribe anytime · Free forever
      </div>
    </form>
  )
}

export default NewsletterCompact
