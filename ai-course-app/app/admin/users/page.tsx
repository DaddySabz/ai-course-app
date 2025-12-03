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

    // Fetch all users from user_profiles (after migration, contact_email will be populated)
    const { data: profiles, error: profilesError } = await supabase
        .from('user_profiles')
        .select('user_id, display_name, contact_email, partner_type, auth_provider, created_at, last_login')
        .order('created_at', { ascending: false })

    if (profilesError) {
        console.error('Error fetching user profiles:', profilesError)
        return <AdminUsersClient initialUsers={[]} isAdmin={true} />
    }

    // Fetch progress counts and purchases for each user
    const usersWithProgress = await Promise.all(
        (profiles || []).map(async (profile) => {
            const { count } = await supabase
                .from('user_progress')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', profile.user_id)

            // Fetch purchases for this user
            const { data: purchases } = await supabase
                .from('purchases')
                .select('product_id, amount_paid, status, created_at')
                .eq('user_id', profile.user_id)
                .order('created_at', { ascending: false })

            return {
                id: profile.user_id,
                email: profile.contact_email || 'N/A',
                display_name: profile.display_name || 'Unknown',
                partner_type: profile.partner_type || 'beta',
                auth_provider: profile.auth_provider || null,
                progress_count: count || 0,
                created_at: profile.created_at,
                last_login: profile.last_login,
                purchases: purchases || []
            }
        })
    )

    // Fetch all purchases for stats
    const { data: allPurchases } = await supabase
        .from('purchases')
        .select('product_id, amount_paid, status, created_at')
        .order('created_at', { ascending: false })

    const purchaseStats = {
        total: allPurchases?.length || 0,
        paid: allPurchases?.filter(p => p.status === 'paid').length || 0,
        failed: allPurchases?.filter(p => p.status === 'failed').length || 0,
        refunded: allPurchases?.filter(p => p.status === 'refunded').length || 0,
        totalRevenue: allPurchases?.filter(p => p.status === 'paid').reduce((sum, p) => sum + (p.amount_paid || 0), 0) || 0
    }

    return <AdminUsersClient initialUsers={usersWithProgress} isAdmin={true} purchaseStats={purchaseStats} />
}
