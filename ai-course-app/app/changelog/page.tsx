import { createClient } from '@supabase/supabase-js'

export default async function ChangelogPage() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SECRET_KEY!
    )

    const { data: releaseNotes, error } = await supabase
        .from('release_notes')
        .select('*')
        .eq('visible', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching release notes:', error)
        return \u003cdiv\u003eError loading changelog\u003c / div\u003e
    }

    return (
    \u003cdiv className = "min-h-screen p-8"\u003e
    \u003cdiv className = "max-w-4xl mx-auto"\u003e
    {/* Header */ }
    \u003cdiv className = "mb-12"\u003e
    \u003ch1 className = "text-4xl font-black text-text-primary mb-2"\u003eChangelog\u003c / h1\u003e
    \u003cp className = "text-text-secondary"\u003eTrack our latest updates, features, and improvements\u003c / p\u003e
    \u003c / div\u003e

    {/* Timeline */ }
    \u003cdiv className = "space-y-6"\u003e
    {
        releaseNotes?.map((note) =\u003e(
            \u003cdiv
              key = { note.id }
              className = "card-neumorphic rounded-2xl p-6 border-l-4"
              style = {{
            borderLeftColor:
                note.type === 'feature' ? '#10b981' :
                    note.type === 'fix' ? '#f59e0b' :
                        '#6366f1'
        }}
    \u003e
    \u003cdiv className = "flex items-start gap-4"\u003e
    {/* Icon */ }
    \u003cdiv className = "text-3xl"\u003e
    {
        note.type === 'feature' ? '🎉' :
        note.type === 'fix' ? '🔧' :
            '⚡'
    }
    \u003c / div\u003e

    {/* Content */ }
    \u003cdiv className = "flex-1"\u003e
    \u003cdiv className = "flex items-center gap-3 mb-2"\u003e
    \u003cspan className = "px-3 py-1 rounded-full text-xs font-bold bg-text-tertiary/10 text-text-primary"\u003e
                      v{ note.version }
    \u003c / span\u003e
    \u003cspan className = "text-sm text-text-tertiary"\u003e
    {
        new Date(note.created_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }
    \u003c / span\u003e
    \u003c / div\u003e
    \u003ch3 className = "text-xl font-bold text-text-primary mb-2"\u003e
    { note.title }
    \u003c / h3\u003e
    \u003cp className = "text-text-secondary"\u003e
    { note.description }
    \u003c / p\u003e
    \u003c / div\u003e
    \u003c / div\u003e
    \u003c / div\u003e
          ))
}
\u003c / div\u003e

{/* Empty state */ }
{
    releaseNotes?.length === 0 && (
    \u003cdiv className = "text-center py-12"\u003e
    \u003cp className = "text-text-tertiary"\u003eNo updates yet.Check back soon!\u003c / p\u003e
    \u003c / div\u003e
        )
}
\u003c / div\u003e
\u003c / div\u003e
  )
}
