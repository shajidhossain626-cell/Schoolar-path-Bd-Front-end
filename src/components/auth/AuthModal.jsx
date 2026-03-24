import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login')
  const { login, signup, socialLogin } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm()

  if (!isOpen) return null

  const switchTab = (t) => { setTab(t); reset() }

  const onSubmit = async (data) => {
    try {
      if (tab === 'login') await login(data.email, data.password)
      else await signup(data)
      onClose()
      navigate('/dashboard')
    } catch (err) {
      // errors shown via toast
    }
  }

  const handleSocial = async (provider) => {
    await socialLogin(provider)
    onClose()
    navigate('/dashboard')
  }

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[1000] flex items-center justify-center p-5"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl p-9 w-full max-w-md relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors">
          ✕
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 font-head font-black text-lg text-navy-800 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-navy-800 rounded-lg flex items-center justify-center text-base">🎓</div>
          Scholar<span className="text-green-600">Path</span>
        </div>

        {/* Tabs */}
        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          {['login', 'signup'].map(t => (
            <button key={t} onClick={() => switchTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white text-navy-800 shadow-sm' : 'text-gray-500'}`}>
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {['Google', 'Facebook'].map(p => (
            <button key={p} onClick={() => handleSocial(p)}
              className="flex items-center justify-center gap-2 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all">
              {p === 'Google' ? '🌐' : '📘'} {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-5 text-xs text-gray-400">
          <div className="flex-1 h-px bg-gray-200" />or continue with email<div className="flex-1 h-px bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {tab === 'signup' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">First Name</label>
                <input className={`input ${errors.firstName ? 'input-error' : ''}`} placeholder="Rahul"
                  {...register('firstName', { required: 'Required' })} />
                {errors.firstName && <p className="error-msg">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="label">Last Name</label>
                <input className="input" placeholder="Ahmed" {...register('lastName')} />
              </div>
            </div>
          )}
          <div>
            <label className="label">Email Address</label>
            <input type="email" className={`input ${errors.email ? 'input-error' : ''}`} placeholder="you@example.com"
              {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })} />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className={`input ${errors.password ? 'input-error' : ''}`}
              placeholder={tab === 'signup' ? 'Minimum 8 characters' : 'Enter your password'}
              {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })} />
            {errors.password && <p className="error-msg">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting}
            className="btn btn-blue btn-block mt-1">
            {isSubmitting ? 'Please wait...' : tab === 'login' ? 'Sign In →' : 'Create Account →'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-4">
          {tab === 'login'
            ? <>Forgot password? <a href="#" className="text-blue-600">Reset here</a></>
            : <>By signing up you agree to our <a href="#" className="text-blue-600">Terms</a> & <a href="#" className="text-blue-600">Privacy Policy</a></>}
        </p>
      </div>
    </div>
  )
}
