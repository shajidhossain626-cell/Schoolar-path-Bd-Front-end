import { useState } from 'react'
import { Link } from 'react-router-dom'

const SCHOLARSHIPS = [
  { name:'DAAD Research Scholarship', country:'Germany', id:'daad', icon:'🇩🇪', deadline:'Oct 15, 2026', color:'#f87171',
    docs:[
      { cat:'Application Forms', items:['DAAD online application (portal.daad.de)','Signed declaration / cover sheet'] },
      { cat:'Academic Documents', items:["Bachelor's degree certificate (notarized + English translation)","Master's degree certificate if applicable","All academic transcripts (notarized + translated)",'CGPA calculation sheet or grading scale explanation'] },
      { cat:'Language Certificates', items:['IELTS certificate (min 6.5) OR TOEFL (min 90)','German language certificate B1+ (if available)'] },
      { cat:'Professional Documents', items:['CV in Europass format (max 2 pages)','Proof of work experience / employment letter','2 recommendation letters (academic or professional)'] },
      { cat:'Research Documents', items:['Research proposal / study plan (2 pages max)','Letter of acceptance from German professor (if available)','List of publications (if any)'] },
      { cat:'Identity Documents', items:['Passport copy (valid for at least 1 year)','Recent passport-size photo (white background)'] },
    ]},
  { name:'Chevening Scholarship', country:'United Kingdom', id:'chevening', icon:'🇬🇧', deadline:'Nov 5, 2026', color:'#60a5fa',
    docs:[
      { cat:'Online Application', items:['Chevening online application (chevening.org)','4 personal statements (600 words each): Leadership, Networking, Career Plan, Chevening Why'] },
      { cat:'Academic Documents', items:["Bachelor's degree certificate",'All academic transcripts','Degree classification equivalent to UK 2:1 proof'] },
      { cat:'English Proficiency', items:['IELTS (min 6.5, no band below 5.5)','Taken within last 2 years'] },
      { cat:'Professional Experience', items:['2+ years work experience evidence (employment letters, payslips)','Employer letter confirming current role (on letterhead)'] },
      { cat:'References', items:['2 referee details entered online (academic or professional)','Referees must submit by deadline independently'] },
      { cat:'University Offers', items:['Unconditional offer from 3 different UK universities (by July)','All 3 must be Chevening-eligible'] },
    ]},
  { name:'MEXT Government Scholarship', country:'Japan', id:'mext', icon:'🇯🇵', deadline:'Apr 15, 2026', color:'#f472b6',
    docs:[
      { cat:'Application Forms', items:['MEXT application form (collect from Bangladesh Embassy)','Placement preference form'] },
      { cat:'Academic Documents', items:['All university transcripts (certified)','Graduation certificates','Certificate of enrollment (if currently studying)'] },
      { cat:'Study Plan', items:['Research plan / study plan (in English or Japanese)','Field of study description (2-3 pages)'] },
      { cat:'Health Documents', items:['Medical examination form (MEXT format)','Certificate of health from registered physician'] },
      { cat:'Identity Documents', items:['Passport copy','Birth certificate (English translation)','4 passport-size photos','Recommendation letter from employer or professor'] },
    ]},
  { name:'Fulbright Program', country:'United States', id:'fulbright', icon:'🇺🇸', deadline:'Apr 10, 2026', color:'#34d399',
    docs:[
      { cat:'Online Application', items:['IIE online application (apply.iie.org)','Personal statement (1 page)','Statement of grant purpose (2 pages)'] },
      { cat:'Academic Documents', items:['All transcripts (official sealed copies)','Degree certificates','GPA calculation sheet'] },
      { cat:'English Proficiency', items:['IELTS 7.0+ OR TOEFL 100+','No IELTS required if medium of instruction was English'] },
      { cat:'References', items:['3 recommendation letters (minimum 2 academic)','Sent directly by referees via online system'] },
      { cat:'Identity Documents', items:['Passport copy','National ID copy','Recent photo'] },
    ]},
  { name:'GKS Graduate Scholarship', country:'South Korea', id:'gks', icon:'🇰🇷', deadline:'Feb 28, 2026', color:'#fbbf24',
    docs:[
      { cat:'Application Forms', items:['GKS application form (studyinkorea.go.kr)','Personal statement (1 page)','Research study plan (1 page)'] },
      { cat:'Academic Documents', items:['Degree certificates (notarized)','Transcripts (notarized, English or Korean)','CGPA converted to Korean 4.0 scale'] },
      { cat:'Health Documents', items:['Medical examination report (NIIED format)','Certificate of health (from hospital)'] },
      { cat:'Other Documents', items:['2 recommendation letters','Personal information agreement form','Passport (proof of nationality)','Korean language certificate (TOPIK) if available'] },
    ]},
  { name:'Australia Awards', country:'Australia', id:'aas', icon:'🇦🇺', deadline:'Apr 30, 2026', color:'#a78bfa',
    docs:[
      { cat:'Online Application', items:['Application via Australia Awards portal','Personal statement (development impact focus)'] },
      { cat:'Academic Documents', items:["Bachelor's degree certificate",'Academic transcripts','Evidence of upper second class results'] },
      { cat:'English Proficiency', items:['IELTS 6.5 overall (min 6.0 each band)','Taken within last 2 years'] },
      { cat:'Professional Documents', items:['2+ years work experience evidence','Employment verification letter','2 reference letters'] },
      { cat:'Supplementary', items:['CV / resume','Statement showing how study will benefit Bangladesh','Passport copy','Birth certificate'] },
    ]},
  { name:'CSC Government Scholarship', country:'China', id:'csc', icon:'🇨🇳', deadline:'Apr 30, 2026', color:'#fb923c',
    docs:[
      { cat:'Application Forms', items:['CSC online application (csc.edu.cn)','Personal statement / study plan'] },
      { cat:'Academic Documents', items:['Notarized degree certificate (English translation)','Notarized transcripts (English translation)','Graduation certificate'] },
      { cat:'Health Documents', items:['Foreigner Physical Examination Form (from hospital)','Must include blood tests, chest X-ray, ECG'] },
      { cat:'Other Documents', items:['2 recommendation letters (professors or supervisors)','Passport (valid at least 1 year)','Acceptance letter from Chinese university (if available)','HSK certificate (if available)'] },
    ]},
]

