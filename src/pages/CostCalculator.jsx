import { useState } from 'react'
import { Link } from 'react-router-dom'

const COUNTRIES_DATA = [
  { name:'Germany 🇩🇪', id:'de', currency:'EUR', rate:117, costs:{ rent:[400,700], food:[200,300], transport:[80,90], utilities:[80,120], internet:[20,30], misc:[100,150] }, note:'No tuition at public universities. Health insurance ~€110/month required.' },
  { name:'United Kingdom 🇬🇧', id:'uk', currency:'GBP', rate:135, costs:{ rent:[700,1200], food:[200,300], transport:[80,150], utilities:[100,150], internet:[25,35], misc:[100,200] }, note:'London is very expensive. Other UK cities like Leeds, Manchester or Glasgow are 30-40% cheaper.' },
  { name:'Canada 🇨🇦', id:'ca', currency:'CAD', rate:79, costs:{ rent:[800,1400], food:[300,450], transport:[100,150], utilities:[100,150], internet:[60,80], misc:[150,250] }, note:'Ontario (Toronto) and BC (Vancouver) are most expensive. Tuition: CAD 15,000–30,000/year.' },
  { name:'Australia 🇦🇺', id:'au', currency:'AUD', rate:70, costs:{ rent:[900,1600], food:[300,500], transport:[100,150], utilities:[100,200], internet:[60,80], misc:[150,250] }, note:'Sydney and Melbourne are expensive. Adelaide or Canberra are cheaper options.' },
  { name:'Japan 🇯🇵', id:'jp', currency:'JPY', rate:0.72, costs:{ rent:[40000,80000], food:[20000,30000], transport:[10000,15000], utilities:[10000,15000], internet:[3000,5000], misc:[10000,20000] }, note:'Costs in JPY. Tokyo is expensive. Other cities like Osaka or Nagoya are 20% cheaper.' },
  { name:'South Korea 🇰🇷', id:'kr', currency:'KRW', rate:0.079, costs:{ rent:[300000,700000], food:[200000,350000], transport:[50000,80000], utilities:[80000,120000], internet:[30000,50000], misc:[100000,200000] }, note:'Costs in KRW. Seoul is expensive; other cities like Busan or Daegu are cheaper.' },
  { name:'Sweden 🇸🇪', id:'se', currency:'SEK', rate:10.2, costs:{ rent:[5000,9000], food:[2000,3500], transport:[700,900], utilities:[500,800], internet:[200,300], misc:[1000,1500] }, note:'Costs in SEK. Stockholm is expensive. Other Swedish cities are 20-30% cheaper.' },
  { name:'Netherlands 🇳🇱', id:'nl', currency:'EUR', rate:117, costs:{ rent:[600,1100], food:[250,350], transport:[90,120], utilities:[100,150], internet:[25,40], misc:[100,200] }, note:'Amsterdam is very expensive. Eindhoven, Groningen, Wageningen are much cheaper.' },
  { name:'France 🇫🇷', id:'fr', currency:'EUR', rate:117, costs:{ rent:[600,1200], food:[250,400], transport:[70,100], utilities:[80,130], internet:[20,30], misc:[100,200] }, note:'Paris is expensive. Lyon, Toulouse, Bordeaux are 30-40% more affordable.' },
  { name:'Hungary 🇭🇺', id:'hu', currency:'EUR', rate:117, costs:{ rent:[300,550], food:[150,250], transport:[30,50], utilities:[60,100], internet:[15,25], misc:[80,150] }, note:'One of the most affordable EU countries for students. Stipendium Hungaricum covers most costs.' },
  { name:'China 🇨🇳', id:'cn', currency:'CNY', rate:14.8, costs:{ rent:[1500,4000], food:[800,1500], transport:[200,400], utilities:[200,400], internet:[50,100], misc:[300,600] }, note:'Costs in CNY. CSC scholarship covers tuition, accommodation, and monthly stipend.' },
  { name:'Malaysia 🇲🇾', id:'my', currency:'MYR', rate:24, costs:{ rent:[600,1200], food:[300,500], transport:[100,200], utilities:[100,200], internet:[80,120], misc:[200,400] }, note:'Costs in MYR. Kuala Lumpur is the most expensive; other cities are 20-30% cheaper.' },
]

