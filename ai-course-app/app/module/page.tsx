import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { courseData } from "@/data/course-data"
import Link from "next/link"

export default async function ModulePage({
  searchParams,
}: {
  searchParams: { day?: string }
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  const currentDay = Number(searchParams.day) || 1
  const lesson = courseData.find(m => m.day === currentDay)
  
  if (!lesson) {
    redirect("/dashboard")
  }

  // TODO: Get from database
  const completedDays = [1, 2, 3, 4, 5, 6, 7] // Hardcoded for now
  const isCompleted = completedDays.includes(currentDay)
  const canAccess = currentDay === 1 || completedDays.includes(currentDay - 1)

  if (!canAccess) {
    redirect("/dashboard")
  }

  const hasPrevious = currentDay > 1
  const hasNext = currentDay < 30

  return (
    <div className="bg-background-light min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-4"
          >
            ← Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Day {currentDay} of 30
            </span>
            {isCompleted && (
              <span className="inline-flex items-center rounded-md bg-accent-teal/10 px-3 py-1 text-sm font-medium text-accent-teal">
                ✓ Completed
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-2">
            {lesson.title}
          </h1>
          <p className="text-lg text-text-secondary">
            {lesson.subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-surface rounded-xl border border-border-color p-8 mb-6">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          {/* Affiliate Links */}
          {lesson.affiliateLinks && lesson.affiliateLinks.length > 0 && (
            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                🔗 Try These Tools:
              </h3>
              <div className="flex flex-wrap gap-3">
                {lesson.affiliateLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
                  >
                    {link.text} →
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Exercise */}
          {lesson.exercise && (
            <div className="mt-8 p-6 bg-accent-yellow/10 border border-accent-yellow/30 rounded-lg">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                📝 Today's Exercise:
              </h3>
              <p className="text-text-secondary">
                {lesson.exercise}
              </p>
            </div>
          )}
        </div>

        {/* Mark Complete Button */}
        {!isCompleted && (
          <div className="bg-surface rounded-xl border border-border-color p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  Ready to continue?
                </h3>
                <p className="text-sm text-text-secondary">
                  Mark this lesson as complete to unlock the next day
                </p>
              </div>
              <button className="px-6 py-3 bg-accent-teal text-white rounded-lg hover:bg-teal-600 font-semibold transition-colors">
                Mark as Complete
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          {hasPrevious ? (
            <Link
              href={`/module?day=${currentDay - 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border-color rounded-lg hover:bg-surface transition-colors"
            >
              ← Day {currentDay - 1}
            </Link>
          ) : (
            <div />
          )}
          
          {hasNext && completedDays.includes(currentDay) && (
            <Link
              href={`/module?day=${currentDay + 1}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-semibold"
            >
              Day {currentDay + 1} →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
