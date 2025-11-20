import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    // No auth check - portal handles authentication

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Get all tech partner profiles
    const { data: partners } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('partner_type', 'tech')
      .order('created_at', { ascending: false })

    return NextResponse.json({ partners: partners || [] })

  } catch (error) {
    console.error('Partners fetch error:', error)
    return NextResponse.json({ error: 'Failed to load partners' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // No auth check - portal handles authentication
    const { code, organization } = await request.json()

    if (!code || !organization) {
      return NextResponse.json({ error: 'Code and organization required' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if organization already exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', organization)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'Organization already exists' }, { status: 400 })
    }

    // Hash the partner code (it will be the password)
    const hashedPassword = await bcrypt.hash(code.toLowerCase(), 10)

    // Create master account
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([{
        email: organization, // Organization is the username
        password_hash: hashedPassword, // Code is the password
        name: `${organization} Tech Partner`
      }])
      .select()
      .single()

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 })
    }

    // Create profile
    await supabase
      .from('user_profiles')
      .insert([{
        user_id: newUser.id,
        display_name: `${organization} Tech Partner`,
        partner_type: 'tech',
        partner_code: code.toLowerCase(),
        organization
      }])

    return NextResponse.json({ success: true, partner: { code, organization } })

  } catch (error) {
    console.error('Partner creation error:', error)
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 })
  }
}

