import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if user exists
    const { data } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    return NextResponse.json({ exists: !!data })
  } catch (error) {
    console.error('Check email error:', error)
    return NextResponse.json({ exists: false })
  }
}

