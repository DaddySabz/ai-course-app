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
    .select('user_name, completion_date, image_url')
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

  // Use stored image if available, otherwise generate via API
  let ogImageUrl: string
  if (cert.image_url) {
    ogImageUrl = cert.image_url
  } else {
    const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL || 'https://courses.wearewacky.com'}/api/og`)
    ogUrl.searchParams.set('name', cert.user_name)
    ogUrl.searchParams.set('date', date)
    ogUrl.searchParams.set('id', id)
    ogImageUrl = ogUrl.toString()
  }

  return {
    title: `${cert.user_name}'s Certificate of Completion`,
    description: `Verified certificate for Introduction to AI course completion. Awarded on ${date}.`,
    openGraph: {
      title: `${cert.user_name} has completed Introduction to AI`,
      description: '🎓 30-day AI onboarding course completed! AI fundamentals, prompt engineering, and real-world applications mastered.',
      images: [
        {
          url: ogImageUrl,
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
      images: [ogImageUrl],
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

  // Short certificate ID
  const shortCertId = `AI-${certificate.id.replace(/-/g, '').slice(0, 8).toUpperCase()}`

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
        {/* Certificate Card - Display stored image if available */}
        <div className="card-neumorphic rounded-3xl overflow-hidden">
          {certificate.image_url ? (
            // Display the stored certificate image
            <div className="relative">
              <img 
                src={certificate.image_url} 
                alt={`Certificate for ${certificate.user_name}`}
                className="w-full h-auto"
                style={{ aspectRatio: '1.414 / 1' }}
              />
            </div>
          ) : (
            // Fallback: Generate image via API (shouldn't happen normally)
            <div className="relative">
              <img 
                src={`/api/certificate-image?id=${certificate.id}`} 
                alt={`Certificate for ${certificate.user_name}`}
                className="w-full h-auto"
                style={{ aspectRatio: '1.414 / 1' }}
              />
            </div>
          )}
        </div>

        {/* Verification Info */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 backdrop-blur-md rounded-full">
            <span className="text-sage-green font-bold">✓</span>
            <span className="text-text-secondary font-medium">
              Verified Certificate • ID: {shortCertId} • Issued: {date}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
