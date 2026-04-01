import { Link } from 'react-router-dom'

const WHATSAPP_NUM = '8801889700879'
const WHATSAPP_MSG = encodeURIComponent("Hi ScholarPath BD! I'd like to know more about your scholarship services.")
const INTAKE_URL   = 'https://www.scholarpathbd.com/intake.html'

const CONTACT_INFO = [
  { icon:'💬', label:'WhatsApp (fastest)', val:'+880 1889-700879', link:`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`, cta:'Message Now' },
  { icon:'✉️', label:'Email', val:'scholarpathbd26@gmail.com', link:'mailto:scholarpathbd26@gmail.com', cta:'Send Email' },
  { icon:'🕐', label:'Response Time', val:'Within 24 hours — Mon to Sat', link:null },
  { icon:'📍', label:'Location', val:'Dhaka, Bangladesh', link:null },
]

const FAQS = [
  { q: 'How do I get started?', a: 'Fill our intake form — takes 5 minutes. Our team reviews your profile and contacts you on WhatsApp within 24 hours with a personalised plan.' },
  { q: 'Do I need IELTS to apply?', a: 'Most scholarships require IELTS 6.0–6.5. Some like MEXT Japan and some European scholarships accept without IELTS. We will advise based on your target country.' },
  { q: 'What if I have a low CGPA?', a: 'Strong work experience, research papers, or community leadership can compensate. Contact us — many of our clients with 2.8–3.0 CGPA got shortlisted.' },
  { q: 'Can I apply to multiple scholarships?', a: 'Yes! Standard and Premium packages include 1 free application. Each extra scholarship application is ৳3,500 extra.' },
]

export default function ContactPage() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Contact</span></div>
          <h1>Get In Touch</h1>
          <p>We reply within 24 hours — WhatsApp is fastest!</p>
        </div>
      </div>

      <section className="section">
        <div className="container">

          {/* TOP CTA CARDS */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">

            {/* Intake Form Card */}
            <div className="rounded-2xl overflow-hidden border-2 border-blue-600 shadow-card">
              <div className="bg-gradient-to-br from-navy-900 to-navy-600 p-7 text-white text-center">
                <div className="text-4xl mb-3">📋</div>
                <h2 className="font-head font-black text-xl mb-2">Apply With Us</h2>
                <p className="text-sm text-white/70 leading-relaxed">Fill our 4-step intake form. Upload your documents. Our team reviews your profile and builds a personalised scholarship plan.</p>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="flex items-center justify-center gap-6 mb-5 text-sm text-gray-500">
                  <span>✅ Takes 5 minutes</span>
                  <span>✅ Free review</span>
                  <span>✅ No commitment</span>
                </div>
                <a href={INTAKE_URL} target="_blank" rel="noreferrer"
                  className="btn btn-primary btn-block text-center no-underline flex items-center justify-center gap-2 text-sm mb-3">
                  📋 Fill Intake Form
                </a>
                <p className="text-xs text-gray-400">We will contact you on WhatsApp within 24 hours</p>
              </div>
            </div>

            {/* WhatsApp Card */}
            <div className="rounded-2xl overflow-hidden border-2 border-green-500 shadow-card">
              <div className="bg-gradient-to-br from-green-600 to-green-500 p-7 text-white text-center">
                <div className="text-4xl mb-3">💬</div>
                <h2 className="font-head font-black text-xl mb-2">Message on WhatsApp</h2>
                <p className="text-sm text-white/80 leading-relaxed">Have a quick question? Chat with us directly on WhatsApp. We reply within a few hours during business hours.</p>
              </div>
              <div className="bg-white p-6 text-center">
                <div className="font-head font-black text-2xl text-navy-800 mb-1">+880 1889-700879</div>
                <div className="text-xs text-gray-400 mb-5">Mon – Sat · 9:00 AM – 8:00 PM</div>
                <a href={`https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MSG}`} target="_blank" rel="noreferrer"
                  className="btn btn-block text-center no-underline flex items-center justify-center gap-2 text-sm mb-3"
                  style={{background:'#25D366', color:'#fff', border:'none'}}>
                  💬 Open WhatsApp Chat
                </a>
                <p className="text-xs text-gray-400">Fastest way to reach us!</p>
              </div>
            </div>
          </div>

          {/* INFO + FAQ */}
          <div className="grid md:grid-cols-2 gap-14">

            {/* Contact Info */}
            <div>
              <h3 className="font-head font-black text-xl text-navy-800 mb-6">Contact Information</h3>
              {CONTACT_INFO.map(({ icon, label, val, link, cta }) => (
                <div key={label} className="flex gap-4 mb-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-gray-800 mb-1">{val}</div>
                    {link && <a href={link} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:text-blue-700">{cta} →</a>}
                  </div>
                </div>
              ))}

              {/* AI Advisor box */}
              
            </div>

            {/* FAQ */}
            <div>
              <h3 className="font-head font-black text-xl text-navy-800 mb-6">Frequently Asked Questions</h3>
              {FAQS.map((f, i) => (
                <div key={i} className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
                  <div className="p-4 font-bold text-sm text-navy-800 bg-gray-50">{f.q}</div>
                  <div className="p-4 text-sm text-gray-600 leading-relaxed">{f.a}</div>
                </div>
              ))}

              {/* Final CTA */}
              <div className="mt-6 p-5 bg-gradient-to-br from-navy-900 to-navy-600 rounded-2xl text-white text-center">
                <div className="font-head font-black text-base mb-2">Ready to start your journey? 🚀</div>
                <p className="text-xs text-white/60 mb-4">Fill the intake form — free profile review, no commitment.</p>
                <a href={INTAKE_URL} target="_blank" rel="noreferrer"
                  className="btn btn-primary btn-sm text-center no-underline inline-flex items-center gap-1">
                  📋 Apply Now
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
