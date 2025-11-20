import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

// GET: Fetch user profile
export async function GET() {
  try {
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      profile: data || null,
      defaultName: session.user.name,
      defaultAvatar: session.user.image,
      defaultEmail: session.user.email
    })
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Update user profile
export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { displayName, avatarUrl } = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if profile exists
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', session.user.id)
      .single()

    let result
    if (existing) {
      // Update existing profile
      result = await supabase
        .from('user_profiles')
        .update({
          display_name: displayName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id)
        .select()
        .single()
    } else {
      // Insert new profile
      result = await supabase
        .from('user_profiles')
        .insert({
          user_id: session.user.id,
          display_name: displayName,
          avatar_url: avatarUrl
        })
        .select()
        .single()
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true,
      profile: result.data
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

