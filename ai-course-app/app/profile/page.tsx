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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Profile Editor */}
            <div className="glass-lavender rounded-3xl p-8 h-fit">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Your Profile</h2>
              <ProfileEditor
                userId={session.user.id!}
                defaultName={session.user.name}
                defaultAvatar={session.user.image}
                defaultEmail={session.user.email}
                partnerType={partnerType}
                organization={organization}
              />
              <p className="text-xs text-text-secondary text-center mt-4">
                Your name and picture will appear on your certificate
              </p>
            </div>

            {/* Right Column - Account Info */}
            <div className="flex flex-col gap-6">
              {/* Account Details */}
              <div className="glass-blue rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-6">Account Details</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Email</p>
                    <p className="text-base font-semibold text-text-primary">{session.user.email}</p>
                  </div>
                  {partnerType && (
                    <div>
                      <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Account Type</p>
                      <p className="text-base font-semibold text-text-primary">
                        {partnerType === 'tech' ? 'Technology Partner' : partnerType === 'waitrose' ? 'Waitrose Partner' : 'General Access'}
                      </p>
                    </div>
                  )}
                  {organization && (
                    <div>
                      <p className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-1">Organization</p>
                      <p className="text-base font-semibold text-text-primary">{organization}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Sign Out */}
              <div className="glass-sage rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-4">Session</h2>
                <form
                  action={async () => {
                    "use server"
                    await signOut({ redirectTo: "/" })
                  }}
                >
                  <button
                    type="submit"
                    className="btn-neumorphic w-full rounded-2xl px-6 py-4 text-base font-bold text-red-600 hover:scale-[1.02] transition-transform"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
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

