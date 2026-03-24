import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <div className="text-7xl mb-6">🎓</div>
        <h1 className="font-head font-black text-4xl text-navy-800 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">The page you're looking for doesn't exist. But there are plenty of scholarships waiting for you!</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="btn btn-primary">Go Home</Link>
          <Link to="/scholarships" className="btn btn-outline">Browse Scholarships</Link>
        </div>
      </div>
    </div>
  )
}
