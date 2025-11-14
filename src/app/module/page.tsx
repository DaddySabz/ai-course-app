// src/app/module/page.tsx
import { ModuleContent } from '@/components/ModuleContent';
import { courseData } from '@/data/course-data';
import Link from 'next/link';

export default function ModulePageLayout() {
  return (
    <div className="flex min-h-screen bg-background-light">
      {/* Sidebar (Server Component) */}
      <aside className="fixed top-0 left-0 h-full w-72 bg-surface p-4 flex flex-col border-r border-border-color">
        <nav className="flex-grow overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Course Modules</h2>
          <div className="flex flex-col gap-1">
            {courseData.map(navModule => (
              <Link
                key={navModule.day}
                href={`/module?day=${navModule.day}`}
                className="block text-text-secondary hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
              >
                Day {navModule.day}: {navModule.title}
              </Link>
            ))}
          </div>
        </nav>
        <div className="mt-auto">
            <Link href="/dashboard" className="block w-full text-center bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg font-bold">
                My Dashboard
            </Link>
        </div>
      </aside>

      {/* Main Content (Client Component wrapped in Suspense) */}
      <main className="ml-72 flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <ModuleContent />
        </div>
      </main>
    </div>
  );
}
