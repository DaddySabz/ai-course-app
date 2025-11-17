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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Header - Glass morphism style */}
      <header className="glass sticky top-0 z-50 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-8 text-primary drop-shadow-lg">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="url(#logo-gradient)"/>
                <defs>
                  <linearGradient id="logo-gradient" x1="4" x2="44" y1="44" y2="4">
                    <stop stopColor="#6366F1"/>
                    <stop offset="0.5" stopColor="#EC4899"/>
                    <stop offset="1" stopColor="#F59E0B"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h2 className="text-xl font-bold gradient-text">Introduction to AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-semibold hover:text-primary transition-all duration-300 hover:scale-105">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-semibold text-primary">Course</a>
            <a href="/certificate" className="text-sm font-semibold hover:text-primary transition-all duration-300 hover:scale-105">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full ring-2 ring-primary/30 shadow-lg hover:ring-primary transition-all duration-300"
            />
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar - Days List - Modern design */}
        <aside className="w-72 glass min-h-[calc(100vh-76px)] overflow-y-auto border-r border-white/20 shadow-xl">
          <div className="p-6">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="inline-block w-8 h-0.5 bg-gradient-to-r from-primary to-accent-pink rounded-full"></span>
              Course Days
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
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 cursor-not-allowed bg-gray-50/50"
                    >
                      <span className="flex-shrink-0 text-lg">🔒</span>
                      <span className="text-sm font-medium truncate">Day {day.day}</span>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={day.day}
                    href={`/module?day=${day.day}`}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                      isActive 
                        ? 'bg-gradient-to-r from-primary to-accent-purple text-white shadow-lg shadow-primary/30' 
                        : isDayCompleted
                        ? 'bg-gradient-to-r from-accent-teal/20 to-accent-teal/10 text-accent-teal hover:from-accent-teal/30 hover:to-accent-teal/20 shadow-md'
                        : 'bg-white/60 hover:bg-white/90 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <span className={`flex-shrink-0 text-sm font-bold ${isActive ? '' : isDayCompleted ? '' : 'text-primary'}`}>
                      {isDayCompleted ? '✓' : day.day}
                    </span>
                    <span className="text-sm font-semibold truncate">Day {day.day}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Content Area - Modern, spacious design */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12">
          {/* Header with modern badges */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent-purple/20 text-primary font-bold text-sm shadow-md border border-primary/20">
                Day {currentDay} of 30
              </span>
              {isCompleted && (
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-teal/20 to-green-400/20 text-accent-teal font-bold text-sm shadow-md border border-accent-teal/20 animate-pulse">
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

          {/* Learning Content - Modern card with glassmorphism */}
          <div className="glass rounded-2xl border border-white/30 p-10 mb-8 card-modern">
            <div 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 prose-h2:gradient-text prose-h3:text-xl prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-primary prose-ul:space-y-2 prose-li:text-gray-700"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>

          {/* Hands-On Section - Eye-catching gradient card */}
          {lesson.handsOn && (
            <div className="relative rounded-2xl overflow-hidden mb-8 card-modern">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 via-primary/20 to-accent-purple/20"></div>
              
              {/* Content */}
              <div className="relative glass border border-white/40 p-10">
                <h2 className="text-3xl font-black text-text-primary mb-4 flex items-center gap-3">
                  <span className="text-4xl drop-shadow-lg">🛠️</span>
                  {lesson.handsOn.title}
                </h2>
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  {lesson.handsOn.description}
                </p>

                {/* Affiliate Links - Modern gradient buttons */}
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
                          className="btn-secondary inline-flex items-center gap-2 px-6 py-4 text-white rounded-xl font-bold text-base hover:scale-105 transform transition-all duration-300"
                        >
                          {link.text}
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exercise - Beautiful card */}
                {lesson.handsOn.exercise && (
                  <div className="p-6 bg-white/90 backdrop-blur-sm border-2 border-accent-yellow/40 rounded-xl shadow-lg">
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
            </div>
          )}

          {/* Mark Complete Button - Prominent call to action */}
          {!isCompleted && (
            <div className="glass rounded-2xl border border-white/30 p-8 card-modern">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    Ready to continue?
                  </h3>
                  <p className="text-base text-text-secondary">
                    Mark this lesson as complete to unlock the next day and continue your AI journey
                  </p>
                </div>
                <button className="btn-primary px-8 py-4 text-white rounded-xl font-bold text-lg hover:scale-105 transform transition-all duration-300 shadow-xl whitespace-nowrap">
                  ✓ Mark as Complete
                </button>
              </div>
            </div>
          )}

          {/* Navigation buttons for next/previous */}
          <div className="flex justify-between items-center mt-8 gap-4">
            {currentDay > 1 && (
              <Link
                href={`/module?day=${currentDay - 1}`}
                className="glass px-6 py-3 rounded-xl font-semibold text-primary hover:scale-105 transform transition-all duration-300 shadow-md border border-white/30 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Day
              </Link>
            )}
            
            {currentDay < 30 && completedDays.includes(currentDay) && (
              <Link
                href={`/module?day=${currentDay + 1}`}
                className="btn-primary ml-auto px-6 py-3 text-white rounded-xl font-semibold hover:scale-105 transform transition-all duration-300 shadow-xl flex items-center gap-2"
              >
                Next Day
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
