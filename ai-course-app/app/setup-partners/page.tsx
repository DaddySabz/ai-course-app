"use client"

import { useState } from "react"

export default function SetupPartnersPage() {
  const [status, setStatus] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const runSetup = async () => {
    setLoading(true)
    setStatus("Creating master accounts...")

    try {
      const response = await fetch("/api/setup-tech-partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ setupKey: "ai-course-setup-2024" })
      })

      const data = await response.json()

      if (data.success) {
        setStatus("✅ Success! Master accounts created.")
        setResults(data.results)
      } else {
        setStatus(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setStatus(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-cream to-sage-green p-8">
      <div className="max-w-2xl mx-auto">
        <div className="card-neumorphic p-8 rounded-3xl">
          <h1 className="text-3xl font-black text-text-primary mb-4">
            Tech Partner Setup
          </h1>
          
          <p className="text-text-secondary mb-6">
            Click the button below to create master accounts for all partner codes.
            This only needs to be done once.
          </p>

          <button
            onClick={runSetup}
            disabled={loading}
            className="btn-neumorphic px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Setting up..." : "Create Master Accounts"}
          </button>

          {status && (
            <div className="mt-6 glass p-4 rounded-xl">
              <p className="font-semibold text-text-primary">{status}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="mt-6 space-y-2">
              <h2 className="font-bold text-text-primary">Results:</h2>
              {results.map((result, i) => (
                <div key={i} className="glass-inset p-3 rounded-lg text-sm">
                  <span className="font-semibold">{result.organization}</span> 
                  <span className="text-text-tertiary"> (code: {result.code})</span>
                  <span className={`ml-2 ${result.status === 'created' ? 'text-green-600' : 'text-text-tertiary'}`}>
                    {result.status}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 glass-blue p-4 rounded-xl">
            <h3 className="font-bold text-text-primary mb-2">Test Codes:</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• <strong>demo</strong> → Demo Company</li>
              <li>• <strong>test</strong> → Test Organization</li>
              <li>• <strong>chatgpt</strong> → OpenAI</li>
              <li>• <strong>gemini</strong> → Google</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

