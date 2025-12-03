import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    console.log('Checkout session completed:', session.id)
    console.log('Client reference ID (userId):', session.client_reference_id)
    console.log('Metadata:', session.metadata)

    const userId = session.client_reference_id || session.metadata?.userId
    const productId = session.metadata?.productId || 'ai-course-intro'
    const amountPaid = session.amount_total || 0

    if (!userId) {
      console.error('No userId found in session')
      return NextResponse.json({ error: 'No userId' }, { status: 400 })
    }

    // Record the purchase in Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if purchase already exists
    const { data: existingPurchase } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single()

    if (existingPurchase) {
      console.log('Purchase already exists for user:', userId)
      return NextResponse.json({ received: true, status: 'already_exists' })
    }

    // Insert new purchase
    const { error: insertError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        product_id: productId,
        price_id: session.metadata?.priceId || 'live',
        amount_paid: amountPaid,
        status: 'paid',
      })

    if (insertError) {
      console.error('Error inserting purchase:', insertError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    console.log('Purchase recorded successfully for user:', userId)
  }

  return NextResponse.json({ received: true })
}

