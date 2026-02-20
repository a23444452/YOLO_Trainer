import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('bcryptjs', () => ({
  hash: vi.fn().mockResolvedValue('$2b$10$hashedpassword'),
}))

vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([]),
        }),
      }),
    }),
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([{ id: 'test-uuid', email: 'test@example.com', name: 'Test' }]),
      }),
    }),
  },
}))

vi.mock('@/lib/db/schema', () => ({
  users: {
    email: 'email',
  },
}))

vi.mock('drizzle-orm', () => ({
  eq: vi.fn().mockReturnValue({}),
}))

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject mismatched passwords', async () => {
    const { POST } = await import('@/app/api/auth/register/route')
    const req = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: '12345678',
        confirmPassword: '87654321',
      }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })

  it('should reject short password', async () => {
    const { POST } = await import('@/app/api/auth/register/route')
    const req = new Request('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: '1234',
        confirmPassword: '1234',
      }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })
})
