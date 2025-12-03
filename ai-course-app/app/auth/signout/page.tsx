'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignOutPage() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut({ callbackUrl: '/' })
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card-neumorphic rounded-3xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-lavender/30 flex items-center justify-center">
          <span className="text-4xl">👋</span>
        </div>
        
        <h1 className="text-3xl font-black text-text-primary mb-3">
          Leaving so soon?
        </h1>
        
        <p className="text-text-secondary mb-8">
          Are you sure you want to sign out? We'll miss you!
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 px-6 py-4 rounded-xl font-bold text-text-primary 
                       bg-white/50 hover:bg-white border-2 border-text-tertiary/20
                       transition-all hover:scale-[1.02]"
          >
            ← Stay Here
          </button>
          
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex-1 px-6 py-4 rounded-xl font-bold text-white 
                       bg-gradient-to-r from-rose-500 to-rose-600
                       hover:from-rose-600 hover:to-rose-700
                       transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>

        <p className="text-text-tertiary text-sm mt-6">
          You can always come back and continue your learning journey.
        </p>
      </div>
    </div>
  )
}

