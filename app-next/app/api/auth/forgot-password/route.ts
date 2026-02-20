import { NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { eq } from 'drizzle-orm'
import { forgotPasswordSchema } from '@/lib/validations/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { sendPasswordResetEmail } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const limited = await rateLimit(req, 'forgotPassword')
  if (limited) return limited

  try {
    const body = await req.json()
    const validated = forgotPasswordSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '請輸入有效的 Email' },
        { status: 400 }
      )
    }

    const { email } = validated.data

    const [user] = await db
      .select({ id: users.id, hashedPassword: users.hashedPassword })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    // Always return success to prevent email enumeration
    if (!user || !user.hashedPassword) {
      return NextResponse.json({ message: '如果此 Email 已註冊，你將收到重設密碼信件' })
    }

    const resetToken = randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await db
      .update(users)
      .set({ resetToken, resetTokenExpiry })
      .where(eq(users.id, user.id))

    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json({ message: '如果此 Email 已註冊，你將收到重設密碼信件' })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json(
      { error: '發送失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
