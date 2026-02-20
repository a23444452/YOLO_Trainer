import Stripe from 'stripe'

function createStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('STRIPE_SECRET_KEY environment variable is not set')
  }

  return new Stripe(secretKey, {
    apiVersion: '2026-01-28.clover',
    typescript: true,
  })
}

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = createStripeClient()
  }
  return _stripe
}

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? '',
  },
  enterprise: {
    name: 'Enterprise',
    price: 99,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? '',
  },
} as const

export function getAllowedPriceIds(): string[] {
  return [PLANS.pro.priceId, PLANS.enterprise.priceId].filter(
    (id): id is string => typeof id === 'string' && id.length > 0
  )
}
