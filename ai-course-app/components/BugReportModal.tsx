'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function BugReportModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!description.trim()) return

        setIsSubmitting(true)

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    description: description.trim(),
                    page_url: window.location.href,
                    type: 'bug'
                })
            })

            if (response.ok) {
                alert('✅ Bug report submitted! Thank you!')
                setDescription('')
                setIsOpen(false)
                router.refresh()
            } else {
                alert('❌ Failed to submit. Please try again.')
            }
        } catch (error) {
            console.error('Error submitting feedback:', error)
            alert('❌ Failed to submit. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            {/* Floating Bug Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white'
                }}
                aria-label="Report a bug"
            >
                🐛 Report Bug
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal Content */}
                    <div className="relative card-neumorphic rounded-3xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-black text-text-primary mb-2">Report a Bug</h2>
                        <p className="text-text-secondary mb-6">
                            Help us improve! Describe what went wrong and we'll fix it ASAP.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-text-primary font-semibold mb-2">
                                    What happened? *
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="e.g., The certificate download button doesn't work on mobile..."
                                    className="w-full px-4 py-3 rounded-xl border-2 border-text-tertiary/20 focus:border-sage-green outline-none resize-none h-32 text-text-primary placeholder-text-tertiary"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-text-secondary hover:bg-text-tertiary/10 transition-colors"
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl font-bold text-white transition-all disabled:opacity-50"
                                    style={{
                                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                                    }}
                                    disabled={isSubmitting || !description.trim()}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}
