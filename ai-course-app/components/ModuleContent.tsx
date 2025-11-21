// components/ModuleContent.tsx
"use client";

import { useSearchParams } from 'next/navigation';
import { courseModules } from '@/data/course-data';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';

function ModuleDisplay() {
  const searchParams = useSearchParams();
  const dayParam = searchParams.get('day');
  const currentDay = dayParam ? parseInt(dayParam) : 1;
  const module = courseModules.find(m => m.day === currentDay);
  const { data: session } = useSession();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load completion status
  useEffect(() => {
    if (session?.user?.email) {
      loadProgress();
    }
  }, [session, currentDay]);

  const loadProgress = async () => {
    if (!session?.user?.email) return;

    const { data, error } = await supabase
      .from('user_progress')
      .select('completed')
      .eq('user_id', session.user.email)
      .eq('lesson_id', currentDay)
      .single();

    if (data) {
      setIsCompleted(data.completed);
    }
  };

  const handleMarkComplete = async () => {
    if (!session?.user?.email) return;
    setIsLoading(true);

    const { error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: session.user.email,
        lesson_id: currentDay,
        completed: !isCompleted,
        completed_at: !isCompleted ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,lesson_id'
      });

    if (!error) {
      setIsCompleted(!isCompleted);
    }
    setIsLoading(false);
  };

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

      {/* Mark as Complete */}
      {session?.user && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-border-color">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleMarkComplete}
              disabled={isLoading}
              className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary mr-3"
            />
            <span className="text-lg font-semibold text-text-primary">
              {isCompleted ? '✓ Completed' : 'Mark as Complete'}
            </span>
          </label>
        </div>
      )}

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
