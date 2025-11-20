import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { name, email, organization, partnerCode } = await request.json()

    // Log partner usage
    console.log('Tech Partner Access:', { name, email, organization, partnerCode, timestamp: new Date() })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Find the user account by organization (which is the username for tech partners)
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', organization)
      .single()

    if (user) {
      // Update the user_profiles with the actual name and contact email
      await supabase
        .from('user_profiles')
        .update({
          display_name: name,
          contact_email: email,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Tracking error:', error)
    // Don't fail the request if tracking fails
    return NextResponse.json({ success: true })
  }
}

