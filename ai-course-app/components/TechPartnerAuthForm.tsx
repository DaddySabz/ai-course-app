"use client"

import { useState } from "react"

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
  const [validatingCode, setValidatingCode] = useState(false)

  const validateCode = () => {
    if (!code.trim()) return

    setValidatingCode(true)
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

    setValidatingCode(false)
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
      // Create tech partner account with instant access
      const signupRes = await fetch("/api/auth/signup-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password: `tech-${code}-${Date.now()}`, // Auto-generated password
          name,
          partnerType: "tech",
          partnerCode: code,
          organization
        })
      })

      const signupData = await signupRes.json()

      if (!signupRes.ok) {
        setError(signupData.error || "Sign up failed")
        setLoading(false)
        return
      }

      // Success! Show success message and redirect
      alert(`Welcome ${name}! You now have full FREE access to all course materials.`)
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
      <div className="glass-inset rounded-2xl p-6 mb-4">
        {/* Info Message */}
        <div className="glass-blue p-4 rounded-xl mb-4">
          <p className="text-sm font-semibold text-text-primary">
            For affiliate partners and organizations considering partnerships. 
            Get full, free access to review all course materials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Partner Code Field - Always visible */}
          <div>
            <label className="block text-sm font-semibold text-text-secondary mb-2">
              Partner Code
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onBlur={validateCode}
              disabled={loading || codeValidated}
              className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary focus:outline-none focus:ring-2 focus:ring-lavender"
              placeholder="Enter your partner code"
              required
            />
            {validatingCode && (
              <p className="text-xs text-text-tertiary mt-1">Validating...</p>
            )}
            {codeValidated && (
              <p className="text-xs text-sage-green mt-1">✓ Code validated</p>
            )}
          </div>

          {/* Expanded fields after code validation */}
          {codeValidated && (
            <div className="animate-slideDown space-y-4">
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
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="glass-peach p-3 rounded-xl">
              <p className="text-sm font-semibold text-red-600">{error}</p>
            </div>
          )}

          {/* Submit Button - Only show after code validated */}
          {codeValidated && (
            <button
              type="submit"
              disabled={loading}
              className="btn-neumorphic w-full py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? "Setting up your access..." : "Get Free Access"}
            </button>
          )}

          {/* Reset button if code validated */}
          {codeValidated && (
            <button
              type="button"
              onClick={handleReset}
              className="w-full text-sm text-text-tertiary hover:text-text-primary"
            >
              Use different code
            </button>
          )}
        </form>

        {!codeValidated && (
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full mt-3 text-sm text-text-tertiary hover:text-text-primary"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
