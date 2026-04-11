import { useState } from 'react'
import { Link } from 'react-router-dom'

const CHECKS = [
  { id:'wordcount', label:'Word count (500–1000 words)', check: t => { const w=t.trim().split(/\s+/).length; return { pass: w>=500&&w<=1000, detail:`${w} words`} } },
  { id:'nofirstperson', label:'Strong opening (not "My name is..." or "I am applying...")', check: t => { const bad=/^(my name is|i am applying|i am writing|i want to apply)/i.test(t.trim()); return { pass:!bad, detail: bad?'Weak opening detected — start with a story or key insight':'Opening looks strong' } } },
  { id:'motivation', label:'Explains why this scholarship/country', check: t => { const has=/\b(because|reason|motivated|inspire|passion|goal|future|career|contribute|bangladesh)\b/i.test(t); return { pass:has, detail: has?'Motivation mentioned':'No clear motivation found — add why you chose this scholarship' } } },
  { id:'academic', label:'Mentions academic background', check: t => { const has=/\b(degree|university|cgpa|gpa|graduate|bachelor|master|study|academic|research|thesis)\b/i.test(t); return { pass:has, detail: has?'Academic background mentioned':'No academic mention — add your degree and achievements' } } },
  { id:'career', label:'Clear career / return plan', check: t => { const has=/\b(career|return|bangladesh|contribute|future|plan|after|graduate|job|profession|society|community)\b/i.test(t); return { pass:has, detail: has?'Career/return plan found':'No return plan — most scholarships require explaining how you\'ll contribute after graduating' } } },
  { id:'specific', label:'Mentions the specific scholarship name', check: t => { const has=/\b(daad|chevening|mext|fulbright|gks|australia awards|erasmus|stipendium|scholarship)\b/i.test(t); return { pass:has, detail: has?'Scholarship specifically named':'Generic — mention the scholarship by name to personalize' } } },
  { id:'noai', label:'Personal & specific (not generic/AI)', check: t => { const generic=(t.match(/\b(furthermore|moreover|additionally|in conclusion|it is worth noting|needless to say|in light of|aforementioned)\b/ig)||[]).length; return { pass:generic<=2, detail: generic<=2?'Reads naturally':'Too many generic phrases ('+generic+') — SOP may be AI-generated, personalize more' } } },
  { id:'paragraphs', label:'Has multiple paragraphs (structured)', check: t => { const p=t.trim().split(/\n{2,}|\r\n{2,}/).filter(p=>p.trim().length>0).length; return { pass:p>=3, detail: p>=3?`${p} paragraphs found`:`Only ${p} paragraph(s) — structure your SOP in 4-5 clear paragraphs` } } },
]

