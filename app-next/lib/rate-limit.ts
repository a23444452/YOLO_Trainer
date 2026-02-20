import { RateLimiterMemory } from 'rate-limiter-flexible'
import { NextResponse } from 'next/server'

const limiters = new Map<string, RateLimiterMemory>()

interface RateLimitConfig {
  readonly points: number
  readonly duration: number
}

function getLimiter(name: string, config: RateLimitConfig): RateLimiterMemory {
  const existing = limiters.get(name)
  if (existing) return existing

  const limiter = new RateLimiterMemory({
    points: config.points,
    duration: config.duration,
  })
  limiters.set(name, limiter)
  return limiter
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return req.headers.get('x-real-ip') ?? '127.0.0.1'
}

export const RATE_LIMITS = {
  register: { points: 5, duration: 900 },
  login: { points: 10, duration: 900 },
  contact: { points: 3, duration: 3600 },
  checkout: { points: 10, duration: 3600 },
  portal: { points: 10, duration: 3600 },
  subscription: { points: 30, duration: 60 },
  webhook: { points: 100, duration: 60 },
} as const satisfies Record<string, RateLimitConfig>

export async function rateLimit(
  req: Request,
  name: keyof typeof RATE_LIMITS
): Promise<NextResponse | null> {
  const config = RATE_LIMITS[name]
  const limiter = getLimiter(name, config)
  const ip = getClientIp(req)

  try {
    await limiter.consume(ip)
    return null
  } catch {
    return NextResponse.json(
      { error: '請求過於頻繁，請稍後再試' },
      {
        status: 429,
        headers: {
          'Retry-After': String(config.duration),
        },
      }
    )
  }
}
