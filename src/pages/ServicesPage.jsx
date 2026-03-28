import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const PACKAGES = [
  {
    id: 'basic', icon: '🌱', name: 'Basic', price: '2,500', period: 'one-time',
    color: 'border-gray-200',
    badge: null,
    desc: 'Document preparation & self-guided support',
    tag: 'Apply Yourself',
    tagColor: 'bg-gray-100 text-gray-600',
    features: [
      'Full scholarship database access',
      'AI-powered scholarship matching',
      'Personalised document checklist',
      '1× 30-min counseling session',
      'SOP template + writing guide',
      'CV template',
      'Email support (5 business days)',
    ],
    note: '⚠️ You submit the application yourself',
    cta: 'Get Started →',
    ctaStyle: 'btn-outline',
    href: '/intake.html?package=basic',
  },
  {
    id: 'standard', icon: '🚀', name: 'Standard', price: '5,000', period: 'per scholarship',
    color: 'border-blue-600',
    badge: '⭐ Most Popular',
    badgeColor: 'bg-blue-600 text-white',
    desc: 'Full support — we apply for you',
    tag: 'We Apply For You',
    tagColor: 'bg-blue-100 text-blue-700',
    features: [
      'Everything in Basic',
      'Professional SOP writing',
      'CV review & full rewrite',
      'Recommendation letter guidance',
      '3× counseling sessions',
      'Application portal submission',
      'Interview preparation',
      '✅ 1 scholarship application included',
      'Priority support (24 hrs)',
    ],
    extra: true,
    note: '➕ Additional scholarships: ৳2,500 each',
    cta: 'Apply Now →',
    ctaStyle: 'btn-primary',
    href: '/intake.html?package=standard',
  },
  {
    id: 'premium', icon: '👑', name: 'Premium', price: '8,000', period: 'per scholarship',
    color: 'border-amber-400',
    badge: '👑 Best Service',
    badgeColor: 'bg-amber-500 text-white',
    desc: 'End-to-end concierge — we handle everything',
    tag: 'Full Concierge',
    tagColor: 'bg-amber-100 text-amber-700',
    features: [
      'Everything in Standard',
      'Dedicated personal advisor',
      'Full application submission',
      'Document translation & notarization',
      'Visa guidance & support letter',
      'Unlimited counseling sessions',
      'WhatsApp priority support',
      '✅ 1 scholarship application included',
      'Post-acceptance guidance',
      'Money-back guarantee*',
    ],
    extra: true,
    note: '➕ Additional scholarships: ৳2,500 each',
    cta: 'Get Premium →',
    ctaStyle: 'btn-blue',
    href: '/intake.html?package=premium',
  },
]

const EXTRA_PRICE = 2500

