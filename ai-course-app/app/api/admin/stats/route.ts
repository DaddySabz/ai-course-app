import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAILS = ['wackyworksdigital@gmail.com', 'hello@wearewacky.com']

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    // Check if user is admin
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    // Get tech partners
    const { count: techPartners } = await supabase
      .from('user_profiles')
      .select('*', { count: 'exact', head: true })
      .eq('partner_type', 'tech')

    // Get total completions (users who completed all 30 days)
    const { data: completionsData } = await supabase
      .from('user_progress')
      .select('user_id')
      .eq('day_number', 30)

    const completions = completionsData?.length || 0

    // Active today (rough estimate based on recent progress)
    const today = new Date().toISOString().split('T')[0]
    const { count: activeToday } = await supabase
      .from('user_progress')
      .select('*', { count: 'exact', head: true })
      .gte('completed_at', today)

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      techPartners: techPartners || 0,
      completions,
      activeToday: activeToday || 0
    })

  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json({ error: 'Failed to load stats' }, { status: 500 })
  }
}

