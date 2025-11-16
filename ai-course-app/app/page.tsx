import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background-light flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center space-y-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-teal">
            Introduction to AI
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl font-black tracking-tight text-text-primary">
            30-Day AI Onboarding
          </h1>
          <p className="mt-4 text-base sm:text-lg text-text-secondary">
            Explore daily modules, track your progress in the dashboard, and earn a
            completion certificate when you finish the course.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/module?day=1"
            className="inline-flex items-center justify-center rounded-lg border border-primary/20 bg-surface px-6 py-3 text-sm font-semibold text-primary hover:bg-background-light transition-colors"
          >
            Start with Day 1
          </Link>
        </div>

        <p className="text-xs text-text-secondary/80">
          When you complete all modules, you can view your certificate at
          {" "}
          <Link href="/certificate" className="underline hover:text-primary">
            /certificate
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
