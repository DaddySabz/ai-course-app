// src/app/dashboard/page.tsx

// Note: This is a placeholder for the real user data
// In a professional app, this would be fetched from your WordPress backend API
const userData = {
  name: "Alex Doe",
  avatarUrl: "/assets/images/login_preview.png", // Using a local placeholder for now
};

const courseProgress = {
  daysCompleted: 7,
  daysRemaining: 23,
  percentage: 25,
};

export default function DashboardPage() {
  return (
    <div className="bg-background-light font-display text-text-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Header */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-border-light py-3">
          <div className="flex items-center gap-4">
            <h2 className="text-text-light text-lg font-semibold leading-tight">30-Day AI Onboarding</h2>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-light text-sm font-medium leading-normal hover:text-primary transition-colors">Home</a>
            <img src={userData.avatarUrl} alt="User avatar" className="size-10 rounded-full bg-cover" />
          </div>
        </header>

        <main className="mt-8">
          <div className="flex flex-wrap justify-between gap-3 mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-text-primary text-4xl font-bold leading-tight tracking-tight">My Dashboard</h1>
              <p className="text-text-secondary text-base font-normal leading-normal">Welcome back, let's continue your AI journey.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Course Progress */}
            <aside className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-surface p-6 rounded-xl border border-border-light">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Course Progress</h3>
                {/* Progress details... */}
              </div>
            </aside>

            {/* Right Column: User Profile */}
            <section className="lg:col-span-1 flex flex-col gap-6">
              <div className="bg-surface p-6 rounded-xl border border-border-light text-center">
                <img src={userData.avatarUrl} alt={userData.name} className="size-24 rounded-full mx-auto border-4 border-surface ring-2 ring-primary"/>
                <h3 className="text-xl font-bold mt-4">{userData.name}</h3>
                <p className="text-sm text-text-secondary">AI Enthusiast</p>
                <a href="/certificate" className="mt-6 block bg-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors">
                  View Certificate
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
