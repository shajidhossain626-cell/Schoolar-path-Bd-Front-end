import { useState } from 'react'
import { Link } from 'react-router-dom'

const SCALES = [
  { from:'cgpa4',  label:'CGPA (4.0 scale)',  placeholder:'e.g. 3.50', min:0, max:4 },
  { from:'cgpa5',  label:'CGPA (5.0 scale)',  placeholder:'e.g. 4.20', min:0, max:5 },
  { from:'cgpa10', label:'CGPA (10.0 scale)', placeholder:'e.g. 8.50', min:0, max:10 },
  { from:'pct',    label:'Percentage (%)',    placeholder:'e.g. 85.5',  min:0, max:100 },
]

function toAll(val, from) {
  let pct = 0
  if (from === 'cgpa4')  pct = (val / 4) * 100
  else if (from === 'cgpa5')  pct = (val / 5) * 100
  else if (from === 'cgpa10') pct = (val / 10) * 100
  else pct = val

  pct = Math.min(100, Math.max(0, pct))
  const cgpa4  = (pct / 100) * 4
  const cgpa5  = (pct / 100) * 5
  const cgpa10 = (pct / 100) * 10

  let ukClass = '', ukColor = ''
  if (pct >= 70)      { ukClass = '1st Class (Distinction)'; ukColor = '#166534' }
  else if (pct >= 60) { ukClass = '2:1 Upper Second Class'; ukColor = '#1d4ed8' }
  else if (pct >= 50) { ukClass = '2:2 Lower Second Class'; ukColor = '#92400e' }
  else if (pct >= 40) { ukClass = '3rd Class (Pass)'; ukColor = '#dc2626' }
  else                { ukClass = 'Below Pass'; ukColor = '#dc2626' }

  let usGrade = ''
  if (cgpa4 >= 3.7) usGrade = 'A (Excellent)'
  else if (cgpa4 >= 3.3) usGrade = 'A− (Very Good)'
  else if (cgpa4 >= 3.0) usGrade = 'B+ (Good)'
  else if (cgpa4 >= 2.7) usGrade = 'B (Satisfactory)'
  else if (cgpa4 >= 2.0) usGrade = 'C (Average)'
  else usGrade = 'Below Average'

  const cgpa10Note = cgpa10 >= 8.0 ? '10-scale: Excellent — eligible for IIT scholarships, ICCR India' : cgpa10 >= 7.0 ? '10-scale: Good — meets most South Asian scholarship requirements' : '10-scale: Check minimum requirements for your target scholarship'
  const scholarshipNote =
    cgpa4 >= 3.5 ? '🟢 Excellent — eligible for most competitive scholarships (DAAD, Chevening, Fulbright)'
    : cgpa4 >= 3.0 ? '🟡 Good — eligible for most scholarships. Strengthen with IELTS & work experience'
    : cgpa4 >= 2.64 ? '🟠 Meets minimum — eligible for GKS Korea, CSC China, Stipendium Hungaricum'
    : '🔴 Below common minimums — focus on improving other profile components'

  return { pct: pct.toFixed(2), cgpa4: cgpa4.toFixed(2), cgpa5: cgpa5.toFixed(2), cgpa10: cgpa10.toFixed(2), ukClass, ukColor, usGrade, scholarshipNote }
}

