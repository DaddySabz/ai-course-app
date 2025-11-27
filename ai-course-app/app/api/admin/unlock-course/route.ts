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

        // Update partner type to 'waitrose' (full access)
        const { error } = await supabase
            .from('user_profiles')
            .update({ partner_type: 'waitrose' })
            .eq('user_id', userId)

        if (error) {
            console.error('Error unlocking course:', error)
            return NextResponse.json(
                { error: 'Failed to unlock course' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error in unlock course API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
