"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface LessonContentProps {
  lesson: any
  currentDay: number
  userId: string
  hasFullAccess?: boolean
}

export default function LessonContent({ lesson, currentDay, userId, hasFullAccess = false }: LessonContentProps) {
  const router = useRouter()
  const [completedDays, setCompletedDays] = useState<number[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [marking, setMarking] = useState(false)

  // Fetch user progress on mount
  useEffect(() => {
    fetchProgress()
  }, [currentDay])

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/progress')
      if (res.ok) {
        const data = await res.json()
        setCompletedDays(data.completedDays || [])
        setIsCompleted(data.completedDays?.includes(currentDay) || false)
      }
    } catch (error) {
      console.error('Error fetching progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAffiliateClick = async (url: string) => {
    // Open affiliate link in new tab
    window.open(url, '_blank', 'noopener,noreferrer')

    // Mark lesson as complete
    if (!isCompleted && !marking) {
      await markComplete()
    }
  }

  const markComplete = async () => {
    setMarking(true)
    try {
      const res = await fetch('/api/progress/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dayNumber: currentDay })
      })

      if (res.ok) {
        setIsCompleted(true)
        setCompletedDays([...completedDays, currentDay])
        // Refresh to update sidebar
        router.refresh()
      } else {
        const data = await res.json()
        if (data.locked) {
          alert('Please complete the previous day first!')
        }
      }
    } catch (error) {
      console.error('Error marking complete:', error)
    } finally {
      setMarking(false)
    }
  }

  // Admins and tech partners have full access (never locked)
  const isLocked = hasFullAccess ? false : (currentDay > 1 && !completedDays.includes(currentDay - 1))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-xl text-text-secondary">Loading lesson...</div>
      </div>
    )
  }

  if (isLocked) {
    return (
      <div className="card-neumorphic rounded-3xl p-4 md:p-10 text-center">
        <h2 className="text-3xl font-bold text-text-primary mb-4">
          Lesson Locked
        </h2>
        <p className="text-xl text-text-secondary mb-6">
          Complete Day {currentDay - 1} first to unlock this lesson
        </p>
        <Link
          href={`/module?day=${currentDay - 1}`}
          className="btn-neumorphic inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg"
        >
          ← Go to Day {currentDay - 1}
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Learning Content - Frosted Glass Card */}
      <div className="card-neumorphic rounded-3xl p-4 md:p-10 mb-6">
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>

      {/* Hands-On Section - Mint Glass Card */}
      {lesson.handsOn && (
        <div className="glass-mint rounded-3xl p-4 md:p-10 mb-6">
          <h2 className="text-3xl font-black text-text-primary mb-4">
            {lesson.handsOn.title}
          </h2>
          <p className="text-text-secondary text-lg mb-8 leading-relaxed">
            {lesson.handsOn.description}
          </p>

          {/* Affiliate Links Section */}
          {lesson.handsOn.affiliateLinks && lesson.handsOn.affiliateLinks.length > 0 && (
            <div className="mb-8">
              {/* PROMINENT UNLOCK BANNER (if not completed) */}
              {!isCompleted && (
                <div className="mb-6 glass-lavender rounded-2xl p-5 md:p-6 border-2 border-lavender-purple/30 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-lavender-purple/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-lavender-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-text-primary mb-2">
                        🎯 Unlock Day {currentDay + 1}
                      </h4>
                      <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                        Click the tool link below to mark this lesson complete and unlock tomorrow's content!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <h3 className="text-lg font-bold text-text-primary mb-4">
                Tools You'll Need:
              </h3>
              <div className="flex flex-wrap gap-4">
                {lesson.handsOn.affiliateLinks.map((link: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAffiliateClick(link.url)}
                    disabled={marking}
                    className="glass-clickable inline-flex items-center gap-2 px-6 py-4 text-text-primary rounded-2xl text-base disabled:opacity-50"
                  >
                    {link.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Exercise - White card on colored base */}
          {lesson.handsOn.exercise && (
            <div className="glass p-4 md:p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-text-primary mb-3">
                Your Task:
              </h3>
              <p className="text-text-secondary whitespace-pre-line leading-relaxed">
                {lesson.handsOn.exercise}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Success Message when completed */}
      {isCompleted && (
        <div className="card-neumorphic rounded-3xl p-4 md:p-8 mb-6 bg-gradient-to-br from-sage-green/10 to-transparent">
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">
              Lesson Complete!
            </h3>
            <p className="text-base text-text-secondary">
              {currentDay < 30 ? 'Day ' + (currentDay + 1) + ' is now unlocked!' : 'You\'ve completed the entire course!'}
            </p>
          </div>
        </div>
      )}

      {/* Navigation buttons for next/previous (Desktop Only - mobile uses bottom swipeable nav) */}
      <div className="hidden md:flex justify-between items-center gap-4">
        {currentDay > 1 && (
          <Link
            href={`/module?day=${currentDay - 1}`}
            className="btn-neumorphic px-6 py-3 rounded-2xl font-semibold text-text-primary flex items-center gap-2"
          >
            <span className="text-lg">←</span>
            Previous Day
          </Link>
        )}

        {currentDay < 30 && (hasFullAccess || completedDays.includes(currentDay)) && (
          <Link
            href={`/module?day=${currentDay + 1}`}
            className="btn-neumorphic ml-auto px-6 py-3 rounded-2xl font-semibold text-text-primary flex items-center gap-2"
          >
            Next Day
            <span className="text-lg">→</span>
          </Link>
        )}
      </div>
    </>
  )
}

