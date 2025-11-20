import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Partner code mappings (code -> organization)
const PARTNER_CODES: Record<string, string> = {
  'chatgpt': 'OpenAI',
  'openai': 'OpenAI',
  'claude': 'Anthropic',
  'anthropic': 'Anthropic',
  'gemini': 'Google',
  'google': 'Google',
  'notion': 'Notion',
  'adobe': 'Adobe',
  'microsoft': 'Microsoft',
  'meta': 'Meta',
  'apple': 'Apple',
  'amazon': 'Amazon',
  'tesla': 'Tesla',
  'nvidia': 'NVIDIA',
  'salesforce': 'Salesforce',
  'demo': 'Demo Company',
  'test': 'Test Organization'
}

export async function POST(request: Request) {
  try {
    // Simple authentication - require a setup key
    const { setupKey } = await request.json()
    
    if (setupKey !== process.env.SETUP_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SECRET_KEY!
    )

    const results = []

    // Create master account for each organization
    for (const [code, organization] of Object.entries(PARTNER_CODES)) {
      // Use organization as email/username and code as password
      const hashedPassword = await bcrypt.hash(code.toLowerCase(), 10)

      // Check if account already exists
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', organization)
        .single()

      if (existing) {
        results.push({ organization, code, status: 'already_exists' })
        continue
      }

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
        results.push({ organization, code, status: 'error', error: userError.message })
        continue
      }

      // Create profile
      await supabase
        .from('user_profiles')
        .insert([{
          user_id: newUser.id,
          display_name: `${organization} Tech Partner`,
          partner_type: 'tech',
          partner_code: code,
          organization
        }])

      results.push({ organization, code, status: 'created' })
    }

    return NextResponse.json({ 
      success: true,
      results
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Setup failed' },
      { status: 500 }
    )
  }
}

