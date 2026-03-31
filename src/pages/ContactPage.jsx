import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const CONTACT_INFO = [
  { icon:'📍', label:'Address', val:'House 35, Road 2, Hajigonj, Narayangonj 1400' },
  { icon:'📞', label:'Phone & WhatsApp', val:'+880 1889700879' },
  { icon:'✉️', label:'Email', val:'scholarpathbd@gmail.com' },
  { icon:'🕐', label:'Office Hours', val:'Mon – Sat: 9:00 AM – 7:00 PM' },
]

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 900))
    toast.success(`Message sent, ${data.firstName}! We'll reply within 24 hours. 📬`)
    reset()
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Contact</span></div>
          <h1>Get In Touch</h1>
          <p>Questions? We reply within 24 hours.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-14">
            {/* Info */}
            <div>
              <h2 className="font-head font-black text-2xl text-navy-800 mb-3">Talk to Our Scholarship Experts</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-7">Whether you're starting your search or need specific help, our team is ready to guide you toward the right opportunity.</p>
              {CONTACT_INFO.map(({ icon, label, val }) => (
                <div key={label} className="flex gap-4 mb-5">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-0.5">{label}</div>
                    <div className="text-sm font-medium text-gray-800">{val}</div>
                  </div>
                </div>
              ))}
              <div className="mt-7 p-5 bg-gray-50 rounded-2xl">
                <h4 className="font-head font-bold text-navy-800 text-base mb-2">🚀 Free Consultation!</h4>
                <p className="text-xs text-gray-500 mb-3">15-minute call with our counselors. No commitment, just guidance.</p>
                <button onClick={() => toast.success('Booking calendar opened! We\'ll confirm your time slot shortly.')} className="btn btn-primary btn-sm">📅 Book Free Call</button>
              </div>
              <div className="mt-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                <h4 className="font-head font-bold text-navy-800 text-base mb-2">🤖 Quick AI Answer</h4>
                <p className="text-xs text-gray-500 mb-3">Need a quick answer? Try our AI advisor first.</p>
                <Link to="/" className="btn btn-blue btn-sm">Ask AI Advisor →</Link>
              </div>
            </div>

            {/* Form */}
            
          </div>
        </div>
      </section>
    </>
  )
}
