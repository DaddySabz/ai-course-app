"use client"

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function EmailAuthForm() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)

  // Check if email exists when user finishes typing
  const checkEmailExists = async (emailValue: string) => {
    if (!emailValue || !emailValue.includes('@')) return
    
    setCheckingEmail(true)
    try {
      const res = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailValue })
      })
      const data = await res.json()
      setIsNewUser(!data.exists)
    } catch (error) {
      console.error('Error checking email:', error)
    } finally {
      setCheckingEmail(false)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value
    setEmail(emailValue)
    setError('')
  }

  const handleEmailBlur = () => {
    if (email) {
      checkEmailExists(email)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isNewUser) {
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

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="btn-neumorphic flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-base font-bold text-text-primary"
      >
        <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
        </svg>
        <span>Continue with Email</span>
      </button>
    )
  }

  return (
    <div className="w-full animate-slideDown">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-text-primary">
          {checkingEmail ? 'Checking...' : isNewUser ? 'Create Your Account' : 'Welcome Back'}
        </h3>
        <button
          onClick={() => {
            setIsExpanded(false)
            setEmail('')
            setPassword('')
            setName('')
            setError('')
          }}
          className="text-text-tertiary hover:text-text-primary text-xl"
        >
          ✕
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-secondary mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-sage-green"
          />
        </div>

        {email && (
          <>
            {isNewUser && (
              <div className="animate-slideDown">
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

            <div className="animate-slideDown">
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
              {isNewUser && (
                <p className="text-xs text-text-tertiary mt-1">Minimum 8 characters</p>
              )}
            </div>
          </>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email || !password}
          className="btn-neumorphic w-full rounded-2xl px-6 py-4 text-base font-bold text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Please wait...' : isNewUser ? 'Create Account & Sign In' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

