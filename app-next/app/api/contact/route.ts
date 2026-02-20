import { NextRequest, NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact'
import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  const limited = await rateLimit(req, 'contact')
  if (limited) return limited

  try {
    const body = await req.json()
    const validated = contactSchema.safeParse(body)

    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors
      return NextResponse.json(
        { error: '輸入資料有誤', details: errors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = validated.data

    await db.insert(contactSubmissions).values({
      name,
      email,
      subject,
      message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: '送出失敗，請稍後再試' },
      { status: 500 }
    )
  }
}
