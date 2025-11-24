iinmport { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import NavigationBar from '@/components/NavigationBar'
import CheckoutButton from '@/components/CheckoutButton'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function PaymentPage({ searchParams }: PageProps) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  const params = await searchParams
  const productId = params.product as string || 'ai-course-intro'

  // Admin emails get FULL course access (no restrictions)
  const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
  const isAdmin = session.user.email && ADMIN_EMAILS.includes(session.user.email)

  // Fetch user profile to check partner status
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  const { data: profileData } = await supabase
    .from('user_profiles')
    .select('partner_type')
    .eq('user_id', session.user.id)
    .single()

  const partnerType = profileData?.partner_type || null
  const isWaitrosePartner = partnerType === 'waitrose'
  const isTechPartner = partnerType === 'tech'

  // Check if user already has access to this product
  const { data: purchases } = await supabase
    .from('purchases')
    .select('*')
    .eq('user_id', session.user.id)
    .eq('product_id', productId)
    .eq('status', 'paid')

  const hasAccess = purchases && purchases.length > 0

  // Define product details
  const products: Record<string, { 
    title: string
    description: string
    fullPrice: number
    betaPrice: number
    waitrosePrice: number
  }> = {
    'ai-course-intro': {
      title: 'Introduction to AI',
      description: '30-day beginner course to master AI fundamentals',
      fullPrice: 49,
      betaPrice: 0, // FREE for beta testers
      waitrosePrice: 19
    },
    'ai-course-adventures': {
      title: 'Adventures with AI',
      description: 'Advanced AI applications and real-world projects',
      fullPrice: 79,
      betaPrice: 0, // FREE for beta testers
      waitrosePrice: 39
    },
    'ai-course-automations': {
      title: 'Automations with AI',
      description: 'Build powerful AI-driven automation workflows',
      fullPrice: 129,
      betaPrice: 0, // FREE for beta testers
      waitrosePrice: 64
    },
    'ai-course-video': {
      title: 'Video with AI',
      description: 'Create stunning videos using AI tools',
      fullPrice: 129,
      betaPrice: 0, // FREE for beta testers
      waitrosePrice: 64
    }
  }

  const product = products[productId]
  
  if (!product) {
    redirect('/dashboard')
  }

  // Determine price and price ID based on user type
  let price = product.fullPrice
  let priceLabel = `£${price}`
  let discountLabel = null
  let stripePriceId = ''

  if (isAdmin || isTechPartner) {
    price = 0
    priceLabel = 'FREE'
    discountLabel = isTechPartner ? 'Tech Partner Access' : 'Admin Access'
    stripePriceId = ''
  } else if (isWaitrosePartner) {
    price = product.waitrosePrice
    priceLabel = `£${price}`
    discountLabel = 'Waitrose Partner Discount'
    stripePriceId = process.env.NEXT_PUBLIC_PRICE_ID_INTRO_PARTNER || ''
  } else {
    // Beta testers get it free
    price = product.betaPrice
    priceLabel = price === 0 ? 'FREE' : `£${price}`
    discountLabel = 'Beta Tester Access'
    stripePriceId = ''
  }

  return (
    <div className="min-h-screen pt-20">
      <NavigationBar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-10">
        <main className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-3">
            <a 
              href="/dashboard"
              className="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium inline-flex items-center gap-2 w-fit"
            >
              <span>←</span>
              <span>Back to Dashboard</span>
            </a>
            <h1 className="text-5xl font-black tracking-tight text-text-primary">Secure Checkout</h1>
            <p className="text-text-secondary text-lg font-medium">
              Complete your enrollment in just a few steps.
            </p>
          </div>

          {hasAccess ? (
            // Already purchased
            <div className="glass-sage rounded-3xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center size-16 rounded-full bg-sage-green/30 mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">You already have access!</h2>
                <p className="text-text-secondary mb-6">
                  You've already enrolled in {product.title}.
                </p>
                <a 
                  href="/dashboard"
                  className="btn-neumorphic inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-text-primary font-bold"
                >
                  Go to Dashboard
                </a>
              </div>
            </div>
          ) : (
            // Checkout Form
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - Product Info */}
              <div className="flex-1">
                <div className="glass-blue rounded-3xl p-8">
                  <h2 className="text-2xl font-bold text-text-primary mb-4">
                    {product.title}
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-sage-green text-xl mt-0.5">✓</span>
                      <p className="text-text-secondary">30 days of comprehensive content</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sage-green text-xl mt-0.5">✓</span>
                      <p className="text-text-secondary">Hands-on exercises and real-world applications</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sage-green text-xl mt-0.5">✓</span>
                      <p className="text-text-secondary">Certificate of completion</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-sage-green text-xl mt-0.5">✓</span>
                      <p className="text-text-secondary">Lifetime access to course materials</p>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-8 pt-8 border-t border-text-tertiary/20">
                    <div className="flex items-center gap-2 text-text-secondary text-sm">
                      <span className="text-lg">🔒</span>
                      <span>Your payment is processed securely via Stripe.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:w-96">
                <div className="glass-lavender rounded-3xl p-8 lg:sticky lg:top-24">
                  <h2 className="text-2xl font-bold text-text-primary mb-6 pb-4 border-b border-text-tertiary/20">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <p className="text-text-secondary">{product.title}</p>
                      <p className="font-semibold text-text-primary line-through text-text-tertiary">
                        £{product.fullPrice}
                      </p>
                    </div>

                    {discountLabel && (
                      <div className="glass-sage rounded-2xl p-3 text-center">
                        <span className="text-sm font-bold text-sage-green">
                          {discountLabel}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-text-tertiary/20 pt-4 flex justify-between items-center">
                      <p className="text-lg font-bold text-text-primary">Total</p>
                      <p className="text-3xl font-black text-sage-green">
                        {priceLabel}
                      </p>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <CheckoutButton 
                    productId={productId}
                    priceId={stripePriceId}
                    amount={price}
                    label={price === 0 ? 'Enroll Now - FREE' : `Enroll Now - £${price}`}
                    userId={session.user.id!}
                  />

                  {/* Moneyback guarantee */}
                  {price > 0 && (
                    <div className="mt-6 text-center">
                      <p className="text-xs text-text-secondary">
                        <span className="font-semibold">30-Day Money-Back Guarantee</span>
                        <br />
                        Not satisfied? Get a full refund within 30 days.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
