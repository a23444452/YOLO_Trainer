import { NextResponse } from 'next/server'
import { eq, and, gt } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const limited = await rateLimit(req, 'verifyEmail')
  if (limited) return limited

  try {
    const body = await req.json()
    const { token } = body

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: '驗證 Token 無效' },
        { status: 400 }
      )
    }

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(
        and(
          eq(users.verificationToken, token),
          gt(users.verificationTokenExpiry, new Date())
        )
      )
      .limit(1)

    if (!user) {
      return NextResponse.json(
        { error: '驗證連結已失效或無效，請重新申請' },
        { status: 400 }
      )
    }

    await db
      .update(users)
      .set({
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))

    return NextResponse.json({ message: 'Email 驗證成功' })
  } catch (error) {
    console.error('Verify email error:', error)
    return NextResponse.json(
      { error: '驗證失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
