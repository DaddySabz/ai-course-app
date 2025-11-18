"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function EmailAuthForm() {
  const router = useRouter()
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignup) {
        // Signup
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name })
        })

        const data = await res.json()

        if (!res.ok) {
          setError(data.error || 'Failed to create account')
          setLoading(false)
          return
        }

        // Auto-login after successful signup
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError('Account created but login failed. Please try logging in.')
          setLoading(false)
          return
        }

        router.push('/dashboard')
      } else {
        // Login
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError('Invalid email or password')
          setLoading(false)
          return
        }

        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Auth error:', error)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold text-text-primary mb-4">
        {isSignup ? 'Create Account' : 'Sign In with Email'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignup && (
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-text-secondary mb-2">
              Name (Optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-text-secondary mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-sage-green"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          <p className="text-xs text-text-tertiary mt-1">Minimum 8 characters</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-neumorphic w-full rounded-2xl px-6 py-4 text-base font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup)
            setError('')
          }}
          className="text-sm font-semibold text-text-primary hover:text-sage-green transition-colors"
        >
          {isSignup ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
        </button>
      </div>
    </div>
  )
}

