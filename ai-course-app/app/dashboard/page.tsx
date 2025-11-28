import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import NavigationBar from '@/components/NavigationBar'
import WhatsNewWidget from '@/components/WhatsNewWidget'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  // Admin emails get FULL course access (no restrictions)
  const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
  const isAdmin = session.user.email && ADMIN_EMAILS.includes(session.user.email)

  // Fetch user progress from Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  const { data: progressData, error: progressError } = await supabase
    .from('user_progress')
    .select('day_number, completed_at')
    .eq('user_id', session.user.id)
    .order('day_number', { ascending: true })

  // Fetch user profile to check partner status and get display name
  const { data: profileData } = await supabase
    .from('user_profiles')
    .select('partner_type, partner_code, organization, display_name, avatar_url')
    .eq('user_id', session.user.id)
    .single()

  const partnerType = profileData?.partner_type || null
  const organization = profileData?.organization || null
  const displayName = profileData?.display_name || session.user.name || session.user.email?.split('@')[0] || 'AI Learner'
  const profileAvatar = profileData?.avatar_url || session.user.image || null
  const isWaitrosePartner = partnerType === 'waitrose'
  const isTechPartner = partnerType === 'tech'
  const isBetaTester = partnerType === 'beta'

  // If admin OR tech partner, show full progress (100% complete)
  // If table doesn't exist yet, default to empty (will be created when user completes first lesson)
  const safeProgressData = (isAdmin || isTechPartner)
    ? Array.from({ length: 30 }, (_, i) => ({ day_number: i + 1, completed_at: new Date().toISOString() })) // Full access
    : (progressError ? [] : (progressData || []))
  const daysCompleted = safeProgressData.length
  const highestDay = daysCompleted > 0 ? Math.max(...(safeProgressData.map(p => p.day_number))) : 0
  const nextDay = Math.min(highestDay + 1, 30)
  const totalDays = 30
  const progressPercent = Math.round((daysCompleted / totalDays) * 100)

  return (
    <div className="min-h-screen pt-20">
      <NavigationBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <main className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-5xl font-black tracking-tight text-text-primary">My Dashboard</p>
              <p className="text-text-secondary text-lg font-medium">
                {daysCompleted === 0
                  ? "Welcome! Let's start your AI journey."
                  : "Welcome back, let's continue your AI journey."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Hey! tile - matches Course Progress width (2 cols) */}
            <div className="lg:col-span-2 order-1 lg:order-1">
              <div className="card-neumorphic rounded-3xl p-8 border-2 border-sage-green/30 h-full">
                <h3 className="text-2xl font-bold text-text-primary mb-4">Hey!</h3>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  Thanks for taking the time to beta test our app—we greatly appreciate it! This app is built from the ground up, so there may be bugs and glitches here and there. Please let us know if you spot something.
                </p>
                <p className="text-text-secondary mb-4 leading-relaxed">
                  Also, let us know if you have any recommendations or if there's anything you'd change about the course content, links, apps, services, or websites we're recommending.
                </p>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  Just drop Saby an email or WhatsApp message—a screenshot also works!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="mailto:hello@wearewacky.com"
                    className="glass-blue-clickable flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-2xl text-text-primary"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Email</span>
                    <span className="font-bold">hello@wearewacky.com</span>
                  </a>
                  <a
                    href="https://wa.me/447460460318"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-sage-clickable flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-2xl text-text-primary"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">WhatsApp</span>
                    <span className="font-bold">+44 7460 460318</span>
                  </a>
                </div>
              </div>
            </div>

            {/* What's New Widget - matches Profile width (1 col), same height as Hey! */}
            {isBetaTester && (
              <div className="lg:col-span-1 order-2 lg:order-2">
                <WhatsNewWidget />
              </div>
            )}

            {/* Profile - Shows on right, same column as What's New */}
            <section className={`lg:col-span-1 order-${isBetaTester ? '3' : '2'} lg:order-3`}>
              <div className="glass-lavender rounded-3xl p-8 flex flex-col items-center text-center h-full">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-6">Profile</h3>

                  {/* Profile Picture */}
                  <div className="relative mb-4">
                    {profileAvatar ? (
                      <img
                        src={profileAvatar}
                        alt="Profile"
                        className="size-24 rounded-full border-4 border-white shadow-lg object-cover"
                      />
                    ) : (
                      <div className="size-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center bg-gradient-to-br from-sage-green/30 to-lavender/30">
                        <span className="text-4xl font-black text-text-primary">
                          {(displayName || session.user.email)?.[0]?.toUpperCase() || 'U'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Name and Organization */}
                  <h4 className="text-2xl font-black text-text-primary mb-1">
                    {displayName}
                  </h4>
                  {organization && (
                    <p className="text-base font-normal text-text-secondary mb-4">
                      {organization}
                    </p>
                  )}

                  <p className="text-xs text-text-secondary mb-6">
                    Your name and picture will appear on your certificate
                  </p>

                  {/* View Profile Button */}
                  <a
                    href="/profile"
                    className="btn-neumorphic w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-text-primary font-bold hover:scale-[1.02] transition-transform mb-4"
                  >
                    <span>View Profile</span>
                  </a>

                  {/* Sign Out Button */}
                  <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }} className="w-full">
                    <button className="btn-neumorphic w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-red-600 font-bold hover:scale-[1.02] transition-transform">
                      <span>Sign Out</span>
                    </button>
                  </form>
                </div>
              </div>
            </section>




            {/* Left Column - Progress & Course Access */}
            <aside className="lg:col-span-2 flex flex-col gap-6 order-3 lg:order-2">

              {/* Course Progress Card - Blue tint */}
              <div className="glass-blue rounded-3xl p-10 h-full flex flex-col">
                <h3 className="text-2xl font-bold mb-8 text-text-primary">
                  Course Progress
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Progress Circle - Enhanced */}
                  <div className="relative size-52 flex-shrink-0">
                    <svg className="size-full transform -rotate-90">
                      <circle cx="104" cy="104" r="88" fill="none" stroke="rgba(200, 190, 180, 0.3)" strokeWidth="14" />
                      <circle
                        cx="104"
                        cy="104"
                        r="88"
                        fill="none"
                        stroke="url(#progress-gradient)"
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray={`${progressPercent * 5.53} 553`}
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#B8CEB8" />
                          <stop offset="50%" stopColor="#A8D4C8" />
                          <stop offset="100%" stopColor="#B8A8D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-text-primary">{progressPercent}%</span>
                      <span className="text-sm text-text-secondary font-semibold">Complete</span>
                    </div>
                  </div>

                  {/* Stats - White frosted cards */}
                  <div className="w-full flex flex-wrap gap-4 flex-1">
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-2xl p-5 glass">
                      <p className="text-text-secondary text-sm font-semibold">Completed</p>
                      <p className="text-3xl font-black text-text-primary">{daysCompleted} <span className="text-lg font-normal">days</span></p>
                    </div>
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-2xl p-5 glass">
                      <p className="text-text-secondary text-sm font-semibold">Remaining</p>
                      <p className="text-3xl font-black text-text-primary">{totalDays - daysCompleted} <span className="text-lg font-normal">days</span></p>
                    </div>
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-2xl p-5 glass">
                      <p className="text-text-secondary text-sm font-semibold">Streak</p>
                      <p className="text-3xl font-black text-text-primary">{daysCompleted} <span className="text-lg font-normal">days</span></p>
                    </div>
                  </div>
                </div>

                {/* Continue Button - White frosted */}
                <div className="w-full flex pt-8 justify-center">
                  <a
                    href={`/module?day=${nextDay}`}
                    className="glass-clickable flex items-center justify-center gap-3 rounded-2xl h-14 px-8 flex-1 max-w-[480px] text-text-primary font-bold text-lg"
                  >
                    <span>{daysCompleted === 0 ? 'Start with Day 1' : nextDay > 30 ? 'Course Complete!' : `Continue with Day ${nextDay}`}</span>
                    {nextDay <= 30 && <span className="text-xl">→</span>}
                  </a>
                </div>
              </div>

              {/* Course Access - Green tint */}
              <div className="glass-sage rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-text-primary">
                    Course Access
                  </h3>
                  <span className="badge-glass text-sage-green">
                    BETA TESTING
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Course 1: Introduction to AI - Clickable to payment */}
                  <a href="/payment?product=ai-course-intro" className="glass-clickable rounded-2xl p-6 block cursor-pointer">
                    <h4 className="text-lg font-bold text-text-primary mb-2">Introduction to AI</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      {isBetaTester ? (
                        <>
                          <span className="text-3xl font-black text-sage-green">FREE</span>
                          <span className="text-xs text-text-tertiary">(Beta Tester)</span>
                        </>
                      ) : isWaitrosePartner ? (
                        <>
                          <span className="text-3xl font-black text-sage-green">£19</span>
                          <span className="text-lg font-bold text-text-tertiary line-through">£49</span>
                        </>
                      ) : isTechPartner ? (
                        <>
                          <span className="text-3xl font-black" style={{ color: '#6B9B6B' }}>FREE</span>
                          <span className="text-xs text-text-tertiary">(Tech Partner)</span>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-black" style={{ color: '#6B9B6B' }}>FREE</span>
                          <span className="text-lg font-bold text-text-tertiary line-through">£49</span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-text-secondary">30-day beginner course</p>
                  </a>

                  {/* Course 2: Adventures with AI - Coming Soon */}
                  <div className="glass-subtle rounded-2xl p-6 opacity-75">
                    <h4 className="text-lg font-bold text-text-secondary mb-2">Adventures with AI</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      {isWaitrosePartner ? (
                        <>
                          <span className="text-2xl font-bold text-text-tertiary">£29</span>
                          <span className="text-sm font-bold text-text-tertiary line-through">£79</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-text-tertiary">£79</span>
                      )}
                    </div>
                    <p className="text-xs text-text-tertiary font-semibold">Coming soon</p>
                  </div>

                  {/* Course 3: Automations with AI - 2026 */}
                  <div className="glass-subtle rounded-2xl p-6 opacity-60">
                    <h4 className="text-lg font-bold text-text-secondary mb-2">Automations with AI</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      {isWaitrosePartner ? (
                        <>
                          <span className="text-2xl font-bold text-text-tertiary">£49</span>
                          <span className="text-sm font-bold text-text-tertiary line-through">£129</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-text-tertiary">£129</span>
                      )}
                    </div>
                    <p className="text-xs text-text-tertiary font-semibold">Coming in 2026</p>
                  </div>

                  {/* Course 4: Video with AI - 2026 */}
                  <div className="glass-subtle rounded-2xl p-6 opacity-60">
                    <h4 className="text-lg font-bold text-text-secondary mb-2">Video with AI</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      {isWaitrosePartner ? (
                        <>
                          <span className="text-2xl font-bold text-text-tertiary">£49</span>
                          <span className="text-sm font-bold text-text-tertiary line-through">£129</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-text-tertiary">£129</span>
                      )}
                    </div>
                    <p className="text-xs text-text-tertiary font-semibold">Coming in 2026</p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary mt-6 text-center">
                  <span className="font-semibold">Special Offer:</span> As a beta tester, you have full, free access to Introduction to AI. Future courses will be paid products. Thank you!
                </p>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