const COST_LABELS = { rent:'Rent', food:'Food & Groceries', transport:'Transport', utilities:'Utilities', internet:'Internet', misc:'Personal & Misc' }

export default function CostCalculator() {
  const [country, setCountry] = useState('')
  const [lifestyle, setLifestyle] = useState('mid')

  const c = COUNTRIES_DATA.find(x => x.id === country)
  const idx = lifestyle === 'budget' ? 0 : 1

  const monthly = c ? Object.entries(c.costs).reduce((sum,[,v]) => sum + v[idx], 0) : 0
  const monthlyBDT = c ? Math.round(monthly * c.rate) : 0
  const yearlyBDT = monthlyBDT * 12

  return (
    <div style={{ background:'#07020f', minHeight:'100vh' }}>
      <div style={{ background:'linear-gradient(135deg,#0f2444,#1a3a6b)', background:'linear-gradient(135deg,#0d0320 0%,#1a0533 40%,#0d0320 100%)', padding:'48px 16px 40px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:.08, backgroundImage:'radial-gradient(circle,#fff 1px,transparent 1px)', backgroundSize:'26px 26px' }} />
        <div style={{ position:'absolute', top:-40, right:-40, width:300, height:300, background:'radial-gradient(circle,rgba(251,146,60,.12) 0%,transparent 65%)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, background:'radial-gradient(circle,rgba(251,146,60,.2) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, background:'radial-gradient(circle,rgba(139,92,246,.15) 0%,transparent 65%)', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="container" style={{ maxWidth:700, position:'relative', zIndex:1 }}>
          <Link to="/tools" style={{ color:'rgba(255,255,255,.5)', textDecoration:'none', fontSize:13, display:'block', marginBottom:16 }}>← Free Tools</Link>
          <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(251,146,60,.15)', border:'1px solid rgba(251,146,60,.3)', borderRadius:50, padding:'5px 14px', marginBottom:18 }}>
            <span style={{ fontSize:11, fontWeight:800, color:'#fb923c', letterSpacing:'.08em', textTransform:'uppercase' }}>Free Tool — Instant</span>
          </div>
          <h1 style={{ fontSize:'clamp(26px,5vw,42px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:12 }}>Study Abroad Cost Calculator</h1>
          <p style={{ fontSize:15, color:'rgba(255,255,255,.6)', lineHeight:1.7 }}>
            Choose a country — see your estimated monthly living costs in BDT. Know how much you actually need before you apply.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth:700, padding:'0 16px 48px' }}>
        <div style={{ background:'rgba(255,255,255,.04)', borderRadius:20, border:'1px solid rgba(251,146,60,.25)', padding:'26px', marginTop:24, boxShadow:'0 20px 60px rgba(251,146,60,.1)', marginBottom:16 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:14, alignItems:'end' }}>
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:800, color:'rgba(251,146,60,.7)', textTransform:'uppercase', letterSpacing:'.09em', marginBottom:8 }}>Select country</label>
              <select value={country} onChange={e => setCountry(e.target.value)}
                style={{ width:'100%', padding:'12px 14px', border:'1.5px solid rgba(251,146,60,.3)', borderRadius:10, fontSize:14, outline:'none', background:'rgba(255,255,255,.06)', cursor:'pointer', fontFamily:'inherit', color:'#e2e8f0' }}>
                <option value="">— Choose a country —</option>
                {COUNTRIES_DATA.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display:'block', fontSize:10, fontWeight:800, color:'rgba(251,146,60,.7)', textTransform:'uppercase', letterSpacing:'.09em', marginBottom:8 }}>Lifestyle</label>
              <div style={{ display:'flex', gap:6 }}>
                {[{v:'budget',l:'Budget'},{ v:'mid',l:'Comfortable'}].map(opt => (
                  <button key={opt.v} onClick={() => setLifestyle(opt.v)}
                    style={{ padding:'11px 14px', borderRadius:10, border:'1.5px solid', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap',
                      borderColor: lifestyle===opt.v ? '#fb923c' : 'rgba(251,146,60,.25)',
                      background: lifestyle===opt.v ? 'rgba(251,146,60,.2)' : 'rgba(255,255,255,.04)',
                      color: lifestyle===opt.v ? '#fb923c' : 'rgba(255,255,255,.5)' }}>
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {c && (
          <div>
            {/* Big total */}
            <div style={{ background:'linear-gradient(135deg,rgba(251,146,60,.1),rgba(251,146,60,.06))', border:'1px solid rgba(251,146,60,.25)', borderRadius:18, padding:'28px', marginBottom:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Monthly (BDT)</div>
                <div style={{ fontSize:36, fontWeight:900, color:'#22c55e', lineHeight:1 }}>৳{monthlyBDT.toLocaleString()}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.4)', marginTop:4 }}>{monthly.toFixed(0)} {c.currency}/month</div>
              </div>
              <div style={{ textAlign:'center' }}>
                <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:6 }}>Yearly (BDT)</div>
                <div style={{ fontSize:36, fontWeight:900, color:'#fb923c', lineHeight:1 }}>৳{yearlyBDT.toLocaleString()}</div>
                <div style={{ fontSize:11, color:'rgba(255,255,255,.4)', marginTop:4 }}>Living costs only</div>
              </div>
            </div>

            {/* Breakdown */}
            <div style={{ background:'rgba(255,255,255,.04)', borderRadius:16, border:'1px solid rgba(251,146,60,.2)', overflow:'hidden', marginBottom:14 }}>
              <div style={{ padding:'13px 18px', background:'rgba(255,255,255,.04)', borderBottom:'1px solid rgba(255,255,255,.06)', fontSize:13, fontWeight:700, color:'#fff' }}>Monthly cost breakdown</div>
              {Object.entries(c.costs).map(([key, vals]) => {
                const amt = vals[idx]
                const amtBDT = Math.round(amt * c.rate)
                const pct = Math.round(amt / monthly * 100)
                return (
                  <div key={key} style={{ padding:'12px 18px', borderBottom:'1px solid rgba(255,255,255,.05)', display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5, fontSize:13 }}>
                        <span style={{ fontWeight:600, color:'rgba(255,255,255,.8)' }}>{COST_LABELS[key]}</span>
                        <span style={{ fontWeight:700, color:'#fff' }}>৳{amtBDT.toLocaleString()} <span style={{ color:'rgba(255,255,255,.35)', fontWeight:400 }}>({amt} {c.currency})</span></span>
                      </div>
                      <div style={{ height:6, background:'#f1f5f9', borderRadius:3, overflow:'hidden' }}>
                        <div style={{ height:'100%', width:`${pct}%`, background:'#3b82f6', borderRadius:3 }} />
                      </div>
                    </div>
                    <div style={{ fontSize:11, fontWeight:700, color:'rgba(255,255,255,.35)', minWidth:32, textAlign:'right' }}>{pct}%</div>
                  </div>
                )
              })}
            </div>

            <div style={{ background:'rgba(251,146,60,.08)', border:'1px solid rgba(251,146,60,.3)', borderRadius:14, padding:'14px 18px', marginBottom:14, fontSize:13, color:'#fb923c', lineHeight:1.65 }}>
              💡 <strong>Note:</strong> {c.note}
            </div>

            <div style={{ background:'linear-gradient(135deg,rgba(52,211,153,.1),rgba(52,211,153,.05))', border:'1px solid rgba(52,211,153,.3)', borderRadius:14, padding:'18px', textAlign:'center' }}>
              <div style={{ fontSize:15, fontWeight:800, color:'#34d399', marginBottom:6 }}>A full scholarship covers most or all of these costs</div>
              <div style={{ fontSize:12, color:'rgba(52,211,153,.7)', marginBottom:14 }}>Check which scholarships you qualify for with your current profile</div>
              <Link to="/tools/eligibility-checker"
                style={{ display:'inline-block', padding:'11px 22px', background:'#166534', color:'#fff', borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:800 }}>
                🎯 Check Scholarship Eligibility →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
