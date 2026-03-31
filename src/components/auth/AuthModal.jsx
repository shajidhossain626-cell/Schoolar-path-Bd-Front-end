import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@context/AuthContext'
import { useNavigate } from 'react-router-dom'

const WHATSAPP = 'https://wa.me/8801889700879?text=' + encodeURIComponent("Hi ScholarPath BD! I'd like to create an account and start my scholarship journey.")

export default function AuthModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login')
  const [err, setErr] = useState('')
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm()

  if (!isOpen) return null

  const switchTab = (t) => { setTab(t); reset(); setErr('') }

  const onSubmit = async (data) => {
    setErr('')
    try {
      if (tab === 'login') await login(data.email, data.password)
      else await signup(data)
      onClose()
      navigate('/dashboard')
    } catch (e) {
      setErr(e.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/55 backdrop-blur-sm z-[1000] flex items-center justify-center p-5"
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-3xl w-full max-w-md relative shadow-2xl">

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm transition-colors z-10">
          ✕
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-700 rounded-t-3xl px-8 pt-8 pb-6 text-white text-center">
          <div className="text-3xl mb-2">🎓</div>
          <div className="font-head font-black text-xl">ScholarPath BD</div>
          <div className="text-white/60 text-xs mt-1">Your scholarship journey starts here</div>
        </div>

        <div className="px-8 py-6">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
            {[['login','Sign In'], ['signup','Create Account']].map(([t, l]) => (
              <button key={t} onClick={() => switchTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-white text-navy-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                {l}
              </button>
            ))}
          </div>

          {/* Error */}
          {err && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg px-3 py-2.5 mb-4">
              ❌ {err}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            {tab === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">First Name <span className="text-red-500">*</span></label>
                  <input className={`input ${errors.firstName ? 'border-red-400' : ''}`} placeholder="Rafiqul"
                    {...register('firstName', { required: 'Required' })} />
                  {errors.firstName && <p className="text-red-500 text-[10px] mt-0.5">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="label">Last Name</label>
                  <input className="input" placeholder="Alam" {...register('lastName')} />
                </div>
              </div>
            )}

            <div>
              <label className="label">Email Address <span className="text-red-500">*</span></label>
              <input type="email" className={`input ${errors.email ? 'border-red-400' : ''}`}
                placeholder="you@gmail.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' }
                })} />
              {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password <span className="text-red-500">*</span></label>
              <input type="password" className={`input ${errors.password ? 'border-red-400' : ''}`}
                placeholder={tab === 'signup' ? 'Minimum 8 characters' : 'Your password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 8, message: 'Minimum 8 characters' }
                })} />
              {errors.password && <p className="text-red-500 text-[10px] mt-0.5">{errors.password.message}</p>}
            </div>

            {tab === 'signup' && (
              <div>
                <label className="label">Confirm Password <span className="text-red-500">*</span></label>
                <input type="password" className={`input ${errors.confirmPassword ? 'border-red-400' : ''}`}
                  placeholder="Repeat your password"
                  {...register('confirmPassword', {
                    required: 'Please confirm password',
                    validate: v => v === watch('password') || 'Passwords do not match'
                  })} />
                {errors.confirmPassword && <p className="text-red-500 text-[10px] mt-0.5">{errors.confirmPassword.message}</p>}
              </div>
            )}

            <button type="submit" disabled={isSubmitting}
              className="btn btn-primary btn-block mt-2 py-3">
              {isSubmitting
                ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Please wait...</span>
                : tab === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />or<div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* WhatsApp option */}
          <a href={WHATSAPP} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-2.5 rounded-xl border-2 text-sm font-semibold transition-all no-underline"
            style={{background:'#f0fdf4', borderColor:'#86efac', color:'#15803d'}}>
            <span style={{fontSize:18}}>💬</span>
            Contact us on WhatsApp instead
          </a>

          <p className="text-center text-xs text-gray-400 mt-4">
            {tab === 'login'
              ? <>Don't have an account? <button onClick={() => switchTab('signup')} className="text-blue-600 font-semibold">Create one free →</button></>
              : <>Already have an account? <button onClick={() => switchTab('login')} className="text-blue-600 font-semibold">Sign in →</button></>}
          </p>

          {tab === 'signup' && (
            <p className="text-center text-[10px] text-gray-400 mt-2">
              By signing up you agree to our <a href="#" className="text-blue-600">Terms</a> & <a href="#" className="text-blue-600">Privacy Policy</a>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
