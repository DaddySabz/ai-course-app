"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

export default function WaitroseAuthForm() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingEmail, setCheckingEmail] = useState(false)

  const checkEmailExists = async () => {
    if (!email || !email.includes("@")) return
    
    setCheckingEmail(true)
    setError("")
    
    try {
      const res = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })
      
      const data = await res.json()
      setIsNewUser(!data.exists)
    } catch (err) {
      console.error("Error checking email:", err)
    } finally {
      setCheckingEmail(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (isNewUser && !name) {
      setError("Please enter your name")
      setLoading(false)
      return
    }

    if (isNewUser && password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      if (isNewUser) {
        // Sign up new user with Waitrose partner code
        const signupRes = await fetch("/api/auth/signup-partner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            email, 
            password, 
            name,
            partnerType: "waitrose",
            partnerCode: "waitrose19"
          })
        })

        const signupData = await signupRes.json()

        if (!signupRes.ok) {
          setError(signupData.error || "Sign up failed")
          setLoading(false)
          return
        }
      }

      // Sign in
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      })

      if (result?.error) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      // Success! Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="btn-neumorphic w-full py-4 rounded-2xl font-semibold text-lg"
      >
        Waitrose Partner Access
      </button>
    )
  }

  return (
    <div className="animate-slideDown">
      <div className="glass-inset rounded-2xl p-6 mb-4">
        <h3 className="text-lg font-bold text-text-primary mb-3">
          {isNewUser ? "Create Waitrose Partner Account" : "Waitrose Partner Login"}
        </h3>
        
        {/* Warning Message */}
        <div className="glass-peach p-4 rounded-xl mb-4">
          <p className="text-sm font-semibold text-text-primary">
            ⚠️ <strong>Important:</strong> Use your personal email address, not your Waitrose work email. 
            Most Waitrose work emails cannot receive verification messages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Personal Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={checkEmailExists}
              disabled={loading || checkingEmail}
              className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green"
              placeholder="your.personal@email.com"
              required
            />
            {checkingEmail && (
              <p className="text-xs text-text-tertiary mt-1">Checking...</p>
            )}
          </div>

          {/* Name Field (only for new users) */}
          {isNewUser && (
            <div className="animate-slideDown">
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green"
                placeholder="Your Name"
                required
              />
            </div>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password (only for new users) */}
          {isNewUser && (
            <div className="animate-slideDown">
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-sage-green"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="glass-peach p-3 rounded-xl">
              <p className="text-sm font-semibold text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || checkingEmail}
            className="btn-neumorphic w-full py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Please wait..." : isNewUser ? "Create Account (£19)" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => setIsExpanded(false)}
          className="w-full mt-3 text-sm text-text-tertiary hover:text-text-primary"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

