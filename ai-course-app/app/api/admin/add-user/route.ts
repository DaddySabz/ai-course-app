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

        const { email, partner_type = 'beta', display_name } = await request.json()

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 })
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!
        )

        // Check if user already exists in auth.users
        const { data: existingAuthUser } = await supabase.auth.admin.listUsers()
        const userExists = existingAuthUser?.users.some(u => u.email === email)

        if (userExists) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            )
        }

        // Create user in Supabase Auth
        const { data: newUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: {
                display_name: display_name || email.split('@')[0]
            }
        })

        if (authError || !newUser.user) {
            console.error('Error creating user:', authError)
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            )
        }

        // Create profile
        const { error: profileError } = await supabase
            .from('user_profiles')
            .insert({
                user_id: newUser.user.id,
                display_name: display_name || email.split('@')[0],
                partner_type,
                email
            })

        if (profileError) {
            console.error('Error creating profile:', profileError)
            // Clean up auth user if profile creation fails
            await supabase.auth.admin.deleteUser(newUser.user.id)
            return NextResponse.json(
                { error: 'Failed to create user profile' },
                { status: 500 }
            )
        }

        return NextResponse.json({
            success: true,
            userId: newUser.user.id,
            email: newUser.user.email
        })
    } catch (error) {
        console.error('Error in add user API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