const DARK = {
  page:  { background:'#07020f', minHeight:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' },
  hero:  { background:'linear-gradient(135deg,#0d0320 0%,#1a0533 40%,#0d0320 100%)', padding:'48px 16px 40px', position:'relative', overflow:'hidden' },
  card:  { background:'rgba(255,255,255,.04)', border:'1px solid rgba(139,92,246,.2)', borderRadius:16, overflow:'hidden' },
  label: { fontSize:10, fontWeight:800, color:'rgba(167,139,250,.6)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6, display:'block' },
}

export default function DocumentChecklist() {
  const [selected, setSelected] = useState('')
  const [checked, setChecked]   = useState({})
  const [copied, setCopied]     = useState(false)

  const scholarship = SCHOLARSHIPS.find(s => s.id === selected)
  const allItems    = scholarship ? scholarship.docs.flatMap(d => d.items) : []
  const doneCount   = Object.values(checked).filter(Boolean).length
  const pct         = allItems.length > 0 ? Math.round(doneCount/allItems.length*100) : 0
  const accent      = scholarship?.color || '#a78bfa'

  function toggle(key) { setChecked(c => ({ ...c, [key]: !c[key] })) }

  function reset() { setChecked({}) }

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
    <div style={DARK.page}>
      {/* Hero */}
      <div style={DARK.hero}>
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, background:'radial-gradient(circle,rgba(139,92,246,.2) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, background:'radial-gradient(circle,rgba(168,85,247,.12) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:760, position:'relative', zIndex:1 }}>
          <Link to="/tools" style={{ color:'rgba(167,139,250,.6)', textDecoration:'none', fontSize:13, display:'inline-flex', alignItems:'center', gap:6, marginBottom:20 }}>← Free Tools</Link>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(139,92,246,.15)', border:'1px solid rgba(139,92,246,.4)', borderRadius:50, padding:'5px 16px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#c4b5fd', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — No Signup</span>
          </div>
          <h1 style={{ fontSize:'clamp(26px,5vw,46px)', fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:12 }}>
            Document Checklist Generator
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.5)', lineHeight:1.7, maxWidth:520 }}>
            Select any scholarship and get a complete, tick-able document checklist — so you never miss a single required paper.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:760, padding:'0 16px 56px' }}>
        {/* Scholarship picker */}
        <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(139,92,246,.2)', borderRadius:20, padding:'22px', marginTop:24, boxShadow:'0 20px 60px rgba(139,92,246,.12)', marginBottom:16 }}>
          <div style={{ ...DARK.label, marginBottom:14 }}>Select your target scholarship</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,200px),1fr))', gap:10 }}>
            {SCHOLARSHIPS.map(s => {
              const isOn = selected === s.id
              return (
                <button key={s.id} onClick={() => { setSelected(s.id); reset() }}
                  style={{ padding:'14px 12px', borderRadius:14, border:'1.5px solid',
                    borderColor: isOn ? s.color : 'rgba(139,92,246,.2)',
                    background: isOn ? `${s.color}18` : 'rgba(255,255,255,.03)',
                    cursor:'pointer', textAlign:'left', transition:'all .15s',
                    boxShadow: isOn ? `0 0 20px ${s.color}30` : 'none' }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
                  <div style={{ fontSize:12, fontWeight:700, color: isOn ? '#fff' : 'rgba(255,255,255,.75)', lineHeight:1.3, marginBottom:4 }}>{s.name.split(' (')[0]}</div>
                  <div style={{ fontSize:10, color: isOn ? s.color : 'rgba(255,255,255,.35)', fontWeight:600 }}>Deadline: {s.deadline}</div>
                </button>
              )
            })}
          </div>
        </div>

        {scholarship && (
          <>
            {/* Progress bar */}
            <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(139,92,246,.2)', borderRadius:14, padding:'14px 18px', marginBottom:14, display:'flex', alignItems:'center', gap:14 }}>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:12, fontWeight:700 }}>
                  <span style={{ color:'rgba(255,255,255,.6)' }}>Documents collected</span>
                  <span style={{ color: pct===100 ? '#34d399' : accent }}>{doneCount} / {allItems.length}</span>
                </div>
                <div style={{ height:8, background:'rgba(255,255,255,.1)', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${pct}%`, background:`linear-gradient(90deg,${accent},${accent}cc)`, borderRadius:4, transition:'width .4s', boxShadow:`0 0 8px ${accent}60` }} />
                </div>
              </div>
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                <button onClick={copyList}
                  style={{ padding:'8px 14px', background: copied?'#34d399':'linear-gradient(135deg,#7c3aed,#a855f7)', color:'#fff', border:'none', borderRadius:9, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit', transition:'all .2s' }}>
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
                <button onClick={reset}
                  style={{ padding:'8px 12px', background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.12)', color:'rgba(255,255,255,.6)', borderRadius:9, fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>
                  Reset
                </button>
              </div>
            </div>

            {/* Document sections */}
            {scholarship.docs.map((doc, di) => (
              <div key={doc.cat} style={{ ...DARK.card, marginBottom:10 }}>
                <div style={{ background:'rgba(255,255,255,.04)', padding:'11px 18px', borderBottom:'1px solid rgba(255,255,255,.06)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div style={{ fontSize:12, fontWeight:800, color:'rgba(255,255,255,.85)' }}>{doc.cat}</div>
                  <div style={{ fontSize:10, color: accent }}>
                    {doc.items.filter((_,i) => checked[`${di}-${i}`]).length}/{doc.items.length}
                  </div>
                </div>
                <div style={{ padding:'6px 10px 10px' }}>
                  {doc.items.map((item, ii) => {
                    const key=`${di}-${ii}`; const done=checked[key]
                    return (
                      <div key={item} onClick={() => toggle(key)}
                        style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'9px 8px', borderRadius:9, cursor:'pointer', transition:'background .1s', background:done?`${accent}12`:'transparent' }}>
                        <div style={{ width:18, height:18, borderRadius:5, border:`1.5px solid ${done?accent:'rgba(255,255,255,.2)'}`, background:done?accent:'transparent', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1, transition:'all .15s' }}>
                          {done && <span style={{ color:'#fff', fontSize:11, fontWeight:900, lineHeight:1 }}>✓</span>}
                        </div>
                        <span style={{ fontSize:12, color:done?'rgba(255,255,255,.5)':'rgba(255,255,255,.75)', textDecoration:done?'line-through':'none', lineHeight:1.55 }}>{item}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}

            {pct===100 && (
              <div style={{ background:'linear-gradient(135deg,rgba(52,211,153,.12),rgba(52,211,153,.06))', border:'1.5px solid #34d39950', borderRadius:18, padding:'28px', textAlign:'center', marginTop:8 }}>
                <div style={{ fontSize:48, marginBottom:10 }}>🎉</div>
                <div style={{ fontSize:20, fontWeight:900, color:'#34d399', marginBottom:8 }}>Documents ready! Time to apply.</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:20 }}>Want help writing your SOP and submitting the application?</div>
                <a href={`https://wa.me/8801889700879?text=${encodeURIComponent('Hi! My documents for '+scholarship.name+' are ready. Can ScholarPath BD help me apply?')}`}
                  target="_blank" rel="noreferrer"
                  style={{ display:'inline-block', padding:'12px 28px', background:'linear-gradient(135deg,#059669,#34d399)', color:'#fff', borderRadius:12, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                  💬 Get Help Applying on WhatsApp →
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
