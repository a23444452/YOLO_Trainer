import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { eq, and, gt } from 'drizzle-orm'
import { resetPasswordSchema } from '@/lib/validations/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const limited = await rateLimit(req, 'resetPassword')
  if (limited) return limited

  try {
    const body = await req.json()
    const validated = resetPasswordSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '輸入資料無效' },
        { status: 400 }
      )
    }

    const { token, password } = validated.data

    const [user] = await db
      .select({ id: users.id })
      .from(users)
      .where(
        and(
          eq(users.resetToken, token),
          gt(users.resetTokenExpiry, new Date())
        )
      )
      .limit(1)

    if (!user) {
      return NextResponse.json(
        { error: '連結已失效或無效，請重新申請' },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(password, 12)

    await db
      .update(users)
      .set({
        hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id))

    return NextResponse.json({ message: '密碼已重設，請使用新密碼登入' })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json(
      { error: '重設失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
