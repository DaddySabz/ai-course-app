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
            <h2 className="text-lg font-semibold">Introduction to AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-medium hover:text-primary transition-colors">Course</a>
            <a href="/certificate" className="text-sm font-medium hover:text-primary transition-colors">Certificate</a>
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
                    <span>{daysCompleted === 0 ? 'Start with Day 1' : `Continue with Day ${daysCompleted + 1}`}</span>
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
                <div className="relative group">
                  <img 
                    src={session.user.image || "/placeholder-avatar.png"} 
                    alt="Profile" 
                    className="size-24 rounded-full border-4 border-surface ring-2 ring-primary"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">Upload</span>
                  </button>
                </div>
                
                <div className="mt-4 w-full">
                  <input 
                    type="text" 
                    defaultValue={session.user.name || "AI Learner"}
                    className="text-xl font-bold text-center w-full bg-transparent border-b-2 border-transparent hover:border-gray-300 focus:border-primary focus:outline-none px-2 py-1"
                    placeholder="Your Name"
                  />
                </div>
                
                <p className="text-xs text-text-secondary mt-3 italic">Your name and picture will appear on your certificate.</p>
                
                <div className="w-full mt-6 flex flex-col gap-2">
                  <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors text-red-600 font-medium">
                      <span>🚪</span>
                      <span className="text-sm">Sign Out</span>
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
