import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { createClient } from '@supabase/supabase-js'
import ProfileEditor from '@/components/ProfileEditor'
import NavigationBar from '@/components/NavigationBar'

export default async function ProfilePage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/")
  }

  // Fetch user profile to get partner info
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
  )

  const { data: profileData } = await supabase
    .from('user_profiles')
    .select('partner_type, partner_code, organization')
    .eq('user_id', session.user.id)
    .single()

  const partnerType = profileData?.partner_type || null
  const organization = profileData?.organization || null

  return (
    <div className="min-h-screen pt-20">
      <NavigationBar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 py-10">
        <main className="flex flex-col gap-8">
          {/* Hero Section */}
          <div className="flex flex-col gap-3">
            <h1 className="text-5xl font-black tracking-tight text-text-primary">Profile Settings</h1>
            <p className="text-text-secondary text-lg font-medium">Manage your account and preferences.</p>
          </div>

          {/* Single Unified Profile Tile */}
          <div className="max-w-2xl mx-auto w-full glass-lavender rounded-3xl p-8">
            <ProfileEditor
              userId={session.user.id!}
              defaultName={session.user.name}
              defaultAvatar={session.user.image}
              defaultEmail={session.user.email}
              partnerType={partnerType}
              organization={organization}
            />
          </div>

          {/* Back to Dashboard */}
          <div className="text-center">
            <a 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary font-semibold transition-colors"
            >
              ← Back to Dashboard
            </a>
          </div>
        </main>
      </div>
    </div>
  )
}

