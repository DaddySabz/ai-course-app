'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/partners', label: 'Tech Partners', icon: '🤝' },
  { href: '/admin/bugs', label: 'Bugs', icon: '🐛' },
  { href: '/admin/prompts', label: 'Prompts', icon: '🎨' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex items-center justify-between mb-8">
      <nav className="flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-sage-green text-white shadow-md'
                  : 'bg-white/50 text-text-secondary hover:bg-white hover:text-text-primary'
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
      <Link
        href="/dashboard"
        className="px-4 py-2 rounded-xl font-semibold text-sm text-text-secondary hover:text-text-primary hover:bg-white/50 transition-all"
      >
        ← Back to Dashboard
      </Link>
    </div>
  )
}

