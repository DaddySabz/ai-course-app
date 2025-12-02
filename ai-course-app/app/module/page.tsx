import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { courseModules } from "@/data/course-data"
import Link from "next/link"
import LessonContent from "@/components/LessonContent"
import { createClient } from '@supabase/supabase-js'
import NavigationBar from '@/components/NavigationBar'

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
  const lesson = courseModules.find(m => m.day === currentDay)

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
    <div className="min-h-screen pt-20">
      <NavigationBar />

      <div className="flex max-w-7xl mx-auto gap-6 px-3 md:px-6 py-6 pb-0 md:pb-6">
        {/* Left Sidebar - Frosted Glass with Neumorphic Days (Desktop Only) */}
        <aside className="hidden md:block w-80 glass rounded-3xl p-6 h-fit sticky top-24">
          <div>
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-5">
              COURSE DAYS
            </h3>
            <div className="space-y-2">
              {courseModules.map((day) => {
                const isDayCompleted = completedDays.includes(day.day)
                const isLocked = day.day > 1 && !completedDays.includes(day.day - 1)
                const isActive = day.day === currentDay

                if (isLocked) {
                  // Show sticker only on the NEXT day (first locked day)
                  const isNextDay = day.day === currentDay + 1

                  return (
                    <div
                      key={day.day}
                      className="relative flex flex-col gap-1 px-4 py-3 rounded-2xl text-text-tertiary cursor-not-allowed glass-subtle"
                    >
                      {isNextDay && (
                        <div className="absolute -top-2 -right-2 bg-lavender-purple text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          Complete Day {currentDay}
                        </div>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider text-text-tertiary">Day {day.day}</span>
                      <span className="text-sm font-semibold leading-tight opacity-60">{day.title}</span>
                    </div>
                  )
                }

                return (
                  <Link
                    key={day.day}
                    href={`/module?day=${day.day}`}
                    className={`flex flex-col gap-1 px-4 py-3 rounded-2xl transition-all duration-300 shadow-tile ${isActive
                      ? 'bg-gradient-to-br from-lavender/60 to-lavender-light/50 border border-lavender/60 text-text-primary'
                      : isDayCompleted
                        ? 'bg-gradient-to-br from-sage-green/50 to-sage-green-light/40 border border-sage-green/50 text-text-primary'
                        : 'bg-white/50 border border-white/40 text-text-secondary'
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
        <main className="flex-1 p-4">
          {/* Hero Image with Title Overlay */}
          <div className="hero-shadow rounded-3xl mb-8">
            {/* Inner wrapper for clipping - has overflow hidden */}
            <div className="relative h-[250px] md:h-[400px] rounded-3xl overflow-hidden">
              <img
                src="/images/course/day-1-hero-image.jpg"
                alt={lesson.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <h1 className="text-3xl md:text-5xl font-black text-white mb-1 md:mb-2 leading-tight drop-shadow-lg">
                  {lesson.title}
                </h1>
                <p className="text-base md:text-xl text-white/90 font-medium drop-shadow-md">
                  {lesson.subtitle}
                </p>
              </div>
            </div>
          </div>

          <LessonContent
            lesson={lesson}
            currentDay={currentDay}
            userId={session.user.id!}
            hasFullAccess={isAdmin || isTechPartner}
            completedDays={completedDays}
          />
        </main>
      </div>

      {/* Mobile Bottom Navigation - Swipeable Day Selector */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md shadow-[0_-8px_16px_rgba(0,0,0,0.1)]">
        {/* Scrollable Day Buttons */}
        <div className="overflow-x-auto scrollbar-hide px-4 py-3 overflow-y-visible">
          <div className="flex gap-2.5 min-w-max items-center">
            {courseModules.map((day) => {
              const isDayCompleted = completedDays.includes(day.day)
              const isLocked = day.day > 1 && !completedDays.includes(day.day - 1)
              const isActive = day.day === currentDay

              if (isLocked) {
                return (
                  <div
                    key={day.day}
                    className="flex flex-col items-center flex-shrink-0"
                  >
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-text-tertiary font-semibold" style={{
                      background: 'rgba(200, 200, 200, 0.3)',
                      boxShadow: 'inset 2px 2px 5px rgba(180, 160, 145, 0.2), inset -2px -2px 5px rgba(255, 255, 255, 0.7)',
                      opacity: 0.5
                    }}>
                      <span className="text-sm">{day.day}</span>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={day.day}
                  href={`/module?day=${day.day}`}
                  className="flex flex-col items-center flex-shrink-0"
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${isActive ? 'text-white' : 'text-text-primary'
                      }`}
                    style={
                      isActive
                        ? {
                          // Purple/Lavender for current day (like desktop)
                          background: 'linear-gradient(145deg, rgba(184, 168, 212, 0.9) 0%, rgba(164, 148, 192, 0.85) 100%)',
                          boxShadow: '0 6px 20px rgba(184, 168, 212, 0.5), -6px 6px 16px rgba(160, 140, 180, 0.3), 6px -6px 16px rgba(255, 255, 255, 0.9)',
                          transform: 'scale(1.1)'
                        }
                        : isDayCompleted
                          ? {
                            // Green for completed (like desktop)
                            background: 'linear-gradient(145deg, rgba(184, 206, 184, 0.8) 0%, rgba(164, 186, 164, 0.75) 100%)',
                            boxShadow: '-6px 6px 16px rgba(150, 170, 150, 0.25), 6px -6px 16px rgba(255, 255, 255, 0.9)'
                          }
                          : {
                            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.8) 0%, rgba(245, 241, 237, 0.8) 100%)',
                            boxShadow: '-4px 4px 12px rgba(180, 160, 145, 0.15), 4px -4px 12px rgba(255, 255, 255, 0.9)'
                          }
                    }
                  >
                    <span>{day.day}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
