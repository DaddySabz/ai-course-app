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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header - Glass morphism style */}
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
            <a href="/dashboard" className="text-sm font-semibold text-primary">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-semibold hover:text-primary transition-all duration-300 hover:scale-105">Course</a>
            <a href="/certificate" className="text-sm font-semibold hover:text-primary transition-all duration-300 hover:scale-105">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full ring-2 ring-primary/30 shadow-lg hover:ring-primary transition-all duration-300"
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
              <p className="text-5xl font-black tracking-tight gradient-text">My Dashboard</p>
              <p className="text-text-secondary text-lg font-medium">Welcome back, let's continue your AI journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Progress */}
            <aside className="lg:col-span-2 flex flex-col gap-6">
              {/* Course Progress Card - Modern design */}
              <div className="glass rounded-2xl border border-white/30 p-8 card-modern">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <span className="text-3xl">📊</span>
                  Course Progress
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  {/* Progress Circle - Enhanced */}
                  <div className="relative size-52 flex-shrink-0">
                    <svg className="size-full transform -rotate-90 drop-shadow-xl">
                      <circle cx="104" cy="104" r="88" fill="none" stroke="#E5E7EB" strokeWidth="14"/>
                      <circle 
                        cx="104" 
                        cy="104" 
                        r="88" 
                        fill="none" 
                        stroke="url(#progress-gradient)" 
                        strokeWidth="14"
                        strokeLinecap="round"
                        strokeDasharray={`${progressPercent * 5.53} 553`}
                        className="drop-shadow-lg"
                      />
                      <defs>
                        <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366F1"/>
                          <stop offset="50%" stopColor="#EC4899"/>
                          <stop offset="100%" stopColor="#F59E0B"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black gradient-text">{progressPercent}%</span>
                      <span className="text-sm text-text-secondary font-semibold">Complete</span>
                    </div>
                  </div>

                  {/* Stats - Enhanced cards */}
                  <div className="w-full flex flex-wrap gap-4 flex-1">
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-xl p-5 bg-gradient-to-br from-primary/10 to-accent-purple/10 border border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <p className="text-text-secondary text-sm font-semibold">Days Completed</p>
                      <p className="text-3xl font-black text-primary">{daysCompleted}</p>
                    </div>
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-xl p-5 bg-gradient-to-br from-accent-teal/10 to-green-400/10 border border-accent-teal/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <p className="text-text-secondary text-sm font-semibold">Days Remaining</p>
                      <p className="text-3xl font-black text-accent-teal">{totalDays - daysCompleted}</p>
                    </div>
                    <div className="flex min-w-[120px] flex-1 flex-col gap-3 rounded-xl p-5 bg-gradient-to-br from-accent-yellow/10 to-orange-400/10 border border-accent-yellow/20 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                      <p className="text-text-secondary text-sm font-semibold">Total Days</p>
                      <p className="text-3xl font-black text-accent-yellow">{totalDays}</p>
                    </div>
                  </div>
                </div>

                {/* Continue Button - Prominent CTA */}
                <div className="w-full flex pt-8 justify-center">
                  <a 
                    href={`/module?day=${daysCompleted + 1}`}
                    className="btn-primary flex items-center justify-center gap-3 rounded-xl h-14 px-8 flex-1 max-w-[480px] text-white font-bold text-lg shadow-xl hover:scale-105 transform transition-all duration-300"
                  >
                    <span>{daysCompleted === 0 ? 'Start with Day 1' : `Continue with Day ${daysCompleted + 1}`}</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Pricing Card - Modern design */}
              <div className="relative rounded-2xl overflow-hidden card-modern">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 via-green-400/20 to-primary/20"></div>
                <div className="relative glass border border-white/40 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <span className="text-3xl">🎓</span>
                      Course Access
                    </h3>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-teal to-green-500 text-white font-bold text-xs shadow-lg uppercase tracking-wider animate-pulse">
                      BETA TESTING
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-xl bg-white/90 backdrop-blur-sm p-6 shadow-lg border border-white/50">
                    <div>
                      <p className="text-xl font-bold text-text-primary">Current Price</p>
                      <div className="flex items-baseline gap-3 mt-2">
                        <span className="text-5xl font-black text-accent-teal drop-shadow-lg">FREE</span>
                        <span className="text-2xl font-bold text-text-secondary line-through">£75</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-2 font-medium">Full access to all 30 days of content.</p>
                    </div>
                    <button className="flex items-center gap-2 h-12 px-6 rounded-xl bg-gray-200 text-gray-500 cursor-not-allowed font-semibold whitespace-nowrap shadow-sm">
                      <span className="text-sm">Payment coming soon</span>
                    </button>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200">
                    <p className="text-sm text-text-secondary font-medium">
                      <span className="font-bold text-primary">🎉 Special Offer:</span> As a beta tester, you have full, free access to this course. Future iterations will be a paid product. Thank you for your participation!
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Column - Profile - Modern card */}
            <section className="lg:col-span-1">
              <div className="glass rounded-2xl border border-white/30 p-8 flex flex-col items-center text-center card-modern sticky top-24">
                <div className="relative group mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary via-accent-pink to-accent-yellow rounded-full blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  <img 
                    src={session.user.image || "/placeholder-avatar.png"} 
                    alt="Profile" 
                    className="relative size-28 rounded-full border-4 border-white shadow-xl"
                  />
                  <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <span className="text-white text-sm font-semibold">📷 Upload</span>
                  </button>
                </div>
                
                <div className="mt-2 w-full">
                  <input 
                    type="text" 
                    defaultValue={session.user.name || "AI Learner"}
                    className="text-2xl font-bold text-center w-full bg-transparent border-b-2 border-transparent hover:border-primary/30 focus:border-primary focus:outline-none px-2 py-2 transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>
                
                <p className="text-xs text-text-secondary mt-4 italic bg-yellow-50 px-3 py-2 rounded-lg">
                  💡 Your name and picture will appear on your certificate
                </p>
                
                <div className="w-full mt-8 flex flex-col gap-3">
                  <div className="p-4 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-200">
                    <p className="text-xs font-bold text-green-700 mb-1">Streak</p>
                    <p className="text-2xl font-black text-green-600">🔥 {daysCompleted} days</p>
                  </div>
                  
                  <form action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }} className="w-full">
                    <button className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300 text-red-600 font-bold shadow-md hover:shadow-lg hover:scale-105 transform">
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
