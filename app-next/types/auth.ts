import type { DefaultSession } from 'next-auth'

export type SubscriptionTier = 'free' | 'pro' | 'enterprise'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      tier: SubscriptionTier
    } & DefaultSession['user']
  }

  interface User {
    tier?: SubscriptionTier
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    id?: string
    tier?: SubscriptionTier
  }
}
