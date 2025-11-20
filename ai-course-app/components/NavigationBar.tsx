"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function NavigationBar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null)

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Course", path: "/module" },
    { name: "Certificate", path: "/certificate" },
    { name: "Profile", path: "/profile" },
  ]

  // Fetch updated profile avatar
  useEffect(() => {
    if (session?.user) {
      fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
          if (data.profile?.avatar_url) {
            setProfileAvatar(data.profile.avatar_url)
          } else if (data.defaultAvatar) {
            setProfileAvatar(data.defaultAvatar)
          }
        })
        .catch(err => console.error('Error fetching profile:', err))
    }
  }, [session])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 card-neumorphic border-b border-text-tertiary/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <h1 className="text-xl font-bold text-text-primary">Introduction to AI</h1>

          {/* Navigation Links */}
          <div className="flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "glass-blue text-text-primary shadow-md"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/30"
                  }`}
                >
                  {item.name}
                </a>
              )
            })}

            {/* User Profile Picture - Clickable */}
            {session?.user && (
              <a 
                href="/profile"
                className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-text-tertiary/20 hover:border-sage-green/50 transition-all cursor-pointer hover:scale-110"
              >
                {(profileAvatar || session.user.image) ? (
                  <img
                    src={profileAvatar || session.user.image || ''}
                    alt={session.user.name || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sage-green/20 to-lavender/20">
                    <span className="text-text-primary font-bold text-lg">
                      {session.user.email?.[0].toUpperCase() || "U"}
                    </span>
                  </div>
                )}
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

