import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue(null),
}))

const mockUpdate = vi.fn().mockReturnValue({
  set: vi.fn().mockReturnValue({
    where: vi.fn().mockResolvedValue(undefined),
  }),
})

vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([{ id: 'user-1' }]),
        }),
      }),
    }),
    update: mockUpdate,
  },
}))

vi.mock('@/lib/db/schema', () => ({
  users: {
    id: 'id',
    verificationToken: 'verification_token',
    verificationTokenExpiry: 'verification_token_expiry',
  },
}))

vi.mock('drizzle-orm', () => ({
  eq: vi.fn().mockReturnValue({}),
  and: vi.fn().mockReturnValue({}),
  gt: vi.fn().mockReturnValue({}),
}))

describe('POST /api/auth/verify-email', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject missing token', async () => {
    const { POST } = await import('@/app/api/auth/verify-email/route')
    const req = new Request('http://localhost:3000/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBe('驗證 Token 無效')
  })

  it('should reject non-string token', async () => {
    const { POST } = await import('@/app/api/auth/verify-email/route')
    const req = new Request('http://localhost:3000/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 123 }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('should succeed with valid token', async () => {
    const { POST } = await import('@/app/api/auth/verify-email/route')
    const req = new Request('http://localhost:3000/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: 'valid-token-hex' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.message).toBe('Email 驗證成功')
  })
})
