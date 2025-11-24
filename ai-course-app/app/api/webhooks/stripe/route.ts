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
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.client_reference_id
    const productId = session.metadata?.productId
    const priceId = session.metadata?.priceId || 'unknown'
    const amountPaid = session.amount_total || 0

    if (!userId || !productId) {
      console.error('Missing userId or productId in webhook')
      return NextResponse.json(
        { error: 'Missing required metadata' },
        { status: 400 }
      )
    }

    // Use Service Role to insert purchase record
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    const { error } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        product_id: productId,
        price_id: priceId,
        amount_paid: amountPaid,
        status: 'paid',
      })

    if (error) {
      console.error('Failed to insert purchase:', error)
      return NextResponse.json(
        { error: 'Database insert failed' },
        { status: 500 }
      )
    }

    console.log('Purchase recorded successfully:', { userId, productId })
  }

  return NextResponse.json({ received: true })
}
