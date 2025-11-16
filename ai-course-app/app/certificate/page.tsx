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
    <div className="bg-background-light min-h-screen flex flex-col items-center justify-center p-4">
      {hasCompleted ? (
        <div className="w-full max-w-4xl">
          {/* Certificate Card */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 border-8 border-double border-primary/20">
            {/* Header Logo */}
            <div className="flex justify-center mb-8">
              <div className="size-16 text-primary">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="url(#cert-gradient)"/>
                  <defs>
                    <linearGradient id="cert-gradient" x1="4" x2="44" y1="44" y2="4">
                      <stop stopColor="#2DD4BF"/>
                      <stop offset="1" stopColor="#FBBF24"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-2">Certificate of Completion</h2>
              <div className="h-1 w-32 bg-gradient-to-r from-accent-teal to-primary mx-auto rounded"></div>
            </div>

            {/* Name */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 mb-4">This certifies that</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-accent-teal via-primary to-accent-yellow">
                {certificate?.user_name || session.user.name}
              </h1>
            </div>

            {/* Description */}
            <div className="text-center mb-8">
              <p className="text-lg text-gray-700 mb-2">has successfully completed the</p>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-4">30-Day AI Onboarding Course</h3>
              <p className="text-gray-600">Demonstrating dedication and commitment to mastering AI fundamentals</p>
            </div>

            {/* Date and ID */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-200">
              <div className="text-center sm:text-left">
                <p className="text-sm text-gray-500">Completion Date</p>
                <p className="font-bold text-gray-800">{certificate?.completion_date ? new Date(certificate.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-gray-500">Certificate ID</p>
                <p className="font-mono text-xs text-gray-800">{certificate?.id || 'Generating...'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard" 
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-center transition-colors"
            >
              &larr; Back to Dashboard
            </Link>
            <button 
              onClick={() => window.print()}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
            >
              🖨️ Print Certificate
            </button>
          </div>
        </div>
      ) : (
        /* Not Completed Yet */
        <div className="w-full max-w-2xl text-center bg-white rounded-xl p-8 shadow-lg">
          <div className="text-6xl mb-6">🎓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Certificate Not Available Yet</h1>
          <p className="text-lg text-gray-600 mb-6">
            You've completed <span className="font-bold text-primary">{completedLessons}</span> out of <span className="font-bold">{totalLessons}</span> lessons.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-gradient-to-r from-accent-teal to-primary h-4 rounded-full transition-all"
              style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mb-8">
            Complete all {totalLessons} lessons to earn your certificate!
          </p>
          <Link 
            href="/dashboard" 
            className="inline-block px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
          >
            Continue Learning →
          </Link>
        </div>
      )}
    </div>
  );
}
