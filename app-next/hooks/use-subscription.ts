'use client'

import { useState, useEffect } from 'react'
import type { SubscriptionInfo } from '@/types/stripe'

export function useSubscription() {
  const [subscription, setSubscription] = useState<SubscriptionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSubscription() {
      try {
        const res = await fetch('/api/subscription')
        if (!res.ok) {
          throw new Error('Failed to fetch subscription')
        }
        const data: SubscriptionInfo = await res.json()
        setSubscription(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [])

  return {
    subscription,
    isLoading,
    error,
    isPro: subscription?.plan === 'pro' || subscription?.plan === 'enterprise',
    isEnterprise: subscription?.plan === 'enterprise',
    isFree: !subscription || subscription.plan === 'free',
  }
}
