import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { courseData } from "@/data/course-data"
import Link from "next/link"

// Force dynamic rendering to ensure searchParams work correctly
export const dynamic = 'force-dynamic'

export default async function ModulePage({
  searchParams,
}: {
  searchParams: Promise<{ day?: string }>
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  const params = await searchParams
  const currentDay = Number(params.day) || 1
  const lesson = courseData.find(m => m.day === currentDay)
  
  if (!lesson) {
    redirect("/dashboard")
  }

  // TODO: Get from database
  const completedDays = [1, 2, 3, 4, 5, 6, 7] // Hardcoded for now
  const isCompleted = completedDays.includes(currentDay)

  return (
    <div className="min-h-screen">
      {/* Navigation Header - Frosted Glass */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-text-primary">
              📚
            </div>
            <h2 className="text-xl font-bold text-text-primary">Introduction to AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-semibold text-text-primary">Course</a>
            <a href="/certificate" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full ring-2 ring-white/50 shadow-md"
            />
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto gap-6 p-6">
        {/* Left Sidebar - Frosted Glass with Neumorphic Days */}
        <aside className="w-80 glass rounded-3xl p-6 h-fit sticky top-24">
          <div>
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-5">
              COURSE DAYS
            </h3>
            <div className="space-y-2">
              {courseData.map((day) => {
                const isDayCompleted = completedDays.includes(day.day)
                const isLocked = day.day > 1 && !completedDays.includes(day.day - 1)
                const isActive = day.day === currentDay
                
                if (isLocked) {
                  return (
                    <div
                      key={day.day}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-text-tertiary cursor-not-allowed glass-subtle"
                    >
                      <span className="flex-shrink-0 text-base">🔒</span>
                      <span className="text-sm font-semibold">Day {day.day}</span>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={day.day}
                    href={`/module?day=${day.day}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'glass-lavender text-text-primary' 
                        : isDayCompleted
                        ? 'glass-sage text-text-primary hover:scale-[1.02]'
                        : 'glass-subtle text-text-secondary hover:scale-[1.02]'
                    }`}
                  >
                    <span className="flex-shrink-0 text-sm font-bold">
                      {isDayCompleted ? '✓' : '●'}
                    </span>
                    <span className="text-sm font-semibold">Day {day.day}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Content Area - Warm, Spacious Design */}
        <main className="flex-1">
          {/* Header with Badges */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-glass">
                Day {currentDay} of 30
              </span>
              {isCompleted && (
                <span className="badge-glass text-sage-green">
                  ✓ Completed
                </span>
              )}
            </div>
            <h1 className="text-5xl font-black text-text-primary mb-3 leading-tight">
              {lesson.title}
            </h1>
            <p className="text-xl text-text-secondary font-medium">
              {lesson.subtitle}
            </p>
          </div>

          {/* Learning Content - Frosted Glass Card */}
          <div className="card-neumorphic rounded-3xl p-10 mb-6">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>

          {/* Hands-On Section - Mint Glass Card */}
          {lesson.handsOn && (
            <div className="glass-mint rounded-3xl p-10 mb-6">
              <h2 className="text-3xl font-black text-text-primary mb-4 flex items-center gap-3">
                <span className="text-4xl">🛠️</span>
                {lesson.handsOn.title}
              </h2>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                {lesson.handsOn.description}
              </p>

              {/* Affiliate Links - Neumorphic Buttons */}
              {lesson.handsOn.affiliateLinks && lesson.handsOn.affiliateLinks.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
                    <span className="text-2xl">🔗</span>
                    Tools You'll Need:
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {lesson.handsOn.affiliateLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-neumorphic inline-flex items-center gap-2 px-6 py-4 text-text-primary rounded-2xl text-base"
                      >
                        {link.text}
                        <span className="text-xl">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Exercise - Peach Glass Card */}
              {lesson.handsOn.exercise && (
                <div className="glass-peach p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-text-primary mb-3 flex items-center gap-2">
                    <span className="text-2xl">📝</span>
                    Your Task:
                  </h3>
                  <p className="text-text-secondary whitespace-pre-line leading-relaxed">
                    {lesson.handsOn.exercise}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Mark Complete Button - Prominent Neumorphic CTA */}
          {!isCompleted && (
            <div className="card-neumorphic rounded-3xl p-8 mb-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Ready to continue?
                  </h3>
                  <p className="text-base text-text-secondary">
                    Mark this lesson as complete to unlock the next day
                  </p>
                </div>
                <button className="glass-mint px-8 py-4 rounded-2xl font-bold text-lg text-text-primary whitespace-nowrap">
                  ✓ Mark as Complete
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons for next/previous */}
          <div className="flex justify-between items-center gap-4">
            {currentDay > 1 && (
              <Link
                href={`/module?day=${currentDay - 1}`}
                className="btn-neumorphic px-6 py-3 rounded-2xl font-semibold text-text-primary flex items-center gap-2"
              >
                <span className="text-lg">←</span>
                Previous Day
              </Link>
            )}
            
            {currentDay < 30 && completedDays.includes(currentDay) && (
              <Link
                href={`/module?day=${currentDay + 1}`}
                className="glass-mint ml-auto px-6 py-3 rounded-2xl font-semibold text-text-primary flex items-center gap-2"
              >
                Next Day
                <span className="text-lg">→</span>
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
