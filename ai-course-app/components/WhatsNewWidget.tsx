'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface ReleaseNote {
    id: string
    version: string
    title: string
    description: string
    type: 'feature' | 'fix' | 'improvement'
    created_at: string
}

export default function WhatsNewWidget() {
    const [notes, setNotes] = useState<ReleaseNote[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchNotes() {
            try {
                const res = await fetch('/api/changelog')
                const data = await res.json()
                setNotes(data.slice(0, 3)) // Get latest 3
            } catch (error) {
                console.error('Error fetching release notes:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchNotes()
    }, [])

    if (loading) {
        return (
            <div className="card-neumorphic rounded-3xl p-6">
                <div className="text-text-tertiary">Loading...</div>
            </div>
        )
    }

    if (notes.length === 0) {
        'use client'

        import { useEffect, useState } from 'react'
        import Link from 'next/link'

        interface ReleaseNote {
            id: string
            version: string
            title: string
            description: string
            type: 'feature' | 'fix' | 'improvement'
            created_at: string
        }

        export default function WhatsNewWidget() {
            const [notes, setNotes] = useState<ReleaseNote[]>([])
            const [loading, setLoading] = useState(true)

            useEffect(() => {
                async function fetchNotes() {
                    try {
                        const res = await fetch('/api/changelog')
                        const data = await res.json()
                        setNotes(data.slice(0, 3)) // Get latest 3
                    } catch (error) {
                        console.error('Error fetching release notes:', error)
                    } finally {
                        setLoading(false)
                    }
                }
                fetchNotes()
            }, [])

            if (loading) {
                return (
                    <div className="card-neumorphic rounded-3xl p-6">
                        <div className="text-text-tertiary">Loading...</div>
                    </div>
                )
            }

            if (notes.length === 0) {
                return null
            }

            return (
                <Link href="/changelog" className="block h-full">
                    <div className="card-neumorphic rounded-3xl p-6 hover:scale-[1.02] transition-transform h-full flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-text-primary">What's New</h2>
                            <span className="text-text-tertiary text-sm">→</span>
                        </div>

                        <div className="space-y-6 flex-1">
                            {notes.map((note) => {
                                const icon = note.type === 'feature' ? '🎉' :
                                    note.type === 'fix' ? '🔧' : '⚡'

                                return (
                                    <div key={note.id} className="flex gap-3">
                                        <span className="text-2xl">{icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-text-tertiary/10 text-text-primary">
                                                    v{note.version}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-text-primary line-clamp-2">
                                                {note.title}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="mt-auto pt-6 text-sm text-sage-green font-semibold">
                            View All Updates →
                        </div>
                    </div>
                </Link>
            )
        }
