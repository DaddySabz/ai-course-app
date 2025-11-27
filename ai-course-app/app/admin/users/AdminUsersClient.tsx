'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
    id: string
    email: string
    display_name: string
    partner_type: string
    progress_count: number
    created_at: string
}

interface AdminUsersClientProps {
    initialUsers: User[]
    isAdmin: boolean
}

export default function AdminUsersClient({ initialUsers, isAdmin }: AdminUsersClientProps) {
    const [users, setUsers] = useState(initialUsers)
    const [isAddingUser, setIsAddingUser] = useState(false)
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUser

Name, setNewUserName] = useState('')
    const [newUserType, setNewUserType] = useState('beta')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="card-neumorphic rounded-3xl p-10 text-center">
                    <h1 className="text-4xl font-black text-text-primary mb-4">Access Denied</h1>
                    <p className="text-text-secondary mb-6">You don't have permission to access this page.</p>
                    <Link href="/dashboard" className="btn-neumorphic px-6 py-3 rounded-xl font-bold">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        )
    }

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await fetch('/api/admin/add-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: newUserEmail,
                    display_name: newUserName,
                    partner_type: newUserType
                })
            })

            if (response.ok) {
                alert('✅ User added successfully!')
                setNewUserEmail('')
                setNewUserName('')
                setIsAddingUser(false)
                router.refresh()
            } else {
                const data = await response.json()
                alert(`❌ Error: ${data.error}`)
            }
        } catch (error) {
            console.error('Error adding user:', error)
            alert('❌ Failed to add user')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDeleteUser = async (userId: string, email: string) => {
        if (!confirm(`Are you sure you want to delete ${email}? This cannot be undone.`)) {
            return
        }

        try {
            const response = await fetch(`/api/admin/delete-user/${userId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                alert('✅ User deleted successfully!')
                router.refresh()
            } else {
                alert('❌ Failed to delete user')
            }
        } catch (error) {
            console.error('Error deleting user:', error)
            alert('❌ Failed to delete user')
        }
    }

    const handleResetProgress = async (userId: string, email: string) => {
        if (!confirm(`Reset progress for ${email}? This will delete all completed lessons and certificates.`)) {
            return
        }

        try {
            const response = await fetch('/api/admin/reset-progress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            })

            if (response.ok) {
                alert('✅ Progress reset successfully!')
                router.refresh()
            } else {
                alert('❌ Failed to reset progress')
            }
        } catch (error) {
            console.error('Error resetting progress:', error)
            alert('❌ Failed to reset progress')
        }
    }

    const handleUnlockCourse = async (userId: string, email: string) => {
        if (!confirm(`Unlock full course access for ${email}? This will change their account to Waitrose Partner.`)) {
            return
        }

        try {
            const response = await fetch('/api/admin/unlock-course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            })

            if (response.ok) {
                alert('✅ Course unlocked successfully!')
                router.refresh()
            } else {
                alert('❌ Failed to unlock course')
            }
        } catch (error) {
            console.error('Error unlocking course:', error)
            alert('❌ Failed to unlock course')
        }
    }

    const handleCompleteAllDays = async (userId: string, email: string) => {
        if (!confirm(`Mark all 30 days as completed for ${email}?`)) {
            return
        }

        try {
            const response = await fetch('/api/admin/complete-all-days', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            })

            if (response.ok) {
                alert('✅ All days completed successfully!')
                router.refresh()
            } else {
                alert('❌ Failed to complete all days')
            }
        } catch (error) {
            console.error('Error completing all days:', error)
            alert('❌ Failed to complete all days')
        }
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-text-primary mb-2">User Management</h1>
                        <p className="text-text-secondary">Add, delete, and manage student accounts</p>
                    </div>
                    <div className="flex gap-3">
                        <Link
                            href="/admin/bugs"
                            className="px-6 py-3 rounded-xl font-bold text-text-primary hover:bg-text-tertiary/10 transition-colors"
                        >
                            View Bugs
                        </Link>
                        <Link
                            href="/admin"
                            className="px-6 py-3 rounded-xl font-bold text-text-primary hover:bg-text-tertiary/10 transition-colors"
                        >
                            ← Back to Admin
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-text-primary">{users.length}</div>
                        <div className="text-sm text-text-secondary font-medium">Total Users</div>
                    </div>
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-sage-green">{users.filter(u => u.partner_type === 'beta').length}</div>
                        <div className="text-sm text-text-secondary font-medium">Beta Testers</div>
                    </div>
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-lavender">{users.filter(u => u.partner_type === 'waitrose').length}</div>
                        <div className="text-sm text-text-secondary font-medium">Waitrose Partners</div>
                    </div>
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-mint">{users.filter(u => u.partner_type === 'tech').length}</div>
                        <div className="text-sm text-text-secondary font-medium">Tech Partners</div>
                    </div>
                </div>

                {/* Add User Button */}
                <div className="mb-6">
                    <button
                        onClick={() => setIsAddingUser(!isAddingUser)}
                        className="px-6 py-3 rounded-xl font-bold text-white transition-all"
                        style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        }}
                    >
                        {isAddingUser ? '✖ Cancel' : '➕ Add New User'}
                    </button>
                </div>

                {/* Add User Form */}
                {isAddingUser && (
                    <div className="card-neumorphic rounded-3xl p-8 mb-8">
                        <h2 className="text-2xl font-black text-text-primary mb-6">Add New Student</h2>
                        <form onSubmit={handleAddUser} className="space-y-4">
                            <div>
                                <label className="block text-text-primary font-semibold mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={newUserEmail}
                                    onChange={(e) => setNewUserEmail(e.target.value)}
                                    placeholder="student@example.com"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-text-tertiary/20 focus:border-sage-green outline-none text-text-primary"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label className="block text-text-primary font-semibold mb-2">Display Name *</label>
                                <input
                                    type="text"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-text-tertiary/20 focus:border-sage-green outline-none text-text-primary"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div>
                                <label className="block text-text-primary font-semibold mb-2">Partner Type *</label>
                                <select
                                    value={newUserType}
                                    onChange={(e) => setNewUserType(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-text-tertiary/20 focus:border-sage-green outline-none text-text-primary"
                                    disabled={isSubmitting}
                                >
                                    <option value="beta">Beta Tester (Progressive Unlock)</option>
                                    <option value="waitrose">Waitrose Partner (Full Access)</option>
                                    <option value="tech">Tech Partner (Admin)</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                                style={{
                                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                                }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Adding...' : 'Add User'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Users List */}
                <div className="card-neumorphic rounded-3xl p-8">
                    <h2 className="text-2xl font-black text-text-primary mb-6">All Users ({users.length})</h2>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div key={user.id} className="border-2 border-text-tertiary/20 rounded-2xl p-6 hover:border-sage-green transition-colors">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-text-primary">{user.display_name}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.partner_type === 'beta' ? 'bg-green-100 text-green-700' :
                                                    user.partner_type === 'waitrose' ? 'bg-purple-100 text-purple-700' :
                                                        user.partner_type === 'tech' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-gray-100 text-gray-700'
                                                }`}>
                                                {user.partner_type.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-text-secondary mb-2">{user.email}</p>
                                        <div className="flex items-center gap-4 text-sm text-text-tertiary">
                                            <span>📚 {user.progress_count}/30 lessons</span>
                                            <span>📅 {new Date(user.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleResetProgress(user.id, user.email)}
                                            className="px-4 py-2 rounded-lg font-semibold text-amber-700 bg-amber-100 hover:bg-amber-200 transition-colors text-sm"
                                        >
                                            🔄 Reset Progress
                                        </button>
                                        <button
                                            onClick={() => handleUnlockCourse(user.id, user.email)}
                                            className="px-4 py-2 rounded-lg font-semibold text-purple-700 bg-purple-100 hover:bg-purple-200 transition-colors text-sm"
                                        >
                                            🔓 Unlock Course
                                        </button>
                                        <button
                                            onClick={() => handleCompleteAllDays(user.id, user.email)}
                                            className="px-4 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-green-200 transition-colors text-sm"
                                        >
                                            ✅ Complete All Days
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id, user.email)}
                                            className="px-4 py-2 rounded-lg font-semibold text-red-700 bg-red-100 hover:bg-red-200 transition-colors text-sm"
                                        >
                                            🗑️ Delete User
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