export default function SOPAnalyzer() {
  const [text, setText] = useState('')
  const [analyzed, setAnalyzed] = useState(false)

  const results = CHECKS.map(c => ({ ...c, ...c.check(text) }))
  const score = analyzed ? Math.round(results.filter(r=>r.pass).length / results.length * 100) : 0
  const passed = results.filter(r=>r.pass).length
  const wc = text.trim() ? text.trim().split(/\s+/).length : 0

  const scoreColor = score>=80?'#22c55e':score>=60?'#f59e0b':'#ef4444'
  const scoreLabel = score>=80?'Strong SOP':score>=60?'Needs improvement':'Weak — needs major work'

  return (
    <div style={{ background:'#f7f9fc', minHeight:'100vh' }}>
      <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', padding:'48px 16px 56px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.08, backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'26px 26px' }} />
        <div style={{ position:'absolute', top:-40, right:-40, width:300, height:300, background:'radial-gradient(circle,rgba(59,130,246,.12) 0%,transparent 65%)', borderRadius:'50%' }} />
        <div className="container" style={{ maxWidth:760, position:'relative', zIndex:1 }}>
          <Link to="/tools" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none', fontSize:13, display:'block', marginBottom:16 }}>← Free Tools</Link>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(59,130,246,.15)', border:'1px solid rgba(59,130,246,.3)', borderRadius:50, padding:'5px 14px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#60a5fa', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — No Signup</span>
          </div>
          <h1 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:12 }}>SOP Strength Analyzer</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.6)', lineHeight:1.7 }}>
            Paste your Statement of Purpose — get an instant score with specific feedback on 8 key criteria used by scholarship committees.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:760, padding:'0 16px 48px' }}>
        <div style={{ background:'#fff', borderRadius:20, border:'1px solid #e2e8f0', padding:'24px', marginTop:-28, boxShadow:'0 8px 32px rgba(0,0,0,.08)', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <label style={{ fontSize:12, fontWeight:700, color:'#475569', textTransform:'uppercase', letterSpacing:'.07em' }}>Paste your SOP / Personal Statement</label>
            <span style={{ fontSize:12, color: wc>1000?'#ef4444':wc>=500?'#22c55e':'#94a3b8', fontWeight:700 }}>{wc} words {wc>1000?'(too long)':wc>=500?'(good length)':'(too short)'}</span>
          </div>
          <textarea
            value={text} onChange={e => { setText(e.target.value); setAnalyzed(false) }}
            placeholder="Paste your full SOP here... (minimum 200 words for best analysis)"
            rows={12}
            style={{ width:'100%', padding:'14px', border:'1.5px solid #e2e8f0', borderRadius:12, fontSize:13, outline:'none', fontFamily:'inherit', lineHeight:1.7, resize:'vertical' }}
            onFocus={e => e.target.style.borderColor='#0f2444'}
            onBlur={e => e.target.style.borderColor='#e2e8f0'}
          />
          <button
            onClick={() => { if(text.trim().length>100) setAnalyzed(true) }}
            disabled={text.trim().length<100}
            style={{ width:'100%', marginTop:12, padding:'13px', background:text.trim().length>=100?'#0f2444':'#94a3b8', color:'#fff', border:'none', borderRadius:11, fontSize:14, fontWeight:800, cursor:text.trim().length>=100?'pointer':'not-allowed', fontFamily:'inherit' }}>
            ✍️ Analyze My SOP →
          </button>
        </div>

        {analyzed && (
          <div>
            {/* Score */}
            <div style={{ background:'#fff', borderRadius:18, border:'1px solid #e2e8f0', padding:'24px', marginBottom:14, display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
              <div style={{ width:100, height:100, borderRadius:'50%', border:`6px solid ${scoreColor}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <div style={{ fontSize:30, fontWeight:900, color:scoreColor, lineHeight:1 }}>{score}%</div>
                <div style={{ fontSize:9, fontWeight:700, color:'#94a3b8' }}>SCORE</div>
              </div>
              <div>
                <div style={{ fontSize:20, fontWeight:900, color:'#0f172a', marginBottom:4 }}>{scoreLabel}</div>
                <div style={{ fontSize:13, color:'#64748b' }}>{passed} of {results.length} criteria passed</div>
                {score < 80 && <div style={{ fontSize:12, color:'#ef4444', marginTop:6 }}>⚠️ Scholarship committees review thousands of SOPs — yours needs to score 80%+ to be competitive</div>}
              </div>
            </div>

            {/* Criteria breakdown */}
            <div style={{ background:'#fff', borderRadius:16, border:'1px solid #e2e8f0', overflow:'hidden', marginBottom:14 }}>
              <div style={{ padding:'13px 18px', background:'#f8faff', borderBottom:'1px solid #e2e8f0', fontSize:13, fontWeight:700, color:'#0f172a' }}>Detailed feedback</div>
              {results.map(r => (
                <div key={r.id} style={{ padding:'13px 18px', borderBottom:'1px solid #f1f5f9', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:r.pass?'#22c55e':'#ef4444', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                    <span style={{ color:'#fff', fontSize:12, fontWeight:900 }}>{r.pass?'✓':'✕'}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'#0f172a', marginBottom:2 }}>{r.label}</div>
                    <div style={{ fontSize:12, color:r.pass?'#166534':'#dc2626' }}>{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {score < 80 && (
              <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', borderRadius:16, padding:'24px', textAlign:'center', marginBottom:14 }}>
                <div style={{ fontSize:16, fontWeight:800, color:'#fff', marginBottom:8 }}>Want a professional SOP written for you?</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.6)', marginBottom:18, maxWidth:420, margin:'0 auto 18px' }}>Our academic writers craft SOPs that consistently score 90%+ with scholarship committees — and get accepted.</div>
                <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                  <Link to="/services" style={{ padding:'11px 22px', background:'#22c55e', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>View SOP Writing Service →</Link>
                  <a href="https://wa.me/8801889700879?text=Hi! I used the SOP analyzer and my score is low. Can ScholarPath BD write my SOP?" target="_blank" rel="noreferrer"
                    style={{ padding:'11px 20px', background:'rgba(255,255,255,.1)', color:'#fff', border:'1px solid rgba(255,255,255,.2)', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
