import { createClient } from '@supabase/supabase-js'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Initialize Supabase admin client to fetch certificate bypassing RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

type Props = {
  params: Promise<{ id: string }>
}

// Generate Metadata for Social Sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  
  const { data: cert } = await supabaseAdmin
    .from('certificates')
    .select('user_name, completion_date')
    .eq('id', id)
    .single()

  if (!cert) {
    return {
      title: 'Certificate Not Found',
    }
  }

  const date = new Date(cert.completion_date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  // Construct the OG Image URL
  const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL || 'https://ai-course-app-tau.vercel.app'}/api/og`)
  ogUrl.searchParams.set('name', cert.user_name)
  ogUrl.searchParams.set('date', date)

  return {
    title: `${cert.user_name}'s Certificate of Completion`,
    description: `Verified certificate for Introduction to AI course completion. Awarded on ${date}.`,
    openGraph: {
      title: `${cert.user_name} has completed Introduction to AI`,
      description: '🎓 30-day AI onboarding course completed! AI fundamentals, prompt engineering, and real-world applications mastered.',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: `${cert.user_name}'s Certificate`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cert.user_name}'s AI Certificate`,
      description: '🎓 30-day AI onboarding course completed!',
      images: [ogUrl.toString()],
    },
  }
}

export default async function PublicCertificatePage({ params }: Props) {
  const { id } = await params

  const { data: certificate } = await supabaseAdmin
    .from('certificates')
    .select('*')
    .eq('id', id)
    .single()

  if (!certificate) {
    notFound()
  }

  const date = new Date(certificate.completion_date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <div className="min-h-screen bg-[#E8DDD3] flex flex-col items-center justify-center p-4">
      {/* Navbar Placeholder / Back Link */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/login" 
          className="flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full font-bold text-text-primary shadow-lg hover:bg-white/80 transition-all"
        >
          ← Go to Course
        </Link>
      </div>

      <div className="w-full max-w-5xl mt-12 sm:mt-0">
        {/* Certificate Card - Clean paper design matching /certificate page */}
        <div className="card-neumorphic rounded-3xl overflow-hidden">
          <div className="relative" style={{
            background: `
              linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%),
              linear-gradient(to bottom, #faf9f7 0%, #f5f3f0 50%, #f0ede8 100%)
            `,
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(3rem, 8vw, 6rem)',
            aspectRatio: '1.414 / 1',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.03)'
          }}>
          
            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.02em' }}>Certificate of Completion</h2>
            </div>

            {/* This certifies that */}
            <div className="text-center mb-12">
              <p className="text-xl text-text-secondary mb-6 font-semibold">This certifies that</p>
              
              {/* Name */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-text-primary">
                  {certificate.user_name}
                </h1>
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
              <p className="text-xl text-text-secondary font-medium max-w-2xl mx-auto">
                course and demonstrated dedication and commitment to mastering AI fundamentals
              </p>
            </div>

            {/* Footer Info */}
            <div 
              className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t-2"
              style={{ borderColor: 'rgba(122, 115, 110, 0.2)' }}
            >
              <div className="text-center sm:text-left">
                <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-1">Completion Date</p>
                <p className="text-lg font-semibold text-text-primary">{date}</p>
              </div>
              
              <div className="text-center">
                 <div className="px-4 py-2 bg-sage-green/20 rounded-full border border-sage-green/30">
                   <span className="text-sage-green font-bold flex items-center gap-2">
                     ✓ Verified Certificate
                   </span>
                 </div>
              </div>

              <div className="text-center sm:text-right">
                <p className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-1">Certificate ID</p>
                <p className="text-lg font-semibold text-text-primary">
                  AI-{String(certificate.id).replace(/-/g, '').slice(0, 8).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
