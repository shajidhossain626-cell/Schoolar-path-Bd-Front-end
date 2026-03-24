import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const PLANS = [
  { id: 'basic', icon: '🌱', name: 'Basic', price: '2,500', period: 'one-time',
    desc: 'Self-guided with expert direction',
    features: ['Full scholarship database access', 'AI-powered matching', 'Document checklist', '1× 30-min counseling session', 'SOP template + writing guide', 'Email support (5 business days)'],
    cta: 'Get Started →', variant: 'outline' },
  { id: 'standard', icon: '🚀', name: 'Standard', price: '5,000', period: 'per scholarship',
    desc: 'Full support for one scholarship application',
    features: ['Everything in Basic', 'Professional SOP writing', 'CV review & full rewrite', 'Recommendation letter guidance', '3× counseling sessions', 'Application portal assistance', 'Interview preparation', 'Priority support (24 hrs)'],
    cta: 'Apply Now →', variant: 'primary', featured: true },
  { id: 'premium', icon: '👑', name: 'Premium', price: '8,000', period: 'per scholarship',
    desc: 'Full concierge, end-to-end service',
    features: ['Everything in Standard', 'Dedicated personal advisor', 'Full application submission', 'Document translation & notarization', 'Visa guidance & support letter', 'Unlimited counseling sessions', 'WhatsApp priority support', 'Post-acceptance guidance', 'Money-back guarantee*'],
    cta: 'Get Premium →', variant: 'blue' },
]

export default function ServicesPage() {
  const [paying, setPaying] = useState(null)

  const handlePurchase = (plan) => {
    setPaying(plan.id)
    setTimeout(() => {
      setPaying(null)
      toast.success(`Payment for ${plan.name} package initiated! Redirecting to payment gateway...`)
    }, 1200)
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Services</span></div>
          <h1>Expert Application Services</h1>
          <p>From document prep to full application management — we handle it all</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue mb-3">💼 Transparent Pricing</span>
            <h2>Choose Your Package</h2>
            <p>All packages include full scholarship database access. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PLANS.map(plan => (
              <div key={plan.id} className={`rounded-3xl border-2 p-7 relative transition-all hover:-translate-y-1 hover:shadow-xl ${plan.featured ? 'bg-gradient-to-br from-navy-900 to-navy-600 border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
                {plan.featured && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-0.5 rounded-full text-xs font-black whitespace-nowrap">⭐ Most Popular</div>}
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className={`font-head font-black text-xl mb-2 ${plan.featured ? 'text-white' : 'text-navy-800'}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${plan.featured ? 'text-white/60' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className={`font-head font-black text-5xl leading-none mb-1 ${plan.featured ? 'text-white' : 'text-navy-800'}`}>
                  <span className="text-2xl align-top mt-2 inline-block">৳</span>{plan.price}
                </div>
                <div className={`text-xs mb-6 ${plan.featured ? 'text-white/40' : 'text-gray-400'}`}>{plan.period}</div>
                <ul className={`space-y-2.5 pb-6 mb-6 border-b ${plan.featured ? 'border-white/15' : 'border-gray-100'}`}>
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.featured ? 'text-white/80' : 'text-gray-700'}`}>
                      <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={paying === plan.id}
                  className={`btn btn-block ${plan.variant === 'primary' ? 'btn-primary' : plan.variant === 'blue' ? 'btn-blue' : 'btn-outline'} ${paying === plan.id ? 'opacity-60 cursor-not-allowed' : ''}`}>
                  {paying === plan.id ? 'Processing...' : plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5">*Refund subject to T&C · All prices BDT · Payment via bKash, Nagad, or bank transfer</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <h2>How Our Service Works</h2>
            <p>Our team has helped 2,400+ students get accepted at top universities worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[['1', 'Book Consultation', 'Start with a free 15-min discovery call. Tell us your goals, background, and preferred destinations.'],
              ['2', 'Choose & Pay', 'Select a package and pay securely via bKash, Nagad, or bank transfer. We begin work immediately.'],
              ['3', 'We Handle the Rest', 'Your dedicated advisor prepares documents, writes essays, and tracks deadlines. You just approve and sign.']
            ].map(([n, title, desc]) => (
              <div key={n} className="text-center px-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-navy-800 rounded-2xl flex items-center justify-center font-head font-black text-2xl text-white mx-auto mb-5 shadow-lg">{n}</div>
                <h3 className="font-head font-bold text-navy-800 text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-navy-800 to-navy-600 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,107,245,.15),transparent_50%)]" />
        <div className="container relative z-10">
          <h2 className="font-head font-black text-3xl text-white mb-3">Not Sure Which Package?</h2>
          <p className="text-white/65 mb-7">Book a free 15-minute consultation. No commitment required.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/contact" className="btn btn-primary btn-xl">📞 Book Free Call</Link>
            <Link to="/scholarships" className="btn btn-white btn-xl">Browse Scholarships</Link>
          </div>
        </div>
      </section>
    </>
  )
}
