"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ProfileEditorProps {
  userId: string
  defaultName?: string | null
  defaultAvatar?: string | null
  defaultEmail?: string | null
}

export default function ProfileEditor({ userId, defaultName, defaultAvatar, defaultEmail }: ProfileEditorProps) {
  const router = useRouter()
  const [displayName, setDisplayName] = useState(defaultName || defaultEmail || 'AI Learner')
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar || '/placeholder-avatar.png')
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
          setAvatarUrl(data.profile.avatar_url || data.defaultAvatar || '/placeholder-avatar.png')
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

  const saveProfile = async (name: string, avatar: string) => {
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
        alert('Failed to save profile')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="card-neumorphic rounded-3xl p-6 w-full mb-6">
      <div className="relative group mb-4">
        <img 
          src={avatarUrl}
          alt="Profile" 
          className="size-24 rounded-full border-4 border-white shadow-lg mx-auto"
        />
        <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm cursor-pointer">
          <span className="text-white text-xs font-semibold">Change</span>
          <input 
            type="file" 
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
            disabled={isSaving}
          />
        </label>
      </div>
      
      {isEditingName ? (
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="text-xl font-bold text-center w-full bg-transparent border-b-2 border-sage-green focus:outline-none px-2 py-2 text-text-primary"
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
            className="text-sage-green font-bold text-sm"
          >
            Save
          </button>
          <button
            onClick={() => {
              setTempName(displayName)
              setIsEditingName(false)
            }}
            className="text-text-tertiary font-bold text-sm"
          >
            Cancel
          </button>
        </div>
      ) : (
        <h3 
          className="text-xl font-bold text-text-primary cursor-pointer hover:text-sage-green transition-colors"
          onClick={() => setIsEditingName(true)}
        >
          {displayName}
        </h3>
      )}
    </div>
  )
}

