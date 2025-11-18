import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { dayNumber } = await req.json()

    // Validate day number
    if (!dayNumber || dayNumber < 1 || dayNumber > 30) {
      return NextResponse.json({ error: 'Invalid day number' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if user has completed previous day (except for day 1)
    if (dayNumber > 1) {
      const { data: previousDay } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', session.user.id)
        .eq('day_number', dayNumber - 1)
        .single()

      if (!previousDay) {
        return NextResponse.json({ 
          error: 'Must complete previous day first',
          locked: true 
        }, { status: 403 })
      }
    }

    // Insert or update progress
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: session.user.id,
        day_number: dayNumber,
        completed_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,day_number'
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: `Day ${dayNumber} marked complete!`,
      data 
    }, { status: 200 })

  } catch (error) {
    console.error('Complete lesson API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

