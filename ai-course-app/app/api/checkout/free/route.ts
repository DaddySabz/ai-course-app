import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  try {
    const { userId, productId } = await req.json()

    if (!userId || !productId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use Service Role to insert directly
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if user already has this product
    const { data: existing } = await supabase
      .from('purchases')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .eq('status', 'paid')
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'You already have access to this product' },
        { status: 400 }
      )
    }

    // Grant free access
    const { error: insertError } = await supabase
      .from('purchases')
      .insert({
        user_id: userId,
        product_id: productId,
        price_id: 'free',
        amount_paid: 0,
        status: 'paid',
      })

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to grant access' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Free enrollment error:', error)
    return NextResponse.json(
      { error: 'Failed to process enrollment' },
      { status: 500 }
    )
  }
}
