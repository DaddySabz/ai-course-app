// src/app/module/page.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { courseData } from '@/data/course-data';
import Link from 'next/link';

export default function ModulePage() {
  const searchParams = useSearchParams();
  const dayParam = searchParams.get('day');
  const currentDay = dayParam ? parseInt(dayParam) : 1;
  const module = courseData.find(m => m.day === currentDay);

  if (!module) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl font-bold text-text-secondary">Module not found.</p>
        <Link href="/dashboard" className="ml-4 text-primary hover:underline">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-light">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-72 bg-surface p-4 flex flex-col border-r border-border-color">
        <nav className="flex-grow overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">Course Modules</h2>
          <div className="flex flex-col gap-1">
            {courseData.map(navModule => (
              <Link
                key={navModule.day}
                href={`/module?day=${navModule.day}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  navModule.day === currentDay
                    ? 'bg-primary-light text-primary font-bold'
                    : 'text-text-secondary hover:bg-gray-100'
                }`}
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

      {/* Main Content */}
      <main className="ml-72 flex-1 p-6 lg:p-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
            <h1 className="text-4xl font-extrabold text-text-primary">{`Day ${module.day}: ${module.title}`}</h1>
            <p className="text-lg text-text-secondary">{module.subtitle}</p>
            <div className="prose lg:prose-xl max-w-none text-text-primary" dangerouslySetInnerHTML={{ __html: module.content }} />

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 mt-8 border-t border-border-color">
                {currentDay > 1 ? (
                    <Link href={`/module?day=${currentDay - 1}`} className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-lg font-bold">
                        &larr; Previous Day
                    </Link>
                ) : <div />}
                {currentDay < courseData.length ? (
                    <Link href={`/module?day=${currentDay + 1}`} className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-bold">
                        Next Day &rarr;
                    </Link>
                ) : <div />}
            </div>
        </div>
      </main>
    </div>
  );
}
