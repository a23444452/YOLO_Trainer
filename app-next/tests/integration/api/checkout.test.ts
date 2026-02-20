import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/auth', () => ({
  auth: vi.fn().mockResolvedValue({
    user: { id: 'user-1', email: 'test@example.com' },
  }),
}))

vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([{
            id: 'user-1',
            email: 'test@example.com',
            name: 'Test',
            stripeCustomerId: 'cus_123',
          }]),
        }),
      }),
    }),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue(undefined),
      }),
    }),
  },
}))

vi.mock('@/lib/db/schema', () => ({
  users: {
    id: 'id',
  },
}))

vi.mock('drizzle-orm', () => ({
  eq: vi.fn().mockReturnValue({}),
}))

vi.mock('@/lib/stripe', async () => {
  const actual = await vi.importActual<Record<string, unknown>>('@/lib/stripe')
  return {
    ...actual,
    getStripe: vi.fn().mockReturnValue({
      checkout: {
        sessions: {
          create: vi.fn().mockResolvedValue({ url: 'https://checkout.stripe.com/test' }),
        },
      },
      customers: {
        create: vi.fn().mockResolvedValue({ id: 'cus_new' }),
      },
    }),
    getAllowedPriceIds: vi.fn().mockReturnValue(['price_pro_123', 'price_ent_456']),
  }
})

describe('POST /api/stripe/checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject invalid priceId not in whitelist', async () => {
    const { POST } = await import('@/app/api/stripe/checkout/route')
    const req = new Request('http://localhost:3000/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'price_malicious_999' }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBe('無效的方案')
  })

  it('should reject empty priceId', async () => {
    const { POST } = await import('@/app/api/stripe/checkout/route')
    const req = new Request('http://localhost:3000/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: '' }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })

  it('should create checkout session for valid priceId', async () => {
    const { POST } = await import('@/app/api/stripe/checkout/route')
    const req = new Request('http://localhost:3000/api/stripe/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId: 'price_pro_123' }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.url).toBe('https://checkout.stripe.com/test')
  })
})
