import { Link } from 'react-router-dom'

const TOOLS = [
  {
    icon: '🎯',
    title: 'Scholarship Eligibility Checker',
    desc: 'Enter your CGPA, IELTS, age & field — instantly see which international scholarships you qualify for with a % match score.',
    badge: 'Most Popular',
    badgeColor: '#22c55e',
    time: '30 seconds',
    users: '2,400+',
    link: '/tools/eligibility-checker',
    cta: 'Check Eligibility →',
    bg: '#f0fdf4',
    border: '#22c55e',
    features: ['12 scholarships checked instantly', 'Match % score for each', 'Personalized tips per scholarship', 'Free consultation offer'],
  },
  {
    icon: '📋',
    title: 'Document Checklist Generator',
    desc: 'Select your target scholarship and get a complete, personalized document checklist — so you never miss a required paper.',
    badge: 'Live Now',
    badgeColor: '#22c55e',
    time: '1 minute',
    users: '',
    link: '/tools/document-checklist',
    cta: 'Open Tool →',
    bg: '#fefce8',
    border: '#f59e0b',
    features: ['Scholarship-specific list', 'Translation requirements', 'Notarization guide', 'Submission checklist'],
  },
  {
    icon: '✍️',
    title: 'SOP Strength Analyzer',
    desc: 'Paste your Statement of Purpose draft — get an instant score on 8 criteria used by scholarship committees, with specific feedback.',
    badge: 'Live Now',
    badgeColor: '#22c55e',
    time: '2 minutes',
    users: '',
    link: '/tools/sop-analyzer',
    cta: 'Open Tool →',
    bg: '#eff6ff',
    border: '#3b82f6',
    features: ['Word count analysis', 'Readability score', 'Structure feedback', 'Scholarship-tone tips'],
  },
  {
    icon: '💰',
    title: 'Study Abroad Cost Calculator',
    desc: 'Choose a country — see your estimated monthly living costs in BDT, including rent, food, transport, and utilities.',
    badge: 'Live Now',
    badgeColor: '#22c55e',
    time: '1 minute',
    users: '',
    link: '/tools/cost-calculator',
    cta: 'Open Tool →',
    bg: '#fdf4ff',
    border: '#a855f7',
    features: ['20+ countries covered', 'Monthly cost breakdown', 'BDT conversion', 'Scholarship vs self-fund comparison'],
  },
  {
    icon: '📊',
    title: 'CGPA / GPA Converter',
    desc: 'Convert your CGPA to 4.0 GPA, percentage, UK grade — and instantly see which scholarships your CGPA qualifies for.',
    badge: 'Live Now',
    badgeColor: '#22c55e',
    time: '10 seconds',
    users: '',
    link: '/tools/cgpa-converter',
    cta: 'Open Tool →',
    bg: '#fff7ed',
    border: '#f97316',
    features: ['CGPA ↔ 4.0 GPA', 'CGPA to percentage', 'UK 2:1 / 1st class', 'Instant conversion'],
  },
  {
    icon: '🗓️',
    title: 'Scholarship Deadline Tracker',
    desc: 'Add scholarships to your tracker and get WhatsApp reminders before deadlines — never miss an opportunity again.',
    badge: 'Coming Soon',
    badgeColor: '#f59e0b',
    time: '2 minutes',
    users: '',
    link: '/tools/eligibility-checker',
    cta: 'Get Notified →',
    bg: '#f0fdfa',
    border: '#14b8a6',
    features: ['WhatsApp reminders', '30 scholarships tracked', '1-week advance alert', 'Personal dashboard'],
  },
]

const STATS = [
  { value: '100%', label: 'Free Forever', icon: '🎁' },
  { value: '30s', label: 'Average time to results', icon: '⚡' },
  { value: '2,400+', label: 'Students helped', icon: '👥' },
  { value: '0', label: 'Signup required', icon: '🔓' },
]

