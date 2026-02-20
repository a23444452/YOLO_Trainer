import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { registerSchema } from '@/lib/validations/auth'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: Request) {
  const limited = await rateLimit(req, 'register')
  if (limited) return limited

  try {
    const body = await req.json()
    const validated = registerSchema.safeParse(body)

    if (!validated.success) {
      return NextResponse.json(
        { error: '輸入資料無效' },
        { status: 400 }
      )
    }

    const { name, email, password } = validated.data

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existing) {
      return NextResponse.json(
        { error: '此 Email 已經被註冊' },
        { status: 409 }
      )
    }

    const hashedPassword = await hash(password, 12)

    const [newUser] = await db
      .insert(users)
      .values({
        name,
        email,
        hashedPassword,
      })
      .returning({ id: users.id, email: users.email })

    return NextResponse.json(
      { message: '註冊成功', user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: '註冊失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
