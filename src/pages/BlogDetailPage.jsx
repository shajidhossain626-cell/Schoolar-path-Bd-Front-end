import { useParams, Link, useNavigate } from 'react-router-dom'
import { BLOGS } from '@data/blogs'
import toast from 'react-hot-toast'

export default function BlogDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const b = BLOGS.find(x => x.id === Number(id))
  if (!b) return <div className="text-center py-20"><h2 className="font-head font-bold text-xl mb-4">Article not found</h2><Link to="/blog" className="btn btn-primary">Back to Blog</Link></div>

  const renderBlock = (block, i) => {
    switch (block.type) {
      case 'h2': return <h2 key={i} className="font-head font-bold text-xl text-navy-800 mt-7 mb-3">{block.text}</h2>
      case 'p':  return <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4">{block.text}</p>
      case 'ul': return <ul key={i} className="space-y-2 mb-4 pl-4">{block.items.map((it, j) => <li key={j} className="text-sm text-gray-700 list-disc">{it}</li>)}</ul>
      case 'blockquote': return <blockquote key={i} className="border-l-4 border-blue-500 pl-5 py-2 bg-blue-50 rounded-r-xl my-5 italic text-sm text-navy-800">{block.text}</blockquote>
      default: return null
    }
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <span onClick={() => navigate('/')}>Home</span><span className="opacity-40">›</span>
            <span onClick={() => navigate('/blog')}>Blog</span><span className="opacity-40">›</span>
            <span>{b.title.slice(0, 30)}...</span>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="badge badge-blue">{b.cat.toUpperCase()}</span>
          <span className="text-sm text-gray-500">{b.date}</span>
          <span className="text-sm text-gray-500">⏱ {b.readTime} read</span>
          <span className="text-sm text-gray-500">By {b.author}</span>
        </div>
        <h1 className="font-head font-black text-2xl md:text-3xl text-navy-800 mb-8 leading-tight">{b.title}</h1>
        <div>{b.content.map(renderBlock)}</div>
        <div className="mt-10 pt-6 border-t border-gray-200 flex items-center gap-3 flex-wrap">
          <span className="text-sm font-semibold text-gray-500">Share:</span>
          {['🔗 Copy Link', '📘 Facebook', '🐦 Twitter'].map(s => (
            <button key={s} onClick={() => toast.success(`${s.split(' ')[1]} copied/shared!`)} className="btn btn-outline btn-sm">{s}</button>
          ))}
        </div>
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
          <h3 className="font-head font-bold text-navy-800 text-lg mb-2">Need Expert Help?</h3>
          <p className="text-sm text-gray-500 mb-4">Our counselors are ready to guide you through the entire application process.</p>
          <div className="flex gap-2 flex-wrap">
            <Link to="/services" className="btn btn-primary">View Our Packages</Link>
            <Link to="/contact" className="btn btn-outline">Book Free Consultation</Link>
          </div>
        </div>
      </div>
    </>
  )
}
