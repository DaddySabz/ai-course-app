import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'

export async function POST() {
    const session = await auth()

    // Only admins can run this
    const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        }
    )

    try {
        // Get ALL users from Supabase Auth (includes Google OAuth + email/password)
        const { data: authData } = await supabase.auth.admin.listUsers()

        if (!authData?.users) {
            return NextResponse.json({ error: 'Failed to fetch auth users' }, { status: 500 })
        }

        // Update each user_profile with email from auth
        let updated = 0
        let errors = 0

        for (const authUser of authData.users) {
            if (authUser.email) {
                const { error } = await supabase
                    .from('user_profiles')
                    .update({ contact_email: authUser.email })
                    .eq('user_id', authUser.id)

                if (error) {
                    console.error(`Error updating ${authUser.id}:`, error)
                    errors++
                } else {
                    updated++
                }
            }
        }

        return NextResponse.json({
            success: true,
            total_auth_users: authData.users.length,
            updated,
            errors
        })

    } catch (error) {
        console.error('Sync error:', error)
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
    }
}
