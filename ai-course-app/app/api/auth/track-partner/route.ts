import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { name, email, organization, partnerCode } = await request.json()

    // Optional: Log partner usage to a tracking table
    // For now, just return success - you can add Supabase logging later
    console.log('Tech Partner Access:', { name, email, organization, partnerCode, timestamp: new Date() })

    // TODO: If you want to track this in Supabase, create a partner_access_log table:
    // CREATE TABLE partner_access_log (
    //   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    //   name text,
    //   email text,
    //   organization text,
    //   partner_code text,
    //   accessed_at timestamptz DEFAULT now()
    // );
    
    // Then uncomment:
    // const supabase = createClient(
    //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
    //   process.env.SUPABASE_SECRET_KEY!
    // )
    // await supabase.from('partner_access_log').insert([{
    //   name, email, organization, partner_code: partnerCode
    // }])

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Tracking error:', error)
    // Don't fail the request if tracking fails
    return NextResponse.json({ success: true })
  }
}