export default function CGPAConverter() {
  const [input, setInput] = useState('')
  const [from, setFrom] = useState('cgpa4')
  const result = input && !isNaN(parseFloat(input)) ? toAll(parseFloat(input), from) : null

  return (
    <div style={{ background:'#f7f9fc', minHeight:'100vh' }}>
      <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', padding:'48px 16px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.08, backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'26px 26px' }} />
        <div className="container" style={{ maxWidth:640, position:'relative', zIndex:1 }}>
          <Link to="/tools" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none', fontSize:13, display:'block', marginBottom:16 }}>← Free Tools</Link>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(34,197,94,.15)', border:'1px solid rgba(34,197,94,.3)', borderRadius:50, padding:'5px 14px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#22c55e', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — Instant</span>
          </div>
          <h1 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:12 }}>CGPA / GPA Converter</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.6)', lineHeight:1.7 }}>
            Convert your CGPA to 4.0 GPA, percentage, UK classification, and check scholarship eligibility instantly.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:640, padding:'0 16px 48px' }}>
        <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:'28px', marginTop:-28, boxShadow:'0 8px 32px rgba(0,0,0,.08)', marginBottom:16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>I have a</label>
              <select value={from} onChange={e => setFrom(e.target.value)}
                style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:14, outline:'none', background:'#fff', cursor:'pointer', fontFamily:'inherit' }}>
                {SCALES.map(s => <option key={s.from} value={s.from}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'.07em', marginBottom:6 }}>My value</label>
              <input
                type="number" step="0.01"
                placeholder={SCALES.find(s=>s.from===from)?.placeholder}
                value={input} onChange={e => setInput(e.target.value)}
                style={{ width:'100%', padding:'12px 14px', border:'1.5px solid #e2e8f0', borderRadius:10, fontSize:14, outline:'none', fontFamily:'inherit' }}
                onFocus={e => e.target.style.borderColor='#0f2444'}
                onBlur={e => e.target.style.borderColor='#e2e8f0'}
              />
            </div>
          </div>
        </div>

        {result && (
          <div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:12, marginBottom:14 }}>
              {[
                { label:'CGPA (4.0 scale)',  value:result.cgpa4,          sub:'USA, Canada, Europe, most scholarships', color:'#3b82f6' },
                { label:'CGPA (5.0 scale)',  value:result.cgpa5,          sub:'Many Bangladeshi universities',          color:'#8b5cf6' },
                { label:'CGPA (10.0 scale)', value:result.cgpa10,         sub:'India, South Asia, some EU programs',   color:'#14b8a6' },
                { label:'Percentage (%)',    value:`${result.pct}%`,      sub:'Universal — accepted everywhere',       color:'#f97316' },
              ].map(c => (
                <div key={c.label} style={{ background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', padding:'18px 14px', textAlign:'center' }}>
                  <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>{c.label}</div>
                  <div style={{ fontSize:28, fontWeight:900, color:c.color, lineHeight:1 }}>{c.value}</div>
                  <div style={{ fontSize:10, color:'#94a3b8', marginTop:6 }}>{c.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:14 }}>
              <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', padding:'18px' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>🇬🇧 UK Classification</div>
                <div style={{ fontSize:16, fontWeight:800, color:result.ukColor }}>{result.ukClass}</div>
                <div style={{ fontSize:11, color:'#94a3b8', marginTop:4 }}>Chevening requires 2:1 minimum</div>
              </div>
              <div style={{ background:'#fff', borderRadius:14, border:'1px solid #e2e8f0', padding:'18px' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:8 }}>🇺🇸 US Grade</div>
                <div style={{ fontSize:16, fontWeight:800, color:'#0f172a' }}>{result.usGrade}</div>
                <div style={{ fontSize:11, color:'#94a3b8', marginTop:4 }}>Fulbright requires 3.0+ GPA</div>
              </div>
            </div>

            <div style={{ background:result.cgpa4>=3.0?'#f0fdf4':result.cgpa4>=2.64?'#fefce8':'#fef2f2', border:`1px solid ${result.cgpa4>=3.0?'#bbf7d0':result.cgpa4>=2.64?'#fde68a':'#fecaca'}`, borderRadius:14, padding:'16px 18px', marginBottom:16 }}>
              <div style={{ fontSize:11, fontWeight:800, color:'#475569', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:6 }}>Scholarship Eligibility</div>
              <div style={{ fontSize:13, color:'#374151', lineHeight:1.65 }}>{result.scholarshipNote}</div>
            </div>

            <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', borderRadius:16, padding:'22px', textAlign:'center' }}>
              <div style={{ fontSize:15, fontWeight:800, color:'#fff', marginBottom:6 }}>Want to know which scholarships match your full profile?</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.6)', marginBottom:16 }}>Check CGPA, IELTS, age, and field together in one tool</div>
              <Link to="/tools/eligibility-checker" style={{ display:'inline-block', padding:'11px 22px', background:'#22c55e', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                🎯 Use Eligibility Checker →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
