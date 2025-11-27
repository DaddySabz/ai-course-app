import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, partnerType, partnerCode, organization } = await request.json()

    // Validation
    if (!email || !password || !name || !partnerType || !partnerCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate partner type
    if (!['waitrose', 'tech'].includes(partnerType)) {
      return NextResponse.json(
        { error: 'Invalid partner type' },
        { status: 400 }
      )
    }

    // Validate Waitrose code
    if (partnerType === 'waitrose' && partnerCode !== 'waitrose19') {
      return NextResponse.json(
        { error: 'Invalid Waitrose partner code' },
        { status: 400 }
      )
    }

    // For tech partners, require organization
    if (partnerType === 'tech' && !organization) {
      return NextResponse.json(
        { error: 'Organization name is required for tech partners' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    // For tech partners with valid codes, allow returning users
    if (existingUser && partnerType === 'tech') {
      // User exists and has valid code - they can proceed to login
      return NextResponse.json({
        success: true,
        existing: true,
        message: 'Welcome back! Please proceed to log in.'
      })
    }

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert user into users table
    const { data: newUser, error: userError } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          name
        }
      ])
      .select()
      .single()

    if (userError) {
      console.error('Error creating user:', userError)
      return NextResponse.json(
        { error: 'Failed to create user account' },
        { status: 500 }
      )
    }

    // Create partner profile
    // During beta: Waitrose users get beta tester status (progressive unlock)
    // Enterprise/Tech partners get full access immediately  
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert([
        {
          user_id: newUser.id,
          display_name: name,
          contact_email: email,  // ← ADD THIS LINE
          partner_type: partnerType === 'waitrose' ? 'beta' : partnerType, // Waitrose → Beta during beta period
          partner_code: partnerCode,
          organization: organization || null
        }
      ])

    if (profileError) {
      console.error('Error creating partner profile:', profileError)
      // Don't fail completely, just log the error
    }

    return NextResponse.json({
      success: true,
      message: `${partnerType === 'waitrose' ? 'Waitrose' : 'Tech'} partner account created successfully!`
    })

  } catch (error) {
    console.error('Partner signup error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

