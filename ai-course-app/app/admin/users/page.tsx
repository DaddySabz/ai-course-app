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
    )

    return <AdminUsersClient initialUsers={usersWithProgress} isAdmin={true} />
}
