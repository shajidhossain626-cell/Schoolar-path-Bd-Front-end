import { Link } from 'react-router-dom'

const TEAM = [
  { av:'AR', name:'Arif Rahman', role:'Co-founder & CEO', meta:'Ex-DAAD Scholar, TU Berlin' },
  { av:'NK', name:'Nadia Karim', role:'Head of Counseling', meta:'Chevening Scholar, UCL' },
  { av:'SH', name:'Sabbir Hasan', role:'CTO & Co-founder', meta:'MSc CS, Edinburgh' },
  { av:'FM', name:'Fatema Mitu', role:'Content Lead', meta:'MEXT Scholar, Tokyo' },
]

const VALUES = [
  { icon:'🎯', title:'Student-First', desc:'Every decision starts with "is this best for the student?" Our success is measured by your acceptance letter.', accent:'border-blue-500' },
  { icon:'🔒', title:'Transparency', desc:'Only verified scholarships. We never take money for listings. Your trust is our most valuable asset.', accent:'border-green-500' },
  { icon:'🌍', title:'Equal Access', desc:'Whether from Dhaka or a remote district, you deserve the same quality guidance.', accent:'border-amber-500' },
]

export default function AboutPage() {
  return (
    <>
      <div className="bg-gradient-to-br from-navy-800 to-navy-600 py-20 text-center text-white">
        <div className="container">
          <span className="badge badge-navy mb-5">🇧🇩 Made in Bangladesh</span>
          <h1 className="font-head font-black text-4xl md:text-5xl mb-4">About ScholarPath BD</h1>
          <p className="text-white/65 text-lg max-w-xl mx-auto">We're democratizing international education for Bangladeshi students — making scholarship access simple, guided, and achievable.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Story */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="badge badge-blue mb-4">Our Story</span>
              <h2 className="font-head font-black text-3xl text-navy-800 mb-5">Born from frustration,<br/>built with purpose</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">ScholarPath was founded in 2022 by Bangladeshi students who struggled to navigate international scholarships. They saw talented peers miss life-changing opportunities simply due to lack of guidance.</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">Today, ScholarPath is Bangladesh's most trusted scholarship platform — 15 expert counselors, partnerships with universities in 20+ countries, and 94% success rate powered by AI.</p>
              <div className="flex gap-8">
                {[['2022', 'Founded'], ['15+', 'Counselors'], ['20+', 'Countries']].map(([n, l]) => (
                  <div key={l}><div className="font-head font-black text-3xl text-navy-800">{n}</div><div className="text-xs text-gray-500">{l}</div></div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-navy-800 to-navy-600 rounded-3xl p-10 text-center text-white">
              <div className="text-7xl mb-5">🎓</div>
              <h3 className="font-head font-bold text-xl mb-3">Our Mission</h3>
              <p className="text-white/70 text-sm leading-relaxed italic">"To empower every ambitious Bangladeshi student with the knowledge, tools, and support they need to access world-class education — regardless of their background."</p>
            </div>
          </div>

          {/* Values */}
          <div className="section-header"><span className="badge badge-green mb-3">Our Values</span><h2>What We Stand For</h2></div>
          <div className="grid md:grid-cols-3 gap-5 mb-20">
            {VALUES.map(({ icon, title, desc, accent }) => (
              <div key={title} className={`card p-6 border-l-4 ${accent}`}>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-head font-bold text-navy-800 text-base mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <div className="section-header"><span className="badge badge-blue mb-3">The Team</span><h2>People Behind ScholarPath</h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {TEAM.map(({ av, name, role, meta }) => (
              <div key={name} className="card p-5 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center font-head font-bold text-white text-xl mx-auto mb-4">{av}</div>
                <h4 className="font-head font-bold text-navy-800 text-sm mb-1">{name}</h4>
                <p className="text-xs text-blue-600 font-semibold mb-0.5">{role}</p>
                <p className="text-xs text-gray-500">{meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
