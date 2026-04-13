import { Link } from 'react-router-dom'

const TOOLS = [
  {
    icon:'🎯', title:'Scholarship Eligibility Checker', badge:'Most Popular', live:true,
    desc:'Enter CGPA, IELTS, age & field — instantly see which scholarships you qualify for with a % match score and personalized tips.',
    link:'/tools/eligibility-checker', cta:'Check Eligibility →',
    color:'#34d399', glow:'rgba(52,211,153,.25)',
    features:['12 scholarships checked instantly','Match % score for each','Personalized tips','Free consultation offer'],
  },
  {
    icon:'📋', title:'Document Checklist Generator', badge:'Live Now', live:true,
    desc:'Select your target scholarship and get a complete, tick-able document checklist — so you never miss a required paper.',
    link:'/tools/document-checklist', cta:'Open Tool →',
    color:'#60a5fa', glow:'rgba(96,165,250,.2)',
    features:['7 scholarships covered','Per-scholarship document list','Tick-off progress','Copy to clipboard'],
  },
  {
    icon:'✍️', title:'SOP Strength Analyzer', badge:'Live Now', live:true,
    desc:'Paste your Statement of Purpose — get an instant score on 8 criteria used by scholarship committees, with specific feedback.',
    link:'/tools/sop-analyzer', cta:'Analyze SOP →',
    color:'#a78bfa', glow:'rgba(167,139,250,.2)',
    features:['8 criteria scored','Word count check','AI-detection flag','Improvement tips'],
  },
  {
    icon:'💰', title:'Study Abroad Cost Calculator', badge:'Live Now', live:true,
    desc:'Choose a country — see your estimated monthly living costs in BDT, including rent, food, transport, and utilities breakdown.',
    link:'/tools/cost-calculator', cta:'Calculate Cost →',
    color:'#fbbf24', glow:'rgba(251,191,36,.2)',
    features:['12 countries covered','Monthly BDT breakdown','Budget vs comfortable','Scholarship comparison'],
  },
  {
    icon:'📊', title:'CGPA / GPA Converter', badge:'Live Now', live:true,
    desc:'Convert CGPA to 4.0, 5.0, 10.0 scale, percentage, UK classification — and see which scholarships your CGPA qualifies for.',
    link:'/tools/cgpa-converter', cta:'Convert Now →',
    color:'#f472b6', glow:'rgba(244,114,182,.2)',
    features:['4.0 / 5.0 / 10.0 / %','UK & US grade','Input validation','Scholarship eligibility note'],
  },
]

const STATS = [
  { value:'5',       label:'Free Tools',         icon:'🛠️' },
  { value:'100%',    label:'Free Forever',        icon:'🎁' },
  { value:'2,400+',  label:'Students Helped',     icon:'👥' },
  { value:'0',       label:'Signup Required',     icon:'🔓' },
]

