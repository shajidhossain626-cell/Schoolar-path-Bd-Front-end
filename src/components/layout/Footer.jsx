import { Link } from 'react-router-dom'
import { NewsletterCompact } from '@components/common/NewsletterSignup'

const FOOTER_LINKS = {
  Scholarships: [
    { label: 'All Scholarships', to: '/scholarships' },
    { label: '🇩🇪 Germany — DAAD', to: '/scholarships?country=Germany' },
    { label: '🇬🇧 UK — Chevening', to: '/scholarships?country=United+Kingdom' },
    { label: '🇺🇸 USA — Fulbright', to: '/scholarships?country=United+States' },
    { label: '🇯🇵 Japan — MEXT', to: '/scholarships?country=Japan' },
    { label: '🇨🇦 Canada — Vanier', to: '/scholarships?country=Canada' },
    { label: '🇦🇺 Australia — AAS', to: '/scholarships?country=Australia' },
    { label: '🇰🇷 Korea — GKS', to: '/scholarships?country=South+Korea' },
  ],
  Services: [
    { label: '🚀 Starter — ৳5,000', to: '/services#starter' },
    { label: '⭐ Professional — ৳12,000', to: '/services#professional' },
    { label: '👑 Elite — ৳20,000', to: '/services#elite' },
    { label: '🎯 Free Tools', to: '/tools' },
    { label: '📋 Fill Intake Form', href: '/intake.html' },
    { label: '💬 WhatsApp Us', href: 'https://wa.me/8801889700879' },
  ],
  Company: [
    { label: '👥 About Us', to: '/about' },
    { label: '📖 Blog & Guides', to: '/blog' },
    { label: '📬 Contact', to: '/contact' },
    { label: '🔔 Subscribe', to: '/subscribe' },
    { label: '🏛️ Universities', to: '/universities' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white/65 pt-14 pb-6">
      {/* Newsletter banner */}
      <div className="border-b border-white/10 pb-10 mb-10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="text-center md:text-left flex-shrink-0">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <span className="text-2xl">🔔</span>
                <span className="text-white font-black text-xl">Scholarship Alerts</span>
              </div>
              <p className="text-white/50 text-sm max-w-xs">
                Get deadline reminders, new scholarships & tips delivered to your inbox — free.
              </p>
              <div className="flex gap-4 mt-3 text-xs text-white/40">
                <span>📅 Deadline alerts</span>
                <span>🆕 New scholarships</span>
                <span>💡 Weekly tips</span>
              </div>
            </div>
            <div className="w-full md:max-w-md">
              <NewsletterCompact source="Footer" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 font-head font-black text-lg text-white mb-3">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-base">🎓</div>
              Scholar<span className="text-green-400">Path BD</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">Bangladesh's most trusted scholarship consultancy. We help students discover and win international scholarships — DAAD, Chevening, MEXT and more.</p>
            <div className="flex gap-2">
              {['📘', '📷', '▶️', '💼'].map((icon, i) => (
                <div key={i} className="w-8 h-8 bg-white/8 rounded-lg flex items-center justify-center text-sm cursor-pointer hover:bg-blue-600 transition-colors">{icon}</div>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-head font-bold text-white text-sm mb-4 tracking-wide">{title}</h4>
              <div className="space-y-2">
                {links.map(({ label, to, href }) => (
                  href
                    ? <a key={label} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer"
                        className="block text-sm text-white/55 hover:text-green-400 transition-colors">{label}</a>
                    : <Link key={label} to={to} className="block text-sm text-white/55 hover:text-green-400 transition-colors">{label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© 2025 ScholarPath BD. All rights reserved. Made with ❤️ in Bangladesh 🇧🇩 · scholarpathbd.com</span>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Sitemap'].map(l => <a key={l} href="#" className="hover:text-white/70 transition-colors">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  )
}
