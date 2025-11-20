"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"

// Predefined partner codes with organization names
const PARTNER_CODES: Record<string, string> = {
  'chatgpt': 'OpenAI',
  'openai': 'OpenAI',
  'claude': 'Anthropic',
  'anthropic': 'Anthropic',
  'gemini': 'Google',
  'google': 'Google',
  'notion': 'Notion',
  'adobe': 'Adobe',
  'microsoft': 'Microsoft',
  'meta': 'Meta',
  'apple': 'Apple',
  'amazon': 'Amazon',
  'tesla': 'Tesla',
  'nvidia': 'NVIDIA',
  'salesforce': 'Salesforce',
  'demo': 'Demo Company',
  'test': 'Test Organization'
}

export default function TechPartnerAuthForm() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [codeValidated, setCodeValidated] = useState(false)
  const [code, setCode] = useState("")
  const [organization, setOrganization] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const validateCode = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!code.trim()) {
      setError("Please enter a partner code")
      return
    }

    setError("")

    // Check if code is valid
    const normalizedCode = code.toLowerCase().trim()
    const orgName = PARTNER_CODES[normalizedCode]

    if (orgName) {
      setOrganization(orgName)
      setCodeValidated(true)
      setError("")
    } else {
      setError("Invalid partner code. Please contact us for access.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!code || !organization || !name || !email) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      // Use predictable password for tech partners so they can return
      const techPassword = `tech-${code.toLowerCase()}-partner`
      
      // Create tech partner account with instant access
      const signupRes = await fetch("/api/auth/signup-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password: techPassword,
          name,
          partnerType: "tech",
          partnerCode: code,
          organization
        })
      })

      const signupData = await signupRes.json()

      // If user already exists (returning tech partner), show success
      if (!signupRes.ok && signupData.existing) {
        // They already have access - just redirect them
        window.location.href = "/dashboard"
        return
      }

      if (!signupRes.ok) {
        setError(signupData.error || "Access request failed")
        setLoading(false)
        return
      }

      // New user - wait a moment for database to sync, then sign in
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const result = await signIn("credentials", {
        email,
        password: techPassword,
        redirect: false
      })

      if (result?.error) {
        // Login failed after account creation - try one more time
        await new Promise(resolve => setTimeout(resolve, 1000))
        const retryResult = await signIn("credentials", {
          email,
          password: techPassword,
          redirect: false
        })
        
        if (retryResult?.error) {
          setError("Setup complete! Please refresh the page and log in again.")
          setLoading(false)
          return
        }
      }

      // Success! Redirect to dashboard
      window.location.href = "/dashboard"
    } catch (err) {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  const handleReset = () => {
    setCodeValidated(false)
    setCode("")
    setOrganization("")
    setName("")
    setEmail("")
    setError("")
  }

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="btn-neumorphic w-full py-4 rounded-2xl font-semibold text-lg"
      >
        Technology Partners
      </button>
    )
  }

  return (
    <div className="animate-slideDown">
      {/* Info Message - only show before code validation */}
      {!codeValidated && (
        <div className="glass-blue p-4 rounded-xl mb-4">
          <p className="text-sm font-semibold text-text-primary">
            For affiliate partners and organizations considering partnerships. 
            Get full, free access to review all course materials.
          </p>
        </div>
      )}

      <div className="glass-inset rounded-2xl p-6">
        {!codeValidated ? (
          /* Step 1: Code Entry Form */
          <form onSubmit={validateCode} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Partner Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-lavender"
                placeholder="Enter your partner code"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="glass-peach p-3 rounded-xl">
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
            )}

            {/* Continue Button */}
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="btn-neumorphic w-full py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              Continue
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="w-full text-sm text-text-tertiary hover:text-text-primary"
            >
              Cancel
            </button>
          </form>
        ) : (
          /* Step 2: Contact Info Form */
          <form onSubmit={handleSubmit} className="space-y-4 animate-slideDown">
            {/* Show Partner Code */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Partner Code
              </label>
              <input
                type="text"
                value={code}
                disabled
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary bg-white/50 cursor-not-allowed"
              />
              <p className="text-xs text-sage-green mt-1">✓ Code validated</p>
            </div>

            {/* Organization Field (pre-filled, read-only) */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Organization
              </label>
              <input
                type="text"
                value={organization}
                disabled
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary bg-white/50 cursor-not-allowed"
                required
              />
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-lavender"
                placeholder="Full Name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-text-secondary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-lavender"
                placeholder="your@company.com"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="glass-peach p-3 rounded-xl">
                <p className="text-sm font-semibold text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-neumorphic w-full py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Setting up your access..." : "Log In"}
            </button>

            {/* Reset button */}
            <button
              type="button"
              onClick={handleReset}
              className="w-full text-sm text-text-tertiary hover:text-text-primary"
            >
              Use different code
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
