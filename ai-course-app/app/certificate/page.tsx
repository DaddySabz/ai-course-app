// app/certificate/page.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import CertificateActions from '@/components/CertificateActions'
import NavigationBar from '@/components/NavigationBar'

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

  // Check if user is a tech partner and fetch profile info
  const { data: profileData } = await supabase
    .from('user_profiles')
    .select('partner_type, display_name, avatar_url, organization')
    .eq('user_id', session.user.id)
    .single()

  const isTechPartner = profileData?.partner_type === 'tech'
  const displayName = profileData?.display_name || session.user.name || session.user.email?.split('@')[0] || 'AI Learner'
  const profileAvatar = profileData?.avatar_url || session.user.image || null
  const organization = profileData?.organization || null

  const { data: progressData, error: progressError } = await supabase
    .from('user_progress')
    .select('day_number, completed_at')
    .eq('user_id', session.user.id)
    .order('day_number', { ascending: false })

  // Handle case where table doesn't exist yet
  const safeProgressData = progressError ? [] : (progressData || [])
  
  // Get the actual completion date from Day 30 (or the highest completed day)
  const lastCompletedDay = safeProgressData[0]
  const actualCompletionDate = lastCompletedDay?.completed_at 
    ? new Date(lastCompletedDay.completed_at).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0]

  // Only admins and tech partners get instant certificate (for review purposes)
  // Waitrose partners and regular users must complete all 30 days
  const completedLessons = (isAdmin || isTechPartner) ? 30 : safeProgressData.length
  const totalLessons = 30
  const hasCompleted = completedLessons >= totalLessons

  // If completed, check for existing certificate or create one
  let certificate = null
  if (hasCompleted) {
    // Use email instead of user_id for lookup (user_id can change between sessions)
    // Use .limit(1) instead of .single() to avoid errors when multiple rows exist
    const { data: existingCerts } = await supabase
      .from('certificates')
      .select('*')
      .eq('user_email', session.user.email)
      .order('issued_at', { ascending: true })
      .limit(1)

    const existingCert = existingCerts?.[0] || null

    if (existingCert) {
      certificate = existingCert

      // Always update certificate name and user_id to match current session
      const needsUpdate = existingCert.user_name !== displayName || existingCert.user_id !== session.user.id
      if (needsUpdate) {
        const { data: updatedCert } = await supabase
          .from('certificates')
          .update({ user_name: displayName, user_id: session.user.id })
          .eq('user_email', session.user.email)
          .select()
          .single()

        if (updatedCert) {
          certificate = updatedCert
        } else {
          certificate.user_name = displayName
        }
      } else {
        // Even if name matches, ensure we use the latest displayName
        certificate.user_name = displayName
      }
    } else {
      // Create new certificate with display name from profile
      // Use the actual completion date from the last completed lesson
      const newCert = {
        user_id: session.user.id!,
        user_name: displayName,
        user_email: session.user.email!,
        completion_date: actualCompletionDate,
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
    <div className="min-h-screen pt-20">
      <NavigationBar />

      <div className="flex flex-col items-center justify-center p-4 py-12">
        {hasCompleted ? (
          <div className="w-full max-w-5xl">
            {/* Certificate Card - Premium Minimal Design */}
            <div className="card-neumorphic rounded-3xl overflow-hidden print:shadow-none print:rounded-none">
              <div id="certificate-content" className="relative" style={{
                backgroundColor: '#f5f3f0',
                padding: 'clamp(2.5rem, 6vw, 5rem) clamp(3rem, 8vw, 6rem)',
                aspectRatio: '1.414 / 1'
              }}>

              {/* Title */}
              <div className="text-center mb-8">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>Certificate of Completion</h2>
              </div>

              {/* This certifies that + Profile Picture + Name */}
              <div className="text-center mb-12">
                <p className="text-xl text-text-secondary mb-6 font-semibold">This certifies that</p>

                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  {profileAvatar ? (
                    <img
                      src={profileAvatar}
                      alt="Profile"
                      className="w-20 h-20 rounded-full shadow-lg object-cover"
                      style={{ boxShadow: '0 0 0 4px rgba(184, 206, 184, 0.3)' }}
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-full shadow-lg flex items-center justify-center"
                      style={{
                        boxShadow: '0 0 0 4px rgba(184, 206, 184, 0.3)',
                        background: 'linear-gradient(to bottom right, rgba(184, 206, 184, 0.3), rgba(184, 168, 212, 0.3))'
                      }}
                    >
                      <span className="text-3xl font-black text-text-primary">
                        {displayName[0]?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name and Organization */}
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary">
                    {displayName}
                  </h1>
                  {organization && (
                    <p className="text-xl font-normal text-text-secondary">
                      {organization}
                    </p>
                  )}
                </div>
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
              <div
                className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t-2"
                style={{ borderColor: 'rgba(122, 115, 110, 0.2)' }}
              >
                <div className="text-center sm:text-left">
                  <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-1">Completion Date</p>
                  <p className="text-lg font-semibold text-text-primary">{certificate?.completion_date ? new Date(certificate.completion_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-1">Certificate ID</p>
                  {/* Display shortened UUID (first 8 chars) - Full UUID stored in DB for verification */}
                  <p className="text-lg font-semibold text-text-primary">
                    {certificate?.id || 'AI-XXXXXXXX'}
                  </p>
                </div>
              </div>
              </div>
            </div>

            {/* Action Buttons */}
            <CertificateActions certificateId={certificate?.id} completionDate={certificate?.completion_date} />
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
