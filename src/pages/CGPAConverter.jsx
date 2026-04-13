import { useState } from 'react'
import { Link } from 'react-router-dom'

const SCALES = [
  { from:'cgpa4',  label:'CGPA (4.0 scale)',  max:4,   step:'0.01', placeholder:'e.g. 3.50' },
  { from:'cgpa5',  label:'CGPA (5.0 scale)',  max:5,   step:'0.01', placeholder:'e.g. 4.20' },
  { from:'cgpa10', label:'CGPA (10.0 scale)', max:10,  step:'0.01', placeholder:'e.g. 8.50' },
  { from:'pct',    label:'Percentage (%)',    max:100, step:'0.1',  placeholder:'e.g. 85.5'  },
]

function toAll(val, from) {
  let pct = 0
  if (from==='cgpa4')  pct = (val/4)*100
  else if (from==='cgpa5')  pct = (val/5)*100
  else if (from==='cgpa10') pct = (val/10)*100
  else pct = val
  pct = Math.min(100, Math.max(0, pct))
  const cgpa4  = (pct/100)*4
  const cgpa5  = (pct/100)*5
  const cgpa10 = (pct/100)*10
  let ukClass='', ukColor=''
  if (pct>=70)      { ukClass='1st Class (Distinction)'; ukColor='#a78bfa' }
  else if (pct>=60) { ukClass='2:1 Upper Second Class';  ukColor='#60a5fa' }
  else if (pct>=50) { ukClass='2:2 Lower Second Class';  ukColor='#fbbf24' }
  else if (pct>=40) { ukClass='3rd Class (Pass)';        ukColor='#f87171' }
  else              { ukClass='Below Pass';               ukColor='#f87171' }
  let usGrade = cgpa4>=3.7?'A (Excellent)':cgpa4>=3.3?'A− (Very Good)':cgpa4>=3.0?'B+ (Good)':cgpa4>=2.7?'B (Satisfactory)':cgpa4>=2.0?'C (Average)':'Below Average'
  const note = cgpa4>=3.5?'🟢 Excellent — eligible for most competitive scholarships (DAAD, Chevening, Fulbright)'
    :cgpa4>=3.0?'🟡 Good — eligible for most scholarships. Strengthen with IELTS & work experience'
    :cgpa4>=2.64?'🟠 Meets minimum — eligible for GKS Korea, CSC China, Stipendium Hungaricum'
    :'🔴 Below common minimums — focus on improving other profile components'
  return { pct:pct.toFixed(2), cgpa4:cgpa4.toFixed(2), cgpa5:cgpa5.toFixed(2), cgpa10:cgpa10.toFixed(2), ukClass, ukColor, usGrade, note }
}

