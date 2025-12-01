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
                setNotes(data.slice(0, 5)) // Get latest 5 to fill height
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
            <div className="card-neumorphic rounded-3xl p-8 hover:scale-[1.02] transition-transform h-full flex flex-col">
                <h3 className="text-2xl font-bold text-text-primary mb-6">What's New</h3>

                <div className="space-y-6 flex-1 overflow-auto">
                    {notes.map((note) => {
                        return (
                            <div key={note.id} className="flex gap-3">
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

                <div className="pt-4 text-sm text-sage-green font-semibold">
                    View All Updates →
                </div>
            </div>
        </Link >
    )
}
