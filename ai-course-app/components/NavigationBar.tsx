"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

export default function NavigationBar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Course", path: "/module" },
    { name: "Certificate", path: "/certificate" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-mint border-b border-text-tertiary/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <h1 className="text-xl font-bold text-text-primary">Introduction to AI</h1>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <a
                  key={item.path}
                  href={item.path}
                  className={`text-base font-semibold transition-colors ${
                    isActive
                      ? "text-text-primary border-b-2 border-sage-green pb-1"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.name}
                </a>
              )
            })}

            {/* User Profile Picture */}
            {session?.user && (
              <div className="relative w-10 h-10 rounded-full overflow-hidden glass-mint border-2 border-text-tertiary/20">
                {session.user.image ? (
                  <img
                    src={session.user.image}
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
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

