import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

export async function GET(req: Request) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Get all completed days for this user
    const { data: progress, error } = await supabase
      .from('user_progress')
      .select('day_number, completed_at')
      .eq('user_id', session.user.id)
      .order('day_number', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Calculate summary
    const completedDays = progress?.map(p => p.day_number) || []
    const highestDay = completedDays.length > 0 ? Math.max(...completedDays) : 0
    const nextUnlockedDay = highestDay + 1 <= 30 ? highestDay + 1 : 30

    return NextResponse.json({ 
      completedDays,
      totalCompleted: completedDays.length,
      highestDay,
      nextUnlockedDay,
      progress: progress || []
    }, { status: 200 })

  } catch (error) {
    console.error('Get progress API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

