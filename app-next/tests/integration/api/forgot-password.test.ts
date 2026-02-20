import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/db', () => ({
  db: {
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue([{ id: 'user-1', hashedPassword: '$2b$10$hash' }]),
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
    email: 'email',
    hashedPassword: 'hashed_password',
  },
}))

vi.mock('drizzle-orm', () => ({
  eq: vi.fn().mockReturnValue({}),
}))

vi.mock('@/lib/email', () => ({
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
}))

describe('POST /api/auth/forgot-password', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should reject invalid email', async () => {
    const { POST } = await import('@/app/api/auth/forgot-password/route')
    const req = new Request('http://localhost:3000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'invalid' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('should return success message for valid email (prevents enumeration)', async () => {
    const { POST } = await import('@/app/api/auth/forgot-password/route')
    const req = new Request('http://localhost:3000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toContain('如果此 Email 已註冊')
  })

  it('should call sendPasswordResetEmail for existing user', async () => {
    const { sendPasswordResetEmail } = await import('@/lib/email')
    const { POST } = await import('@/app/api/auth/forgot-password/route')
    const req = new Request('http://localhost:3000/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' }),
    })

    await POST(req)
    expect(sendPasswordResetEmail).toHaveBeenCalledWith('test@example.com', expect.any(String))
  })
})
