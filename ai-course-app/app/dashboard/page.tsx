import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'

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
            <div className="text-2xl font-bold text-text-primary">
              📚
            </div>
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
              {/* Course Progress Card - Neumorphic design */}
              <div className="card-neumorphic rounded-3xl p-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-text-primary">
                  <span className="text-3xl">📊</span>
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
                      <p className="text-text-secondary text-sm font-semibold">Total Days</p>
                      <p className="text-3xl font-black text-text-primary">{totalDays}</p>
                    </div>
                  </div>
                </div>

                {/* Continue Button - Prominent CTA */}
                <div className="w-full flex pt-8 justify-center">
                  <a 
                    href={`/module?day=${nextDay}`}
                    className="btn-neumorphic flex items-center justify-center gap-3 rounded-2xl h-14 px-8 flex-1 max-w-[480px] text-text-primary font-bold text-lg"
                  >
                    <span>{daysCompleted === 0 ? 'Start with Day 1' : nextDay > 30 ? 'Course Complete! 🎉' : `Continue with Day ${nextDay}`}</span>
                    {nextDay <= 30 && <span className="text-xl">→</span>}
                  </a>
                </div>
              </div>

              {/* Pricing Card - Warm glass design */}
              <div className="card-neumorphic rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2 text-text-primary">
                    <span className="text-3xl">🎓</span>
                    Course Access
                  </h3>
                  <span className="badge-glass text-sage-green">
                    BETA TESTING
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl glass-subtle p-6">
                  <div>
                    <p className="text-xl font-bold text-text-primary">Current Price</p>
                    <div className="flex items-baseline gap-3 mt-2">
                      <span className="text-5xl font-black text-sage-green">FREE</span>
                      <span className="text-2xl font-bold text-text-tertiary line-through">£75</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-2 font-medium">Full access to all 30 days of content.</p>
                  </div>
                  <button className="btn-neumorphic h-12 px-6 rounded-2xl text-text-tertiary cursor-not-allowed whitespace-nowrap">
                    <span className="text-sm font-semibold">Payment coming soon</span>
                  </button>
                </div>
                <div className="mt-6 p-4 glass-peach rounded-2xl">
                  <p className="text-sm text-text-secondary font-medium">
                    <span className="font-bold text-text-primary">🎉 Special Offer:</span> As a beta tester, you have full, free access to this course. Future iterations will be a paid product. Thank you!
                  </p>
                </div>
              </div>
            </aside>

            {/* Right Column - Profile - Warm card */}
            <section className="lg:col-span-1">
              <div className="card-neumorphic rounded-3xl p-8 flex flex-col items-center text-center sticky top-24">
                <div className="relative group mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-sage-green via-mint to-lavender rounded-full blur-lg opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <img 
                    src={session.user.image || "/placeholder-avatar.png"} 
                    alt="Profile" 
                    className="relative size-28 rounded-full border-4 border-white shadow-lg"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <span className="text-white text-sm font-semibold">📷 Upload</span>
                  </button>
                </div>
                
                <div className="mt-2 w-full">
                  <input 
                    type="text" 
                    defaultValue={session.user.name || "AI Learner"}
                    className="text-2xl font-bold text-center w-full bg-transparent border-b-2 border-transparent hover:border-sage-green/30 focus:border-sage-green focus:outline-none px-2 py-2 transition-all duration-300 text-text-primary"
                    placeholder="Your Name"
                  />
                </div>
                
                <p className="text-xs text-text-secondary mt-4 italic glass-peach px-3 py-2 rounded-xl">
                  💡 Your name and picture will appear on your certificate
                </p>
                
                <div className="w-full mt-8 flex flex-col gap-3">
                  <div className="p-4 glass-sage rounded-2xl">
                    <p className="text-xs font-bold text-text-secondary mb-1 uppercase tracking-wider">Streak</p>
                    <p className="text-2xl font-black text-text-primary">🔥 {daysCompleted} days</p>
                  </div>
                  
                  <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl glass-subtle hover:bg-red-50/50 transition-all duration-300 text-red-600 font-bold shadow-sm hover:shadow-md hover:scale-[1.02] transform">
                      <span className="text-lg">🚪</span>
                      <span>Sign Out</span>
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
