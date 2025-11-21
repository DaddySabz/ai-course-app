"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ProfileEditorProps {
  userId: string
  defaultName?: string | null
  defaultAvatar?: string | null
  defaultEmail?: string | null
  partnerType?: string | null
  organization?: string | null
}

export default function ProfileEditor({ userId, defaultName, defaultAvatar, defaultEmail, partnerType, organization }: ProfileEditorProps) {
  const router = useRouter()
  const isTechPartner = partnerType === 'tech'
  // For tech partners, organization is their username, defaultEmail is from session
  // We need to fetch their actual contact email from the profile
  const [displayName, setDisplayName] = useState(defaultName || defaultEmail?.split('@')[0] || 'AI Learner')
  const [displayOrg, setDisplayOrg] = useState(organization || '')
  const [displayEmail, setDisplayEmail] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(defaultAvatar || null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isEditingOrg, setIsEditingOrg] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [tempName, setTempName] = useState(displayName)
  const [tempOrg, setTempOrg] = useState(displayOrg)
  const [tempEmail, setTempEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Fetch user profile on mount
  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        if (data.profile) {
          const profileName = data.profile.display_name || data.profile.name || data.defaultName || data.defaultEmail?.split('@')[0] || 'AI Learner'
          setDisplayName(profileName)
          setTempName(profileName)
          setAvatarUrl(data.profile.avatar_url || data.defaultAvatar || null)
          if (data.profile.organization) {
            setDisplayOrg(data.profile.organization)
            setTempOrg(data.profile.organization)
          }
          // Set contact email (actual email) or fallback to default email
          const actualEmail = data.profile.contact_email || data.defaultEmail
          setContactEmail(actualEmail || '')
          setDisplayEmail(actualEmail || '')
          setTempEmail(actualEmail || '')
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be less than 2MB')
      return
    }

    // Convert to base64 for now (simple solution)
    const reader = new FileReader()
    reader.onload = async (event) => {
      const base64 = event.target?.result as string
      setAvatarUrl(base64)
      await saveProfile(displayName, base64)
      // Notify NavigationBar to update
      window.dispatchEvent(new Event('profileUpdated'))
      // Refresh the page to update server-side components (dashboard)
      router.refresh()
    }
    reader.readAsDataURL(file)
  }

  const handleNameSave = async () => {
    if (!tempName.trim()) {
      alert('Name cannot be empty')
      return
    }
    setDisplayName(tempName)
    setIsEditingName(false)
    await saveProfile(tempName, avatarUrl)
    // Notify NavigationBar to update
    window.dispatchEvent(new Event('profileUpdated'))
    // Refresh to update dashboard
    router.refresh()
  }

  const handleOrgSave = async () => {
    if (!tempOrg.trim()) {
      alert('Organization cannot be empty')
      return
    }
    setDisplayOrg(tempOrg)
    setIsEditingOrg(false)
    await saveProfile(displayName, avatarUrl)
  }

  const handleEmailSave = async () => {
    if (!tempEmail.trim() || !tempEmail.includes('@')) {
      alert('Please enter a valid email')
      return
    }
    setDisplayEmail(tempEmail)
    setIsEditingEmail(false)
    // TODO: Implement email change in backend
    alert('Email change functionality coming soon. This will require email verification.')
  }

  const handlePasswordSave = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please fill in all password fields')
      return
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }
    setIsEditingPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    // TODO: Implement password change in backend
    alert('Password change functionality coming soon.')
  }

  const saveProfile = async (name: string, avatar: string | null) => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: name,
          avatarUrl: avatar
        })
      })

      if (res.ok) {
        router.refresh()
      } else {
        const errorData = await res.json()
        console.error('Profile save error:', errorData)
        // Check if it's a "table doesn't exist" error
        if (errorData.error?.includes('relation') || errorData.error?.includes('does not exist')) {
          alert('⚠️ Database table not set up yet!\n\nPlease run supabase-profile-schema.sql in Supabase first.')
        } else {
          alert(`Failed to save profile: ${errorData.error || 'Unknown error'}`)
        }
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile: Network error')
    } finally {
      setIsSaving(false)
    }
  }

  const membershipType = isTechPartner 
    ? 'Technology Partner' 
    : partnerType === 'waitrose' 
    ? 'Waitrose Partner' 
    : 'General Access'

  return (
    <div className="w-full space-y-6">
      {/* Profile Picture */}
      <div className="flex flex-col items-center">
        <div className="relative group mb-2">
          {avatarUrl ? (
            <img 
              src={avatarUrl}
              alt="Profile" 
              className="size-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="size-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-br from-sage-green/30 to-lavender/30">
              <span className="text-5xl font-black text-text-primary">
                {(defaultName || defaultEmail)?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
          )}
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer">
            <span className="text-white text-sm font-semibold">Change Photo</span>
            <input 
              type="file" 
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={isSaving}
            />
          </label>
        </div>
        <p className="text-xs text-text-secondary text-center">
          Your photo will appear on your certificate
        </p>
      </div>

      {/* Name Field */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Name
        </label>
        {isEditingName ? (
          <div className="space-y-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSave()
                if (e.key === 'Escape') {
                  setTempName(displayName)
                  setIsEditingName(false)
                }
              }}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleNameSave}
                disabled={isSaving}
                className="flex-1 px-4 py-3 glass-sage-clickable rounded-xl font-bold text-text-primary"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setTempName(displayName)
                  setIsEditingName(false)
                }}
                className="flex-1 px-4 py-3 glass-clickable rounded-xl font-bold text-text-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div 
            onClick={() => setIsEditingName(true)}
            className="px-4 py-3 rounded-xl bg-white/50 text-text-primary font-semibold cursor-pointer hover:bg-white/70 transition-colors"
          >
            {displayName}
          </div>
        )}
      </div>

      {/* Organization/Company Field */}
      {displayOrg && (
        <div>
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
            Organization
          </label>
          {isEditingOrg ? (
            <div className="space-y-2">
              <input
                type="text"
                value={tempOrg}
                onChange={(e) => setTempOrg(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleOrgSave()
                  if (e.key === 'Escape') {
                    setTempOrg(displayOrg)
                    setIsEditingOrg(false)
                  }
                }}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOrgSave}
                  disabled={isSaving}
                  className="flex-1 px-4 py-3 glass-sage-clickable rounded-xl font-bold text-text-primary"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setTempOrg(displayOrg)
                    setIsEditingOrg(false)
                  }}
                  className="flex-1 px-4 py-3 glass-clickable rounded-xl font-bold text-text-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div 
              onClick={() => setIsEditingOrg(true)}
              className="px-4 py-3 rounded-xl bg-white/50 text-text-primary font-semibold cursor-pointer hover:bg-white/70 transition-colors"
            >
              {displayOrg}
            </div>
          )}
        </div>
      )}

      {/* Email Field */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Email
        </label>
        {isEditingEmail ? (
          <div className="space-y-2">
            <input
              type="email"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
              autoFocus
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleEmailSave}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-sage-green text-white rounded-xl font-bold hover:opacity-90 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setTempEmail(displayEmail)
                  setIsEditingEmail(false)
                }}
                className="flex-1 px-4 py-2 bg-text-tertiary/20 text-text-secondary rounded-xl font-bold hover:opacity-90 text-sm"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-text-tertiary">
              Changing your email will require verification
            </p>
          </div>
        ) : (
          <div 
            onClick={() => setIsEditingEmail(true)}
            className="px-4 py-3 rounded-xl bg-white/50 text-text-primary font-semibold cursor-pointer hover:bg-white/70 transition-colors"
          >
            {displayEmail || contactEmail || defaultEmail || 'No email set'}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Password
        </label>
        {isEditingPassword ? (
          <div className="space-y-2">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
              autoFocus
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handlePasswordSave}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-sage-green text-white rounded-xl font-bold hover:opacity-90 text-sm"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setCurrentPassword('')
                  setNewPassword('')
                  setConfirmPassword('')
                  setIsEditingPassword(false)
                }}
                className="flex-1 px-4 py-2 bg-text-tertiary/20 text-text-secondary rounded-xl font-bold hover:opacity-90 text-sm"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-text-tertiary">
              Password must be at least 8 characters
            </p>
          </div>
        ) : (
          <div 
            onClick={() => setIsEditingPassword(true)}
            className="px-4 py-3 rounded-xl bg-white/50 text-text-primary font-semibold cursor-pointer hover:bg-white/70 transition-colors"
          >
            ••••••••••
          </div>
        )}
      </div>

      {/* Membership Type (Read-only) */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Membership Type
        </label>
        <div className="px-4 py-3 rounded-xl bg-white/20 text-text-secondary">
          {membershipType}
        </div>
      </div>

      {/* Sign Out Button */}
      <div className="pt-4">
        <a
          href="/api/auth/signout"
          className="btn-neumorphic w-full rounded-2xl px-6 py-4 text-base font-bold text-red-600 hover:scale-[1.02] transition-transform block text-center"
        >
          Sign Out
        </a>
      </div>
    </div>
  )
}

