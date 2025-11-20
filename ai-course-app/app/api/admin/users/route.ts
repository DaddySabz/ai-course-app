import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

const ADMIN_EMAILS = ['wackyworksdigital@gmail.com', 'hello@wearewacky.com']

export async function GET() {
  try {
    const session = await auth()
    
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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

