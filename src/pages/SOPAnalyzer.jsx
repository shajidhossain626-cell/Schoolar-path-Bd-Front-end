import { useState } from 'react'
import { Link } from 'react-router-dom'

const CHECKS = [
  { id:'wordcount', label:'Word count (500–1000 words)',            check: t => { const w=t.trim().split(/\s+/).filter(Boolean).length; return { pass:w>=500&&w<=1000, detail:`${w} words — ${w<500?'too short, add more detail':w>1000?'too long, trim it down':'good length ✓'}` } } },
  { id:'opening',   label:'Strong opening (not "My name is...")',   check: t => { const bad=/^(my name is|i am applying|i am writing|i want to apply)/i.test(t.trim()); return { pass:!bad, detail:bad?'Weak opening — start with a story, insight, or achievement':'Opening looks strong ✓' } } },
  { id:'motivation',label:'Explains why this scholarship/country',  check: t => { const has=/\b(because|reason|motivated|inspire|passion|goal|future|career|contribute|bangladesh)\b/i.test(t); return { pass:has, detail:has?'Motivation mentioned ✓':'No clear motivation found — add why you chose this scholarship' } } },
  { id:'academic',  label:'Mentions academic background',           check: t => { const has=/\b(degree|university|cgpa|gpa|graduate|bachelor|master|study|academic|research|thesis)\b/i.test(t); return { pass:has, detail:has?'Academic background mentioned ✓':'No academic mention — add your degree and achievements' } } },
  { id:'career',    label:'Clear career / return plan',             check: t => { const has=/\b(career|return|bangladesh|contribute|future|plan|after|graduate|job|profession|society|community)\b/i.test(t); return { pass:has, detail:has?'Career/return plan found ✓':'No return plan — scholarships require explaining how you\'ll contribute after graduating' } } },
  { id:'specific',  label:'Mentions the scholarship by name',       check: t => { const has=/\b(daad|chevening|mext|fulbright|gks|australia awards|erasmus|stipendium|scholarship)\b/i.test(t); return { pass:has, detail:has?'Scholarship specifically named ✓':'Generic — mention the scholarship name to personalize it' } } },
  { id:'noai',      label:'Personal & specific (not generic/AI)',   check: t => { const n=(t.match(/\b(furthermore|moreover|additionally|in conclusion|it is worth noting|needless to say|aforementioned)\b/ig)||[]).length; return { pass:n<=2, detail:n<=2?'Reads naturally ✓':'Too many generic phrases ('+n+') — SOP may read as AI-generated, personalize more' } } },
  { id:'structure', label:'Multiple paragraphs (well structured)',  check: t => { const p=t.trim().split(/\n{2,}/).filter(p=>p.trim().length>0).length; return { pass:p>=3, detail:p>=3?`${p} paragraphs found ✓`:`Only ${p} paragraph(s) — structure into 4-5 clear paragraphs` } } },
]