export default function ServicesPage() {
  const [extraSchols, setExtraSchols] = useState({ standard: 0, premium: 0 })

  const totalPrice = (pkg) => {
    const base = pkg.id === 'basic' ? 2500 : pkg.id === 'standard' ? 5000 : 8000
    const extras = (extraSchols[pkg.id] || 0) * EXTRA_PRICE
    return base + extras
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

      <div className="container py-12">

        {/* PRICING HEADER */}
        <div className="text-center mb-10">
          <span className="badge badge-blue mb-3">🏷 Transparent Pricing</span>
          <h2 className="font-head font-black text-3xl text-navy-800 mb-3">Choose Your Package</h2>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">All packages include full scholarship database access. No hidden fees. Standard & Premium include one free scholarship application — add more for ৳2,500 each.</p>
        </div>

        {/* PACKAGE CARDS */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className={`card border-2 ${pkg.color} relative flex flex-col`}>
              {pkg.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${pkg.badgeColor}`}>
                  {pkg.badge}
                </div>
              )}

              <div className="p-6 flex-1">
                {/* Header */}
                <div className="text-center mb-5">
                  <div className="text-3xl mb-2">{pkg.icon}</div>
                  <h3 className="font-head font-black text-xl text-navy-800 mb-1">{pkg.name}</h3>
                  <p className="text-xs text-gray-500 mb-3">{pkg.desc}</p>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${pkg.tagColor}`}>{pkg.tag}</span>
                </div>

                {/* Price */}
                <div className="text-center mb-5 py-4 border-y border-gray-100">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-lg font-bold text-gray-500">৳</span>
                    <span className="font-head font-black text-4xl text-navy-800">
                      {pkg.extra ? totalPrice(pkg).toLocaleString() : pkg.price}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{pkg.period}</div>

                  {/* Extra scholarships counter */}
                  {pkg.extra && (
                    <div className="mt-4 bg-blue-50 rounded-xl p-3">
                      <div className="text-xs font-bold text-blue-700 mb-2">How many scholarships to apply?</div>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="w-8 h-8 rounded-full bg-white border border-blue-200 text-blue-700 font-bold text-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                          onClick={() => setExtraSchols(prev => ({ ...prev, [pkg.id]: Math.max(0, (prev[pkg.id]||0) - 1) }))}>
                          −
                        </button>
                        <div className="text-center">
                          <div className="font-black text-xl text-navy-800">{1 + (extraSchols[pkg.id]||0)}</div>
                          <div className="text-[10px] text-gray-400">scholarship{1+(extraSchols[pkg.id]||0)>1?'s':''}</div>
                        </div>
                        <button
                          className="w-8 h-8 rounded-full bg-white border border-blue-200 text-blue-700 font-bold text-lg flex items-center justify-center hover:bg-blue-100 transition-colors"
                          onClick={() => setExtraSchols(prev => ({ ...prev, [pkg.id]: (prev[pkg.id]||0) + 1 }))}>
                          +
                        </button>
                      </div>
                      {(extraSchols[pkg.id]||0) > 0 && (
                        <div className="text-[11px] text-blue-600 mt-2 font-medium">
                          1 included + {extraSchols[pkg.id]} extra × ৳2,500 = ৳{totalPrice(pkg).toLocaleString()}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-4">
                  {pkg.features.map((f, i) => (
                    <li key={i} className={`flex gap-2 text-sm ${f.startsWith('✅') ? 'font-semibold text-green-700' : 'text-gray-600'}`}>
                      {!f.startsWith('✅') && <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>}
                      {f.startsWith('✅') && <span className="flex-shrink-0">✅</span>}
                      <span>{f.replace('✅ ', '')}</span>
                    </li>
                  ))}
                </ul>

                {/* Note */}
                <div className={`text-xs rounded-lg p-2.5 mb-4 ${pkg.extra ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}>
                  {pkg.note}
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <a href={`${pkg.href}&extra=${extraSchols[pkg.id]||0}`}
                  className={`btn ${pkg.ctaStyle} btn-block text-center no-underline flex items-center justify-center`}>
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* EXTRA SCHOLARSHIP EXPLAINER */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <div className="text-center mb-6">
            <span className="badge badge-blue mb-3">➕ Multiple Scholarships</span>
            <h3 className="font-head font-black text-2xl text-navy-800 mb-2">Applying to More Than One Scholarship?</h3>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Standard and Premium packages include one scholarship application. Add more for just ৳2,500 each — documents are prepared once, we customize each application.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { schol: 'DAAD (Germany)', included: true },
              { schol: 'Chevening (UK)', included: false },
              { schol: 'Australia Awards', included: false },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl p-4 text-center ${item.included ? 'bg-white border-2 border-green-400' : 'bg-white border border-blue-200'}`}>
                <div className="text-sm font-bold text-navy-800 mb-1">{item.schol}</div>
                {item.included
                  ? <div className="text-xs text-green-600 font-bold">✅ Included in package</div>
                  : <div className="text-xs text-blue-600 font-bold">➕ +৳2,500</div>
                }
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <div className="text-sm text-gray-600">Standard ৳5,000 + 2 extra scholarships × ৳2,500 = <strong className="text-navy-800">৳10,000 total</strong></div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h3 className="font-head font-black text-xl text-navy-800 mb-6 text-center">Common Questions</h3>
          {[
            { q: 'Why does Basic not include application submission?', a: 'Basic is a self-guided package. We prepare all your documents and guide you step by step, but you submit the application yourself. This keeps the cost low for students who are confident applying independently.' },
            { q: 'Why is there an extra charge per scholarship?', a: 'Each scholarship requires a customized SOP, separate application portal login, different documents, and individual tracking. Applying to 3 scholarships is genuinely 3 times the work.' },
            { q: 'Can I upgrade my package later?', a: 'Yes! Contact us on WhatsApp and we will upgrade your package at any time. You only pay the difference.' },
            { q: 'What if I am rejected?', a: 'Premium package includes a money-back guarantee. Standard and Basic do not, but we work hard to maximize your chances with professional applications.' },
          ].map((item, i) => (
            <div key={i} className="mb-4 border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-4 font-bold text-sm text-navy-800 bg-gray-50">{item.q}</div>
              <div className="p-4 text-sm text-gray-600 leading-relaxed">{item.a}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}
