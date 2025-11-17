// app/certificate/page.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export default async function CertificatePage() {
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

  const completedLessons = progressData?.length || 0
  const totalLessons = 30
  const hasCompleted = completedLessons >= totalLessons

  // If completed, check for existing certificate or create one
  let certificate = null
  if (hasCompleted) {
    const { data: existingCert } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', session.user.email)
      .single()

    if (existingCert) {
      certificate = existingCert
    } else {
      // Create new certificate
      const newCert = {
        user_id: session.user.email!,
        user_name: session.user.name || 'AI Learner',
        user_email: session.user.email!,
        completion_date: new Date().toISOString().split('T')[0],
      }

      const { data: createdCert } = await supabase
        .from('certificates')
        .insert(newCert)
        .select()
        .single()

      certificate = createdCert
    }
  }

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
            <a href="/module?day=1" className="text-sm font-semibold hover:text-primary transition-all duration-300 hover:scale-105">Course</a>
            <a href="/certificate" className="text-sm font-semibold text-primary">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full ring-2 ring-primary/30 shadow-lg hover:ring-primary transition-all duration-300"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center p-4 py-12">
      {hasCompleted ? (
        <div className="w-full max-w-5xl">
          {/* Certificate Card - Ultra Modern Design */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent-pink to-accent-yellow rounded-3xl blur-2xl opacity-20"></div>
            
            {/* Certificate content */}
            <div className="relative glass rounded-3xl shadow-2xl p-8 sm:p-16 border-4 border-white/50">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary/30 rounded-tl-xl"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary/30 rounded-tr-xl"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary/30 rounded-bl-xl"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary/30 rounded-br-xl"></div>
              
              {/* Header Logo */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent-pink rounded-full blur-xl opacity-50"></div>
                  <div className="relative size-20 text-primary drop-shadow-2xl">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="url(#cert-gradient)"/>
                      <defs>
                        <linearGradient id="cert-gradient" x1="4" x2="44" y1="44" y2="4">
                          <stop stopColor="#6366F1"/>
                          <stop offset="0.5" stopColor="#EC4899"/>
                          <stop offset="1" stopColor="#F59E0B"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-black text-gray-700 mb-4">Certificate of Completion</h2>
                <div className="h-1.5 w-40 bg-gradient-to-r from-primary via-accent-pink to-accent-yellow mx-auto rounded-full shadow-lg"></div>
              </div>

              {/* Name */}
              <div className="text-center mb-10">
                <p className="text-xl text-gray-600 mb-6 font-semibold">This certifies that</p>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight gradient-text drop-shadow-lg mb-2">
                  {certificate?.user_name || session.user.name}
                </h1>
                <div className="flex justify-center mt-4">
                  <div className="h-0.5 w-64 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
                </div>
              </div>

              {/* Description */}
              <div className="text-center mb-10">
                <p className="text-xl text-gray-700 mb-3 font-medium">has successfully completed the</p>
                <h3 className="text-3xl sm:text-4xl font-black text-primary mb-6 drop-shadow-md">30-Day AI Onboarding Course</h3>
                <p className="text-lg text-gray-600 font-medium">Demonstrating dedication and commitment to mastering AI fundamentals</p>
              </div>

              {/* Badges */}
              <div className="flex justify-center gap-6 mb-10">
                <div className="glass px-6 py-3 rounded-xl border border-white/40 shadow-md">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Lessons</p>
                  <p className="text-2xl font-black text-primary">{totalLessons}</p>
                </div>
                <div className="glass px-6 py-3 rounded-xl border border-white/40 shadow-md">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Achievement</p>
                  <p className="text-2xl font-black text-accent-teal">100%</p>
                </div>
              </div>

              {/* Date and ID */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t-2 border-gray-200/50">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Completion Date</p>
                  <p className="text-lg font-black text-gray-800">{certificate?.completion_date ? new Date(certificate.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Certificate ID</p>
                  <p className="font-mono text-sm font-bold text-gray-800">{certificate?.id || 'Generating...'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="glass px-8 py-4 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105 shadow-lg border border-white/30 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </Link>
            <button 
              onClick={() => window.print()}
              className="btn-primary px-8 py-4 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <span className="text-xl">🖨️</span>
              Print Certificate
            </button>
            <button 
              className="btn-secondary px-8 py-4 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <span className="text-xl">📤</span>
              Share on LinkedIn
            </button>
          </div>
        </div>
      ) : (
        /* Not Completed Yet - Modern design */
        <div className="w-full max-w-2xl">
          <div className="glass rounded-2xl p-10 shadow-2xl border border-white/30 text-center card-modern">
            <div className="text-7xl mb-6 animate-pulse">🎓</div>
            <h1 className="text-4xl font-black gradient-text mb-4">Certificate Not Available Yet</h1>
            <p className="text-xl text-gray-600 mb-8 font-medium">
              You've completed <span className="font-black text-primary text-2xl">{completedLessons}</span> out of <span className="font-black text-2xl">{totalLessons}</span> lessons.
            </p>
            <div className="w-full bg-gray-200/50 rounded-full h-6 mb-8 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-primary via-accent-pink to-accent-teal h-6 rounded-full transition-all duration-1000 shadow-lg flex items-center justify-end pr-2"
                style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
              >
                <span className="text-white text-xs font-bold">{Math.round((completedLessons / totalLessons) * 100)}%</span>
              </div>
            </div>
            <p className="text-lg text-gray-600 mb-10 font-medium">
              Keep going! Complete all {totalLessons} lessons to earn your certificate and showcase your AI knowledge.
            </p>
            <Link 
              href="/dashboard" 
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Continue Learning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
