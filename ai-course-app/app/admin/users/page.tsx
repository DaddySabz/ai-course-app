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

    // Fetch all users with their profiles and progress
    const { data: profiles, error } = await supabase
        .from('user_profiles')
        .select('user_id, display_name, email, partner_type, created_at')
        .order('created_at', { ascending: false })

    console.log('Fetching users - count:', profiles?.length, 'error:', error)

    if (error) {
        console.error('Error fetching users:', error)
        return <AdminUsersClient initialUsers={[]} isAdmin={true} />
    }

    // Fetch progress counts for each user
    const usersWithProgress = await Promise.all(
        (profiles || []).map(async (profile) => {
            const { count } = await supabase
                .from('user_progress')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.user_id)

            return {
                id: profile.user_id,
                email: profile.email || 'N/A',
                display_name: profile.display_name || 'Unknown',
                partner_type: profile.partner_type || 'beta',
                progress_count: count || 0,
                created_at: profile.created_at
            }
        })
    )

    return <AdminUsersClient initialUsers={usersWithProgress} isAdmin={true} />
}
