"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

// Admin credentials (stored in code for simplicity)
// TODO: Move to database for production
const ADMIN_ACCOUNTS = [
  { email: 'admin@wearewacky.com', password: 'wacky2024admin' },
  { email: 'saby@wearewacky.com', password: 'wacky2024admin' }
]

export default function AdminPortalPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'users'>('overview')
  
  // Login form
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session')
    if (adminSession) {
      setIsLoggedIn(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Check credentials
    const admin = ADMIN_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    )

    if (admin) {
      localStorage.setItem('admin_session', email)
      setIsLoggedIn(true)
    } else {
      setError("Invalid email or password")
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    setIsLoggedIn(false)
    setEmail("")
    setPassword("")
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h1>
          <p className="text-gray-600 mb-6">Course Management System</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="admin@wearewacky.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> This is the admin-only portal. Regular users should use the main login page.
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Portal</h1>
            <p className="text-sm text-gray-600">Logged in as: {localStorage.getItem('admin_session')}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'partners', label: 'Tech Partners' },
            { id: 'users', label: 'All Users' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'partners' && <PartnersTab />}
          {activeTab === 'users' && <UsersTab />}
        </div>
      </div>
    </div>
  )
}

function OverviewTab() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => {
        setStats({ totalUsers: 0, activeToday: 0, completions: 0, techPartners: 0 })
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-gray-600">Loading stats...</div>

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Platform Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 font-semibold mb-1">Total Users</div>
          <div className="text-3xl font-bold text-blue-900">{stats?.totalUsers || '0'}</div>
        </div>
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="text-sm text-green-600 font-semibold mb-1">Active Today</div>
          <div className="text-3xl font-bold text-green-900">{stats?.activeToday || '0'}</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="text-sm text-purple-600 font-semibold mb-1">Completions</div>
          <div className="text-3xl font-bold text-purple-900">{stats?.completions || '0'}</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="text-sm text-orange-600 font-semibold mb-1">Tech Partners</div>
          <div className="text-3xl font-bold text-orange-900">{stats?.techPartners || '0'}</div>
        </div>
      </div>
    </div>
  )
}

function PartnersTab() {
  const [partners, setPartners] = useState<any[]>([])
  const [newCode, setNewCode] = useState("")
  const [newOrg, setNewOrg] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      const res = await fetch('/api/admin/partners')
      const data = await res.json()
      setPartners(data.partners || [])
    } catch (error) {
      console.error('Failed to load partners')
    }
  }

  const createPartner = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: newCode.toLowerCase(), organization: newOrg })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("✅ Partner account created successfully!")
        setNewCode("")
        setNewOrg("")
        loadPartners()
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage("❌ Failed to create partner account")
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create Tech Partner Account</h2>
        <form onSubmit={createPartner} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Partner Code
              </label>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="e.g., 'chatgpt' or 'demo'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                value={newOrg}
                onChange={(e) => setNewOrg(e.target.value)}
                placeholder="e.g., 'OpenAI' or 'Demo Company'"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Partner Account"}
          </button>
          {message && (
            <div className={`p-3 rounded-lg ${message.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              {message}
            </div>
          )}
        </form>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Active Partner Codes</h2>
        <div className="space-y-2">
          {partners.length === 0 ? (
            <p className="text-gray-600">No partner accounts yet. Create one above.</p>
          ) : (
            partners.map((partner, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div>
                  <div className="font-bold text-gray-800">{partner.organization}</div>
                  <div className="text-sm text-gray-600">Code: <code className="bg-gray-200 px-2 py-1 rounded">{partner.partner_code}</code></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function UsersTab() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || [])
        setLoading(false)
      })
      .catch(() => {
        setUsers([])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-gray-600">Loading users...</div>

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">All Users ({users.length})</h2>
      <div className="space-y-2">
        {users.length === 0 ? (
          <p className="text-gray-600">No users yet.</p>
        ) : (
          users.map((user, i) => (
            <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <div className="font-bold text-gray-800">{user.name || user.email}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
              <div className="text-sm text-gray-600">
                {user.daysCompleted || 0} / 30 days completed
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

