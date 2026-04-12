import { useState } from 'react'
import { Link } from 'react-router-dom'

const SCHOLARSHIPS = [
  {
    name: 'DAAD Research Scholarship',
    country: 'Germany 🇩🇪',
    amount: '€934/month',
    funding: 'Full',
    degree: ['masters', 'phd'],
    minCGPA: 3.0,
    minIELTS: 6.5,
    minAge: 0, maxAge: 35,
    workExp: true,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine'],
    deadline: 'Oct 15, 2026',
    link: '/scholarships/1',
    tips: 'Need a clear research plan and contact with a German professor',
  },
  {
    name: 'Chevening Scholarship',
    country: 'United Kingdom 🇬🇧',
    amount: 'Full + £1,393/mo',
    funding: 'Full',
    degree: ['masters'],
    minCGPA: 3.0,
    minIELTS: 6.5,
    minAge: 0, maxAge: 60,
    workExp: true,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine', 'law'],
    deadline: 'Nov 5, 2026',
    link: '/scholarships/2',
    tips: 'Leadership experience is essential — more important than grades',
  },
  {
    name: 'MEXT Government Scholarship',
    country: 'Japan 🇯🇵',
    amount: '¥143,000/month',
    funding: 'Full',
    degree: ['bachelors', 'masters', 'phd'],
    minCGPA: 2.7,
    minIELTS: 0,
    minAge: 0, maxAge: 35,
    workExp: false,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine'],
    deadline: 'Apr 15, 2026',
    link: '/scholarships/3',
    tips: 'No IELTS required for some programs — MEXT accepts Japanese language tests',
  },
  {
    name: 'Fulbright Foreign Student Program',
    country: 'United States 🇺🇸',
    amount: 'Full + Stipend',
    funding: 'Full',
    degree: ['masters', 'phd'],
    minCGPA: 3.2,
    minIELTS: 7.0,
    minAge: 0, maxAge: 60,
    workExp: false,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine', 'law'],
    deadline: 'Apr 10, 2026',
    link: '/scholarships/4',
    tips: 'Your statement of purpose and community impact story are the most important factors',
  },
  {
    name: 'GKS Graduate Scholarship',
    country: 'South Korea 🇰🇷',
    amount: '₩900,000/month',
    funding: 'Full',
    degree: ['masters', 'phd'],
    minCGPA: 2.64,
    minIELTS: 5.5,
    minAge: 0, maxAge: 40,
    workExp: false,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine'],
    deadline: 'Feb 28, 2026',
    link: '/scholarships/5',
    tips: 'Apply through the embassy route for a higher chance of selection',
  },
  {
    name: 'CSC Chinese Government Scholarship',
    country: 'China 🇨🇳',
    amount: '¥3,000/month',
    funding: 'Full',
    degree: ['bachelors', 'masters', 'phd'],
    minCGPA: 2.5,
    minIELTS: 6.0,
    minAge: 0, maxAge: 45,
    workExp: false,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine'],
    deadline: 'Apr 30, 2026',
    link: '/scholarships/6',
    tips: 'One of the most accessible full scholarships — many programs available in English',
  },
  {
    name: 'Australia Awards Scholarship',
    country: 'Australia 🇦🇺',
    amount: 'Full + AUD 26k/yr',
    funding: 'Full',
    degree: ['bachelors', 'masters'],
    minCGPA: 2.8,
    minIELTS: 6.5,
    minAge: 18, maxAge: 60,
    workExp: true,
    fields: ['social', 'business', 'science', 'medicine', 'engineering'],
    deadline: 'Apr 30, 2026',
    link: '/scholarships/8',
    tips: 'Development focus required — explain how your study will benefit Bangladesh',
  },
  {
    name: 'Erasmus Mundus Joint Masters',
    country: 'Europe 🇪🇺',
    amount: '€1,400/month',
    funding: 'Full',
    degree: ['masters'],
    minCGPA: 3.0,
    minIELTS: 6.5,
    minAge: 0, maxAge: 60,
    workExp: false,
    fields: ['engineering', 'science', 'arts', 'social', 'business'],
    deadline: 'Mar 1, 2026',
    link: '/scholarships',
    tips: 'Study in multiple EU countries — apply to 3 different programs to maximize chances',
  },
  {
    name: 'Stipendium Hungaricum',
    country: 'Hungary 🇭🇺',
    amount: 'Full + Stipend',
    funding: 'Full',
    degree: ['bachelors', 'masters', 'phd'],
    minCGPA: 2.5,
    minIELTS: 5.5,
    minAge: 0, maxAge: 45,
    workExp: false,
    fields: ['engineering', 'science', 'arts', 'social', 'business', 'medicine'],
    deadline: 'Jan 15, 2027',
    link: '/scholarships',
    tips: 'High acceptance rate compared to other European scholarships — strong option for lower CGPAs',
  },
  {
    name: 'Swedish Institute Scholarship',
    country: 'Sweden 🇸🇪',
    amount: 'Full + SEK 12,000/mo',
    funding: 'Full',
    degree: ['masters'],
    minCGPA: 3.0,
    minIELTS: 6.5,
    minAge: 0, maxAge: 60,
    workExp: true,
    fields: ['engineering', 'social', 'business', 'science', 'medicine'],
    deadline: 'Feb 25, 2026',
    link: '/scholarships',
    tips: 'Requires 3,000+ hours of work experience and clear leadership examples',
  },
  {
    name: 'VLIR-UOS Scholarship (Belgium)',
    country: 'Belgium 🇧🇪',
    amount: '€1,150/month',
    funding: 'Full',
    degree: ['masters'],
    minCGPA: 2.7,
    minIELTS: 6.0,
    minAge: 0, maxAge: 40,
    workExp: false,
    fields: ['social', 'science', 'medicine', 'engineering', 'business'],
    deadline: 'Feb 28, 2026',
    link: '/scholarships',
    tips: 'Development-related fields get higher priority — public health, agriculture, environment',
  },
  {
    name: 'Vanier Canada Graduate Scholarship',
    country: 'Canada 🇨🇦',
    amount: 'CAD $50,000/yr',
    funding: 'Full',
    degree: ['phd'],
    minCGPA: 3.7,
    minIELTS: 7.0,
    minAge: 0, maxAge: 60,
    workExp: false,
    fields: ['engineering', 'science', 'medicine', 'social', 'arts'],
    deadline: 'Nov 1, 2026',
    link: '/scholarships/7',
    tips: 'Requires nomination from a Canadian university — contact professors first',
  },
]