export default function SOPAnalyzer() {
  const [text, setText]     = useState('')
  const [analyzed, setAnal] = useState(false)

  const wc      = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0
  const results = CHECKS.map(c => ({ ...c, ...c.check(text) }))
  const passed  = results.filter(r=>r.pass).length
  const score   = analyzed ? Math.round(passed/results.length*100) : 0

  const scoreColor = score>=80?'#34d399':score>=60?'#fbbf24':'#f87171'
  const scoreLabel = score>=80?'Strong SOP ✅':score>=60?'Needs improvement ⚠️':'Weak — needs major work ❌'

  return (
    <div style={{ background:'#07020f', minHeight:'100vh', fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif' }}>
      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#0d0320 0%,#1a0533 40%,#0d0320 100%)', padding:'48px 16px 64px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, background:'radial-gradient(circle,rgba(99,102,241,.2) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, background:'radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:760, position:'relative', zIndex:1 }}>
          <Link to="/tools" style={{ color:'rgba(167,139,250,.6)', textDecoration:'none', fontSize:13, display:'inline-flex', alignItems:'center', gap:6, marginBottom:20 }}>← Free Tools</Link>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(99,102,241,.15)', border:'1px solid rgba(99,102,241,.4)', borderRadius:50, padding:'5px 16px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#a5b4fc', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — No Signup</span>
          </div>
          <h1 style={{ fontSize:'clamp(26px,5vw,46px)', fontWeight:900, color:'#fff', lineHeight:1.05, marginBottom:12 }}>SOP Strength Analyzer</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.5)', lineHeight:1.7, maxWidth:520 }}>
            Paste your Statement of Purpose — get an instant score on 8 key criteria used by scholarship committees, with specific feedback.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:760, padding:'0 16px 56px' }}>
        {/* Textarea card */}
        <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(99,102,241,.25)', borderRadius:20, padding:'22px', marginTop:-32, boxShadow:'0 20px 60px rgba(99,102,241,.12)', marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:10, fontWeight:800, color:'rgba(165,180,252,.6)', textTransform:'uppercase', letterSpacing:'.1em' }}>Paste your SOP / Personal Statement</span>
            <span style={{ fontSize:11, fontWeight:700, color: wc>1000?'#f87171':wc>=500?'#34d399':'rgba(255,255,255,.4)' }}>
              {wc} words {wc>1000?'(too long)':wc>=500?'(good)':'(too short)'}
            </span>
          </div>
          <textarea
            value={text}
            onChange={e => { setText(e.target.value); setAnal(false) }}
            placeholder="Paste your full SOP here... (minimum 200 words for best analysis)"
            rows={12}
            style={{ width:'100%', padding:'14px', background:'rgba(255,255,255,.05)', border:'1.5px solid rgba(99,102,241,.3)', borderRadius:12, fontSize:13, outline:'none', fontFamily:'inherit', lineHeight:1.75, resize:'vertical', color:'rgba(255,255,255,.85)', boxSizing:'border-box' }}
            onFocus={e => e.target.style.borderColor='#818cf8'}
            onBlur={e => e.target.style.borderColor='rgba(99,102,241,.3)'}
          />
          <button
            onClick={() => { if (text.trim().length>100) setAnal(true) }}
            disabled={text.trim().length<100}
            style={{ width:'100%', marginTop:12, padding:'14px', background: text.trim().length>=100?'linear-gradient(135deg,#6366f1,#8b5cf6)':'rgba(255,255,255,.1)', color:'#fff', border:'none', borderRadius:12, fontSize:14, fontWeight:800, cursor:text.trim().length>=100?'pointer':'not-allowed', fontFamily:'inherit', opacity:text.trim().length<100?.5:1 }}>
            ✍️ Analyze My SOP →
          </button>
        </div>

        {analyzed && (
          <>
            {/* Score */}
            <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(99,102,241,.25)', borderRadius:18, padding:'24px', marginBottom:14, display:'flex', alignItems:'center', gap:24, flexWrap:'wrap' }}>
              <div style={{ width:96, height:96, borderRadius:'50%', border:`5px solid ${scoreColor}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 0 24px ${scoreColor}40` }}>
                <div style={{ fontSize:28, fontWeight:900, color:scoreColor, lineHeight:1 }}>{score}%</div>
                <div style={{ fontSize:8, fontWeight:700, color:'rgba(255,255,255,.4)' }}>SCORE</div>
              </div>
              <div>
                <div style={{ fontSize:20, fontWeight:900, color:'#fff', marginBottom:4 }}>{scoreLabel}</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.45)' }}>{passed} of {results.length} criteria passed</div>
                {score < 80 && <div style={{ fontSize:12, color:'#f87171', marginTop:6 }}>⚠️ Score 80%+ to be competitive with scholarship committees</div>}
              </div>
            </div>

            {/* Criteria */}
            <div style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(99,102,241,.2)', borderRadius:16, overflow:'hidden', marginBottom:14 }}>
              <div style={{ padding:'12px 18px', background:'rgba(255,255,255,.04)', borderBottom:'1px solid rgba(255,255,255,.06)', fontSize:11, fontWeight:800, color:'rgba(165,180,252,.6)', textTransform:'uppercase', letterSpacing:'.1em' }}>
                Detailed Feedback
              </div>
              {results.map(r => (
                <div key={r.id} style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,.04)', display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:22, height:22, borderRadius:'50%', background:r.pass?'#059669':'#dc2626', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:1 }}>
                    <span style={{ color:'#fff', fontSize:11, fontWeight:900 }}>{r.pass?'✓':'✕'}</span>
                  </div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,.85)', marginBottom:3 }}>{r.label}</div>
                    <div style={{ fontSize:11, color:r.pass?'#34d399':'#f87171' }}>{r.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {score < 80 && (
              <div style={{ background:'linear-gradient(135deg,#1a0533,#2d0d5e)', border:'1px solid rgba(139,92,246,.3)', borderRadius:18, padding:'24px', textAlign:'center' }}>
                <div style={{ fontSize:16, fontWeight:800, color:'#fff', marginBottom:8 }}>Want a professional SOP written for you?</div>
                <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:20, maxWidth:420, margin:'0 auto 20px' }}>Our academic writers craft SOPs that score 90%+ — tailored to your scholarship and profile.</div>
                <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                  <Link to="/services" style={{ padding:'11px 24px', background:'linear-gradient(135deg,#7c3aed,#a855f7)', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>View SOP Writing Service →</Link>
                  <a href="https://wa.me/8801889700879?text=Hi! I used the SOP analyzer and my score is low. Can you help write my SOP?" target="_blank" rel="noreferrer"
                    style={{ padding:'11px 20px', background:'rgba(255,255,255,.08)', color:'#fff', border:'1px solid rgba(255,255,255,.15)', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700 }}>
                    💬 WhatsApp Us
                  </a>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
