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

      // If user already exists (returning tech partner), just log them in
      if (!signupRes.ok && signupData.existing) {
        // Try to sign in with the tech partner password
        const result = await signIn("credentials", {
          email,
          password: techPassword,
          redirect: false
        })

        if (result?.error) {
          // If login fails, show friendly message
          setError("You already have access! Please use the regular email login or contact support.")
          setLoading(false)
          return
        }

        // Success! Redirect
        window.location.href = "/dashboard"
        return
      }

      if (!signupRes.ok) {
        setError(signupData.error || "Sign up failed")
        setLoading(false)
        return
      }

      // New user - sign them in
      const result = await signIn("credentials", {
        email,
        password: techPassword,
        redirect: false
      })

      if (result?.error) {
        setError("Account created but login failed. Please contact support.")
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
      {/* Info Message */}
      <div className="glass-blue p-4 rounded-xl mb-4">
        <p className="text-sm font-semibold text-text-primary">
          For affiliate partners and organizations considering partnerships. 
          Get full, free access to review all course materials.
        </p>
      </div>

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
            <div className="glass-sage p-3 rounded-xl mb-4">
              <p className="text-xs text-sage-green">✓ Code validated</p>
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
