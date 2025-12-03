"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"

export default function NavigationBar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [profileAvatar, setProfileAvatar] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Course", path: "/module" },
    { name: "Certificate", path: "/certificate" },
    { name: "Profile", path: "/profile" },
  ]

  // Get the first letter for avatar fallback (name first, then email)
  const getAvatarLetter = () => {
    if (displayName) return displayName[0].toUpperCase()
    if (session?.user?.name) return session.user.name[0].toUpperCase()
    if (session?.user?.email) return session.user.email[0].toUpperCase()
    return 'U'
  }

  // Fetch updated profile data
  useEffect(() => {
    const fetchProfile = () => {
      if (session?.user) {
        fetch('/api/profile')
          .then(res => res.json())
          .then(data => {
            if (data.profile?.avatar_url) {
              setProfileAvatar(data.profile.avatar_url)
            } else if (data.defaultAvatar) {
              setProfileAvatar(data.defaultAvatar)
            }
            if (data.profile?.display_name) {
              setDisplayName(data.profile.display_name)
            }
          })
          .catch(err => console.error('Error fetching profile:', err))
      }
    }

    fetchProfile()

    // Listen for profile updates
    const handleProfileUpdate = () => {
      fetchProfile()
    }
    
    window.addEventListener('profileUpdated', handleProfileUpdate)
    
    return () => {
      window.removeEventListener('profileUpdated', handleProfileUpdate)
    }
  }, [session])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-lg border-b border-text-tertiary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <h1 className="text-lg sm:text-xl font-bold text-text-primary">Introduction to AI</h1>

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center gap-3">
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

              {/* User Profile Picture - Desktop */}
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
                        {getAvatarLetter()}
                      </span>
                    </div>
                  )}
                </a>
              )}
            </div>

            {/* Mobile: Hamburger + Profile */}
            <div className="flex md:hidden items-center gap-3">
              {/* User Profile Picture - Mobile */}
              {session?.user && (
                <a 
                  href="/profile"
                  className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-text-tertiary/20 hover:border-sage-green/50 transition-all"
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
                        {getAvatarLetter()}
                      </span>
                    </div>
                  )}
                </a>
              )}

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-white/30 transition-all"
                aria-label="Toggle menu"
              >
                <svg 
                  className="w-6 h-6 text-text-primary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-64 bg-background shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/30 transition-all"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Menu Title */}
          <h2 className="text-xl font-bold text-text-primary mb-6 mt-2">Menu</h2>

          {/* Menu Items */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "glass-blue text-text-primary shadow-md"
                      : "text-text-secondary hover:bg-white/30"
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

