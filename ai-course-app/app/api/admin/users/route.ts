import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // No auth check - portal handles authentication

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Get all users with their progress
    const { data: users } = await supabase
      .from('users')
      .select(`
        id,
        email,
        name,
        created_at
      `)
      .order('created_at', { ascending: false })

    // Get progress for each user
    const usersWithProgress = await Promise.all(
      (users || []).map(async (user) => {
        const { count } = await supabase
          .from('user_progress')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)

        return {
          ...user,
          daysCompleted: count || 0
        }
      })
    )

    return NextResponse.json({ users: usersWithProgress })

  } catch (error) {
    console.error('Users fetch error:', error)
    return NextResponse.json({ error: 'Failed to load users' }, { status: 500 })
  }
}

