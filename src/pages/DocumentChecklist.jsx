import { useState } from 'react'
import { Link } from 'react-router-dom'

const SCHOLARSHIPS = [
  {
    name: 'DAAD Research Scholarship (Germany)',
    id: 'daad',
    icon: '🇩🇪',
    deadline: 'Oct 15, 2026',
    docs: [
      { cat: 'Application Forms', items: ['DAAD online application form (portal.daad.de)', 'Signed declaration / cover sheet'] },
      { cat: 'Academic Documents', items: ['Bachelor\'s degree certificate (notarized + English translation)', 'Master\'s degree certificate if applicable', 'All academic transcripts (notarized + translated)', 'CGPA calculation sheet or grading scale explanation'] },
      { cat: 'Language Certificates', items: ['IELTS certificate (min 6.5) OR TOEFL certificate (min 90)', 'German language certificate B1+ (if available)'] },
      { cat: 'Professional Documents', items: ['CV in Europass format (max 2 pages)', 'Proof of work experience / employment letter', '2 recommendation letters (academic or professional)'] },
      { cat: 'Research Documents', items: ['Research proposal / study plan (2 pages max)', 'Letter of acceptance from German professor (if available)', 'List of publications (if any)'] },
      { cat: 'Identity Documents', items: ['Passport copy (valid for at least 1 year)', 'Recent passport-size photo (white background)'] },
    ]
  },
  {
    name: 'Chevening Scholarship (UK)',
    id: 'chevening',
    icon: '🇬🇧',
    deadline: 'Nov 5, 2026',
    docs: [
      { cat: 'Online Application', items: ['Chevening online application (chevening.org)', '4 personal statements (600 words each): Leadership, Networking, Career Plan, Chevening Why'] },
      { cat: 'Academic Documents', items: ['Bachelor\'s degree certificate', 'All academic transcripts', 'Degree classification equivalent to UK 2:1 proof'] },
      { cat: 'English Proficiency', items: ['IELTS certificate (min 6.5, no band below 5.5)', 'Taken within last 2 years'] },
      { cat: 'Professional Experience', items: ['2+ years work experience evidence (employment letters, payslips)', 'Employer letter confirming current role (on letterhead)'] },
      { cat: 'References', items: ['2 referee details entered online (academic or professional)', 'Referees must submit by Chevening deadline independently'] },
      { cat: 'University Offers', items: ['Unconditional offer from 3 different UK universities (required by July)', 'All 3 universities must be Chevening-eligible'] },
    ]
  },
  {
    name: 'MEXT Government Scholarship (Japan)',
    id: 'mext',
    icon: '🇯🇵',
    deadline: 'Apr 15, 2026',
    docs: [
      { cat: 'Application Forms', items: ['MEXT application form (collect from Bangladesh Embassy)', 'Placement preference form'] },
      { cat: 'Academic Documents', items: ['All university transcripts (certified)', 'Graduation certificates', 'Certificate of enrollment (if currently studying)'] },
      { cat: 'Study Plan', items: ['Research plan / study plan (in English or Japanese)', 'Field of study description (2-3 pages)'] },
      { cat: 'Health & Other', items: ['Medical examination form (MEXT format)', 'Certificate of health from registered physician', 'Recommendation letter from current/recent employer or professor'] },
      { cat: 'Identity Documents', items: ['Passport copy', 'Birth certificate (English translation)', '4 passport-size photos'] },
    ]
  },
  {
    name: 'Fulbright Program (USA)',
    id: 'fulbright',
    icon: '🇺🇸',
    deadline: 'Apr 10, 2026',
    docs: [
      { cat: 'Online Application', items: ['IIE online application (apply.iie.org)', 'Personal statement (1 page)', 'Statement of grant purpose (2 pages)'] },
      { cat: 'Academic Documents', items: ['All transcripts (official sealed copies)', 'Degree certificates', 'GPA calculation sheet'] },
      { cat: 'English Proficiency', items: ['IELTS 7.0+ OR TOEFL 100+ (taken within 2 years)', 'No IELTS required if medium of instruction was English'] },
      { cat: 'References', items: ['3 recommendation letters (minimum 2 academic)', 'Sent directly by referees via online system'] },
      { cat: 'Identity Documents', items: ['Passport copy', 'National ID copy', 'Recent photo'] },
    ]
  },
  {
    name: 'GKS Graduate Scholarship (South Korea)',
    id: 'gks',
    icon: '🇰🇷',
    deadline: 'Feb 28, 2026',
    docs: [
      { cat: 'Application Forms', items: ['GKS application form (study in korea website)', 'Personal statement (1 page)', 'Research study plan (1 page)'] },
      { cat: 'Academic Documents', items: ['Degree certificates (notarized)', 'Transcripts (notarized, English or Korean)', 'CGPA converted to Korean 4.0 scale'] },
      { cat: 'Health Documents', items: ['Medical examination report (NIIED format)', 'Certificate of health (from hospital)'] },
      { cat: 'Other Documents', items: ['2 recommendation letters', 'Personal information agreement form', 'Proof of nationality (passport)', 'Korean language certificate (TOPIK) if available'] },
      { cat: 'Embassy Route Extra', items: ['Application submitted to Bangladesh Embassy in Dhaka', 'Additional embassy interview preparation required'] },
    ]
  },
  {
    name: 'Australia Awards (Australia)',
    id: 'aas',
    icon: '🇦🇺',
    deadline: 'Apr 30, 2026',
    docs: [
      { cat: 'Online Application', items: ['Application via Australia Awards portal (australiaawards.gov.au)', 'Personal statement (development impact focus)'] },
      { cat: 'Academic Documents', items: ['Bachelor\'s degree certificate', 'Academic transcripts', 'Evidence of upper second class results'] },
      { cat: 'English Proficiency', items: ['IELTS 6.5 overall (min 6.0 each band)', 'Taken within last 2 years'] },
      { cat: 'Professional Documents', items: ['2+ years work experience evidence', 'Employment verification letter', '2 reference letters'] },
      { cat: 'Supplementary', items: ['CV / resume', 'Statement showing how study will benefit Bangladesh', 'Passport copy', 'Birth certificate'] },
    ]
  },
  {
    name: 'CSC Scholarship (China)',
    id: 'csc',
    icon: '🇨🇳',
    deadline: 'Apr 30, 2026',
    docs: [
      { cat: 'Application Forms', items: ['CSC online application form (csc.edu.cn)', 'Personal statement / study plan'] },
      { cat: 'Academic Documents', items: ['Notarized degree certificate (English translation)', 'Notarized transcripts (English translation)', 'Graduation certificate'] },
      { cat: 'Health Documents', items: ['Foreigner Physical Examination Form (from hospital)', 'Must include blood tests, chest X-ray, ECG'] },
      { cat: 'Other Documents', items: ['2 recommendation letters (professors or supervisors)', 'Passport (valid at least 1 year)', 'Acceptance letter from Chinese university (if available)', 'HSK certificate (Chinese test, if available)'] },
    ]
  },
]

