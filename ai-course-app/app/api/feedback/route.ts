import { auth } from "@/auth"
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const session = await auth()

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { description, page_url, type = 'bug' } = await request.json()

        if (!description) {
            return NextResponse.json(
                { error: 'Description is required' },
                { status: 400 }
            )
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SECRET_KEY!
        )

        const { data, error } = await supabase
            .from('feedback')
            .insert({
                user_id: session.user.id,
                user_email: session.user.email,
                description,
                page_url,
                type,
                status: 'new'
            })
            .select()
            .single()

        if (error) {
            console.error('Error inserting feedback:', error)
            return NextResponse.json(
                { error: 'Failed to submit feedback' },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Error in feedback API:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
