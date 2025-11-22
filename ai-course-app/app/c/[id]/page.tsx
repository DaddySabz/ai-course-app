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
        {/* Certificate Card - Reusing styles but stripped down */}
        <div className="card-neumorphic rounded-3xl shadow-2xl p-8 sm:p-16 relative bg-gradient-to-br from-white/70 to-[#F0E6DC]/60 backdrop-blur-xl border border-white/50">
          {/* Decorative corners */}
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 rounded-tl-xl" style={{ borderColor: 'rgba(184, 206, 184, 0.4)' }}></div>
          <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 rounded-tr-xl" style={{ borderColor: 'rgba(184, 206, 184, 0.4)' }}></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 rounded-bl-xl" style={{ borderColor: 'rgba(184, 206, 184, 0.4)' }}></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 rounded-br-xl" style={{ borderColor: 'rgba(184, 206, 184, 0.4)' }}></div>
          
          {/* Title */}
          <div className="text-center mb-4">
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary">Certificate of Completion</h2>
          </div>

          {/* This certifies that */}
          <div className="text-center mb-12">
            <p className="text-xl text-text-secondary mb-6 font-semibold">This certifies that</p>
            
            {/* Name */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-text-primary">
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
  )
}
