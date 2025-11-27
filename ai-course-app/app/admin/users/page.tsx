import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import AdminUsersClient from './AdminUsersClient'

export default async function AdminUsersPage() {
    const session = await auth()

    if (!session?.user) {
        redirect("/")
    }

    const ADMIN_EMAILS = ['admin@wearewacky.com', 'saby@wearewacky.com', 'wackyworksdigital@gmail.com']
    const isAdmin = session.user.email && ADMIN_EMAILS.includes(session.user.email)

    if (!isAdmin) {
        return <AdminUsersClient initialUsers={[]} isAdmin={false} />
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

    // Fetch all users from user_profiles (has all 13 users)
    const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('user_id, display_name, contact_email, partner_type, created_at')
        .order('created_at', { ascending: false })

    if (profilesError) {
        console.error('Error fetching user profiles:', profilesError)
        return <AdminUsersClient initialUsers={[]} isAdmin={true} />
    }

    // Fetch from users table to get emails (only 6 entries)
    const { data: usersData } = await supabase
        .from('users')
        .select('id, email, name')

    // Create a map of user_id to email from users table
    const userEmailMap = new Map(usersData?.map(u => [u.id, u.email]) || [])

    // Fetch progress counts for each user
    const usersWithProgress = await Promise.all(
        (profiles || []).map(async (profile) => {
            const { count } = await supabase
                .from('user_progress')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.user_id)

            // Try to get email from users table first, fallback to contact_email
            const email = userEmailMap.get(profile.user_id) || profile.contact_email || 'N/A'

            return {
                id: profile.user_id,
                email: email,
                display_name: profile.display_name || 'Unknown',
                partner_type: profile.partner_type || 'beta',
                progress_count: count || 0,
                created_at: profile.created_at
            }
        })
    )

    return <AdminUsersClient initialUsers={usersWithProgress} isAdmin={true} />
}
