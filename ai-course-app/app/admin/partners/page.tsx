'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import AdminNav from '@/components/AdminNav'

interface Partner {
  id: string
  partner_code: string
  organization: string
  created_at: string
}

const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']

export default function AdminPartnersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [newCode, setNewCode] = useState('')
  const [newOrg, setNewOrg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const isAdmin = session?.user?.email && ADMIN_EMAILS.includes(session.user.email)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/')
    } else if (status === 'authenticated' && !isAdmin) {
      router.push('/dashboard')
    } else if (status === 'authenticated' && isAdmin) {
      loadPartners()
    }
  }, [status, isAdmin, router])

  const loadPartners = async () => {
    try {
      const res = await fetch('/api/admin/partners')
      const data = await res.json()
      setPartners(data.partners || [])
    } catch (error) {
      console.error('Failed to load partners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePartner = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: newCode.toLowerCase().trim(), 
          organization: newOrg.trim() 
        })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Partner account created successfully!')
        setNewCode('')
        setNewOrg('')
        loadPartners()
      } else {
        setMessage(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setMessage('❌ Failed to create partner account')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePartner = async (partnerId: string, partnerCode: string) => {
    if (!confirm(`Are you sure you want to delete partner code "${partnerCode}"?`)) {
      return
    }

    try {
      const res = await fetch(`/api/admin/partners/${partnerId}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        loadPartners()
      } else {
        alert('Failed to delete partner')
      }
    } catch (error) {
      alert('Failed to delete partner')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-text-secondary">Loading...</div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="card-neumorphic rounded-3xl p-10 text-center">
          <h1 className="text-4xl font-black text-text-primary mb-4">Access Denied</h1>
          <p className="text-text-secondary">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <AdminNav />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-text-primary mb-2">Tech Partners</h1>
          <p className="text-text-secondary">Create and manage partner access codes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card-neumorphic rounded-2xl p-6">
            <div className="text-3xl font-black text-text-primary">{partners.length}</div>
            <div className="text-sm text-text-secondary font-medium">Total Partners</div>
          </div>
          <div className="card-neumorphic rounded-2xl p-6">
            <div className="text-3xl font-black text-sage-green">{partners.length}</div>
            <div className="text-sm text-text-secondary font-medium">Active Codes</div>
          </div>
          <div className="card-neumorphic rounded-2xl p-6">
            <div className="text-3xl font-black text-lavender">∞</div>
            <div className="text-sm text-text-secondary font-medium">Uses Per Code</div>
          </div>
        </div>

        {/* Create Partner Form */}
        <div className="card-neumorphic rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">Create New Partner Code</h2>
          <form onSubmit={handleCreatePartner} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  Partner Code
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  placeholder="e.g., 'openai' or 'microsoft'"
                  className="w-full px-4 py-3 rounded-xl border-2 border-text-tertiary/20 bg-white/50 
                             text-text-primary placeholder:text-text-tertiary
                             focus:border-sage-green focus:outline-none transition-colors"
                  required
                />
                <p className="text-xs text-text-tertiary mt-2">
                  Users will visit: /signup?partner=<span className="font-mono">{newCode || 'code'}</span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-secondary mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  placeholder="e.g., 'OpenAI' or 'Microsoft'"
                  className="w-full px-4 py-3 rounded-xl border-2 border-text-tertiary/20 bg-white/50 
                             text-text-primary placeholder:text-text-tertiary
                             focus:border-sage-green focus:outline-none transition-colors"
                  required
                />
                <p className="text-xs text-text-tertiary mt-2">
                  This will appear on their certificate
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting || !newCode || !newOrg}
                className="px-6 py-3 bg-sage-green text-white rounded-xl font-bold 
                           hover:bg-sage-green/90 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-all"
              >
                {isSubmitting ? 'Creating...' : '+ Create Partner Code'}
              </button>
              
              {message && (
                <span className={`text-sm font-medium ${
                  message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {message}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Partners List */}
        <div className="card-neumorphic rounded-3xl p-8">
          <h2 className="text-xl font-bold text-text-primary mb-6">Active Partner Codes ({partners.length})</h2>
          
          {partners.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-text-secondary">No partner codes yet</p>
              <p className="text-text-tertiary mt-2">Create one using the form above</p>
            </div>
          ) : (
            <div className="space-y-4">
              {partners.map((partner) => (
                <div 
                  key={partner.id} 
                  className="flex items-center justify-between p-6 rounded-2xl border-2 border-text-tertiary/20 
                             hover:border-sage-green/50 transition-colors bg-white/30"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-text-primary text-lg">{partner.organization}</h3>
                      <span className="px-3 py-1 rounded-full bg-sage-green/20 text-sage-green text-xs font-bold">
                        ACTIVE
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-text-secondary">
                      <span>
                        Code: <code className="px-2 py-1 bg-text-tertiary/10 rounded font-mono">{partner.partner_code}</code>
                      </span>
                      <span>•</span>
                      <span>
                        Created: {new Date(partner.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/signup?partner=${partner.partner_code}`)
                        alert('Partner signup link copied!')
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-text-secondary 
                                 bg-white/50 hover:bg-white transition-colors"
                    >
                      📋 Copy Link
                    </button>
                    <button
                      onClick={() => handleDeletePartner(partner.id, partner.partner_code)}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-red-600 
                                 bg-red-50 hover:bg-red-100 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

