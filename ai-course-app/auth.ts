import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'
import type { User } from './lib/supabase'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SECRET_KEY!
        )

        // Find user by email
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', credentials.email as string)
          .single()

        console.log('User lookup result:', {
          email: credentials.email,
          found: !!user,
          error: error?.message
        })

        if (error || !user) {
          console.log('User not found or error:', error)
          return null
        }

        // Verify password
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password_hash
        )

        console.log('Password validation:', { isValid })

        if (!isValid) {
          console.log('Invalid password')
          return null
        }

        // Return user object
        console.log('Authentication successful for:', user.email)
        return {
          id: user.id,
          email: user.email,
          name: user.name || user.email.split('@')[0],
        }
      }
    })
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return true

      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SECRET_KEY!
        )

        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('id')
          .eq('user_id', user.id)
          .single()

        if (!existingProfile) {
          console.log('Creating new beta profile for:', user.email)
          // Create new profile as Beta Tester
          await supabase.from('user_profiles').insert({
            user_id: user.id,
            display_name: user.name || user.email.split('@')[0],
            avatar_url: user.image,
            partner_type: 'beta', // Default to beta for all new signups
            partner_code: 'BETA_AUTO',
            organization: 'Beta Tester'
          })
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return true // Allow sign in even if profile creation fails (will be handled by dashboard)
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  session: {
    strategy: "jwt"
  }
})
