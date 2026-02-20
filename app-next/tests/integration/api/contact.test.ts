import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  },
}))

vi.mock('@/lib/db/schema', () => ({
  contactSubmissions: {},
}))

describe('POST /api/contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should accept valid contact form data', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'This is a test message with enough chars.',
      }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('should reject invalid email', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'This is a test message with enough chars.',
      }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })

  it('should reject missing fields', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
      }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })

  it('should reject short message', async () => {
    const { POST } = await import('@/app/api/contact/route')
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Subject',
        message: 'Short',
      }),
    })

    const { NextRequest } = await import('next/server')
    const nextReq = new NextRequest(req)
    const res = await POST(nextReq)

    expect(res.status).toBe(400)
  })
})
