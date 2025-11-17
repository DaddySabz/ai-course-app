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

  return (
    <div className="bg-background-light min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white border-b border-border-color">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="url(#logo-gradient)"/>
                <defs>
                  <linearGradient id="logo-gradient" x1="4" x2="44" y1="44" y2="4">
                    <stop stopColor="#2DD4BF"/>
                    <stop offset="1" stopColor="#FBBF24"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 className="text-lg font-semibold">Introduction to AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-medium text-primary">Course</a>
            <a href="/certificate" className="text-sm font-medium hover:text-primary transition-colors">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full"
            />
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar - Days List */}
        <aside className="w-64 bg-white border-r border-border-color min-h-[calc(100vh-60px)] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-text-secondary uppercase mb-3">Course Days</h3>
            <div className="space-y-1">
              {courseData.map((day) => {
                const isDayCompleted = completedDays.includes(day.day)
                const isLocked = day.day > 1 && !completedDays.includes(day.day - 1)
                const isActive = day.day === currentDay
                
                return (
                  <Link
                    key={day.day}
                    href={isLocked ? '#' : `/module?day=${day.day}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : isLocked
                        ? 'text-gray-400 cursor-not-allowed'
                        : isDayCompleted
                        ? 'bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={(e) => isLocked && e.preventDefault()}
                  >
                    <span className="flex-shrink-0 text-sm font-medium">
                      {isLocked ? '🔒' : isDayCompleted ? '✓' : day.day}
                    </span>
                    <span className="text-sm truncate">Day {day.day}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
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

          {/* Learning Content */}
          <div className="bg-surface rounded-xl border border-border-color p-8 mb-6">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>

          {/* Hands-On Section */}
          {lesson.handsOn && (
            <div className="bg-gradient-to-br from-accent-teal/10 to-primary/10 rounded-xl border-2 border-accent-teal/30 p-8 mb-6">
              <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center gap-2">
                <span className="text-3xl">🛠️</span>
                {lesson.handsOn.title}
              </h2>
              <p className="text-text-secondary text-lg mb-6">
                {lesson.handsOn.description}
              </p>

              {/* Affiliate Links */}
              {lesson.handsOn.affiliateLinks && lesson.handsOn.affiliateLinks.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    🔗 Tools You'll Need:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {lesson.handsOn.affiliateLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 bg-accent-teal text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold shadow-md hover:shadow-lg"
                      >
                        {link.text} →
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercise */}
              {lesson.handsOn.exercise && (
                <div className="p-5 bg-white/80 border border-accent-yellow/30 rounded-lg">
                  <h3 className="text-lg font-semibold text-text-primary mb-2 flex items-center gap-2">
                    <span className="text-xl">📝</span>
                    Your Task:
                  </h3>
                  <p className="text-text-secondary">
                    {lesson.handsOn.exercise}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Mark Complete Button */}
          {!isCompleted && (
            <div className="bg-surface rounded-xl border border-border-color p-6">
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
        </main>
      </div>
    </div>
  )
}
