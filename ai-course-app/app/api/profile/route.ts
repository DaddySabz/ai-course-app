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

    const { displayName, avatarUrl, organization } = await req.json()

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

    // Build update object - only include organization if provided
    const updateData: Record<string, unknown> = {
      display_name: displayName,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString()
    }
    if (organization !== undefined) {
      updateData.organization = organization
    }

    let result
    if (existing) {
      // Update existing profile
      result = await supabase
        .from('user_profiles')
        .update(updateData)
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
          avatar_url: avatarUrl,
          ...(organization !== undefined && { organization })
        })
        .select()
        .single()
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 })
    }

    // Check if user has a certificate - if so, regenerate it with new profile data
    const { data: certificate } = await supabase
      .from('certificates')
      .select('id')
      .eq('user_email', session.user.email)
      .limit(1)

    let certificateRegenerated = false
    if (certificate && certificate.length > 0) {
      // Trigger certificate regeneration
      try {
        // Determine base URL for internal API call
        const baseUrl = process.env.NEXTAUTH_URL 
          || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
          || 'http://localhost:3000'
        
        console.log('Regenerating certificate, baseUrl:', baseUrl)
        
        const regenerateResponse = await fetch(`${baseUrl}/api/certificate/generate-image`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            certificateId: certificate[0].id,
            forceRegenerate: true 
          })
        })
        
        if (regenerateResponse.ok) {
          certificateRegenerated = true
          console.log('Certificate regenerated successfully')
        } else {
          console.error('Certificate regeneration failed:', await regenerateResponse.text())
        }
      } catch (certError) {
        console.error('Certificate regeneration error:', certError)
        // Don't fail the whole request if certificate regen fails
      }
    }

    return NextResponse.json({ 
      success: true,
      profile: result.data,
      certificateRegenerated
    })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