const FIELDS = [
  { value: 'engineering', label: 'Engineering & Technology' },
  { value: 'science',     label: 'Natural Sciences & Math' },
  { value: 'medicine',    label: 'Medicine & Health' },
  { value: 'business',    label: 'Business & Economics' },
  { value: 'social',      label: 'Social Sciences & Law' },
  { value: 'arts',        label: 'Arts & Humanities' },
]

const DEGREES = [
  { value: 'bachelors', label: "Bachelor's" },
  { value: 'masters',   label: "Master's" },
  { value: 'phd',       label: 'PhD' },
]

function scoreScholarship(s, form) {
  let score = 0
  let reasons = []
  let misses = []

  // Degree match
  if (!s.degree.includes(form.degree)) {
    misses.push('Degree level not eligible')
  } else {
    score += 30
    reasons.push('Degree level matches ✓')
  }

  // CGPA
  const cgpa = parseFloat(form.cgpa)
  if (cgpa >= s.minCGPA) {
    score += 25
    reasons.push('CGPA meets requirement ✓')
  } else {
    misses.push(`Minimum CGPA ${s.minCGPA} required (you have ${cgpa.toFixed(2)})`)
  }

  // IELTS
  const ielts = parseFloat(form.ielts)
  if (s.minIELTS === 0 || ielts >= s.minIELTS) {
    score += 20
    reasons.push('English proficiency meets requirement ✓')
  } else {
    misses.push(`IELTS ${s.minIELTS} required (you have ${ielts})`)
  }

  // Field
  if (s.fields.includes(form.field)) {
    score += 15
    reasons.push('Your field of study is eligible ✓')
  } else {
    misses.push('Your field may not be prioritized')
  }

  // Age
  const age = parseInt(form.age)
  if (age >= s.minAge && (s.maxAge === 0 || age <= s.maxAge)) {
    score += 5
    reasons.push('Age requirement met ✓')
  } else {
    misses.push(`Age limit is ${s.maxAge}`)
  }

  // Work exp bonus
  if (s.workExp && form.workExp) {
    score += 5
    reasons.push('Work experience is a plus ✓')
  } else if (s.workExp && !form.workExp) {
    misses.push('Work experience is preferred for this scholarship')
  }

  // Publications / research bonus (extra credit — boosts score)
  const pubs = parseInt(form.publications) || 0
  if (pubs >= 3) {
    score += 8
    reasons.push(`${pubs} publications — strong research profile ✓`)
  } else if (pubs >= 1) {
    score += 4
    reasons.push(`${pubs} publication(s) — adds value to application ✓`)
  }
  if (form.researchExp) {
    score += 4
    reasons.push('Research lab / thesis experience ✓')
  }

  return { score: Math.min(score, 100), reasons, misses }
}