export default function ToolsPage() {
  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2444 0%, #1a3a6b 55%, #0f2444 100%)',
        position: 'relative', overflow: 'hidden',
        padding: '64px 16px 80px',
      }}>
        {/* Dot grid */}
        <div style={{ position:'absolute', inset:0, opacity:.08,
          backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)',
          backgroundSize:'26px 26px' }} />
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:-60, right:-60, width:400, height:400,
          background:'radial-gradient(circle,rgba(34,197,94,.18) 0%,transparent 65%)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', bottom:-80, left:-60, width:340, height:340,
          background:'radial-gradient(circle,rgba(59,130,246,.1) 0%,transparent 65%)', borderRadius:'50%' }} />

        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:680, margin:'0 auto' }}>
          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(34,197,94,.15)', border:'1px solid rgba(34,197,94,.3)', borderRadius:50, padding:'6px 16px', marginBottom:22 }}>
            <span style={{ fontSize:14 }}>🎁</span>
            <span style={{ fontSize:12, fontWeight:800, color:'#22c55e', letterSpacing:'.08em', textTransform:'uppercase' }}>
              100% Free — No Signup Needed
            </span>
          </div>

          <h1 style={{ fontSize:'clamp(30px,6vw,54px)', fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:18, letterSpacing:'-.02em' }}>
            Free Tools to Start Your<br />
            <span style={{ color:'#22c55e' }}>Scholarship Journey</span>
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.6)', lineHeight:1.75, maxWidth:500, margin:'0 auto 36px' }}>
            Powerful tools used by thousands of Bangladeshi students to check eligibility, plan documents, and maximize scholarship success — completely free.
          </p>

          {/* Stats row */}
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:24 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:22, marginBottom:2 }}>{s.icon}</div>
                <div style={{ fontSize:24, fontWeight:900, color:'#fff', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.45)', marginTop:2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED TOOL (big card) ── */}
      <div className="container" style={{ padding:'0 16px', maxWidth:900 }}>
        <div style={{ marginTop:-36, position:'relative', zIndex:10, marginBottom:32 }}>
          <div style={{
            background:'#fff', borderRadius:24,
            border:'2px solid #22c55e',
            boxShadow:'0 24px 64px rgba(34,197,94,.15)',
            overflow:'hidden',
          }}>
            {/* Top bar */}
            <div style={{ background:'#22c55e', padding:'10px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14 }}>⭐</span>
                <span style={{ fontSize:12, fontWeight:800, color:'#fff', textTransform:'uppercase', letterSpacing:'.08em' }}>Featured Tool — Live Now</span>
              </div>
              <span style={{ fontSize:12, color:'rgba(255,255,255,.7)' }}>Used by 2,400+ students</span>
            </div>

            <div style={{ padding:'32px', display:'grid', gridTemplateColumns:'1fr auto', gap:32, alignItems:'center' }}>
              <div>
                <div style={{ fontSize:48, marginBottom:14 }}>🎯</div>
                <h2 style={{ fontSize:26, fontWeight:900, color:'#0f172a', marginBottom:10, lineHeight:1.2 }}>
                  Scholarship Eligibility Checker
                </h2>
                <p style={{ fontSize:14, color:'#64748b', lineHeight:1.75, maxWidth:480, marginBottom:20 }}>
                  Enter your CGPA, IELTS score, age, and field of study — get an instant match score for 12+ international scholarships. Free, instant, no signup required.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
                  {['✓ 12 scholarships checked', '✓ % match score', '✓ Personalised tips', '✓ Free consultation'].map(f => (
                    <span key={f} style={{ fontSize:12, fontWeight:600, color:'#166534', background:'#dcfce7', padding:'4px 12px', borderRadius:20 }}>{f}</span>
                  ))}
                </div>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                  <Link to="/tools/eligibility-checker" style={{
                    padding:'13px 28px', background:'#0f2444', color:'#fff',
                    borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800,
                    display:'flex', alignItems:'center', gap:8,
                  }}>
                    🎯 Check My Eligibility — Free
                  </Link>
                  <a href="https://wa.me/8801889700879" target="_blank" rel="noreferrer"
                    style={{ padding:'13px 20px', background:'#f0fdf4', color:'#166534', border:'1px solid #bbf7d0', borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:700 }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Preview mockup */}
              <div style={{ flexShrink:0, display:'none' }} className="md-preview">
                <div style={{ width:200, background:'#f8fafc', borderRadius:16, border:'1px solid #e2e8f0', padding:16, fontSize:11 }}>
                  <div style={{ fontWeight:800, color:'#0f172a', marginBottom:10, fontSize:12 }}>Your Results</div>
                  {[{name:'Chevening',score:87,c:'#22c55e'},{name:'DAAD',score:74,c:'#22c55e'},{name:'GKS Korea',score:52,c:'#f59e0b'}].map(r=>(
                    <div key={r.name} style={{ background:'#fff', borderRadius:8, border:'1px solid #e2e8f0', padding:'8px 10px', marginBottom:6, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <span style={{ fontWeight:700, color:'#0f172a', fontSize:11 }}>{r.name}</span>
                      <span style={{ fontWeight:900, color:r.c, fontSize:13 }}>{r.score}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ALL TOOLS GRID ── */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:13, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:20, textAlign:'center' }}>
            More Tools Coming Soon
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,280px),1fr))', gap:16 }}>
            {TOOLS.slice(1).map(t => (
              <div key={t.title} style={{
                background:'#fff', borderRadius:18,
                border:`1.5px solid ${t.border}30`,
                padding:'24px', position:'relative', overflow:'hidden',
                transition:'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${t.border}18`; e.currentTarget.style.borderColor=t.border+'60' }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor=`${t.border}30` }}
              >
                {/* Coming soon overlay tint */}
                <div style={{ position:'absolute', top:12, right:12 }}>
                  <span style={{ fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20,
                    background: t.badge==='Most Popular' ? '#dcfce7' : '#fef9c3',
                    color: t.badge==='Most Popular' ? '#166534' : '#854d0e',
                    border: `1px solid ${t.badge==='Most Popular'?'#bbf7d0':'#fde68a'}` }}>
                    {t.badge}
                  </span>
                </div>

                <div style={{ fontSize:36, marginBottom:14 }}>{t.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:800, color:'#0f172a', marginBottom:8, lineHeight:1.3, paddingRight:80 }}>{t.title}</h3>
                <p style={{ fontSize:13, color:'#64748b', lineHeight:1.65, marginBottom:16 }}>{t.desc}</p>

                <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:20 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ fontSize:12, color:'#475569', display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ color:t.border, fontWeight:800, fontSize:10 }}>✓</span> {f}
                    </div>
                  ))}
                </div>

                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:14, borderTop:`1px solid ${t.border}20` }}>
                  <span style={{ fontSize:11, color:'#94a3b8' }}>⏱ {t.time}</span>
                  <Link to={t.link} style={{
                    fontSize:12, fontWeight:800, color:t.border,
                    textDecoration:'none', display:'flex', alignItems:'center', gap:4,
                  }}>
                    {t.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── NOTIFY ME ── */}
        <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', borderRadius:20, padding:'36px 28px', margin:'32px 0', textAlign:'center' }}>
          <div style={{ fontSize:32, marginBottom:12 }}>🔔</div>
          <div style={{ fontSize:20, fontWeight:900, color:'#fff', marginBottom:8 }}>Want early access to new tools?</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,.55)', marginBottom:24 }}>
            5 more free tools are coming. Join our WhatsApp to be first to know.
          </div>
          <a
            href="https://wa.me/8801889700879?text=Hi! I want early access to ScholarPath BD free tools"
            target="_blank" rel="noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'#22c55e', color:'#fff', borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800 }}
          >
            💬 Join on WhatsApp → Get Early Access
          </a>
        </div>
      </div>
    </div>
  )
}
