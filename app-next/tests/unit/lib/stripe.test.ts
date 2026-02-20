import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('getAllowedPriceIds', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should return price IDs when env vars are set', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_xxx')
    vi.stubEnv('STRIPE_PRO_PRICE_ID', 'price_pro_123')
    vi.stubEnv('STRIPE_ENTERPRISE_PRICE_ID', 'price_ent_456')

    const { getAllowedPriceIds } = await import('@/lib/stripe')
    const ids = getAllowedPriceIds()

    expect(ids).toContain('price_pro_123')
    expect(ids).toContain('price_ent_456')
    expect(ids).toHaveLength(2)

    vi.unstubAllEnvs()
  })

  it('should filter out empty price IDs', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_xxx')
    vi.stubEnv('STRIPE_PRO_PRICE_ID', 'price_pro_123')
    // STRIPE_ENTERPRISE_PRICE_ID not set → defaults to ''

    const { getAllowedPriceIds } = await import('@/lib/stripe')
    const ids = getAllowedPriceIds()

    expect(ids).toContain('price_pro_123')
    expect(ids.every((id) => id.length > 0)).toBe(true)
  })
})

describe('PLANS', () => {
  it('should have correct plan structure', async () => {
    vi.stubEnv('STRIPE_SECRET_KEY', 'sk_test_xxx')

    const { PLANS } = await import('@/lib/stripe')

    expect(PLANS.free.name).toBe('Free')
    expect(PLANS.free.price).toBe(0)
    expect(PLANS.free.priceId).toBeNull()

    expect(PLANS.pro.name).toBe('Pro')
    expect(PLANS.pro.price).toBe(29)

    expect(PLANS.enterprise.name).toBe('Enterprise')
    expect(PLANS.enterprise.price).toBe(99)

    vi.unstubAllEnvs()
  })
})