export default function ToolsPage() {
  return (
    <div style={{ background:'#07020f', minHeight:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>

      {/* ── HERO ── */}
      <div style={{ background:'linear-gradient(160deg,#0d0320 0%,#1a0533 45%,#0d0320 100%)', position:'relative', overflow:'hidden', padding:'64px 16px 80px' }}>
        {/* Grid dots */}
        <div style={{ position:'absolute', inset:0, opacity:.1,
          backgroundImage:'radial-gradient(circle,rgba(167,139,250,.8) 1px,transparent 1px)',
          backgroundSize:'28px 28px', pointerEvents:'none' }} />
        {/* Glow orbs */}
        <div style={{ position:'absolute', top:-100, right:-100, width:500, height:500, background:'radial-gradient(circle,rgba(139,92,246,.3) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-80, width:400, height:400, background:'radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:700 }}>
          {/* Badge */}
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(139,92,246,.15)', border:'1px solid rgba(139,92,246,.4)', borderRadius:50, padding:'7px 18px', marginBottom:24 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#a78bfa', animation:'glow 2s infinite' }} />
            <span style={{ fontSize:12, fontWeight:800, color:'#c4b5fd', letterSpacing:'.08em', textTransform:'uppercase' }}>
              100% Free — No Signup Needed
            </span>
          </div>

          <h1 style={{ fontSize:'clamp(30px,6vw,58px)', fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:18, letterSpacing:'-.02em' }}>
            Free Tools to Start Your
            <br /><span style={{ background:'linear-gradient(135deg,#a78bfa,#60a5fa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Scholarship Journey</span>
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.5)', lineHeight:1.75, maxWidth:500, margin:'0 auto 40px' }}>
            Powerful tools used by thousands of Bangladeshi students to check eligibility, plan documents, and maximize scholarship success.
          </p>

          {/* Stats */}
          <div style={{ display:'flex', justifyContent:'center', flexWrap:'wrap', gap:32 }}>
            {STATS.map(s => (
              <div key={s.label} style={{ textAlign:'center' }}>
                <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                <div style={{ fontSize:26, fontWeight:900, color:'#fff', lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.4)', marginTop:3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED TOOL (big) ── */}
      <div className="container" style={{ padding:'0 16px', maxWidth:900 }}>
        <div style={{ marginTop:-40, position:'relative', zIndex:10, marginBottom:20 }}>
          <div style={{
            background:'linear-gradient(135deg,rgba(52,211,153,.08),rgba(52,211,153,.03))',
            border:'2px solid rgba(52,211,153,.4)',
            borderRadius:24, overflow:'hidden',
            boxShadow:'0 24px 64px rgba(52,211,153,.15)',
          }}>
            <div style={{ background:'linear-gradient(135deg,#059669,#34d399)', padding:'10px 24px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:14 }}>⭐</span>
                <span style={{ fontSize:11, fontWeight:800, color:'#fff', textTransform:'uppercase', letterSpacing:'.08em' }}>Most Popular Tool — Live Now</span>
              </div>
              <span style={{ fontSize:11, color:'rgba(255,255,255,.7)' }}>Used by 2,400+ students</span>
            </div>
            <div style={{ padding:'28px 28px 24px', display:'grid', gridTemplateColumns:'1fr auto', gap:28, alignItems:'center' }}>
              <div>
                <div style={{ fontSize:44, marginBottom:12 }}>🎯</div>
                <h2 style={{ fontSize:'clamp(20px,4vw,26px)', fontWeight:900, color:'#fff', marginBottom:10, lineHeight:1.2 }}>Scholarship Eligibility Checker</h2>
                <p style={{ fontSize:14, color:'rgba(255,255,255,.5)', lineHeight:1.7, maxWidth:420, marginBottom:20 }}>
                  Enter your CGPA, IELTS score, age and field of study — get an instant match score for 12+ international scholarships. Free, instant, no signup.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:22 }}>
                  {['✓ 12 scholarships','✓ % match score','✓ Personal tips','✓ Free consultation'].map(f => (
                    <span key={f} style={{ fontSize:11, fontWeight:700, background:'rgba(52,211,153,.12)', color:'#34d399', padding:'4px 12px', borderRadius:20, border:'1px solid rgba(52,211,153,.25)' }}>{f}</span>
                  ))}
                </div>
                <Link to="/tools/eligibility-checker"
                  style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'13px 28px', background:'linear-gradient(135deg,#059669,#34d399)', color:'#fff', borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800 }}>
                  🎯 Check My Eligibility — Free →
                </Link>
              </div>
              {/* Mini preview */}
              <div className="hidden md:block" style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(52,211,153,.2)', borderRadius:16, padding:16, minWidth:180, flexShrink:0 }}>
                <div style={{ fontSize:10, fontWeight:800, color:'rgba(255,255,255,.4)', marginBottom:10, textTransform:'uppercase', letterSpacing:'.06em' }}>Sample results</div>
                {[{n:'Chevening UK',s:87,c:'#34d399'},{n:'DAAD Germany',s:74,c:'#34d399'},{n:'GKS Korea',s:52,c:'#fbbf24'},{n:'MEXT Japan',s:40,c:'#f87171'}].map(r => (
                  <div key={r.n} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,.05)' }}>
                    <span style={{ fontSize:11, color:'rgba(255,255,255,.6)', fontWeight:600 }}>{r.n}</span>
                    <span style={{ fontSize:12, fontWeight:900, color:r.c }}>{r.s}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── ALL TOOLS GRID ── */}
        <div style={{ marginBottom:12 }}>
          <div style={{ fontSize:12, fontWeight:800, color:'rgba(167,139,250,.4)', textTransform:'uppercase', letterSpacing:'.12em', marginBottom:20, textAlign:'center' }}>
            All Free Tools
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap:14 }}>
            {TOOLS.slice(1).map(t => (
              <Link key={t.title} to={t.link}
                style={{ textDecoration:'none', display:'flex', flexDirection:'column',
                  background:'rgba(255,255,255,.03)', border:'1px solid',
                  borderColor:`${t.color}30`, borderRadius:18, padding:'22px', overflow:'hidden',
                  transition:'all .2s', position:'relative',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor=t.color+'70'; e.currentTarget.style.boxShadow=`0 12px 40px ${t.glow}`; e.currentTarget.style.background='rgba(255,255,255,.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=`${t.color}30`; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.background='rgba(255,255,255,.03)' }}
              >
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:`${t.color}15`, border:`1px solid ${t.color}30`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22 }}>
                    {t.icon}
                  </div>
                  <span style={{ fontSize:10, fontWeight:800, background:`${t.color}15`, color:t.color, padding:'3px 10px', borderRadius:20, border:`1px solid ${t.color}25` }}>{t.badge}</span>
                </div>
                <div style={{ fontSize:14, fontWeight:800, color:'#fff', marginBottom:8, lineHeight:1.3 }}>{t.title}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,.45)', lineHeight:1.65, flex:1, marginBottom:16 }}>{t.desc}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:4, marginBottom:16 }}>
                  {t.features.map(f => (
                    <div key={f} style={{ fontSize:11, color:'rgba(255,255,255,.5)', display:'flex', alignItems:'center', gap:6 }}>
                      <span style={{ color:t.color, fontWeight:800, fontSize:10 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:`1px solid ${t.color}20` }}>
                  <span style={{ fontSize:11, fontWeight:800, color:t.color }}>{t.cta}</span>
                  <span style={{ fontSize:16, color:t.color }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background:'linear-gradient(135deg,rgba(139,92,246,.12),rgba(99,102,241,.08))', border:'1px solid rgba(139,92,246,.3)', borderRadius:20, padding:'36px 28px', margin:'24px 0', textAlign:'center' }}>
          <div style={{ fontSize:32, marginBottom:12 }}>💬</div>
          <div style={{ fontSize:20, fontWeight:900, color:'#fff', marginBottom:8 }}>Need more help than a free tool?</div>
          <div style={{ fontSize:14, color:'rgba(255,255,255,.5)', marginBottom:24 }}>Our counselors handle SOP, documents, and full application — from ৳5,000</div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/services" style={{ padding:'12px 26px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', color:'#fff', borderRadius:12, textDecoration:'none', fontSize:13, fontWeight:800 }}>
              🚀 View Packages →
            </Link>
            <a href="https://wa.me/8801889700879?text=Hi! I want help with my scholarship application."
              target="_blank" rel="noreferrer"
              style={{ padding:'12px 24px', background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.15)', borderRadius:12, textDecoration:'none', fontSize:13, fontWeight:700 }}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes glow { 0%,100%{opacity:1} 50%{opacity:.3} }
      `}</style>
    </div>
  )
}
