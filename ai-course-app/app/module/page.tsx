import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { courseData } from "@/data/course-data"
import Link from "next/link"
import LessonContent from "@/components/LessonContent"
import { createClient } from '@supabase/supabase-js'

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

  // Fetch real progress from database
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  const { data: progress, error: progressError } = await supabase
    .from('user_progress')
    .select('day_number')
    .eq('user_id', session.user.id)
    .order('day_number')

  // If table doesn't exist yet, default to empty array (will be created when user completes first lesson)
  const completedDays = progressError ? [] : (progress?.map(p => p.day_number) || [])
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
          <LessonContent 
            lesson={lesson} 
            currentDay={currentDay}
            userId={session.user.id}
          />
        </main>
      </div>
    </div>
  )
}
