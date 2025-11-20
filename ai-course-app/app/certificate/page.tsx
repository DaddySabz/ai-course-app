// app/certificate/page.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import CertificateActions from '@/components/CertificateActions'

export default async function CertificatePage() {
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

  // Check if user is a tech partner (they get full access for review)
  const { data: profileData } = await supabase
    .from('user_profiles')
    .select('partner_type')
    .eq('user_id', session.user.id)
    .single()

  const isTechPartner = profileData?.partner_type === 'tech'

  const { data: progressData, error: progressError } = await supabase
    .from('user_progress')
    .select('day_number')
    .eq('user_id', session.user.id)

  // Handle case where table doesn't exist yet
  const safeProgressData = progressError ? [] : (progressData || [])
  
  // Only admins and tech partners get instant certificate (for review purposes)
  // Waitrose partners and regular users must complete all 30 days
  const completedLessons = (isAdmin || isTechPartner) ? 30 : safeProgressData.length
  const totalLessons = 30
  const hasCompleted = completedLessons >= totalLessons

  // If completed, check for existing certificate or create one
  let certificate = null
  if (hasCompleted) {
    const { data: existingCert } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (existingCert) {
      certificate = existingCert
    } else {
      // Create new certificate
      const newCert = {
        user_id: session.user.id!,
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
    <div className="min-h-screen">
      {/* Navigation Header - Frosted Glass */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-text-primary">Introduction to AI</h2>
          </div>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Dashboard</a>
            <a href="/module?day=1" className="text-sm font-semibold text-text-secondary hover:text-text-primary transition-colors">Course</a>
            <a href="/certificate" className="text-sm font-semibold text-text-primary">Certificate</a>
            <img 
              src={session.user.image || "/placeholder-avatar.png"} 
              alt="User avatar" 
              className="size-10 rounded-full ring-2 ring-white/50 shadow-md"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center p-4 py-12">
      {hasCompleted ? (
        <div className="w-full max-w-5xl">
          {/* Certificate Card - Clean Design with Profile Picture */}
          <div id="certificate-content" className="card-neumorphic rounded-3xl shadow-2xl p-8 sm:p-16 relative">
            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-sage-green/40 rounded-tl-xl"></div>
            <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-sage-green/40 rounded-tr-xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-sage-green/40 rounded-bl-xl"></div>
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-sage-green/40 rounded-br-xl"></div>
            
            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-text-primary">Certificate of Completion</h2>
            </div>

            {/* This certifies that + Profile Picture + Name */}
            <div className="text-center mb-12">
              <p className="text-xl text-text-secondary mb-6 font-semibold">This certifies that</p>
              
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <img 
                  src={session.user.image || "/placeholder-avatar.png"} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full ring-4 ring-sage-green/30 shadow-lg"
                />
              </div>

              {/* Name */}
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary">
                {certificate?.user_name || session.user.name}
              </h1>
            </div>

            {/* Description */}
            <div className="text-center mb-12">
              <p className="text-xl text-text-secondary mb-3 font-medium">
                has successfully completed the
              </p>
              <h3 className="text-3xl sm:text-4xl font-black text-text-primary mb-4">
                Introduction to AI
              </h3>
              <p className="text-xl text-text-secondary font-medium">
                course and demonstrated dedication and commitment to mastering AI fundamentals
              </p>
            </div>

            {/* Date and ID */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t-2 border-text-tertiary/20">
              <div className="text-center sm:text-left">
                <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-1">Completion Date</p>
                <p className="text-lg font-semibold text-text-primary">{certificate?.completion_date ? new Date(certificate.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-1">Certificate ID</p>
                <p className="text-lg font-semibold text-text-primary">AI-{String(certificate?.id).slice(0, 8).toUpperCase() || 'XXXXXXXX'}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <CertificateActions certificateId={certificate?.id} />
        </div>
      ) : (
        /* Not Completed Yet - Warm design */
        <div className="w-full max-w-2xl">
          <div className="card-neumorphic rounded-3xl p-10 text-center">
            <h1 className="text-4xl font-black text-text-primary mb-6">Certificate Not Available Yet</h1>
            <p className="text-xl text-text-secondary mb-8 font-medium">
              You've completed <span className="font-black text-sage-green text-2xl">{completedLessons}</span> out of <span className="font-black text-2xl text-text-primary">{totalLessons}</span> lessons.
            </p>
            <div className="w-full bg-text-tertiary/20 rounded-full h-6 mb-8 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-sage-green via-mint to-lavender h-6 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
              >
                <span className="text-white text-xs font-bold">{Math.round((completedLessons / totalLessons) * 100)}%</span>
              </div>
            </div>
            <p className="text-lg text-text-secondary mb-10 font-medium">
              Keep going! Complete all {totalLessons} lessons to earn your certificate and showcase your AI knowledge.
            </p>
            <Link 
              href="/dashboard" 
              className="btn-neumorphic inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-text-primary"
            >
              Continue Learning
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
