import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
      }),
    }),
  },
}))

vi.mock('@/lib/db/schema', () => ({
  newsletterSubscribers: {
    email: 'email',
  },
}))

describe('POST /api/newsletter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should accept valid email subscription', async () => {
    const { POST } = await import('@/app/api/newsletter/route')
    const req = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toBe('訂閱成功')
  })

  it('should reject invalid email', async () => {
    const { POST } = await import('@/app/api/newsletter/route')
    const req = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'not-an-email' }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })

  it('should reject empty body', async () => {
    const { POST } = await import('@/app/api/newsletter/route')
    const req = new Request('http://localhost:3000/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })
})
