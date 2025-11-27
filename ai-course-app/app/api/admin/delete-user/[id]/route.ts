import { auth } from "@/auth"
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function DELETE(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
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

        const { id: userId } = await context.params

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
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

        // Delete from multiple places to handle all user types
        let authDeleted = false
        let customUserDeleted = false
        let profileDeleted = false

        // 1. Try to delete from Supabase Auth (Google OAuth users)
        try {
            const { error: authError } = await supabase.auth.admin.deleteUser(userId)
            if (!authError) {
                authDeleted = true
                console.log('Deleted from Supabase Auth')
            }
        } catch (error) {
            console.log('User not in Auth, continuing...')
        }

        // 2. Delete from custom users table (email/password users)
        const { error: customUserError } = await supabase
            .from('users')
            .delete()
            .eq('id', userId)

        if (!customUserError) {
            customUserDeleted = true
            console.log('Deleted from custom users table')
        }

        // 3. Delete from user_profiles
        const { error: profileError } = await supabase
            .from('user_profiles')
            .delete()
            .eq('user_id', userId)

        if (!profileError) {
            profileDeleted = true
            console.log('Deleted from user_profiles')
        }

        // 4. Delete associated data (progress & certificates)
        await supabase.from('user_progress').delete().eq('user_id', userId)
        await supabase.from('certificates').delete().eq('user_id', userId)

        // Success if we deleted from at least one place
        if (authDeleted || customUserDeleted || profileDeleted) {
            return NextResponse.json({
                success: true,
                deleted_from: {
                    auth: authDeleted,
                    custom_users: customUserDeleted,
                    profile: profileDeleted
                }
            })
        }

        return NextResponse.json(
            { error: 'User not found in any table' },
            { status: 404 }
        )
    } catch (error) {
        console.error('Error in delete user API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
