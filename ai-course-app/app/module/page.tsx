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

  // Admin emails get FULL course access (no restrictions)
  const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
  const isAdmin = session.user.email && ADMIN_EMAILS.includes(session.user.email)

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

  // Check if user is a tech partner (they also get full access)
  const { data: profileData } = await supabase
    .from('user_profiles')
    .select('partner_type')
    .eq('user_id', session.user.id)
    .single()

  const isTechPartner = profileData?.partner_type === 'tech'

  const { data: progress, error: progressError } = await supabase
    .from('user_progress')
    .select('day_number')
    .eq('user_id', session.user.id)
    .order('day_number')

  // If admin OR tech partner, mark all days as completed (full access)
  // If table doesn't exist yet, default to empty array (will be created when user completes first lesson)
  const completedDays = (isAdmin || isTechPartner)
    ? Array.from({ length: 30 }, (_, i) => i + 1) // Full access
    : (progressError ? [] : (progress?.map(p => p.day_number) || []))
  const isCompleted = completedDays.includes(currentDay)

  return (
    <div className="min-h-screen">
      {/* Navigation Header - Frosted Glass */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
                      className="flex flex-col gap-1 px-4 py-3 rounded-2xl text-text-tertiary cursor-not-allowed glass-subtle"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Day {day.day}</span>
                      <span className="text-sm font-semibold leading-tight opacity-60">{day.title}</span>
                    </div>
                  )
                }
                
                return (
                  <Link
                    key={day.day}
                    href={`/module?day=${day.day}`}
                    className={`flex flex-col gap-1 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'glass-lavender-clickable text-text-primary' 
                        : isDayCompleted
                        ? 'glass-sage-clickable text-text-primary'
                        : 'glass-clickable text-text-secondary'
                    }`}
                  >
                    <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Day {day.day}</span>
                    <span className="text-sm font-semibold leading-tight">{day.title}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Right Content Area - Warm, Spacious Design */}
        <main className="flex-1">
          {/* Hero Image with Title Overlay */}
          <div className="relative rounded-3xl overflow-hidden mb-8 h-[400px] card-neumorphic">
            <img 
              src="/images/course/day-1-hero-image.jpg" 
              alt={lesson.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="badge-glass backdrop-blur-md bg-white/20 text-white border-white/30">
                  Day {currentDay} of 30
                </span>
                {completedDays.includes(currentDay) && (
                  <span className="badge-glass backdrop-blur-md bg-sage-green/30 text-white border-sage-green/40">
                    Completed
                  </span>
                )}
              </div>
              <h1 className="text-5xl font-black text-white mb-2 leading-tight drop-shadow-lg">
                {lesson.title}
              </h1>
              <p className="text-xl text-white/90 font-medium drop-shadow-md">
                {lesson.subtitle}
              </p>
            </div>
          </div>

          <LessonContent 
            lesson={lesson} 
            currentDay={currentDay}
            userId={session.user.id!}
            hasFullAccess={isAdmin || isTechPartner}
          />
        </main>
      </div>
    </div>
  )
}