export default function DocumentChecklist() {
  const [selected, setSelected] = useState('')
  const [checked, setChecked] = useState({})
  const [copied, setCopied] = useState(false)

  const scholarship = SCHOLARSHIPS.find(s => s.id === selected)

  const allItems = scholarship ? scholarship.docs.flatMap(d => d.items) : []
  const checkedCount = Object.values(checked).filter(Boolean).length
  const pct = allItems.length > 0 ? Math.round(checkedCount / allItems.length * 100) : 0

  function toggle(key) {
    setChecked(c => ({ ...c, [key]: !c[key] }))
  }

  function reset() {
    setChecked({})
  }

  function copyList() {
    if (!scholarship) return
    const lines = [`DOCUMENT CHECKLIST — ${scholarship.name}`, `Deadline: ${scholarship.deadline}`, '']
    scholarship.docs.forEach(d => {
      lines.push(`=== ${d.cat} ===`)
      d.items.forEach(item => lines.push(`[ ] ${item}`))
      lines.push('')
    })
    lines.push('Generated by ScholarPath BD — scholarpathbd.com')
    navigator.clipboard.writeText(lines.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div style={{ background: '#f7f9fc', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#0f2444,#1a3a6b)', padding: '48px 16px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.08, backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'26px 26px' }} />
        <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, background:'radial-gradient(circle,rgba(34,197,94,.15) 0%,transparent 65%)', borderRadius:'50%' }} />
        <div className="container" style={{ maxWidth:760, position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
            <Link to="/tools" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none', fontSize:13 }}>← Free Tools</Link>
          </div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(34,197,94,.15)', border:'1px solid rgba(34,197,94,.3)', borderRadius:50, padding:'5px 14px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#22c55e', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — No Signup</span>
          </div>
          <h1 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:12 }}>
            Document Checklist Generator
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.6)', lineHeight:1.7, maxWidth:520 }}>
            Select any scholarship and get a complete, tick-able document checklist — so you never miss a single required paper.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:760, padding:'0 16px 48px' }}>
        {/* Scholarship picker */}
        <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:'24px', marginTop:-28, boxShadow:'0 8px 32px rgba(0,0,0,.08)', marginBottom:16 }}>
          <div style={{ fontSize:12, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:12 }}>Select your target scholarship</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,220px),1fr))', gap:10 }}>
            {SCHOLARSHIPS.map(s => (
              <button key={s.id} onClick={() => { setSelected(s.id); reset() }}
                style={{ padding:'12px 14px', borderRadius:12, border:'1.5px solid', cursor:'pointer', textAlign:'left', transition:'all .15s',
                  borderColor: selected===s.id ? '#0f2444' : '#e2e8f0',
                  background: selected===s.id ? '#0f2444' : '#f8faff' }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontSize:12, fontWeight:700, color: selected===s.id ? '#fff' : '#0f172a', lineHeight:1.3 }}>{s.name.split(' (')[0]}</div>
                <div style={{ fontSize:10, color: selected===s.id ? 'rgba(255,255,255,.6)' : '#94a3b8', marginTop:3 }}>Deadline: {s.deadline}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Checklist */}
        {scholarship && (
          <div>
            {/* Progress bar */}
            <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', padding:'16px 20px', marginBottom:16, display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12, fontWeight:700, color:'#475569' }}>
                  <span>Documents collected</span>
                  <span>{checkedCount} / {allItems.length}</span>
                </div>
                <div style={{ height:8, background:'#f1f5f9', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background: pct===100?'#22c55e':'#3b82f6', borderRadius:4, transition:'width .3s' }} />
                </div>
              </div>
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                <button onClick={copyList}
                  style={{ padding:'8px 14px', background: copied?'#22c55e':'#0f2444', color:'#fff', border:'none', borderRadius:9, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  {copied ? '✅ Copied!' : '📋 Copy List'}
                </button>
                <button onClick={reset}
                  style={{ padding:'8px 12px', background:'#f1f5f9', border:'1px solid #e2e8f0', color:'#475569', borderRadius:9, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  Reset
                </button>
              </div>
            </div>

            {/* Document sections */}
            {scholarship.docs.map((doc, di) => (
              <div key={doc.cat} style={{ background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', overflow:'hidden', marginBottom:12 }}>
                <div style={{ background:'#f8faff', padding:'12px 18px', borderBottom:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontSize:13, fontWeight:800, color:'#0f172a' }}>{doc.cat}</div>
                  <div style={{ fontSize:11, color:'#94a3b8' }}>
                    {doc.items.filter((_, i) => checked[`${di}-${i}`]).length}/{doc.items.length} ready
                  </div>
                </div>
                <div style={{ padding:'8px 14px' }}>
                  {doc.items.map((item, ii) => {
                    const key = `${di}-${ii}`
                    const done = checked[key]
                    return (
                      <div key={item} onClick={() => toggle(key)}
                        style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'10px 8px', borderRadius:9, cursor:'pointer', transition:'background .1s', background: done?'#f0fdf4':'transparent' }}>
                        <div style={{ width:20, height:20, borderRadius:6, border:`1.5px solid ${done?'#22c55e':'#d1d5db'}`, background:done?'#22c55e':'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, transition:'all .15s' }}>
                          {done && <span style={{ color:'#fff', fontSize:12, fontWeight:800 }}>✓</span>}
                        </div>
                        <span style={{ fontSize:13, color: done?'#166534':'#374151', textDecoration: done?'line-through':'none', lineHeight:1.5, opacity: done?.75:1 }}>{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {pct === 100 && (
              <div style={{ background:'linear-gradient(135deg,#f0fdf4,#dcfce7)', border:'2px solid #22c55e', borderRadius:16, padding:'24px', textAlign:'center', marginTop:8 }}>
                <div style={{ fontSize:40, marginBottom:8 }}>🎉</div>
                <div style={{ fontSize:18, fontWeight:900, color:'#166534', marginBottom:6 }}>Documents ready! Time to apply.</div>
                <div style={{ fontSize:13, color:'#166534', marginBottom:16 }}>Want help writing your SOP and submitting the application?</div>
                <a href={`https://wa.me/8801889700879?text=${encodeURIComponent('Hi! My documents for '+scholarship.name+' are ready. Can ScholarPath BD help me apply?')}`}
                  target="_blank" rel="noreferrer"
                  style={{ display:'inline-block', padding:'12px 24px', background:'#166534', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                  💬 Get Help Applying on WhatsApp →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
