import { auth } from "@/auth"
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Check if admin
        const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
        const isAdmin = session.user.email && ADMIN_EMAILS.includes(session.user.email)

        if (!isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { userId } = await request.json()

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!
        )

        // Mark all 30 days as completed
        const completionRecords = Array.from({ length: 30 }, (_, i) => ({
            user_id: userId,
            day_number: i + 1,
            completed_at: new Date().toISOString()
        }))

        // Delete existing progress first
        await supabase
            .from('user_progress')
            .delete()
            .eq('user_id', userId)

        // Insert all 30 days
        const { error } = await supabase
            .from('user_progress')
            .insert(completionRecords)

        if (error) {
            console.error('Error completing all days:', error)
            return NextResponse.json(
                { error: 'Failed to complete all days' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error in complete all days API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
