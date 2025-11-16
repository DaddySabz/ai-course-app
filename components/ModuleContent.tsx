// components/ModuleContent.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { courseData } from '../data/course-data';
import Link from 'next/link';
import { Suspense } from 'react';

function ModuleDisplay() {
  const searchParams = useSearchParams();
  const dayParam = searchParams.get('day');
  const currentDay = dayParam ? parseInt(dayParam) : 1;
  const module = courseData.find(m => m.day === currentDay);

  if (!module) {
    return (
      <div className="text-center">
        <p className="text-2xl font-bold text-text-secondary">Module not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block text-primary hover:underline">Go to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-extrabold text-text-primary">{`Day ${module.day}: ${module.title}`}</h1>
      <p className="text-lg text-text-secondary mt-2">{module.subtitle}</p>
      
      <div 
        className="prose lg:prose-xl max-w-none mt-8 text-text-primary" 
        dangerouslySetInnerHTML={{ __html: module.content }} 
      />

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
  );
}

export function ModuleContent() {
    return (
        <Suspense fallback={<div className="text-center font-bold text-lg">Loading module...</div>}>
            <ModuleDisplay />
        </Suspense>
    )
}
