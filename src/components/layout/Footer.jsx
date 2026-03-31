import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Scholarships: [
    { label: 'All Scholarships', to: '/scholarships' },
    { label: 'Germany 🇩🇪', to: '/scholarships?country=Germany' },
    { label: 'United Kingdom 🇬🇧', to: '/scholarships?country=United+Kingdom' },
    { label: 'USA 🇺🇸', to: '/scholarships?country=United+States' },
    { label: 'Japan 🇯🇵', to: '/scholarships?country=Japan' },
    { label: 'Canada 🇨🇦', to: '/scholarships?country=Canada' },
  ],
  Services: [
    { label: 'Basic Package', to: '/services' },
    { label: 'Standard Package', to: '/services' },
    { label: 'Premium Package', to: '/services' },
    { label: 'Free Consultation', to: '/contact' },
    { label: 'Study Abroad Blog', to: '/blog' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/about' },
    { label: 'Privacy Policy', to: '/' },
    { label: 'Terms of Service', to: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white/65 pt-14 pb-6">
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
                {links.map(({ label, to }) => (
                  <Link key={label} to={to} className="block text-sm text-white/55 hover:text-green-400 transition-colors">{label}</Link>
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