const S = {
  page:   { background:'#07020f', minHeight:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' },
  hero:   { background:'linear-gradient(135deg,#0d0320 0%,#1a0533 40%,#0d0320 100%)', padding:'48px 16px 64px', position:'relative', overflow:'hidden' },
  card:   { background:'rgba(255,255,255,.04)', border:'1px solid rgba(139,92,246,.25)', borderRadius:20, padding:'24px', backdropFilter:'blur(12px)' },
  label:  { fontSize:10, fontWeight:800, color:'rgba(167,139,250,.7)', textTransform:'uppercase', letterSpacing:'.1em', marginBottom:6, display:'block' },
  input:  { width:'100%', padding:'13px 16px', background:'rgba(255,255,255,.06)', border:'1.5px solid rgba(139,92,246,.35)', borderRadius:12, fontSize:16, fontWeight:700, color:'#e2e8f0', outline:'none', fontFamily:'inherit', transition:'border .2s', boxSizing:'border-box' },
  btn:    { width:'100%', padding:'14px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'inherit', transition:'opacity .15s' },
}

export default function CGPAConverter() {
  const [from, setFrom]   = useState('cgpa4')
  const [raw, setRaw]     = useState('')

  const scale = SCALES.find(s => s.from===from)

  function handleChange(e) {
    let v = e.target.value
    // Allow only numbers and one decimal point
    v = v.replace(/[^0-9.]/g,'')
    const parts = v.split('.')
    if (parts.length > 2) v = parts[0]+'.'+parts.slice(1).join('')
    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) v = parts[0]+'.'+parts[1].slice(0,2)
    // Clamp to max
    if (v !== '' && v !== '.' && parseFloat(v) > scale.max) v = String(scale.max)
    setRaw(v)
  }

  const num = parseFloat(raw)
  const result = (raw && !isNaN(num) && num >= 0) ? toAll(num, from) : null

  const RESULT_CARDS = result ? [
    { label:'CGPA (4.0 Scale)',  value:result.cgpa4,  sub:'USA, Canada, Europe, most scholarships', color:'#a78bfa' },
    { label:'CGPA (5.0 Scale)',  value:result.cgpa5,  sub:'Many Bangladeshi universities',           color:'#60a5fa' },
    { label:'CGPA (10.0 Scale)', value:result.cgpa10, sub:'India, South Asia, some EU programs',    color:'#34d399' },
    { label:'Percentage (%)',    value:result.pct+'%',sub:'Universal — accepted everywhere',        color:'#fbbf24' },
  ] : []

  return (
    <div style={S.page}>
      {/* Hero */}
      <div style={S.hero}>
        {/* Orbs */}
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, background:'radial-gradient(circle,rgba(139,92,246,.25) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, background:'radial-gradient(circle,rgba(168,85,247,.15) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />

        <div className="container" style={{ maxWidth:640, position:'relative', zIndex:1 }}>
          <Link to="/tools" style={{ color:'rgba(167,139,250,.6)', textDecoration:'none', fontSize:13, display:'inline-flex', alignItems:'center', gap:6, marginBottom:20 }}>
            ← Free Tools
          </Link>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(139,92,246,.15)', border:'1px solid rgba(139,92,246,.4)', borderRadius:50, padding:'5px 16px', marginBottom:18 }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#a78bfa', animation:'glow 2s infinite' }} />
            <span style={{ fontSize:11, fontWeight:800, color:'#c4b5fd', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — Instant</span>
          </div>
          <h1 style={{ fontSize:'clamp(28px,6vw,48px)', fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:12, letterSpacing:'-.02em' }}>
            CGPA / GPA Converter
          </h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.5)', lineHeight:1.75, maxWidth:480 }}>
            Convert your CGPA to 4.0 GPA, percentage, UK classification — and check scholarship eligibility instantly.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:640, padding:'0 16px 56px' }}>
        {/* Input card */}
        <div style={{ ...S.card, marginTop:-32, marginBottom:16, boxShadow:'0 20px 60px rgba(139,92,246,.15)' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
            <div>
              <label style={S.label}>I have a</label>
              <select value={from} onChange={e => { setFrom(e.target.value); setRaw('') }}
                style={{ ...S.input, cursor:'pointer', fontSize:13 }}>
                {SCALES.map(s => <option key={s.from} value={s.from} style={{ background:'#1a0533' }}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={S.label}>My value (max: {scale.max})</label>
              <input
                type="text" inputMode="decimal"
                placeholder={scale.placeholder}
                value={raw}
                onChange={handleChange}
                style={S.input}
                onFocus={e => e.target.style.borderColor='#a78bfa'}
                onBlur={e => e.target.style.borderColor='rgba(139,92,246,.35)'}
              />
              {raw && num > scale.max && (
                <div style={{ fontSize:11, color:'#f87171', marginTop:4 }}>Max value for this scale is {scale.max}</div>
              )}
            </div>
          </div>
        </div>

        {result && (
          <>
            {/* 4 conversion cards */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10, marginBottom:12 }}>
              {RESULT_CARDS.map(rc => (
                <div key={rc.label} style={{ ...S.card, textAlign:'center', padding:'18px 12px' }}>
                  <div style={{ fontSize:9, fontWeight:800, color:'rgba(167,139,250,.6)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:8 }}>{rc.label}</div>
                  <div style={{ fontSize:'clamp(26px,6vw,36px)', fontWeight:900, color:rc.color, lineHeight:1, marginBottom:6 }}>{rc.value}</div>
                  <div style={{ fontSize:10, color:'rgba(255,255,255,.35)', lineHeight:1.4 }}>{rc.sub}</div>
                </div>
              ))}
            </div>

            {/* UK + US */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div style={S.card}>
                <div style={{ fontSize:10, fontWeight:800, color:'rgba(167,139,250,.5)', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:8 }}>🇬🇧 UK Classification</div>
                <div style={{ fontSize:16, fontWeight:800, color:result.ukColor, marginBottom:4 }}>{result.ukClass}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.35)' }}>Chevening requires 2:1 minimum</div>
              </div>
              <div style={S.card}>
                <div style={{ fontSize:10, fontWeight:800, color:'rgba(167,139,250,.5)', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:8 }}>🇺🇸 US Grade</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#e2e8f0', marginBottom:4 }}>{result.usGrade}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.35)' }}>Fulbright requires 3.0+ GPA</div>
              </div>
            </div>

            {/* Scholarship note */}
            <div style={{ ...S.card, background:'rgba(139,92,246,.08)', border:'1px solid rgba(139,92,246,.3)', marginBottom:14 }}>
              <div style={{ fontSize:10, fontWeight:800, color:'rgba(167,139,250,.6)', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:8 }}>Scholarship Eligibility</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.75)', lineHeight:1.65 }}>{result.note}</div>
            </div>

            {/* CTA */}
            <div style={{ background:'linear-gradient(135deg,#1a0533,#2d0d5e)', border:'1px solid rgba(139,92,246,.3)', borderRadius:18, padding:'24px', textAlign:'center' }}>
              <div style={{ fontSize:15, fontWeight:800, color:'#fff', marginBottom:6 }}>Want to know which scholarships match your full profile?</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginBottom:18 }}>Check CGPA, IELTS, age, and field together in one tool</div>
              <Link to="/tools/eligibility-checker" style={{ display:'inline-block', padding:'12px 24px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', color:'#fff', borderRadius:12, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                🎯 Use Eligibility Checker →
              </Link>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes glow{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  )
}
