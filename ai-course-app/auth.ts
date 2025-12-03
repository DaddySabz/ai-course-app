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

        // FIRST: Check if profile exists BY EMAIL (not by user_id which changes)
        const { data: existingProfile } = await supabase
          .from('user_profiles')
          .select('id, user_id')
          .eq('contact_email', user.email)
          .limit(1)
          .single()

        if (!existingProfile) {
          // Also check users table for a stable ID
          let stableUserId = user.id
          
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single()
          
          if (existingUser) {
            stableUserId = existingUser.id
          } else if (account?.provider === 'google') {
            // Create user record for Google OAuth
            const { data: newUser } = await supabase
              .from('users')
              .insert({
                email: user.email,
                name: user.name,
                password_hash: '',
              })
              .select('id')
              .single()
            
            if (newUser) {
              stableUserId = newUser.id
            }
          }

          console.log('Creating new beta profile for:', user.email, 'with stable ID:', stableUserId)
          // Create new profile as Beta Tester
          await supabase.from('user_profiles').insert({
            user_id: stableUserId,
            display_name: user.name || user.email.split('@')[0],
            contact_email: user.email,
            avatar_url: user.image,
            partner_type: 'beta',
            partner_code: 'BETA_AUTO',
            organization: 'Beta Tester',
            last_login: new Date().toISOString()
          })
        } else {
          // Profile exists - update last_login and avatar if changed (for Google users)
          const updateData: { last_login: string; avatar_url?: string } = {
            last_login: new Date().toISOString()
          }
          
          if (user.image && account?.provider === 'google') {
            updateData.avatar_url = user.image
          }
          
          await supabase
            .from('user_profiles')
            .update(updateData)
            .eq('id', existingProfile.id)
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return true
      }
    },
    async jwt({ token, user, account }) {
      // On initial sign in, look up the stable user ID from user_profiles by email
      if (user?.email) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SECRET_KEY!
        )

        // Look up stable ID from user_profiles (the source of truth)
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('user_id')
          .eq('contact_email', user.email)
          .limit(1)
          .single()

        if (profile) {
          // Use the stable user_id from the profile
          token.stableUserId = profile.user_id
          console.log('JWT: Found stable user_id for', user.email, ':', profile.user_id)
        } else {
          // Fallback: check users table
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', user.email)
            .single()

          if (existingUser) {
            token.stableUserId = existingUser.id
          } else {
            token.stableUserId = token.sub
          }
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // Use the stable user ID from the database, not the JWT sub
        session.user.id = (token.stableUserId as string) || (token.sub as string)
      }
      return session
    },
  },
  session: {
    strategy: "jwt"
  }
})
