import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { newsletterSubscribers } from '@/lib/db/schema'
import { rateLimit } from '@/lib/rate-limit'

const newsletterSchema = z.object({
  email: z.string().email('請輸入有效的 Email'),
})

export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, 'newsletter')
  if (limited) return limited

  try {
    const body = await req.json()
    const validated = newsletterSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '請輸入有效的 Email' },
        { status: 400 }
      )
    }

    const { email } = validated.data

    await db
      .insert(newsletterSubscribers)
      .values({ email })
      .onConflictDoUpdate({
        target: newsletterSubscribers.email,
        set: { unsubscribedAt: null },
      })

    return NextResponse.json({ message: '訂閱成功' })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: '訂閱失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
