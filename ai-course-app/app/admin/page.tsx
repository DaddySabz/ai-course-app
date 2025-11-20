"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function AdminPage() {
  const session = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'users' | 'content'>('overview')
  const [adminPassword, setAdminPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)

  // Admin emails (add your email here)
  const ADMIN_EMAILS = [
    'wackyworksdigital@gmail.com',
    'hello@wearewacky.com'
  ]

  // Check if user is admin
  const isAdmin = session?.data?.user?.email && ADMIN_EMAILS.includes(session.data.user.email)

  // Simple password for non-logged-in admin access
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminPassword === 'wacky2024admin') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid password')
    }
  }

  // Redirect if not admin and not authenticated
  if (session.status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach via-cream to-sage-green flex items-center justify-center">
        <div className="text-text-primary font-semibold">Loading...</div>
      </div>
    )
  }

  // Show login if not admin
  if (!isAdmin && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-peach via-cream to-sage-green flex items-center justify-center p-4">
        <div className="card-neumorphic p-8 rounded-3xl max-w-md w-full">
          <h1 className="text-3xl font-black text-text-primary mb-6">Admin Access</h1>
          
          {!session.data ? (
            <div>
              <p className="text-text-secondary mb-4">Please sign in with an admin account first.</p>
              <button
                onClick={() => router.push('/login')}
                className="btn-neumorphic w-full py-3 rounded-xl font-semibold"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handlePasswordSubmit}>
              <p className="text-text-secondary mb-4">Enter admin password:</p>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass-inset text-text-primary mb-4"
                placeholder="Admin password"
              />
              <button
                type="submit"
                className="btn-neumorphic w-full py-3 rounded-xl font-semibold"
              >
                Access Admin
              </button>
            </form>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach via-cream to-sage-green p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="card-neumorphic p-6 rounded-3xl mb-8">
          <h1 className="text-4xl font-black text-text-primary mb-2">Admin Dashboard</h1>
          <p className="text-text-secondary">Manage your AI course platform</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'partners', label: 'Tech Partners' },
            { id: 'users', label: 'Users' },
            { id: 'content', label: 'Content' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'glass-lavender-clickable'
                  : 'glass-clickable'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'partners' && <PartnersTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'content' && <ContentTab />}
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
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="text-text-primary">Loading stats...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass p-6 rounded-2xl">
        <div className="text-text-tertiary text-sm font-semibold mb-2">Total Users</div>
        <div className="text-4xl font-black text-text-primary">{stats?.totalUsers || '0'}</div>
      </div>
      <div className="glass p-6 rounded-2xl">
        <div className="text-text-tertiary text-sm font-semibold mb-2">Active Today</div>
        <div className="text-4xl font-black text-text-primary">{stats?.activeToday || '0'}</div>
      </div>
      <div className="glass p-6 rounded-2xl">
        <div className="text-text-tertiary text-sm font-semibold mb-2">Completions</div>
        <div className="text-4xl font-black text-text-primary">{stats?.completions || '0'}</div>
      </div>
      <div className="glass p-6 rounded-2xl">
        <div className="text-text-tertiary text-sm font-semibold mb-2">Tech Partners</div>
        <div className="text-4xl font-black text-text-primary">{stats?.techPartners || '0'}</div>
      </div>
    </div>
  )
}

function PartnersTab() {
  const [partners, setPartners] = useState<any[]>([])
  const [newCode, setNewCode] = useState("")
  const [newOrg, setNewOrg] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    const res = await fetch('/api/admin/partners')
    const data = await res.json()
    setPartners(data.partners || [])
  }

  const createPartner = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/admin/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: newCode, organization: newOrg })
    })

    if (res.ok) {
      setNewCode("")
      setNewOrg("")
      loadPartners()
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Add New Partner */}
      <div className="card-neumorphic p-6 rounded-3xl">
        <h2 className="text-2xl font-black text-text-primary mb-4">Create Tech Partner Account</h2>
        <form onSubmit={createPartner} className="flex gap-4">
          <input
            type="text"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Partner Code (e.g., 'chatgpt')"
            className="flex-1 px-4 py-3 rounded-xl glass-inset text-text-primary"
            required
          />
          <input
            type="text"
            value={newOrg}
            onChange={(e) => setNewOrg(e.target.value)}
            placeholder="Organization (e.g., 'OpenAI')"
            className="flex-1 px-4 py-3 rounded-xl glass-inset text-text-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-neumorphic px-6 py-3 rounded-xl font-semibold"
          >
            Create
          </button>
        </form>
      </div>

      {/* Partners List */}
      <div className="card-neumorphic p-6 rounded-3xl">
        <h2 className="text-2xl font-black text-text-primary mb-4">Active Partner Codes</h2>
        <div className="space-y-3">
          {partners.length === 0 ? (
            <p className="text-text-secondary">No partners yet. Create one above.</p>
          ) : (
            partners.map((partner, i) => (
              <div key={i} className="glass p-4 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-text-primary">{partner.organization}</div>
                  <div className="text-sm text-text-tertiary">Code: {partner.code}</div>
                </div>
                <div className="text-sm text-text-tertiary">
                  {partner.accessCount || 0} accesses
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

  useEffect(() => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => setUsers(data.users || []))
  }, [])

  return (
    <div className="card-neumorphic p-6 rounded-3xl">
      <h2 className="text-2xl font-black text-text-primary mb-4">All Users</h2>
      <div className="space-y-2">
        {users.map((user, i) => (
          <div key={i} className="glass p-4 rounded-xl flex justify-between items-center">
            <div>
              <div className="font-bold text-text-primary">{user.name || user.email}</div>
              <div className="text-sm text-text-tertiary">{user.email}</div>
            </div>
            <div className="text-sm text-text-tertiary">
              {user.daysCompleted || 0} days completed
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContentTab() {
  return (
    <div className="space-y-6">
      <div className="card-neumorphic p-6 rounded-3xl">
        <h2 className="text-2xl font-black text-text-primary mb-4">Course Content</h2>
        <p className="text-text-secondary mb-4">
          To edit course content, modify the file: <code className="glass-inset px-2 py-1 rounded">data/course-data.ts</code>
        </p>
        <div className="glass-blue p-4 rounded-xl">
          <p className="text-sm text-text-primary font-semibold mb-2">Quick Links:</p>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Edit in your code editor</li>
            <li>• Push to GitHub</li>
            <li>• Vercel auto-deploys</li>
          </ul>
        </div>
      </div>

      <div className="card-neumorphic p-6 rounded-3xl">
        <h2 className="text-2xl font-black text-text-primary mb-4">Database Management</h2>
        <p className="text-text-secondary mb-4">Access your Supabase dashboard:</p>
        <a
          href="https://supabase.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-neumorphic inline-block px-6 py-3 rounded-xl font-semibold"
        >
          Open Supabase
        </a>
      </div>
    </div>
  )
}

