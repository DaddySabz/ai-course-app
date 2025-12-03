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
        
        <h1 className="text-3xl font-black text-text-primary mb-8">
          Leaving so soon?
        </h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleCancel}
            className="btn-neumorphic flex-1 px-6 py-4 rounded-xl font-bold text-text-primary 
                       hover:scale-[1.02] transition-transform"
          >
            Stay Here
          </button>
          
          <button
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="btn-neumorphic flex-1 px-6 py-4 rounded-xl font-bold text-red-600
                       hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {isSigningOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </div>
  )
}

