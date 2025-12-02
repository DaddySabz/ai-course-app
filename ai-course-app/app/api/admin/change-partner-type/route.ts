import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId, partnerType } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    const { error } = await supabase
      .from('user_profiles')
      .update({ partner_type: partnerType || null })
      .eq('user_id', userId)

    if (error) {
      console.error('Error updating partner type:', error)
      return NextResponse.json({ error: 'Failed to update partner type' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Change partner type error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

