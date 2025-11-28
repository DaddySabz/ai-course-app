import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!
        )

        const { data: releaseNotes, error } = await supabase
            .from('release_notes')
            .select('*')
            .eq('visible', true)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching release notes:', error)
            return NextResponse.json({ error: 'Failed to fetch release notes' }, { status: 500 })
        }

        return NextResponse.json(releaseNotes || [])
    } catch (error) {
        console.error('Error in changelog API:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
