import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import ProfileEditor from '@/components/ProfileEditor'

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

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

  // If table doesn't exist yet, default to empty (will be created when user completes first lesson)
  const safeProgressData = progressError ? [] : (progressData || [])
  const daysCompleted = safeProgressData.length
  const highestDay = daysCompleted > 0 ? Math.max(...(safeProgressData.map(p => p.day_number))) : 0
  const nextDay = Math.min(highestDay + 1, 30)
  const totalDays = 30
  const progressPercent = Math.round((daysCompleted / totalDays) * 100)

  return (
    <div className="min-h-screen">
      {/* Header - Frosted Glass */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-text-primary">Introduction to AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-semibold text-text-primary">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Course</a>
            <a href="/certificate" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full ring-2 ring-white/50 shadow-md"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <main className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex min-w-72 flex-col gap-3">
              <p className="text-5xl font-black tracking-tight text-text-primary">My Dashboard</p>
              <p className="text-text-secondary text-lg font-medium">Welcome back, let's continue your AI journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Progress */}
            <aside className="lg:col-span-2 flex flex-col gap-6">
              {/* Beta Tester Notice */}
              <div className="card-neumorphic rounded-3xl p-8 border-2 border-sage-green/30">
                <h3 className="text-xl font-bold text-text-primary mb-4">Hey!</h3>
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
                    className="btn-neumorphic flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-2xl text-text-primary"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">Email</span>
                    <span className="font-bold">hello@wearewacky.com</span>
                  </a>
                  <a 
                    href="https://wa.me/447460460318" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neumorphic flex flex-col items-center justify-center gap-1 px-6 py-4 rounded-2xl text-text-primary"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">WhatsApp</span>
                    <span className="font-bold">+44 7460 460318</span>
                  </a>
                </div>
              </div>

              {/* Course Progress Card - Blue tint */}
              <div className="glass-blue rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-8 text-text-primary">
                  Course Progress
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Progress Circle - Enhanced */}
                  <div className="relative size-52 flex-shrink-0">
                    <svg className="size-full transform -rotate-90">
                      <circle cx="104" cy="104" r="88" fill="none" stroke="rgba(200, 190, 180, 0.3)" strokeWidth="14"/>
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
                          <stop offset="0%" stopColor="#B8CEB8"/>
                          <stop offset="50%" stopColor="#A8D4C8"/>
                          <stop offset="100%" stopColor="#B8A8D4"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-text-primary">{progressPercent}%</span>
                      <span className="text-sm text-text-secondary font-semibold">Complete</span>
                    </div>
                  </div>

                  {/* Stats - Frosted glass cards */}
                  <div className="w-full flex flex-wrap gap-4 flex-1">
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-2xl p-5 glass-sage">
                      <p className="text-text-secondary text-sm font-semibold">Days Completed</p>
                      <p className="text-3xl font-black text-text-primary">{daysCompleted}</p>
                    </div>
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-2xl p-5 glass-mint">
                      <p className="text-text-secondary text-sm font-semibold">Days Remaining</p>
                      <p className="text-3xl font-black text-text-primary">{totalDays - daysCompleted}</p>
                    </div>
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-2xl p-5 glass-peach">
                      <p className="text-text-secondary text-sm font-semibold">Streak</p>
                      <p className="text-3xl font-black text-text-primary">{daysCompleted} days</p>
                    </div>
                  </div>
                </div>

                {/* Continue Button - Prominent CTA */}
                <div className="w-full flex pt-8 justify-center">
                  <a 
                    href={`/module?day=${nextDay}`}
                    className="btn-neumorphic flex items-center justify-center gap-3 rounded-2xl h-14 px-8 flex-1 max-w-[480px] text-text-primary font-bold text-lg"
                  >
                    <span>{daysCompleted === 0 ? 'Start with Day 1' : nextDay > 30 ? 'Course Complete!' : `Continue with Day ${nextDay}`}</span>
                    {nextDay <= 30 && <span className="text-xl">→</span>}
                  </a>
                </div>
              </div>

              {/* Course Access - Lavender tint */}
              <div className="glass-lavender rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-text-primary">
                    Course Access
                  </h3>
                  <span className="badge-glass text-sage-green">
                    BETA TESTING
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Course 1: Introduction to AI - Current */}
                  <div className="glass-sage rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-text-primary mb-2">Introduction to AI</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-3xl font-black text-sage-green">FREE</span>
                      <span className="text-lg font-bold text-text-tertiary line-through">£49</span>
                    </div>
                    <p className="text-xs text-text-secondary">30-day beginner course</p>
                  </div>

                  {/* Course 2: Adventures with AI - Coming Soon */}
                  <div className="glass-subtle rounded-2xl p-6 opacity-75">
                    <h4 className="text-lg font-bold text-text-secondary mb-2">Adventures with AI</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-text-tertiary">£79</span>
                    </div>
                    <p className="text-xs text-text-tertiary font-semibold">Coming soon</p>
                  </div>

                  {/* Course 3: AI Automations - 2026 */}
                  <div className="glass-subtle rounded-2xl p-6 opacity-60">
                    <h4 className="text-lg font-bold text-text-secondary mb-2">AI Automations</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-text-tertiary">£129</span>
                    </div>
                    <p className="text-xs text-text-tertiary font-semibold">Coming in 2026</p>
                  </div>

                  {/* Course 4: AI Video Creation - 2026 */}
                  <div className="glass-subtle rounded-2xl p-6 opacity-60">
                    <h4 className="text-lg font-bold text-text-secondary mb-2">AI Video Creation</h4>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-2xl font-bold text-text-tertiary">£129</span>
                    </div>
                    <p className="text-xs text-text-tertiary font-semibold">Coming in 2026</p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary mt-6 text-center">
                  <span className="font-semibold">Special Offer:</span> As a beta tester, you have full, free access to Introduction to AI. Future courses will be paid products. Thank you!
                </p>
              </div>
            </aside>

            {/* Right Column - Profile - Mint tint */}
            <section className="lg:col-span-1">
              <div className="glass-mint rounded-3xl p-8 flex flex-col items-center text-center sticky top-24">
                <ProfileEditor
                  userId={session.user.id!}
                  defaultName={session.user.name}
                  defaultAvatar={session.user.image}
                  defaultEmail={session.user.email}
                />
                
                <p className="text-xs text-text-secondary mb-4">
                  Click your name to edit or hover over your picture to change it
                </p>
                
                <p className="text-xs text-text-secondary mb-6">
                  Your name and picture will appear on your certificate
                </p>
                
                <form action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }} className="w-full">
                  <button className="btn-neumorphic w-full flex items-center justify-center gap-2 p-4 rounded-2xl text-red-600 font-bold">
                    <span>Sign Out</span>
                  </button>
                </form>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
