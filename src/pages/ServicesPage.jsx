import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const PLANS = [
  {
    id: 'starter', icon: '🌱', name: 'Starter', price: '5,000', period: 'one-time',
    desc: 'Expert guidance — you apply yourself',
    extra: null,
    features: [
      'Scholarship matching — top 5 scholarships for your profile',
      'Complete document checklist',
      'SOP writing guide + ready-to-use template',
      '1 counseling session (45 minutes)',
      'CV review and written feedback',
      'WhatsApp support for 30 days',
      'Access to full scholarship database (100+ scholarships)',
    ],
    cta: 'Get Started →', variant: 'outline'
  },
  {
    id: 'professional', icon: '🚀', name: 'Professional', price: '12,000', period: 'one-time',
    desc: 'We write everything — you review and apply',
    extra: '+৳5,000 per extra scholarship',
    features: [
      'Everything in Starter',
      'Professional Statement of Purpose (SOP) written for you',
      'Full CV written from scratch by our expert writer',
      'Motivation letter written for your chosen scholarship',
      '3 counseling sessions with unlimited Q&A',
      '1 scholarship application fully prepared',
      'Document review before you submit',
      'WhatsApp support for 60 days',
    ],
    cta: 'Apply Now →', variant: 'primary', featured: true
  },
  {
    id: 'elite', icon: '👑', name: 'Elite', price: '20,000', period: 'one-time',
    desc: 'Full done-for-you — we handle everything',
    extra: '+৳7,000 per extra scholarship',
    features: [
      'Everything in Professional',
      'We submit the application on your behalf',
      'Dedicated personal advisor (scholarship alumni)',
      'Unlimited counseling sessions throughout the process',
      'Interview preparation if you are shortlisted',
      'Visa application guidance after acceptance',
      'Pre-departure briefing and country preparation',
      'WhatsApp support until your departure',
      '1 scholarship fully managed end-to-end',
    ],
    cta: 'Get Elite →', variant: 'blue'
  },
]

const ADDONS = [
  {
    icon: '📝',
    name: 'Research Proposal Writing',
    price: '5,000',
    desc: 'For PhD applicants. A compelling, supervisor-ready research proposal written by our academic writer. Includes problem statement, methodology, timeline, and references.',
    tag: 'PhD Applicants',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: '📄',
    name: 'Reference Letter Coaching',
    price: '2,000',
    desc: 'We guide your professor or supervisor on exactly what to write. Includes a reference letter brief, key points to highlight, and a sample draft they can adapt.',
    tag: 'All Packages',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: '🎯',
    name: 'IELTS Preparation Pack',
    price: '1,500',
    desc: 'Our curated IELTS study resource pack — band-specific tips, writing templates, speaking practice topics, and a 30-day study plan built for scholarship applicants.',
    tag: 'Pre-Application',
    tagColor: 'bg-yellow-100 text-yellow-700',
  },
  {
    icon: '📘',
    name: 'Scholarship Success Ebook',
    price: '499',
    desc: 'The complete guide to winning international scholarships from Bangladesh. 80+ pages covering DAAD, Chevening, MEXT, Australia Awards — with real SOPs, timelines, and tips.',
    tag: 'Self-Study',
    tagColor: 'bg-green-100 text-green-700',
  },
]

export default function ServicesPage() {
  const [paying, setPaying] = useState(null)

  const handlePurchase = (name) => {
    setPaying(name)
    setTimeout(() => {
      setPaying(null)
      toast.success(`Redirecting to payment for ${name}...`)
    }, 1200)
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Services</span></div>
          <h1>Expert Scholarship Services</h1>
          <p>From guidance to full done-for-you — pick the level of support you need</p>
        </div>
      </div>

      {/* PACKAGES */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-blue mb-3">💼 Transparent Pricing</span>
            <h2>Choose Your Package</h2>
            <p>All packages include full access to 100+ scholarships. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {PLANS.map(plan => (
              <div key={plan.id} className={`rounded-3xl border-2 p-7 relative transition-all hover:-translate-y-1 hover:shadow-xl ${plan.featured ? 'bg-gradient-to-br from-navy-900 to-navy-600 border-blue-500' : 'bg-white border-gray-200 hover:border-blue-400'}`}>
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-0.5 rounded-full text-xs font-black whitespace-nowrap">
                    ⭐ Most Popular
                  </div>
                )}
                <div className="text-4xl mb-4">{plan.icon}</div>
                <h3 className={`font-head font-black text-xl mb-2 ${plan.featured ? 'text-white' : 'text-navy-800'}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${plan.featured ? 'text-white/60' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className={`font-head font-black text-5xl leading-none mb-1 ${plan.featured ? 'text-white' : 'text-navy-800'}`}>
                  <span className="text-2xl align-top mt-2 inline-block">৳</span>{plan.price}
                </div>
                <div className={`text-xs mb-1 ${plan.featured ? 'text-white/40' : 'text-gray-400'}`}>{plan.period}</div>
                {plan.extra && (
                  <div className={`text-xs font-medium mb-5 ${plan.featured ? 'text-green-400' : 'text-green-600'}`}>{plan.extra}</div>
                )}
                {!plan.extra && <div className="mb-5" />}
                <ul className={`space-y-2.5 pb-6 mb-6 border-b ${plan.featured ? 'border-white/15' : 'border-gray-100'}`}>
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.featured ? 'text-white/80' : 'text-gray-700'}`}>
                      <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`/intake.html?package=${plan.id}`}
                  className={`btn btn-block ${plan.variant === 'primary' ? 'btn-primary' : plan.variant === 'blue' ? 'btn-blue' : 'btn-outline'}`}>
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-5">All prices in BDT · Payment via bKash 01889700879 · WhatsApp us to confirm after payment</p>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="section-header">
            <span className="badge badge-green mb-3">➕ Add-On Services</span>
            <h2>Boost Your Application Further</h2>
            <p>Add these to any package — or purchase standalone</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-8">
            {ADDONS.map(a => (
              <div key={a.name} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-3xl flex-shrink-0 mt-1">{a.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-head font-bold text-navy-800 text-base">{a.name}</h3>
                    <span className="font-head font-black text-green-600 text-lg whitespace-nowrap">৳{a.price}</span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${a.tagColor} inline-block mb-2`}>{a.tag}</span>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
                  <a
                    href={`https://wa.me/8801889700879?text=Hi! I'm interested in the ${a.name} add-on (৳${a.price}). Please share details.`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-sm mt-4 inline-flex">
                    💬 WhatsApp to Order
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2>How Our Service Works</h2>
            <p>Simple, transparent, and fully guided from start to finish</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              ['1', 'Fill Intake Form', 'Tell us your profile — CGPA, field, target country, and package choice. Takes 5 minutes.'],
              ['2', 'Free Consultation Call', 'Our scholarship counselor reviews your profile and recommends the best scholarships for you.'],
              ['3', 'We Get to Work', 'Your SOP writer and advisor prepare everything. You approve, we submit (Elite), you win.'],
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

      {/* CTA */}
      <section className="bg-gradient-to-br from-navy-800 to-navy-600 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,107,245,.15),transparent_50%)]" />
        <div className="container relative z-10">
          <h2 className="font-head font-black text-3xl text-white mb-3">Not Sure Which Package?</h2>
          <p className="text-white/65 mb-7">Book a free 15-minute consultation. No commitment, no payment needed.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="/intake.html" className="btn btn-primary btn-xl">📋 Fill Free Profile Form</a>
            <a href="https://wa.me/8801889700879" target="_blank" rel="noreferrer" className="btn btn-white btn-xl">💬 WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  )
}
