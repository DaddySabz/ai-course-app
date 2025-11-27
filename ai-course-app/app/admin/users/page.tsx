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

    // Fetch all users from the users table (has email addresses)
    const { data: users, error: usersError } = await supabase
        .from('users')
        .select('id, email, name')
        .order('id', { ascending: false })

    if (usersError) {
        console.error('Error fetching users:', usersError)
        return <AdminUsersClient initialUsers={[]} isAdmin={true} />
    }

    // Fetch user profiles to get partner types
    const { data: profiles } = await supabase
        .from('user_profiles')
        .select('user_id, partner_type, created_at')

    // Create a map of user_id to profile data
    const profileMap = new Map(profiles?.map(p => [p.user_id, p]) || [])

    // Fetch progress counts for each user
    const usersWithProgress = await Promise.all(
        (users || []).map(async (user) => {
            const { count } = await supabase
                .from('user_progress')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', user.id)

            const profile = profileMap.get(user.id)

            return {
                id: user.id,
                email: user.email || 'N/A',
                display_name: user.name || 'Unknown',
                partner_type: profile?.partner_type || 'beta',
                progress_count: count || 0,
                created_at: profile?.created_at || new Date().toISOString()
            }
        })
    )

    return <AdminUsersClient initialUsers={usersWithProgress} isAdmin={true} />
}
