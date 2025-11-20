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
  const [displayName, setDisplayName] = useState(defaultName || defaultEmail?.split('@')[0] || 'AI Learner')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(defaultAvatar || null)
  const [isEditingName, setIsEditingName] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [tempName, setTempName] = useState(displayName)

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
          setDisplayName(data.profile.display_name || data.defaultName || data.defaultEmail || 'AI Learner')
          setAvatarUrl(data.profile.avatar_url || data.defaultAvatar || null)
          setTempName(data.profile.display_name || data.defaultName || data.defaultEmail || 'AI Learner')
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
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/50 border-2 border-sage-green focus:outline-none text-text-primary font-semibold"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleNameSave()
                if (e.key === 'Escape') {
                  setTempName(displayName)
                  setIsEditingName(false)
                }
              }}
            />
            <button
              onClick={handleNameSave}
              disabled={isSaving}
              className="px-4 py-3 bg-sage-green text-white rounded-xl font-bold hover:opacity-90"
            >
              Save
            </button>
            <button
              onClick={() => {
                setTempName(displayName)
                setIsEditingName(false)
              }}
              className="px-4 py-3 bg-text-tertiary/20 text-text-secondary rounded-xl font-bold hover:opacity-90"
            >
              Cancel
            </button>
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
      {organization && (
        <div>
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
            Organization
          </label>
          <div className="px-4 py-3 rounded-xl bg-white/50 text-text-primary font-semibold">
            {organization}
          </div>
        </div>
      )}

      {/* Email Field (Read-only) */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Email
        </label>
        <div className="px-4 py-3 rounded-xl bg-white/30 text-text-secondary font-semibold">
          {defaultEmail}
        </div>
      </div>

      {/* Password Field (Placeholder) */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Password
        </label>
        <div className="px-4 py-3 rounded-xl bg-white/30 text-text-secondary font-semibold">
          ••••••••••
        </div>
        <p className="text-xs text-text-secondary mt-1">
          Password management coming soon
        </p>
      </div>

      {/* Membership Type (Read-only) */}
      <div>
        <label className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2 block">
          Membership Type
        </label>
        <div className="px-4 py-3 rounded-xl bg-white/30 text-text-secondary font-semibold">
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

