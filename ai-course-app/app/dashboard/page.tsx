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

  const { data: progressData } = await supabase
    .from('user_progress')
    .select('lesson_id, completed')
    .eq('user_id', session.user.email)
    .eq('completed', true)

  const daysCompleted = progressData?.length || 0
  const totalDays = 30
  const progressPercent = Math.round((daysCompleted / totalDays) * 100)

  return (
    <div className="bg-background-light min-h-screen font-body">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 xl:px-40 py-5">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border-color px-4 md:px-10 py-3">
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
            <h2 className="text-lg font-semibold">30-Day AI Onboarding</h2>
          </div>
          <div className="flex items-center gap-8">
            <a href="/dashboard" className="hidden md:inline text-sm font-medium hover:text-primary transition-colors">Home</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="mt-8 flex flex-col gap-8 px-4 md:px-6">
          <div className="flex flex-wrap justify-between gap-3">
            <div className="flex min-w-72 flex-col gap-2">
              <p className="text-4xl font-bold tracking-tight">My Dashboard</p>
              <p className="text-text-secondary text-base">Welcome back, let's continue your AI journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Progress */}
            <aside className="lg:col-span-2 flex flex-col gap-6">
              {/* Course Progress Card */}
              <div className="bg-surface p-6 rounded-xl border border-border-color">
                <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Progress Circle */}
                  <div className="relative size-48">
                    <svg className="size-full transform -rotate-90">
                      <circle cx="96" cy="96" r="80" fill="none" stroke="#E5E7EB" strokeWidth="12"/>
                      <circle 
                        cx="96" 
                        cy="96" 
                        r="80" 
                        fill="none" 
                        stroke="url(#progress-gradient)" 
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${progressPercent * 5.02} 502`}
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#2563EB"/>
                          <stop offset="100%" stopColor="#3B82F6"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{progressPercent}%</span>
                      <span className="text-sm text-text-secondary">Complete</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="w-full flex flex-wrap gap-4 flex-1">
                    <div className="flex min-w-[100px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light">
                      <p className="text-text-secondary text-sm font-medium">Days Completed</p>
                      <p className="text-2xl font-bold text-primary">{daysCompleted}</p>
                    </div>
                    <div className="flex min-w-[100px] flex-1 flex-col gap-2 rounded-lg p-4 bg-background-light">
                      <p className="text-text-secondary text-sm font-medium">Days Remaining</p>
                      <p className="text-2xl font-bold">{totalDays - daysCompleted}</p>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <div className="w-full flex px-4 pt-6 justify-center">
                  <a 
                    href={`/module?day=${daysCompleted + 1}`}
                    className="flex items-center justify-center gap-2 rounded-xl h-12 px-5 flex-1 max-w-[480px] bg-primary text-white font-semibold hover:bg-primary-dark transition-colors"
                  >
                    <span>Continue with Day {daysCompleted + 1}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-surface p-6 rounded-xl border border-border-color">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Course Access</h3>
                  <span className="inline-flex items-center rounded-md bg-accent-teal/10 px-2 py-1 text-xs font-medium text-accent-teal">BETA TESTING</span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg bg-background-light p-4">
                  <div>
                    <p className="text-lg font-semibold">Current Price</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-bold text-accent-teal">FREE</span>
                      <span className="text-lg font-medium text-text-secondary line-through">£75</span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">Full access to all 30 days of content.</p>
                  </div>
                  <button className="flex items-center gap-2 h-10 px-4 rounded-lg bg-gray-200 text-gray-500 cursor-not-allowed">
                    <span className="text-sm font-semibold">Payment coming soon</span>
                  </button>
                </div>
                <p className="mt-4 text-xs text-text-secondary">As a beta tester, you have full, free access to this course. Future iterations will be a paid product. Thank you!</p>
              </div>
            </aside>

            {/* Right Column - Profile */}
            <section className="lg:col-span-1">
              <div className="bg-surface p-6 rounded-xl border border-border-color flex flex-col items-center text-center">
                <img 
                  src={session.user.image || "/placeholder-avatar.png"} 
                  alt="Profile" 
                  className="size-24 rounded-full border-4 border-surface ring-2 ring-primary"
                />
                <h3 className="mt-4 text-xl font-bold">{session.user.name || "AI Learner"}</h3>
                <p className="text-sm text-text-secondary mt-1">AI Enthusiast</p>
                <p className="text-xs text-text-secondary mt-2 italic">Your name and picture will appear on your certificate.</p>
                
                <div className="w-full mt-6 flex flex-col gap-4">
                  <a href="/certificate" className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-light transition-colors">
                    <span>�</span>
                    <span className="text-sm font-medium">My Certificate</span>
                  </a>
                  <a href="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-background-light transition-colors">
                    <span>📊</span>
                    <span className="text-sm font-medium">View Progress</span>
                  </a>
                  <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }}>
                    <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-background-light transition-colors text-left">
                      <span>🚪</span>
                      <span className="text-sm font-medium">Sign Out</span>
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
