import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BLOGS, BLOG_CATS } from '@data/blogs'

export default function BlogPage() {
  const [cat, setCat] = useState('all')
  const filtered = cat === 'all' ? BLOGS : BLOGS.filter(b => b.cat === cat)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><span>Home</span><span className="opacity-40">›</span><span>Blog</span></div>
          <h1>Scholarship Guides & Tips</h1>
          <p>Expert advice to help you succeed in your study-abroad journey</p>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="flex gap-2 flex-wrap mb-8">
            {BLOG_CATS.map(({ key, label }) => (
              <button key={key} onClick={() => setCat(key)}
                className={`btn btn-sm ${cat === key ? 'btn-blue' : 'btn-outline'}`}>
                {label}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(b => (
              <Link key={b.id} to={`/blog/${b.id}`} className="card card-hover overflow-hidden block">
                <div className="h-44 bg-gradient-to-br from-navy-800 to-blue-600 flex items-center justify-center text-6xl rounded-t-2xl">
                  {b.emoji}
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wide mb-2">{b.cat}</div>
                  <h3 className="font-head font-bold text-navy-800 text-base mb-2 leading-snug line-clamp-2">{b.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{b.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-600 to-navy-800 flex items-center justify-center text-white text-[10px] font-bold">{b.initials}</div>
                    <span>{b.author}</span><span>·</span>
                    <span>{b.date}</span><span>·</span>
                    <span>⏱ {b.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
