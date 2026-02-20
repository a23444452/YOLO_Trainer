import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { loginSchema } from '@/lib/validations/auth'
import { db } from '@/lib/db'
import { users, subscriptions } from '@/lib/db/schema'
import type { SubscriptionTier } from '@/types/auth'

async function getTierForUser(userId: string): Promise<SubscriptionTier> {
  const [sub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1)

  if (!sub || !['active', 'trialing'].includes(sub.status)) return 'free'

  const proPriceId = process.env.STRIPE_PRO_PRICE_ID
  const enterprisePriceId = process.env.STRIPE_ENTERPRISE_PRICE_ID

  if (sub.stripePriceId === enterprisePriceId) return 'enterprise'
  if (sub.stripePriceId === proPriceId) return 'pro'
  return 'free'
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials)
        if (!validated.success) return null

        const { email, password } = validated.data

        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, email))
          .limit(1)

        if (!user?.hashedPassword) return null

        const isValid = await compare(password, user.hashedPassword)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatarUrl,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false

      await db
        .insert(users)
        .values({
          email: user.email,
          name: user.name ?? null,
          avatarUrl: user.image ?? null,
        })
        .onConflictDoUpdate({
          target: users.email,
          set: {
            name: user.name ?? undefined,
            avatarUrl: user.image ?? undefined,
            updatedAt: new Date(),
          },
        })

      return true
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email!))
          .limit(1)

        if (dbUser) {
          token.id = dbUser.id
          token.tier = await getTierForUser(dbUser.id)
        }
      }

      if (trigger === 'update' && token.id) {
        token.tier = await getTierForUser(token.id as string)
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          tier: (token.tier ?? 'free') as SubscriptionTier,
        },
      }
    },
  },
  session: {
    strategy: 'jwt',
  },
})
