import { NewsletterFull } from '@components/common/NewsletterSignup'
import { Link } from 'react-router-dom'

const PERKS = [
  { icon:'📅', title:'Deadline Alerts', desc:'Get reminded 30 days, 7 days, and 1 day before each scholarship closes — never miss a deadline again.' },
  { icon:'🆕', title:'New Scholarships', desc:'Be the first to know when new scholarships are added to our database — some have very short windows.' },
  { icon:'💡', title:'Weekly Tips', desc:'Practical guides on SOP writing, IELTS preparation, professor outreach, and application strategy.' },
  { icon:'🎁', title:'Exclusive Offers', desc:'Subscriber-only discounts on ScholarPath BD services and early access to new free tools.' },
]

export default function SubscribePage() {
  return (
    <div style={{ background:'#f7f9fc', minHeight:'100vh' }}>
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', padding:'64px 16px 80px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.08, backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'26px 26px' }} />
        <div style={{ position:'absolute', top:-60, right:-60, width:360, height:360, background:'radial-gradient(circle,rgba(139,92,246,.2),transparent 65%)', borderRadius:'50%' }} />
        <div className="container" style={{ maxWidth:600, position:'relative', zIndex:1, textAlign:'center' }}>
          <div style={{ fontSize:64, marginBottom:18 }}>🔔</div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(139,92,246,.2)', border:'1px solid rgba(139,92,246,.4)', borderRadius:50, padding:'6px 16px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#c4b5fd', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Newsletter — No Spam</span>
          </div>
          <h1 style={{ fontSize:'clamp(28px,5vw,46px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:14 }}>
            Never Miss a<br /><span style={{ color:'#a78bfa' }}>Scholarship Deadline</span>
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.6)', lineHeight:1.75, maxWidth:440, margin:'0 auto' }}>
            Join 2,400+ Bangladeshi students getting weekly scholarship alerts, deadline reminders, and insider tips — completely free.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:700, padding:'0 16px 48px' }}>
        {/* Form card */}
        <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:'36px', marginTop:-40, boxShadow:'0 16px 48px rgba(0,0,0,.1)', marginBottom:24 }}>
          <div style={{ fontSize:18, fontWeight:900, color:'#0f172a', marginBottom:6, textAlign:'center' }}>
            Subscribe to Scholarship Alerts
          </div>
          <div style={{ fontSize:13, color:'#64748b', textAlign:'center', marginBottom:24 }}>
            Free forever · Unsubscribe anytime · No spam
          </div>
          <NewsletterFull source="Subscribe Page" />
        </div>

        {/* Perks */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:14, marginBottom:24 }}>
          {PERKS.map(p => (
            <div key={p.title} style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', padding:'20px' }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{p.icon}</div>
              <div style={{ fontSize:14, fontWeight:800, color:'#0f172a', marginBottom:6 }}>{p.title}</div>
              <div style={{ fontSize:13, color:'#64748b', lineHeight:1.65 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Already subscribed */}
        <div style={{ background:'#f8faff', border:'1px solid #e2e8f0', borderRadius:16, padding:'20px 24px', textAlign:'center' }}>
          <div style={{ fontSize:13, color:'#64748b', marginBottom:10 }}>
            Want instant help right now?
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/tools/eligibility-checker" style={{ padding:'10px 20px', background:'#0f2444', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700 }}>
              🎯 Check Scholarship Eligibility
            </Link>
            <a href="https://wa.me/8801889700879" target="_blank" rel="noreferrer"
              style={{ padding:'10px 20px', background:'#22c55e', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
