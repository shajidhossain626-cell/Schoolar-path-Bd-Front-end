import { useState } from 'react'

const COUNTRIES = [
  {
    id: 'germany', name: 'Germany', flag: '🇩🇪', color: '#000000', accent: '#DD0000',
    light: '#fff8f8', desc: 'Free or low-cost tuition, world-class research universities',
    universities: [
      { name: 'Technical University of Munich', city: 'Munich', qs: 37, fields: ['Engineering', 'Computer Science', 'Natural Sciences'], link: 'https://www.tum.de', scholarship: 'DAAD, DeutschlandStipendium' },
      { name: 'Ludwig Maximilian University', city: 'Munich', qs: 59, fields: ['Medicine', 'Law', 'Humanities'], link: 'https://www.lmu.de', scholarship: 'DAAD' },
      { name: 'Heidelberg University', city: 'Heidelberg', qs: 87, fields: ['Medicine', 'Life Sciences', 'Social Sciences'], link: 'https://www.uni-heidelberg.de', scholarship: 'DAAD, Heidelberg Excellence' },
      { name: 'Humboldt University Berlin', city: 'Berlin', qs: 120, fields: ['Arts', 'Social Sciences', 'Natural Sciences'], link: 'https://www.hu-berlin.de', scholarship: 'DAAD' },
      { name: 'Free University Berlin', city: 'Berlin', qs: 98, fields: ['Political Science', 'Law', 'Biology'], link: 'https://www.fu-berlin.de', scholarship: 'DAAD, Erasmus' },
      { name: 'RWTH Aachen University', city: 'Aachen', qs: 106, fields: ['Engineering', 'Architecture', 'Business'], link: 'https://www.rwth-aachen.de', scholarship: 'DAAD EPOS' },
      { name: 'University of Hamburg', city: 'Hamburg', qs: 175, fields: ['Law', 'Business', 'Natural Sciences'], link: 'https://www.uni-hamburg.de', scholarship: 'DAAD' },
      { name: 'University of Bonn', city: 'Bonn', qs: 201, fields: ['Mathematics', 'Agriculture', 'Theology'], link: 'https://www.uni-bonn.de', scholarship: 'BIGS Development Economics' },
      { name: 'Karlsruhe Institute of Technology', city: 'Karlsruhe', qs: 119, fields: ['Engineering', 'Computer Science', 'Physics'], link: 'https://www.kit.edu', scholarship: 'DAAD' },
      { name: 'University of Freiburg', city: 'Freiburg', qs: 194, fields: ['Medicine', 'Environmental Sciences', 'Humanities'], link: 'https://www.uni-freiburg.de', scholarship: 'DAAD, Erasmus Mundus' },
      { name: 'TU Dresden', city: 'Dresden', qs: 298, fields: ['Engineering', 'Medicine', 'Natural Sciences'], link: 'https://www.tu-dresden.de', scholarship: 'DAAD, DeutschlandStipendium' },
      { name: 'University of Stuttgart', city: 'Stuttgart', qs: 318, fields: ['Aerospace', 'Engineering', 'Architecture'], link: 'https://www.uni-stuttgart.de', scholarship: 'DAAD' },
    ]
  },
  {
    id: 'uk', name: 'United Kingdom', flag: '🇬🇧', color: '#012169', accent: '#C8102E',
    light: '#f0f4ff', desc: 'Prestigious universities with strong alumni networks worldwide',
    universities: [
      { name: 'University of Oxford', city: 'Oxford', qs: 3, fields: ['All Disciplines', 'Medicine', 'Law'], link: 'https://www.ox.ac.uk', scholarship: 'Chevening, Rhodes' },
      { name: 'University of Cambridge', city: 'Cambridge', qs: 2, fields: ['All Disciplines', 'Engineering', 'Sciences'], link: 'https://www.cam.ac.uk', scholarship: 'Cambridge Trust, Gates' },
      { name: 'Imperial College London', city: 'London', qs: 8, fields: ['Engineering', 'Medicine', 'Business'], link: 'https://www.imperial.ac.uk', scholarship: 'President\'s PhD Scholarship' },
      { name: 'University College London', city: 'London', qs: 9, fields: ['Medicine', 'Architecture', 'Law'], link: 'https://www.ucl.ac.uk', scholarship: 'Chevening, Commonwealth' },
      { name: 'University of Edinburgh', city: 'Edinburgh', qs: 27, fields: ['Medicine', 'Veterinary', 'Arts'], link: 'https://www.ed.ac.uk', scholarship: 'Edinburgh Global, GREAT' },
      { name: 'University of Manchester', city: 'Manchester', qs: 32, fields: ['Business', 'Engineering', 'Social Sciences'], link: 'https://www.manchester.ac.uk', scholarship: 'GREAT, President\'s Award' },
      { name: 'King\'s College London', city: 'London', qs: 40, fields: ['Medicine', 'Law', 'Social Sciences'], link: 'https://www.kcl.ac.uk', scholarship: 'Chevening, Commonwealth' },
      { name: 'University of Glasgow', city: 'Glasgow', qs: 73, fields: ['Medicine', 'Engineering', 'Arts'], link: 'https://www.gla.ac.uk', scholarship: 'GREAT, Commonwealth' },
      { name: 'University of Birmingham', city: 'Birmingham', qs: 84, fields: ['Business', 'Engineering', 'Law'], link: 'https://www.birmingham.ac.uk', scholarship: 'Commonwealth, Chevening' },
      { name: 'University of Leeds', city: 'Leeds', qs: 86, fields: ['Business', 'Engineering', 'Arts'], link: 'https://www.leeds.ac.uk', scholarship: 'GREAT, Commonwealth' },
      { name: 'University of Southampton', city: 'Southampton', qs: 100, fields: ['Engineering', 'Ocean Sciences', 'Computer Science'], link: 'https://www.southampton.ac.uk', scholarship: 'Commonwealth' },
      { name: 'University of Warwick', city: 'Coventry', qs: 67, fields: ['Business', 'Engineering', 'Social Sciences'], link: 'https://www.warwick.ac.uk', scholarship: 'Chevening, Commonwealth' },
    ]
  },
  {
    id: 'usa', name: 'United States', flag: '🇺🇸', color: '#3C3B6E', accent: '#B22234',
    light: '#f0f0ff', desc: 'Top research universities with generous merit-based aid',
    universities: [
      { name: 'Massachusetts Institute of Technology', city: 'Cambridge, MA', qs: 1, fields: ['Engineering', 'Computer Science', 'Architecture'], link: 'https://www.mit.edu', scholarship: 'Fulbright, MIT Fellowship' },
      { name: 'Harvard University', city: 'Cambridge, MA', qs: 4, fields: ['Medicine', 'Law', 'Business'], link: 'https://www.harvard.edu', scholarship: 'Fulbright, Harvard Fellowship' },
      { name: 'Stanford University', city: 'Stanford, CA', qs: 6, fields: ['Engineering', 'Business', 'Medicine'], link: 'https://www.stanford.edu', scholarship: 'Fulbright, Knight-Hennessy' },
      { name: 'University of California Berkeley', city: 'Berkeley, CA', qs: 10, fields: ['Engineering', 'Law', 'Business'], link: 'https://www.berkeley.edu', scholarship: 'Fulbright, UC Berkeley Fellowship' },
      { name: 'Columbia University', city: 'New York, NY', qs: 12, fields: ['Journalism', 'Law', 'Business'], link: 'https://www.columbia.edu', scholarship: 'Fulbright' },
      { name: 'University of Chicago', city: 'Chicago, IL', qs: 21, fields: ['Economics', 'Law', 'Social Sciences'], link: 'https://www.uchicago.edu', scholarship: 'Fulbright, UChicago Fellowship' },
      { name: 'Johns Hopkins University', city: 'Baltimore, MD', qs: 25, fields: ['Medicine', 'Public Health', 'Engineering'], link: 'https://www.jhu.edu', scholarship: 'Fulbright' },
      { name: 'University of Michigan', city: 'Ann Arbor, MI', qs: 23, fields: ['Engineering', 'Business', 'Law'], link: 'https://umich.edu', scholarship: 'Fulbright, Rackham Fellowship' },
      { name: 'Cornell University', city: 'Ithaca, NY', qs: 13, fields: ['Agriculture', 'Engineering', 'Hotel Management'], link: 'https://www.cornell.edu', scholarship: 'Fulbright' },
      { name: 'University of Texas Austin', city: 'Austin, TX', qs: 67, fields: ['Engineering', 'Business', 'Law'], link: 'https://www.utexas.edu', scholarship: 'Fulbright, Humphrey' },
      { name: 'Arizona State University', city: 'Tempe, AZ', qs: 201, fields: ['Business', 'Engineering', 'Arts'], link: 'https://www.asu.edu', scholarship: 'ASU Graduate Fellowship' },
      { name: 'Purdue University', city: 'West Lafayette, IN', qs: 99, fields: ['Engineering', 'Agriculture', 'Computer Science'], link: 'https://www.purdue.edu', scholarship: 'Fulbright' },
    ]
  },
  {
    id: 'canada', name: 'Canada', flag: '🇨🇦', color: '#CC0000', accent: '#FF0000',
    light: '#fff5f5', desc: 'Post-study work permits, pathway to permanent residency',
    universities: [
      { name: 'University of Toronto', city: 'Toronto, ON', qs: 21, fields: ['Medicine', 'Engineering', 'Law'], link: 'https://www.utoronto.ca', scholarship: 'Vanier, Lester B. Pearson' },
      { name: 'University of British Columbia', city: 'Vancouver, BC', qs: 34, fields: ['Forestry', 'Medicine', 'Engineering'], link: 'https://www.ubc.ca', scholarship: 'Vanier, 4YF' },
      { name: 'McGill University', city: 'Montreal, QC', qs: 30, fields: ['Medicine', 'Law', 'Engineering'], link: 'https://www.mcgill.ca', scholarship: 'McGill Entrance Scholarship' },
      { name: 'University of Alberta', city: 'Edmonton, AB', qs: 111, fields: ['Engineering', 'Business', 'Agriculture'], link: 'https://www.ualberta.ca', scholarship: 'Alberta Graduate Excellence' },
      { name: 'University of Waterloo', city: 'Waterloo, ON', qs: 114, fields: ['Computer Science', 'Engineering', 'Mathematics'], link: 'https://uwaterloo.ca', scholarship: 'Vanier, Graduate Scholarship' },
      { name: 'Western University', city: 'London, ON', qs: 172, fields: ['Business', 'Medicine', 'Law'], link: 'https://www.uwo.ca', scholarship: 'Western Graduate Research' },
      { name: 'Queen\'s University', city: 'Kingston, ON', qs: 209, fields: ['Business', 'Law', 'Engineering'], link: 'https://www.queensu.ca', scholarship: 'Queen\'s Graduate Award' },
      { name: 'Simon Fraser University', city: 'Burnaby, BC', qs: 283, fields: ['Computing Science', 'Business', 'Social Sciences'], link: 'https://www.sfu.ca', scholarship: 'SFU Graduate Fellowship' },
      { name: 'Dalhousie University', city: 'Halifax, NS', qs: 298, fields: ['Medicine', 'Law', 'Engineering'], link: 'https://www.dal.ca', scholarship: 'Killam Fellowship' },
      { name: 'University of Ottawa', city: 'Ottawa, ON', qs: 237, fields: ['Law', 'Social Sciences', 'Medicine'], link: 'https://www.uottawa.ca', scholarship: 'Excellence Scholarship' },
    ]
  },
  {
    id: 'australia', name: 'Australia', flag: '🇦🇺', color: '#00008B', accent: '#FFCD00',
    light: '#f0f8ff', desc: 'Australia Awards scholarship, quality lifestyle, strong job market',
    universities: [
      { name: 'University of Melbourne', city: 'Melbourne, VIC', qs: 14, fields: ['Medicine', 'Law', 'Business'], link: 'https://www.unimelb.edu.au', scholarship: 'Australia Awards, Melbourne Research' },
      { name: 'University of Sydney', city: 'Sydney, NSW', qs: 18, fields: ['Medicine', 'Architecture', 'Business'], link: 'https://www.sydney.edu.au', scholarship: 'Australia Awards, Sydney Scholars' },
      { name: 'Australian National University', city: 'Canberra, ACT', qs: 34, fields: ['Policy', 'Sciences', 'Arts'], link: 'https://www.anu.edu.au', scholarship: 'Australia Awards, ANU PhD' },
      { name: 'University of Queensland', city: 'Brisbane, QLD', qs: 40, fields: ['Medicine', 'Engineering', 'Agriculture'], link: 'https://www.uq.edu.au', scholarship: 'Australia Awards, UQ Research' },
      { name: 'Monash University', city: 'Melbourne, VIC', qs: 42, fields: ['Business', 'Medicine', 'Engineering'], link: 'https://www.monash.edu', scholarship: 'Australia Awards, Monash Graduate' },
      { name: 'University of New South Wales', city: 'Sydney, NSW', qs: 19, fields: ['Engineering', 'Business', 'Law'], link: 'https://www.unsw.edu.au', scholarship: 'Australia Awards, UNSW Scientia' },
      { name: 'University of Western Australia', city: 'Perth, WA', qs: 72, fields: ['Medicine', 'Agriculture', 'Engineering'], link: 'https://www.uwa.edu.au', scholarship: 'Australia Awards' },
      { name: 'University of Adelaide', city: 'Adelaide, SA', qs: 109, fields: ['Engineering', 'Medicine', 'Agriculture'], link: 'https://www.adelaide.edu.au', scholarship: 'Australia Awards, Adelaide Scholarship' },
      { name: 'Macquarie University', city: 'Sydney, NSW', qs: 195, fields: ['Business', 'Law', 'Sciences'], link: 'https://www.mq.edu.au', scholarship: 'Australia Awards' },
      { name: 'University of Technology Sydney', city: 'Sydney, NSW', qs: 133, fields: ['Technology', 'Design', 'Business'], link: 'https://www.uts.edu.au', scholarship: 'UTS International Scholarship' },
    ]
  },
  {
    id: 'japan', name: 'Japan', flag: '🇯🇵', color: '#BC002D', accent: '#ffffff',
    light: '#fff5f7', desc: 'MEXT government scholarship, cutting-edge research, safe lifestyle',
    universities: [
      { name: 'University of Tokyo', city: 'Tokyo', qs: 28, fields: ['Engineering', 'Medicine', 'Law'], link: 'https://www.u-tokyo.ac.jp', scholarship: 'MEXT, UTokyo MERIT' },
      { name: 'Kyoto University', city: 'Kyoto', qs: 46, fields: ['Sciences', 'Medicine', 'Agriculture'], link: 'https://www.kyoto-u.ac.jp', scholarship: 'MEXT, Kyoto University Fellowship' },
      { name: 'Osaka University', city: 'Osaka', qs: 80, fields: ['Medicine', 'Engineering', 'Sciences'], link: 'https://www.osaka-u.ac.jp', scholarship: 'MEXT, OUSSEP' },
      { name: 'Tohoku University', city: 'Sendai', qs: 105, fields: ['Engineering', 'Sciences', 'Agriculture'], link: 'https://www.tohoku.ac.jp', scholarship: 'MEXT' },
      { name: 'Tokyo Institute of Technology', city: 'Tokyo', qs: 91, fields: ['Engineering', 'Computer Science', 'Sciences'], link: 'https://www.titech.ac.jp', scholarship: 'MEXT, TokyoTech Fellowship' },
      { name: 'Nagoya University', city: 'Nagoya', qs: 118, fields: ['Medicine', 'Engineering', 'Sciences'], link: 'https://www.nagoya-u.ac.jp', scholarship: 'MEXT' },
      { name: 'Kyushu University', city: 'Fukuoka', qs: 157, fields: ['Engineering', 'Medicine', 'Agriculture'], link: 'https://www.kyushu-u.ac.jp', scholarship: 'MEXT' },
      { name: 'Hokkaido University', city: 'Sapporo', qs: 187, fields: ['Agriculture', 'Medicine', 'Engineering'], link: 'https://www.hokudai.ac.jp', scholarship: 'MEXT' },
      { name: 'Keio University', city: 'Tokyo', qs: 198, fields: ['Business', 'Medicine', 'Law'], link: 'https://www.keio.ac.jp', scholarship: 'MEXT, Keio Scholarship' },
      { name: 'Waseda University', city: 'Tokyo', qs: 201, fields: ['Business', 'Engineering', 'Arts'], link: 'https://www.waseda.jp', scholarship: 'MEXT, Waseda Scholarship' },
    ]
  },
  {
    id: 'sweden', name: 'Sweden', flag: '🇸🇪', color: '#006AA7', accent: '#FECC02',
    light: '#f0f7ff', desc: 'Swedish Institute Scholarship, innovation-focused education',
    universities: [
      { name: 'Lund University', city: 'Lund', qs: 69, fields: ['Engineering', 'Medicine', 'Social Sciences'], link: 'https://www.lu.se', scholarship: 'SI Scholarship, Lund Global' },
      { name: 'KTH Royal Institute of Technology', city: 'Stockholm', qs: 89, fields: ['Engineering', 'Architecture', 'Computer Science'], link: 'https://www.kth.se', scholarship: 'SI Scholarship, KTH Scholarship' },
      { name: 'Uppsala University', city: 'Uppsala', qs: 97, fields: ['Medicine', 'Sciences', 'Humanities'], link: 'https://www.uu.se', scholarship: 'SI Scholarship' },
      { name: 'Stockholm University', city: 'Stockholm', qs: 165, fields: ['Social Sciences', 'Natural Sciences', 'Law'], link: 'https://www.su.se', scholarship: 'SI Scholarship, Stockholm Scholarship' },
      { name: 'Chalmers University of Technology', city: 'Gothenburg', qs: 183, fields: ['Engineering', 'Architecture', 'Computer Science'], link: 'https://www.chalmers.se', scholarship: 'SI Scholarship' },
      { name: 'Gothenburg University', city: 'Gothenburg', qs: 196, fields: ['Business', 'Social Sciences', 'Arts'], link: 'https://www.gu.se', scholarship: 'SI Scholarship' },
      { name: 'Karolinska Institutet', city: 'Stockholm', qs: 42, fields: ['Medicine', 'Health Sciences', 'Biomedical'], link: 'https://ki.se', scholarship: 'SI Scholarship, Karolinska Award' },
      { name: 'Linköping University', city: 'Linköping', qs: 336, fields: ['Engineering', 'Medicine', 'Social Sciences'], link: 'https://liu.se', scholarship: 'SI Scholarship' },
      { name: 'Umeå University', city: 'Umeå', qs: 306, fields: ['Medicine', 'Sciences', 'Social Sciences'], link: 'https://www.umu.se', scholarship: 'SI Scholarship' },
      { name: 'Örebro University', city: 'Örebro', qs: 501, fields: ['Business', 'Social Sciences', 'Engineering'], link: 'https://www.oru.se', scholarship: 'SI Scholarship' },
    ]
  },
  {
    id: 'netherlands', name: 'Netherlands', flag: '🇳🇱', color: '#AE1C28', accent: '#21468B',
    light: '#fff8f0', desc: 'Holland Scholarship, Orange Knowledge Programme, English-taught programs',
    universities: [
      { name: 'University of Amsterdam', city: 'Amsterdam', qs: 53, fields: ['Social Sciences', 'Law', 'Business'], link: 'https://www.uva.nl', scholarship: 'Holland Scholarship, Amsterdam Excellence' },
      { name: 'Delft University of Technology', city: 'Delft', qs: 47, fields: ['Engineering', 'Architecture', 'Computer Science'], link: 'https://www.tudelft.nl', scholarship: 'Holland Scholarship, Orange Knowledge' },
      { name: 'Leiden University', city: 'Leiden', qs: 128, fields: ['Law', 'Medicine', 'Social Sciences'], link: 'https://www.universiteitleiden.nl', scholarship: 'Leiden Excellence, Holland Scholarship' },
      { name: 'Wageningen University', city: 'Wageningen', qs: 164, fields: ['Agriculture', 'Life Sciences', 'Environmental'], link: 'https://www.wur.nl', scholarship: 'Wageningen Excellence, Orange Knowledge' },
      { name: 'Utrecht University', city: 'Utrecht', qs: 78, fields: ['Medicine', 'Veterinary', 'Law'], link: 'https://www.uu.nl', scholarship: 'Holland Scholarship, Utrecht Excellence' },
      { name: 'Erasmus University Rotterdam', city: 'Rotterdam', qs: 174, fields: ['Business', 'Law', 'Medicine'], link: 'https://www.eur.nl', scholarship: 'Erasmus Mundus, Holland Scholarship' },
      { name: 'Groningen University', city: 'Groningen', qs: 163, fields: ['Medicine', 'Engineering', 'Social Sciences'], link: 'https://www.rug.nl', scholarship: 'Holland Scholarship' },
      { name: 'Eindhoven University of Technology', city: 'Eindhoven', qs: 118, fields: ['Engineering', 'Computer Science', 'Industrial Design'], link: 'https://www.tue.nl', scholarship: 'Holland Scholarship, Orange Knowledge' },
      { name: 'Maastricht University', city: 'Maastricht', qs: 242, fields: ['Business', 'Law', 'Medicine'], link: 'https://www.maastrichtuniversity.nl', scholarship: 'Holland Scholarship' },
      { name: 'Vrije Universiteit Amsterdam', city: 'Amsterdam', qs: 224, fields: ['Business', 'Law', 'Sciences'], link: 'https://www.vu.nl', scholarship: 'Holland Scholarship' },
    ]
  },
]

