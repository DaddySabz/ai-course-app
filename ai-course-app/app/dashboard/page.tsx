// app/dashboard/page.tsx

const userData = {
  name: "Alex Doe",
  avatarUrl: "/assets/images/login_preview.png",
};

export default function DashboardPage() {
  return (
    <div className="bg-background-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-text-secondary/20 py-3">
          <div className="flex items-center gap-4">
            <h2 className="text-text-primary text-lg font-semibold leading-tight">30-Day AI Onboarding</h2>
          </div>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-text-primary text-sm font-medium leading-normal hover:text-primary transition-colors">Home</a>
            <img src={userData.avatarUrl} alt="User avatar" className="size-10 rounded-full bg-cover" />
          </div>
        </header>

        <main className="mt-8">
            <h1 className="text-text-primary text-4xl font-bold leading-tight tracking-tight">My Dashboard</h1>
            <p className="text-text-secondary text-base font-normal leading-normal mt-2">Welcome back, let's continue your AI journey.</p>
        </main>
      </div>
    </div>
  );
}
