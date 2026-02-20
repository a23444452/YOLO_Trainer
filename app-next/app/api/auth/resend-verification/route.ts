import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { sendVerificationEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const limited = await rateLimit(req, 'resendVerification')
  if (limited) return limited

  try {
    const body = await req.json()
    const { email } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: '請提供 Email' },
        { status: 400 }
      )
    }

    const [user] = await db
      .select({ id: users.id, emailVerified: users.emailVerified })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    // Always return success to prevent email enumeration
    if (!user || user.emailVerified) {
      return NextResponse.json({ message: '驗證信已發送' })
    }

    const verificationToken = randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await db
      .update(users)
      .set({ verificationToken, verificationTokenExpiry })
      .where(eq(users.id, user.id))

    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ message: '驗證信已發送' })
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json(
      { error: '發送失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