export default function UniversitiesPage() {
  const [active, setActive] = useState('germany')
  const [search, setSearch] = useState('')
  const [fieldFilter, setFieldFilter] = useState('')

  const country = COUNTRIES.find(c => c.id === active)

  const filtered = country.universities.filter(u => {
    const matchSearch = !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase()) ||
      u.scholarship.toLowerCase().includes(search.toLowerCase())
    const matchField = !fieldFilter ||
      u.fields.some(f => f.toLowerCase().includes(fieldFilter.toLowerCase()))
    return matchSearch && matchField
  })

  const allFields = [...new Set(country.universities.flatMap(u => u.fields))].sort()

  return (
    <div className="min-h-screen" style={{ background: '#f7f8fc' }}>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f2444 0%, #1a3a6b 60%, #0f2444 100%)',
        paddingTop: '64px', paddingBottom: '64px', position: 'relative', overflow: 'hidden'
      }}>
        {/* decorative circles */}
        <div style={{ position:'absolute', top:-60, right:-60, width:300, height:300, border:'1px solid rgba(255,255,255,.07)', borderRadius:'50%' }} />
        <div style={{ position:'absolute', bottom:-80, left:-40, width:240, height:240, border:'1px solid rgba(255,255,255,.05)', borderRadius:'50%' }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
            <div style={{ width:4, height:32, background:'#22c55e', borderRadius:4 }} />
            <span style={{ fontSize:13, fontWeight:700, color:'rgba(255,255,255,.5)', textTransform:'uppercase', letterSpacing:'.1em' }}>
              Global Universities
            </span>
          </div>
          <h1 style={{ fontSize:'clamp(28px,5vw,48px)', fontWeight:900, color:'#fff', lineHeight:1.1, marginBottom:14, maxWidth:640 }}>
            Find Your Dream University
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.6)', maxWidth:520, lineHeight:1.7 }}>
            Explore 80+ top-ranked universities across 8 countries — with official links, available scholarships, and key programs for Bangladeshi students.
          </p>

          {/* Country pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:32 }}>
            {COUNTRIES.map(c => (
              <button
                key={c.id}
                onClick={() => { setActive(c.id); setSearch(''); setFieldFilter('') }}
                style={{
                  padding:'10px 18px',
                  borderRadius:50,
                  border: active===c.id ? 'none' : '1px solid rgba(255,255,255,.2)',
                  background: active===c.id ? '#22c55e' : 'rgba(255,255,255,.08)',
                  color: active===c.id ? '#fff' : 'rgba(255,255,255,.75)',
                  fontWeight:700, fontSize:13, cursor:'pointer',
                  display:'flex', alignItems:'center', gap:7,
                  transition:'all .2s',
                  backdropFilter:'blur(4px)',
                }}
              >
                <span style={{fontSize:18}}>{c.flag}</span>
                {c.name}
                <span style={{
                  background: active===c.id ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.1)',
                  padding:'1px 7px', borderRadius:20, fontSize:11
                }}>{c.universities.length}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── COUNTRY BAND ── */}
      <div style={{
        background: country.light,
        borderBottom: `3px solid ${country.color}`,
        padding:'18px 0'
      }}>
        <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <span style={{ fontSize:40 }}>{country.flag}</span>
            <div>
              <div style={{ fontSize:20, fontWeight:900, color: country.color }}>{country.name}</div>
              <div style={{ fontSize:13, color:'#64748b', marginTop:2 }}>{country.desc}</div>
            </div>
          </div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
            <input
              placeholder="Search universities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                padding:'9px 14px', border:'1.5px solid #e2e8f0', borderRadius:10,
                fontSize:13, outline:'none', minWidth:200, background:'#fff'
              }}
            />
            <select
              value={fieldFilter}
              onChange={e => setFieldFilter(e.target.value)}
              style={{
                padding:'9px 14px', border:'1.5px solid #e2e8f0', borderRadius:10,
                fontSize:13, outline:'none', background:'#fff', cursor:'pointer'
              }}
            >
              <option value="">All Fields</option>
              {allFields.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* ── UNIVERSITIES GRID ── */}
      <div className="container" style={{ padding:'32px 16px' }}>
        <div style={{ marginBottom:16, fontSize:13, color:'#94a3b8', fontWeight:600 }}>
          {filtered.length} universities in {country.name}
          {(search || fieldFilter) && (
            <button
              onClick={() => { setSearch(''); setFieldFilter('') }}
              style={{ marginLeft:10, color:'#3b82f6', background:'none', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}
            >
              Clear filters ×
            </button>
          )}
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
          gap:16
        }}>
          {filtered.map((u, i) => (
            <div
              key={u.name}
              style={{
                background:'#fff',
                borderRadius:16,
                border:'1px solid #e2e8f0',
                padding:'20px',
                transition:'all .2s',
                position:'relative',
                overflow:'hidden',
                animation:`fadeUp .4s ease ${i * 0.04}s both`
              }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(15,36,68,.1)'; e.currentTarget.style.borderColor=country.color }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor='#e2e8f0' }}
            >
              {/* Rank badge */}
              <div style={{
                position:'absolute', top:16, right:16,
                background: u.qs <= 50 ? '#fef9c3' : u.qs <= 150 ? '#f0fdf4' : '#f8fafc',
                color: u.qs <= 50 ? '#854d0e' : u.qs <= 150 ? '#166534' : '#475569',
                border: `1px solid ${u.qs <= 50 ? '#fde68a' : u.qs <= 150 ? '#bbf7d0' : '#e2e8f0'}`,
                padding:'3px 9px', borderRadius:20, fontSize:11, fontWeight:700
              }}>
                QS #{u.qs}
              </div>

              {/* Flag + name */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginBottom:12, paddingRight:60 }}>
                <span style={{ fontSize:28, flexShrink:0 }}>{country.flag}</span>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:'#0f2444', lineHeight:1.3 }}>{u.name}</div>
                  <div style={{ fontSize:12, color:'#94a3b8', marginTop:3, display:'flex', alignItems:'center', gap:4 }}>
                    <span>📍</span>{u.city}
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:14 }}>
                {u.fields.map(f => (
                  <span key={f} style={{
                    fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:20,
                    background: country.light, color: country.color,
                    border:`1px solid ${country.color}30`
                  }}>{f}</span>
                ))}
              </div>

              {/* Scholarship */}
              <div style={{
                background:'#f0fdf4', border:'1px solid #bbf7d0',
                borderRadius:9, padding:'8px 12px', marginBottom:14, fontSize:12
              }}>
                <span style={{ fontWeight:700, color:'#166534' }}>🎓 Scholarships: </span>
                <span style={{ color:'#166534' }}>{u.scholarship}</span>
              </div>

              {/* Link button */}
              <a
                href={u.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                  padding:'10px 16px', background: country.color, color:'#fff',
                  borderRadius:10, textDecoration:'none', fontSize:13, fontWeight:700,
                  transition:'opacity .15s', width:'100%'
                }}
                onMouseEnter={e => e.currentTarget.style.opacity='.85'}
                onMouseLeave={e => e.currentTarget.style.opacity='1'}
              >
                🌐 Visit Official Website
                <span style={{ fontSize:12 }}>→</span>
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 20px', color:'#94a3b8' }}>
            <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:16, fontWeight:700, color:'#475569', marginBottom:6 }}>No universities match</div>
            <div style={{ fontSize:13 }}>Try clearing your filters</div>
          </div>
        )}
      </div>

      {/* ── BOTTOM CTA ── */}
      <div style={{ background:'#0f2444', padding:'48px 16px', textAlign:'center' }}>
        <div className="container">
          <div style={{ fontSize:28, fontWeight:900, color:'#fff', marginBottom:10 }}>
            Ready to apply? We handle everything.
          </div>
          <div style={{ fontSize:15, color:'rgba(255,255,255,.6)', marginBottom:28, maxWidth:480, margin:'0 auto 28px' }}>
            SOP writing, document preparation, and full guidance for any university on this list.
          </div>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="/services" style={{
              padding:'13px 28px', background:'#22c55e', color:'#fff',
              borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800
            }}>🚀 View Our Packages</a>
            <a href={`https://wa.me/8801889700879?text=${encodeURIComponent('Hi! I want to apply to a university and need help.')}`}
              target="_blank" rel="noreferrer"
              style={{
                padding:'13px 28px', background:'rgba(255,255,255,.1)', color:'#fff',
                border:'1px solid rgba(255,255,255,.2)',
                borderRadius:12, textDecoration:'none', fontSize:14, fontWeight:800
              }}>💬 WhatsApp Us</a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px) }
          to   { opacity:1; transform:translateY(0) }
        }
      `}</style>
    </div>
  )
}
