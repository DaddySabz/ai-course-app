import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export default async function AdminBugsPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/")
    }

    const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
    const isAdmin = session.user.email && ADMIN_EMAILS.includes(session.user.email)

    if (!isAdmin) {
        redirect("/dashboard")
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    )

    // Fetch all feedback
    const { data: feedbackData, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false })

    const feedback = error ? [] : (feedbackData || [])

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-text-primary mb-2">Bug Reports</h1>
                        <p className="text-text-secondary">Review and manage user-submitted bugs and feedback</p>
                    </div>
                    <Link
                        href="/admin"
                        className="px-6 py-3 rounded-xl font-bold text-text-primary hover:bg-text-tertiary/10 transition-colors"
                    >
                        ← Back to Admin
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-text-primary">{feedback.length}</div>
                        <div className="text-sm text-text-secondary font-medium">Total Reports</div>
                    </div>
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-amber-600">{feedback.filter(f => f.status === 'new').length}</div>
                        <div className="text-sm text-text-secondary font-medium">New</div>
                    </div>
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-blue-600">{feedback.filter(f => f.status === 'reviewing').length}</div>
                        <div className="text-sm text-text-secondary font-medium">Reviewing</div>
                    </div>
                    <div className="card-neumorphic rounded-2xl p-6">
                        <div className="text-3xl font-black text-green-600">{feedback.filter(f => f.status === 'fixed').length}</div>
                        <div className="text-sm text-text-secondary font-medium">Fixed</div>
                    </div>
                </div>

                {/* Bug List */}
                <div className="card-neumorphic rounded-3xl p-8">
                    {feedback.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-xl text-text-secondary">No bug reports yet! 🎉</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {feedback.map((bug) => (
                                <div key={bug.id} className="border-2 border-text-tertiary/20 rounded-2xl p-6 hover:border-sage-green transition-colors">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${bug.status === 'new' ? 'bg-amber-100 text-amber-700' :
                                                        bug.status === 'reviewing' ? 'bg-blue-100 text-blue-700' :
                                                            bug.status === 'fixed' ? 'bg-green-100 text-green-700' :
                                                                'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {bug.status.toUpperCase()}
                                                </span>
                                                <span className="text-sm text-text-secondary">
                                                    {new Date(bug.created_at).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                            <p className="text-text-primary font-medium mb-2">{bug.description}</p>
                                            {bug.page_url && (
                                                <a
                                                    href={bug.page_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-sage-green hover:underline"
                                                >
                                                    📍 {bug.page_url}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-sm text-text-secondary">
                                        Reported by: <span className="font-semibold">{bug.user_email || 'Unknown'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