export default function ScholarshipChecker() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ degree:'masters', cgpa:'', ielts:'', age:'', field:'engineering', workExp:false, publications:0, researchExp:false })
  const [results, setResults] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [lead, setLead] = useState({ name:'', phone:'', submitted:false })

  function update(k, v) { setForm(f => ({ ...f, [k]: v })) }

  function checkEligibility() {
    const scored = SCHOLARSHIPS.map(s => ({
      ...s,
      ...scoreScholarship(s, form)
    })).sort((a, b) => b.score - a.score)
    setResults(scored)
    setStep(2)
    setShowAll(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function submitLead(e) {
    e.preventDefault()
    setLead(l => ({ ...l, submitted: true }))
  }

  const qualified   = results ? results.filter(r => r.score >= 70) : []
  const possible    = results ? results.filter(r => r.score >= 40 && r.score < 70) : []
  const displayed   = showAll ? results : results?.slice(0, 5)

  const inputStyle = {
    width:'100%', padding:'12px 16px',
    border:'1.5px solid #e2e8f0', borderRadius:10,
    fontSize:14, outline:'none', fontFamily:'inherit',
    background:'#fff', transition:'border .2s'
  }
  const labelStyle = {
    display:'block', fontSize:12, fontWeight:700,
    color:'#475569', marginBottom:6, textTransform:'uppercase', letterSpacing:'.06em'
  }

  return (
    <div className="min-h-screen" style={{ background:'#f7f9fc' }}>

      {/* Header */}
      <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', padding:'40px 16px 48px' }}>
        <div className="container" style={{ maxWidth:680 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
            <div style={{ width:3, height:24, background:'#22c55e', borderRadius:3 }} />
            <span style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.1em' }}>
              Free Tool — ScholarPath BD
            </span>
          </div>
          <h1 style={{ fontSize:'clamp(24px,4vw,40px)', fontWeight:900, color:'#fff', marginBottom:10, lineHeight:1.1 }}>
            Scholarship Eligibility Checker
          </h1>
          <p style={{ fontSize:14, color:'rgba(255,255,255,.6)', lineHeight:1.7, maxWidth:500 }}>
            Enter your academic profile and instantly see which international scholarships you qualify for — with match score and personalized tips.
          </p>
          {/* Steps */}
          <div style={{ display:'flex', alignItems:'center', gap:0, marginTop:24 }}>
            {['Your Profile', 'Your Results'].map((s, i) => (
              <div key={s} style={{ display:'flex', alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{
                    width:28, height:28, borderRadius:'50%',
                    background: step > i ? '#22c55e' : step === i+1 ? '#fff' : 'rgba(255,255,255,.15)',
                    color: step === i+1 ? '#0f2444' : '#fff',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:12, fontWeight:800, flexShrink:0
                  }}>
                    {step > i+1 ? '✓' : i+1}
                  </div>
                  <span style={{ fontSize:12, fontWeight:700, color: step === i+1 ? '#fff' : 'rgba(255,255,255,.45)' }}>{s}</span>
                </div>
                {i < 1 && <div style={{ width:40, height:2, background:'rgba(255,255,255,.15)', margin:'0 10px' }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth:680, padding:'0 16px 48px' }}>

        {/* ── STEP 1: FORM ── */}
        {step === 1 && (
          <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:'32px', marginTop:-24, boxShadow:'0 8px 40px rgba(0,0,0,.08)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>

              <div style={{ gridColumn:'1/-1' }}>
                <label style={labelStyle}>Degree you want to pursue</label>
                <div style={{ display:'flex', gap:8 }}>
                  {DEGREES.map(d => (
                    <button key={d.value} onClick={() => update('degree', d.value)}
                      style={{
                        flex:1, padding:'10px 8px', borderRadius:10, border:'1.5px solid',
                        borderColor: form.degree===d.value ? '#0f2444' : '#e2e8f0',
                        background: form.degree===d.value ? '#0f2444' : '#fff',
                        color: form.degree===d.value ? '#fff' : '#475569',
                        fontWeight:700, fontSize:13, cursor:'pointer', transition:'all .15s'
                      }}>{d.label}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>CGPA (out of 4.0) *</label>
                <input
                  type="number" min="0" max="4" step="0.01"
                  placeholder="e.g. 3.2"
                  value={form.cgpa}
                  onChange={e => update('cgpa', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor='#0f2444'}
                  onBlur={e => e.target.style.borderColor='#e2e8f0'}
                />
                <div style={{ fontSize:11, color:'#94a3b8', marginTop:4 }}>Enter your current CGPA on 4.0 scale</div>
              </div>

              <div>
                <label style={labelStyle}>IELTS Score *</label>
                <input
                  type="number" min="0" max="9" step="0.5"
                  placeholder="e.g. 6.5"
                  value={form.ielts}
                  onChange={e => update('ielts', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor='#0f2444'}
                  onBlur={e => e.target.style.borderColor='#e2e8f0'}
                />
                <div style={{ fontSize:11, color:'#94a3b8', marginTop:4 }}>Enter 0 if not taken yet</div>
              </div>

              <div>
                <label style={labelStyle}>Your Age *</label>
                <input
                  type="number" min="18" max="60"
                  placeholder="e.g. 24"
                  value={form.age}
                  onChange={e => update('age', e.target.value)}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor='#0f2444'}
                  onBlur={e => e.target.style.borderColor='#e2e8f0'}
                />
              </div>

              <div>
                <label style={labelStyle}>Field of Study *</label>
                <select value={form.field} onChange={e => update('field', e.target.value)}
                  style={{ ...inputStyle, cursor:'pointer' }}>
                  {FIELDS.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>

              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ ...labelStyle, textTransform:'none', fontSize:13, display:'flex', alignItems:'center', gap:10, cursor:'pointer', userSelect:'none' }}>
                  <input type="checkbox" checked={form.workExp} onChange={e => update('workExp', e.target.checked)}
                    style={{ width:18, height:18, accentColor:'#0f2444', cursor:'pointer' }} />
                  <span style={{ textTransform:'none', letterSpacing:'normal', fontWeight:600, color:'#0f172a' }}>
                    I have work experience (any job, internship, or volunteer work)
                  </span>
                </label>
              </div>

              {/* Publications & Research Section */}
              <div style={{ gridColumn:'1/-1', background:'linear-gradient(135deg,#f0f9ff,#eff6ff)', border:'1.5px solid #bfdbfe', borderRadius:14, padding:'18px 20px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
                  <span style={{ fontSize:18 }}>📚</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:800, color:'#1e40af' }}>Publications & Research (Bonus Points)</div>
                    <div style={{ fontSize:11, color:'#3b82f6', marginTop:1 }}>These significantly boost your profile for PhD and Research scholarships</div>
                  </div>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ ...labelStyle, color:'#1e40af' }}>
                      {form.degree === 'bachelors' ? 'Conference papers / presentations' : 'Published papers / articles'}
                    </label>
                    <select value={form.publications} onChange={e => update('publications', e.target.value)}
                      style={{ ...inputStyle, background:'#fff', border:'1.5px solid #bfdbfe' }}>
                      <option value={0}>0 — None yet</option>
                      <option value={1}>1 publication</option>
                      <option value={2}>2 publications</option>
                      <option value={3}>3 publications</option>
                      <option value={5}>4–5 publications</option>
                      <option value={8}>6+ publications</option>
                    </select>
                    <div style={{ fontSize:10, color:'#60a5fa', marginTop:4 }}>
                      {form.degree === 'phd' ? 'Journals, conference papers, book chapters count' : form.degree === 'masters' ? 'Journal articles and conference papers count' : 'Conference presentations and workshop papers count'}
                    </div>
                  </div>
                  <div>
                    <label style={{ ...labelStyle, color:'#1e40af' }}>Research experience</label>
                    <label style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer', padding:'12px 14px', background:'#fff', borderRadius:10, border:'1.5px solid', borderColor:form.researchExp?'#3b82f6':'#bfdbfe', transition:'all .15s' }}>
                      <input type="checkbox" checked={form.researchExp} onChange={e => update('researchExp', e.target.checked)}
                        style={{ width:17, height:17, accentColor:'#1e40af', cursor:'pointer', marginTop:1, flexShrink:0 }} />
                      <span style={{ fontSize:12, fontWeight:600, color:'#1e40af', lineHeight:1.4 }}>
                        I have research lab / thesis / RA experience
                      </span>
                    </label>
                    <div style={{ fontSize:10, color:'#60a5fa', marginTop:4 }}>Lab work, thesis writing, or research assistant roles</div>
                  </div>
                </div>
              </div>

            </div>

            <button
              onClick={checkEligibility}
              disabled={!form.cgpa || !form.ielts || !form.age}
              style={{
                width:'100%', marginTop:24, padding:'14px',
                background: (!form.cgpa || !form.ielts || !form.age) ? '#94a3b8' : '#0f2444',
                color:'#fff', border:'none', borderRadius:12,
                fontSize:15, fontWeight:800, cursor: (!form.cgpa || !form.ielts || !form.age) ? 'not-allowed' : 'pointer',
                transition:'background .2s', fontFamily:'inherit'
              }}
            >
              🎯 Check My Eligibility →
            </button>
            <div style={{ textAlign:'center', marginTop:10, fontSize:12, color:'#94a3b8' }}>
              100% free · No signup required · Instant results
            </div>
          </div>
        )}

        {/* ── STEP 2: RESULTS ── */}
        {step === 2 && results && (
          <div style={{ marginTop:-24 }}>

            {/* Summary card */}
            <div style={{
              background:'#fff', borderRadius:20, border:'1px solid #e2e8f0',
              padding:'24px 28px', marginBottom:16,
              boxShadow:'0 8px 40px rgba(0,0,0,.08)',
              display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16
            }}>
              <div>
                <div style={{ fontSize:13, color:'#64748b', marginBottom:4 }}>Scholarships you qualify for</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
                  <span style={{ fontSize:48, fontWeight:900, color:'#22c55e', lineHeight:1 }}>{qualified.length}</span>
                  <span style={{ fontSize:16, color:'#94a3b8' }}>of {results.length} checked</span>
                </div>
                <div style={{ fontSize:12, color:'#64748b', marginTop:4 }}>
                  {possible.length} more possible with slight profile improvements
                </div>
              </div>
              <button onClick={() => setStep(1)}
                style={{ padding:'10px 20px', background:'#f1f5f9', border:'1px solid #e2e8f0', borderRadius:10, fontSize:13, fontWeight:700, cursor:'pointer', color:'#475569', fontFamily:'inherit' }}>
                ← Edit Profile
              </button>
            </div>

            {/* Results list */}
            <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
              {displayed.map((r, i) => (
                <div key={r.name} style={{
                  background:'#fff', borderRadius:16, border:'1px solid',
                  borderColor: r.score >= 70 ? '#bbf7d0' : r.score >= 40 ? '#fde68a' : '#fecaca',
                  padding:'20px', overflow:'hidden',
                  boxShadow: r.score >= 70 ? '0 4px 16px rgba(34,197,94,.1)' : 'none'
                }}>
                  {/* Top row */}
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12, marginBottom:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
                        <span style={{
                          fontSize:10, fontWeight:800, padding:'3px 10px', borderRadius:20,
                          background: r.score>=70?'#dcfce7':r.score>=40?'#fef9c3':'#fee2e2',
                          color: r.score>=70?'#166534':r.score>=40?'#92400e':'#991b1b'
                        }}>
                          {r.score >= 70 ? '✅ YOU QUALIFY' : r.score >= 40 ? '⚠️ POSSIBLE' : '❌ NOT ELIGIBLE'}
                        </span>
                        <span style={{ fontSize:11, color:'#94a3b8' }}>{r.country}</span>
                      </div>
                      <div style={{ fontSize:15, fontWeight:800, color:'#0f172a' }}>{r.name}</div>
                      <div style={{ fontSize:13, color:'#22c55e', fontWeight:700, marginTop:2 }}>{r.amount} · {r.funding} Funding</div>
                    </div>
                    {/* Score circle */}
                    <div style={{ textAlign:'center', flexShrink:0 }}>
                      <div style={{
                        width:56, height:56, borderRadius:'50%',
                        background: r.score>=70?'#dcfce7':r.score>=40?'#fef9c3':'#fee2e2',
                        border:`3px solid ${r.score>=70?'#22c55e':r.score>=40?'#f59e0b':'#ef4444'}`,
                        display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'
                      }}>
                        <div style={{ fontSize:16, fontWeight:900, color:r.score>=70?'#166534':r.score>=40?'#92400e':'#991b1b', lineHeight:1 }}>{r.score}%</div>
                        <div style={{ fontSize:8, color:'#94a3b8', fontWeight:600 }}>MATCH</div>
                      </div>
                    </div>
                  </div>

                  {/* Reasons + misses */}
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
                    {r.reasons.length > 0 && (
                      <div>
                        <div style={{ fontSize:10, fontWeight:800, color:'#166534', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:5 }}>✓ You meet</div>
                        {r.reasons.map(x => <div key={x} style={{ fontSize:11, color:'#166534', marginBottom:2 }}>• {x}</div>)}
                      </div>
                    )}
                    {r.misses.length > 0 && (
                      <div>
                        <div style={{ fontSize:10, fontWeight:800, color:'#dc2626', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:5 }}>✗ Issues</div>
                        {r.misses.map(x => <div key={x} style={{ fontSize:11, color:'#dc2626', marginBottom:2 }}>• {x}</div>)}
                      </div>
                    )}
                  </div>

                  {/* Tip */}
                  <div style={{ background:'#f0f9ff', border:'1px solid #bae6fd', borderRadius:9, padding:'8px 12px', marginBottom:12, fontSize:12 }}>
                    <span style={{ fontWeight:700, color:'#0369a1' }}>💡 Tip: </span>
                    <span style={{ color:'#0369a1' }}>{r.tips}</span>
                  </div>

                  <div style={{ display:'flex', gap:8 }}>
                    <Link to={r.link}
                      style={{ flex:1, padding:'9px', background:'#0f2444', color:'#fff', borderRadius:9, textDecoration:'none', fontSize:12, fontWeight:700, textAlign:'center' }}>
                      View Scholarship →
                    </Link>
                    <a
                      href={`https://wa.me/8801889700879?text=${encodeURIComponent('Hi! I used the eligibility checker and scored '+r.score+'% for '+r.name+'. Can you help me apply?')}`}
                      target="_blank" rel="noreferrer"
                      style={{ flex:1, padding:'9px', background:'#22c55e', color:'#fff', borderRadius:9, textDecoration:'none', fontSize:12, fontWeight:700, textAlign:'center' }}>
                      💬 Get Help Applying
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {results.length > 5 && !showAll && (
              <button onClick={() => setShowAll(true)}
                style={{ width:'100%', padding:'12px', background:'#fff', border:'1.5px solid #e2e8f0', borderRadius:12, fontSize:13, fontWeight:700, cursor:'pointer', color:'#475569', fontFamily:'inherit', marginBottom:16 }}>
                Show all {results.length} scholarships →
              </button>
            )}

            {/* Lead capture */}
            {!lead.submitted ? (
              <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', borderRadius:20, padding:'28px', marginTop:8 }}>
                <div style={{ fontSize:18, fontWeight:900, color:'#fff', marginBottom:6 }}>
                  Want a FREE personalized scholarship plan?
                </div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.6)', marginBottom:20, lineHeight:1.6 }}>
                  Our counselors will review your profile and tell you exactly which {qualified.length > 0 ? qualified.length : 'scholarships'} to apply for first — with step-by-step guidance. Completely free consultation.
                </div>
                <form onSubmit={submitLead} style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <input required placeholder="Your full name" value={lead.name}
                    onChange={e => setLead(l => ({ ...l, name: e.target.value }))}
                    style={{ ...inputStyle, border:'none' }} />
                  <input required placeholder="WhatsApp number (e.g. 01XXXXXXXXX)" value={lead.phone}
                    onChange={e => setLead(l => ({ ...l, phone: e.target.value }))}
                    style={{ ...inputStyle, border:'none' }} />
                  <button type="submit" style={{ padding:'13px', background:'#22c55e', color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>
                    🎯 Get My Free Scholarship Plan
                  </button>
                </form>
              </div>
            ) : (
              <div style={{ background:'#f0fdf4', border:'2px solid #22c55e', borderRadius:20, padding:'28px', textAlign:'center' }}>
                <div style={{ fontSize:40, marginBottom:10 }}>🎉</div>
                <div style={{ fontSize:20, fontWeight:900, color:'#166534', marginBottom:6 }}>We will contact you within 24 hours!</div>
                <div style={{ fontSize:14, color:'#166534', marginBottom:16 }}>
                  Our counselor will call you on WhatsApp to discuss your {qualified.length} eligible scholarships.
                </div>
                <a href={`https://wa.me/8801889700879?text=${encodeURIComponent('Hi! My name is '+lead.name+'. I used the scholarship eligibility checker and got '+qualified.length+' matches. I want a free consultation.')}`}
                  target="_blank" rel="noreferrer"
                  style={{ display:'inline-block', padding:'12px 24px', background:'#22c55e', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:800 }}>
                  💬 Message Us Now on WhatsApp
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
