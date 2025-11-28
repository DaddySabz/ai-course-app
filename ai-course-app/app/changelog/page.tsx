import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

// Force dynamic rendering so changelog always shows latest data
export const dynamic = 'force-dynamic'

export default async function ChangelogPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    )

    const { data: releaseNotes, error } = await supabase
        .from('release_notes')
        .select('*')
        .eq('visible', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching release notes:', error)
        return <div>Error loading changelog</div>
    }

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-black text-text-primary mb-2">Changelog</h1>
                    <p className="text-text-secondary">Track our latest updates, features, and improvements</p>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    {releaseNotes?.map((note) => (
                        <div
                            key={note.id}
                            className="card-neumorphic rounded-2xl p-6 border-l-4"
                            style={{
                                borderLeftColor:
                                    note.type === 'feature' ? '#10b981' :
                                        note.type === 'fix' ? '#f59e0b' :
                                            '#6366f1'
                            }}
                        >
                            <div className="flex items-start gap-4">
                                {/* Icon */}
                                <div className="text-3xl">
                                    {note.type === 'feature' ? '🎉' :
                                        note.type === 'fix' ? '🔧' :
                                            '⚡'}
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-text-tertiary/10 text-text-primary">
                                            v{note.version}
                                        </span>
                                        <span className="text-sm text-text-tertiary">
                                            {new Date(note.created_at).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary mb-2">
                                        {note.title}
                                    </h3>
                                    <p className="text-text-secondary">
                                        {note.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {releaseNotes?.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-text-tertiary">No updates yet. Check back soon!</p>
                    </div>
                )}

                {/* Back Button - Bottom */}
                <div className="mt-10 text-center">
                    <Link
                        href="/dashboard"
                        className="btn-neumorphic inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-bold text-text-primary hover:scale-[1.02] transition-transform"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    )
}
